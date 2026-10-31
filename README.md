# Redline

I built Redline to track sports car, supercar, and hypercar reveals. My feed starts after the Bugatti Destrier announcement on August 6, 2026; I keep the Destrier in the catalogue as the cutoff marker. I also keep the Hennessey Blackbird as an exception because I wanted it included despite its earlier reveal.

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
