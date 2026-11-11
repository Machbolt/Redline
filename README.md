# Redline

I built Redline to track sports car, supercar, and hypercar reveals. My feed starts after the Hennessey Blackbird announcement on August 3, 2026; I keep the Blackbird in the catalogue as the cutoff marker. The Bugatti Destrier and later qualifying reveals stay in the feed.

## Credits

- Created by **Josiah Kanuparthi**.
- Car photos and their source attributions are listed in [IMAGE-CREDITS.md](IMAGE-CREDITS.md). Photos I supplied are identified there; manufacturer names and press images remain the property of their respective owners.

## Run locally

Open `index.html` in a browser. No build step or dependencies are required.

## Sources and verification

- Discovery leads: [Top Gear](https://www.topgear.com/) and [Car and Driver](https://www.caranddriver.com/)
- I verify each car's specifications against a manufacturer announcement before publication.
- I mark specifications that have not been announced as undisclosed.

## News updates

The RSS discovery job runs every six hours and can also be started manually. It runs in a Docker container as a non-root user, with a read-only container filesystem and write access only to a temporary output folder. The workflow token has read-only repository access and is not passed into the container. It does not commit changes or edit the car catalogue.

The job validates the feed response type, size, UTF-8 encoding, final redirect domain, article URL domain, and record shape before saving leads. It records the SHA-256 hash and validation result for each downloaded feed in a manifest, and preserves the previous queue if every feed fails or the existing queue is invalid. The Node image and GitHub Actions are pinned to immutable digests/commit SHAs. Each run uploads a seven-day artifact with the queue and manifest for review; I add confirmed car entries by editing `app.js`.

## Files

- `index.html` — page structure
- `style.css` — responsive visual design
- `app.js` — catalogue and brand rendering
- `assets/cars/` — locally stored car photos used by my cards
- `IMAGE-CREDITS.md` — image sources and credit notes
- `scripts/scan-news.mjs` — scheduled RSS discovery job
