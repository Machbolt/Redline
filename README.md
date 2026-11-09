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

I have disabled automatic news scanning. The scanner source remains in `scripts/scan-news.mjs` in case I want to use it in the future, but there is no active GitHub Actions workflow. I add confirmed car entries by editing `app.js`.

## Files

- `index.html` — page structure
- `style.css` — responsive visual design
- `app.js` — catalogue and brand rendering
- `assets/cars/` — locally stored car photos used by my cards
- `IMAGE-CREDITS.md` — image sources and credit notes
- `scripts/scan-news.mjs` — scheduled RSS discovery job
