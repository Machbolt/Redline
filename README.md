# Redline

An editorial prototype for tracking sports car, supercar, and hypercar reveals. The feed cutoff is the Bugatti Destrier announcement on August 6, 2026. Entries before the cutoff are excluded.

## Run locally

Open `index.html` in a browser. No build step or dependencies are required.

## Sources and verification

- Discovery leads: [Top Gear](https://www.topgear.com/) and [Car and Driver](https://www.caranddriver.com/)
- Each car's specifications should be verified against a manufacturer announcement before publication.
- Unknown specifications should remain marked as undisclosed.

## Automatic discovery

GitHub Actions scans Top Gear, Car and Driver, Autocar, and Road & Track RSS feeds every six hours. It filters for performance-car leads published after the cutoff, deduplicates them, and commits them to `data/discovery-queue.json` for review.

The scan is automatic; publishing a lead as a fully specified car card is still curated in `app.js`. RSS headlines do not reliably provide launch dates or verified specifications, so the queue is not treated as confirmed cars. Enable Actions in the GitHub repository if scheduled runs are paused.

## Files

- `index.html` — page structure
- `style.css` — responsive visual design
- `app.js` — catalogue and brand rendering
- `scripts/scan-news.mjs` — scheduled RSS discovery job
- `.github/workflows/scan-news.yml` — six-hour GitHub Actions schedule
