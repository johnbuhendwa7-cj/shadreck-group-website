# Shadreck Group Website

A polished four-page construction and earthworks website for Shadreck Group, built with React, Vite, GSAP and Motion. It includes responsive media, scroll-driven typography, an animated services showcase and an accessible work gallery.

**Live preview:** [mrbrand.co.za/websites/shadreck/Website](https://mrbrand.co.za/websites/shadreck/Website/index.html)

## Features

- Responsive Home, Services, Work & Equipment, and About & Contact pages
- ScrollFloat and ScrollReveal typography effects
- Animated service selector with direct-link support
- Touch-friendly work carousel and accessible photo dialogs
- Looping video heroes with reduced-motion support
- Static hosting output suitable for Apache/FileZilla deployment

## Run locally

Requires Node.js 20.19+ or 22.12+ (built with Node 24.15.0) and npm.

```sh
npm ci
npm run dev
```

Development: http://127.0.0.1:5173. All four HTML pages can be visited directly.

```sh
npm run build
npm run preview -- --port 4173
npm run check
npm run test:browser
```

Preview: http://127.0.0.1:4173. Browser checks require installed Google Chrome. `node scripts/extended-check.mjs` additionally uses both preview and development servers for safe, intercepted form tests.

## Edit

- `templates/pages.js`: page content and layout.
- `templates/partials/shared.js`: build-time shared header, hero and footer.
- `src/config/site.js`: business details, media, confirmed origin, map and enquiry settings.
- `src/config/presets.js`: chosen production effect values.
- `src/data/`: six services and the genuine four-photo work gallery.
- `src/styles/`: tokens and scoped plain CSS.
- `src/components/react-bits/`: sourced components with the documented minimal patches.
- `public/assets/`: only selected approved brand files and media derivatives.

The root HTML files are generated; edit the templates and run `npm run generate`. `npm run build` now also refreshes the main **Website/** folder beside **Website-Source/**. Upload that Website folder/its contents; `dist/` is the internal build copy. Do not upload source, documentation, registry snapshots, node_modules or source ZIPs.

## Before launch

See `docs/LAUNCH-CHECKLIST.md`. The map link resolves to a different business/location; a concise directions note is shown; the unverified link is retained only in configuration. The form prepares an email draft until an authorised delivery service exists. No production domain is assumed. Preview indexing is disabled. These settings mean this is a tested preview, not a launch-ready deployment.

Validation evidence is in `docs/validation/`; the concise human-readable report is `docs/VALIDATION.md`. Asset allocation, licensing/provenance and patches are recorded in `docs/ASSETS-AND-SOURCES.md`.

## Current motion upgrade

See [docs/MOTION-UPGRADE.md](docs/MOTION-UPGRADE.md) for the approved upgrade, screenshots, recordings and tests. Selected headings use ScrollFloat; selected descriptions use ScrollReveal. Services use a large animated image stack and direct service selectors. Work uses a native-scrolling Apple-style card gallery with hover/focus/touch pause and accessible photo dialogs. The former WebGL gallery no longer ships.

Video heroes loop without visible playback controls, stop offscreen/when hidden, and respect reduced motion. The footer composition is retained, with the linked Dotcom Africa credit and back-to-top arrow.

Run `node scripts/motion-check.mjs` for the new interactions. `scripts/polish-check.mjs` and `scripts/touch-diagnostic.mjs` are historical checks for the superseded short-video/WebGL design. Previous evidence remains under `docs/polish/`; motion-upgrade evidence is under `docs/motion-upgrade/`. The latest image, responsive and upload changes are in [docs/MEDIA-AND-UPLOAD.md](docs/MEDIA-AND-UPLOAD.md), with current evidence under `docs/media-refinement/`.

## FileZilla updates

Editable project: `Website-Source/shadreck-website`. Upload output: sibling main `Website` folder. Run `npm run build` here or double-click the workspace `UPDATE-WEBSITE.cmd`; the upload directory refreshes automatically. See the workspace `FILEZILLA-UPLOAD.md`. Do not upload Website-Source or old ZIP snapshots. Run `node scripts/media-check.mjs` for current media/display verification.
