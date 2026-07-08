# Footprint Public Template Devlog

## 2026-07-08 - Coordinate Assistant for Missing Coordinates

- Added coordinate assistant guidance to the missing-coordinate panel.
- Added per-item search keyword generation and copy-to-clipboard actions.
- Added OpenStreetMap and Google Maps ordinary search links without geocoding API integration or API keys.
- Added pasted coordinate parsing for common `lat,lng`, `lng,lat`, and labeled `lat:... lng:...` formats.
- Added an in-panel Leaflet map picker that fills lat/lng when the user clicks a location.
- Updated help and public documentation with plain-language coordinate lookup guidance and WGS84 notes.

## 2026-07-08 - Public Layout and Help IA Cleanup

- Moved global management actions out of the narrow left sidebar into a wider top toolbox.
- Kept the left sidebar focused on current module management, current data source, search, filters, sorting, and result counts.
- Replaced the cramped left-sidebar CSV button grid with a dedicated CSV import/template panel.
- Standardized CSV actions: template downloads use secondary buttons and CSV imports use primary buttons.
- Replaced the left-sidebar missing-coordinate section with a wider missing-coordinate management panel.
- Moved the help center entry to the top toolbox and rewrote in-app help for ordinary users.
- Folded GitHub Pages and CloudBase notes into an advanced self-hosting section in the help center, marked as unnecessary for ordinary use.
- Moved the clear-browser-data action into a low-priority warning card in the top toolbox.

## 2026-07-08 - Public 2.0 Shared Software Enhancements

- Upgraded the first-use guide into a product-style start guide with start, clear examples, import backup, and help actions.
- Added an advanced-management entry to reopen the start guide after it has been dismissed.
- Added browser-generated CSV templates and CSV import for hotels, cities/destinations, railway trips, and flight/route trips.
- CSV import supports append or replace mode, validates required headers and required row fields, and converts numeric fields where appropriate.
- Added missing-coordinate management for hotels, cities/destinations, railway stations, and airports/ports.
- Added local coordinate supplements stored in localStorage under `footprint_local_coordinates`; maps prefer local supplements over built-in coordinate files.
- Added local coordinate JSON export and included local coordinates in complete Footprint backup JSON version 2.0.
- Added an in-page help center covering onboarding, example data, record editing, CSV import, backups, localStorage, missing coordinates, deployment, privacy, and common issues.
- Updated public documentation and project state for the 2.0 public template workflow.

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





