import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const feeds = [
  { source: 'Top Gear', url: 'https://www.topgear.com/car-news/rss', domain: 'topgear.com' },
  { source: 'Car and Driver', url: 'https://www.caranddriver.com/rss/all.xml', domain: 'caranddriver.com' },
  { source: 'Autocar', url: 'https://www.autocar.co.uk/rss', domain: 'autocar.co.uk' },
  { source: 'Road & Track', url: 'https://www.roadandtrack.com/rss/all.xml', domain: 'roadandtrack.com' },
];

const cutoff = Date.parse('2026-08-06T00:00:00Z');
const terms = /sports car|supercar|hypercar|roadster|gt\b|coupe|spyder|spider|track car/i;
const maxFeedBytes = 4 * 1024 * 1024;
const maxQueueEntries = 250;
const maxCandidatesPerFeed = 100;
const outputDirectory = process.env.REDLINE_DATA_DIR || 'data';
const outputFile = join(outputDirectory, 'discovery-queue.json');
const sourceByName = new Map(feeds.map(feed => [feed.source, feed]));

function xmlText(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function allowedHost(hostname, baseDomain) {
  return hostname === baseDomain || hostname.endsWith(`.${baseDomain}`);
}

function normalizeEntry(entry, label) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    throw new Error(`${label}: expected an object`);
  }

  const feed = sourceByName.get(entry.source);
  if (!feed) throw new Error(`${label}: unrecognized source`);
  if (typeof entry.title !== 'string' || !entry.title.trim() || entry.title.length > 300) {
    throw new Error(`${label}: invalid title`);
  }
  if (typeof entry.summary !== 'string' || entry.summary.length > 500) {
    throw new Error(`${label}: invalid summary`);
  }

  let articleUrl;
  try {
    articleUrl = new URL(entry.url);
  } catch {
    throw new Error(`${label}: invalid article URL`);
  }
  if (articleUrl.protocol !== 'https:' || articleUrl.username || articleUrl.password || articleUrl.port ||
      !allowedHost(articleUrl.hostname.toLowerCase(), feed.domain)) {
    throw new Error(`${label}: article URL is outside its trusted HTTPS source`);
  }

  const publishedTime = Date.parse(entry.published);
  if (!Number.isFinite(publishedTime)) throw new Error(`${label}: invalid publication date`);

  return {
    source: feed.source,
    title: entry.title.trim(),
    url: articleUrl.toString(),
    published: new Date(publishedTime).toISOString(),
    summary: entry.summary.trim(),
  };
}

function parseFeed(xml, source) {
  if (!/<(?:rss|feed|rdf:rdf)\b/i.test(xml)) {
    throw new Error('response did not contain an RSS or Atom document');
  }

  const items = [...xml.matchAll(/<(item|entry)\b[^>]*>[\s\S]*?<\/\1>/gi)];
  const candidates = [];

  for (const [raw] of items) {
    const tag = name => raw.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1];
    const title = xmlText(tag('title') || '');
    const atomLinks = [...raw.matchAll(/<link\b([^>]*)\/?\s*>/gi)];
    const alternateLink = atomLinks.find(([, attributes]) => /\brel=["']alternate["']/i.test(attributes));
    const selectedAtomLink = alternateLink || atomLinks[0];
    const atomHref = selectedAtomLink?.[1].match(/\bhref=["']([^"']+)["']/i)?.[1];
    const linkText = tag('link') || '';
    const url = xmlText(atomHref || linkText);
    const dateText = tag('pubDate') || tag('published') || tag('updated') || tag('dc:date');
    const publishedTime = dateText ? Date.parse(xmlText(dateText)) : NaN;
    const summary = xmlText(tag('description') || tag('summary') || tag('content') || '').slice(0, 500);

    if (!title || title.length > 300 || !Number.isFinite(publishedTime) || publishedTime <= cutoff ||
        !terms.test(`${title} ${summary}`)) continue;

    try {
      candidates.push(normalizeEntry({ source, title, url, published: new Date(publishedTime).toISOString(), summary }, 'feed item'));
    } catch {
      // Ignore malformed or off-domain article links from an otherwise valid feed.
    }
  }

  return candidates
    .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))
    .slice(0, maxCandidatesPerFeed);
}

