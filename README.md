# Redline

An editorial prototype for tracking sports car, supercar, and hypercar reveals. The feed cutoff is the Bugatti Destrier announcement on August 6, 2026. The Destrier stays in the catalogue as the cutoff marker. The Hennessey Blackbird is retained as an explicitly labeled, user-requested pre-cutoff exception.

## Run locally

Open `index.html` in a browser. No build step or dependencies are required.

## Sources and verification

- Discovery leads: [Top Gear](https://www.topgear.com/) and [Car and Driver](https://www.caranddriver.com/)
- Each car's specifications should be verified against a manufacturer announcement before publication.
- Unknown specifications should remain marked as undisclosed.

## News updates

Automatic news scanning is currently disabled. The scanner source remains in `scripts/scan-news.mjs` for possible future use, but there is no active GitHub Actions workflow to run it. New confirmed car entries are currently added by editing `app.js`.

## Files

- `index.html` — page structure
- `style.css` — responsive visual design
- `app.js` — catalogue and brand rendering
- `assets/cars/` — locally stored manufacturer press images used by car cards
- `IMAGE-CREDITS.md` — image sources and credit notes
- `scripts/scan-news.mjs` — scheduled RSS discovery job
