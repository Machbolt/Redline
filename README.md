# Redline

I built Redline to follow sports cars, supercars, and hypercars. The catalogue is organized by marque and includes car photos, summaries, and published specifications.

## Catalogue

- I keep the Hennessey Blackbird as the August 3, 2026 feed cutoff marker. The feed covers qualifying reveals after that date.
- Each car card is clickable. It opens a larger photo with the car's summary, reveal date, class, power, top speed, powertrain, and drivetrain. Top speed can be shown in MPH or KM/H.
- The source/specs link on each card opens its cited source separately.
- Car cards and specifications are reviewed against manufacturer announcements. Figures that have not been announced are marked undisclosed.

## Automatic news coverage

GitHub Actions scans RSS feeds weekly on Monday at 17:23 UTC and can also be started manually from the Actions tab. The scanner checks Top Gear, Car and Driver, Autocar, and Road & Track for potentially relevant stories published after the feed cutoff.

The scanner runs in a restricted Docker container on a GitHub-hosted runner. It has no repository write access; it writes only to a temporary output folder. The workflow validates feed responses and article URLs, then publishes the current leads to the **Coverage leads** section on GitHub Pages. Leads are articles for review: the scan does not create car cards or publish unverified specifications. I add confirmed vehicles and new marque sections after checking manufacturer sources.

The scanner and site assembly jobs use read-only repository permissions. A separate deployment job receives only the GitHub Pages permissions needed to publish. The workflow does not commit scan results to the repository.

## Run locally

From the project folder, start a local web server:

```powershell
py -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). Serving the folder is needed for the Coverage section to load its JSON feed; opening `index.html` directly from disk blocks that fetch in most browsers. Stop the server with **Ctrl+C**.

## Sources and credits

- Discovery sources: [Top Gear](https://www.topgear.com/), [Car and Driver](https://www.caranddriver.com/), [Autocar](https://www.autocar.co.uk/), and [Road & Track](https://www.roadandtrack.com/).
- I verify catalogue specifications against manufacturer announcements and mark unpublished figures as undisclosed.
- Created by **Josiah Kanuparthi**.
- Car photo sources and attributions are listed in [IMAGE-CREDITS.md](IMAGE-CREDITS.md). Manufacturer names, logos, and press images remain the property of their respective owners.

## Files

- `index.html` — page structure and image dialog
- `style.css` — responsive styling
- `app.js` — catalogue, card interactions, brand list, and coverage leads
- `assets/cars/` — local car photos
- `data/discovery-queue.json` — checked-in fallback queue for local preview and scanning
- `IMAGE-CREDITS.md` — photo sources and credits
- `scripts/scan-news.mjs` — RSS scanner and lead validation
- `scripts/Dockerfile` — restricted scanner container
- `.github/workflows/news-discovery.yml` — weekly scan and GitHub Pages deployment