async function readBoundedResponse(response) {
  const contentType = (response.headers.get('content-type') || '').split(';', 1)[0].trim().toLowerCase();
  const allowedTypes = new Set(['application/rss+xml', 'application/atom+xml', 'application/xml', 'text/xml']);
  if (!allowedTypes.has(contentType)) throw new Error(`unexpected content type: ${contentType || 'missing'}`);

  const contentLength = Number(response.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > maxFeedBytes) {
    throw new Error(`feed exceeds ${maxFeedBytes} bytes`);
  }
  if (!response.body) throw new Error('response has no body');

  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxFeedBytes) {
      await reader.cancel();
      throw new Error(`feed exceeds ${maxFeedBytes} bytes`);
    }
    chunks.push(Buffer.from(value));
  }

  const bytes = Buffer.concat(chunks, size);
  return {
    xml: new TextDecoder('utf-8', { fatal: true }).decode(bytes),
    contentType,
    byteCount: size,
    sha256: createHash('sha256').update(bytes).digest('hex'),
  };
}

async function fetchFeed(feed) {
  let requestUrl = new URL(feed.url);
  const allowedRedirects = new Set([301, 302, 303, 307, 308]);
  let response;

  for (let redirectCount = 0; redirectCount <= 3; redirectCount += 1) {
    if (requestUrl.protocol !== 'https:' || requestUrl.username || requestUrl.password || requestUrl.port ||
        !allowedHost(requestUrl.hostname.toLowerCase(), feed.domain)) {
      throw new Error('request or redirect left the trusted HTTPS source domain');
    }

    response = await fetch(requestUrl, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 RedlineNewsMonitor/1.0',
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(20000),
    });
    if (!allowedRedirects.has(response.status)) break;

    const location = response.headers.get('location');
    await response.body?.cancel();
    if (!location) throw new Error('redirect response did not include a location');
    if (redirectCount === 3) throw new Error('too many redirects');
    requestUrl = new URL(location, requestUrl);
  }

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const finalUrl = requestUrl;
  if (finalUrl.protocol !== 'https:' || !allowedHost(finalUrl.hostname.toLowerCase(), feed.domain)) {
    throw new Error('redirect left the trusted source domain');
  }

  const payload = await readBoundedResponse(response);
  const entries = parseFeed(payload.xml, feed.source);
  return {
    entries,
    validation: {
      source: feed.source,
      finalUrl: finalUrl.toString(),
      contentType: payload.contentType,
      byteCount: payload.byteCount,
      sha256: payload.sha256,
      acceptedRecords: entries.length,
    },
  };
}

async function readExistingQueue() {
  let contents;
  try {
    contents = await readFile(outputFile, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  let entries;
  try {
    entries = JSON.parse(contents);
  } catch {
    throw new Error('existing discovery queue is invalid JSON; leaving it untouched');
  }
  if (!Array.isArray(entries) || entries.length > maxQueueEntries) {
    throw new Error('existing discovery queue has an invalid shape or size; leaving it untouched');
  }
  return entries.map((entry, index) => normalizeEntry(entry, `existing queue item ${index + 1}`));
}

const candidates = [];
const validatedFeeds = [];
const rejectedFeeds = [];
for (const feed of feeds) {
  try {
    const result = await fetchFeed(feed);
    candidates.push(...result.entries);
    validatedFeeds.push(result.validation);
  } catch (error) {
    console.warn(`${feed.source}: ${error.message}`);
    rejectedFeeds.push({ source: feed.source, reason: String(error.message).slice(0, 250) });
  }
}
await mkdir(outputDirectory, { recursive: true });
const validationManifest = {
  scannedAt: new Date().toISOString(),
  validatedFeeds,
  rejectedFeeds,
};
await writeAtomic(join(outputDirectory, 'validation-manifest.json'), `${JSON.stringify(validationManifest, null, 2)}\n`);
if (validatedFeeds.length === 0) throw new Error('all trusted feeds failed validation; no queue file was changed');

const previous = await readExistingQueue();
const merged = [...new Map([...candidates, ...previous].map(entry => [entry.url, entry])).values()]
  .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))
  .slice(0, maxQueueEntries);

async function writeAtomic(path, content) {
  const temporaryFile = join(outputDirectory, `.${process.pid}-${path.split(/[\\/]/).at(-1)}.tmp`);
  try {
    await writeFile(temporaryFile, content, { encoding: 'utf8', flag: 'wx' });
    await rename(temporaryFile, path);
  } finally {
    await unlink(temporaryFile).catch(error => {
      if (error.code !== 'ENOENT') throw error;
    });
  }
}

await writeAtomic(outputFile, `${JSON.stringify(merged, null, 2)}\n`);

console.log(`Validated ${validatedFeeds.length}/${feeds.length} feeds; saved ${merged.length} leads and feed hashes for editorial review.`);
