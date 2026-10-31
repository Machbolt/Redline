# Redline

An editorial prototype for tracking sports car, supercar, and hypercar reveals. The feed cutoff is the Bugatti Destrier announcement on August 6, 2026. Entries before the cutoff are excluded.

## Run locally

Open `index.html` in a browser. No build step or dependencies are required.

## Sources and verification

- Discovery leads: [Top Gear](https://www.topgear.com/) and [Car and Driver](https://www.caranddriver.com/)
- Each car's specifications should be verified against a manufacturer announcement before publication.
- Unknown specifications should remain marked as undisclosed.

## Current scope

This is a static front-end prototype. Its catalogue is maintained in `app.js`; the browser does not fetch news or update itself. Scheduled monitoring, approval/verification, and persistent storage need to be connected before describing the feed as automatic.

## Files

- `index.html` — page structure
- `style.css` — responsive visual design
- `app.js` — catalogue and brand rendering
