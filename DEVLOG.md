# Footprint Public Template Devlog

## 2026-07-08 - Complete Backup Covers Four Modules

- Updated the existing complete backup export to include `hotels`, `places`, `railTrips`, and `flightTrips`.
- Kept `manualPlaces` as a compatibility alias for older backup structure.
- Updated complete backup import so it restores hotel, city/destination, railway, and flight/route data into browser localStorage.
- Updated the complete backup UI hint and public documentation to describe the four-module backup scope.

## 2026-07-08 - Public Template First-Use Guide

- Added a public template first-use guide in `app.html`.
- Added one-click clearing of hotel, city, railway, and flight example data; empty arrays are saved to browser localStorage so refresh keeps the template empty.
- Added example data restore, which clears the local example overrides and returns to the built-in template examples.
- Updated public documentation to explain local-only storage, no default server upload, regular backups, and example data management.

## 2026-07-08 - Initial Public Template

- Created a public template version of Footprint.
- Kept the pure frontend app structure and the hotel, city, railway, and flight/route modules.
- Replaced all personal travel records with small fictional example datasets.
- Added public template documentation in `PUBLIC_README.md`.
- Rewrote `PROJECT_STATE.md` for public template usage.
- This template does not include `raw/`, Excel exports, screenshots, email originals, `.git`, or sensitive personal files.





