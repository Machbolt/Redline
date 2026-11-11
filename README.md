# Redline

I built Redline to track sports car, supercar, and hypercar reveals. My feed starts after the Hennessey Blackbird announcement on August 3, 2026; I keep the Blackbird in the catalogue as the cutoff marker. The Bugatti Destrier and later qualifying reveals stay in the feed.

## Credits

- Created by **Josiah Kanuparthi**.
- Car photos and their source attributions are listed in [IMAGE-CREDITS.md](IMAGE-CREDITS.md). Photos I supplied are identified there; manufacturer names and press images remain the property of their respective owners.

## Run locally

Serve the project folder with a local web server to see both the catalogue and coverage leads. Opening `index.html` directly from disk will still show the catalogue, but browsers block the local JSON fetch used by the coverage section.

## Sources and verification

- Discovery leads: [Top Gear](https://www.topgear.com/) and [Car and Driver](https://www.caranddriver.com/)
- I verify each car's specifications against a manufacturer announcement before publication.
- I mark specifications that have not been announced as undisclosed.

## News updates

GitHub Actions runs the RSS scanner weekly and can also be started manually from the Actions tab. It runs in a restricted Docker container, validates the discovered lead URLs against the configured source domains, then deploys the site and the latest leads to GitHub Pages. The `Coverage leads` section is an automatically updated list of articles to review; it does not automatically create car cards or publish unverified specifications. I add confirmed car entries by editing `app.js` after checking manufacturer sources.

For the deployment workflow to run, GitHub Pages must use **GitHub Actions** as its build and deployment source. Repository Actions settings must allow the pinned checkout, artifact download/upload, Pages artifact upload, and Pages deploy actions used in `.github/workflows/news-discovery.yml`.

## Files

- `index.html` — page structure
- `style.css` — responsive visual design
- `app.js` — catalogue and brand rendering
- `assets/cars/` — locally stored car photos used by my cards
- `IMAGE-CREDITS.md` — image sources and credit notes
- `scripts/scan-news.mjs` — RSS discovery scanner
- `scripts/Dockerfile` — restricted scanner container
- `.github/workflows/news-discovery.yml` — weekly scan and Pages deployment
- `data/discovery-queue.json` — candidate articles shown in the Coverage section
