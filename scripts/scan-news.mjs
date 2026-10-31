import { mkdir, readFile, writeFile } from 'node:fs/promises';

const feeds = [
  ['Top Gear', 'https://www.topgear.com/car-news/rss'],
  ['Car and Driver', 'https://www.caranddriver.com/rss/all.xml'],
  ['Autocar', 'https://www.autocar.co.uk/rss'],
  ['Road & Track', 'https://www.roadandtrack.com/rss/all.xml'],
];
const cutoff = Date.parse('2026-08-06T00:00:00Z');
const terms = /sports car|supercar|hypercar|roadster|gt\b|coupe|spyder|spider|track car/i;
const xmlText = (s) => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
function parse(xml, source) {
  const items = [...xml.matchAll(/<(item|entry)\b[\s\S]*?<\/(?:item|entry)>/gi)];
  return items.map(([raw]) => {
    const tag = (name) => raw.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1];
    const title = xmlText(tag('title') || '');
    const link = raw.match(/<link[^>]+href=["']([^"']+)/i)?.[1] || xmlText(tag('link') || '');
    const dateText = tag('pubDate') || tag('published') || tag('updated');
    const published = dateText ? new Date(xmlText(dateText)).toISOString() : '';
    const summary = xmlText(tag('description') || tag('summary') || tag('content') || '');
    return { source, title, url: link, published, summary: summary.slice(0, 500) };
  }).filter(x => x.title && x.url && x.published && Date.parse(x.published) > cutoff && terms.test(`${x.title} ${x.summary}`));
}

let candidates = [];
for (const [source, url] of feeds) {
  try {
    const response = await fetch(url, { headers: { 'user-agent': 'RedlineNewsMonitor/1.0' }, signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    candidates.push(...parse(await response.text(), source));
  } catch (error) {
    console.warn(`${source}: ${error.message}`);
  }
}
candidates = [...new Map(candidates.map(x => [x.url, x])).values()].sort((a,b) => Date.parse(b.published)-Date.parse(a.published)).slice(0, 100);
await mkdir('data', { recursive: true });
let old = [];
try { old = JSON.parse(await readFile('data/discovery-queue.json', 'utf8')); } catch {}
const merged = [...new Map([...candidates, ...old].map(x => [x.url, x])).values()].sort((a,b) => Date.parse(b.published)-Date.parse(a.published)).slice(0, 250);
await writeFile('data/discovery-queue.json', `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Saved ${merged.length} news leads for editorial review.`);
