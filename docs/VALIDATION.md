> Latest refinement: [MEDIA-AND-UPLOAD.md](MEDIA-AND-UPLOAD.md) supersedes the photo, playback-control and upload-path details below. Previous evidence is retained as history.

# Current approved motion upgrade

See [MOTION-UPGRADE.md](MOTION-UPGRADE.md) for current components, behavior, final evidence and test results. The short-entry video and WebGL gallery settings below are historical. Latest production build: 469 modules and 47 files.

---

# Current polish validation

The in-place design refinement supersedes the original visual settings below. See [polish/REPORT.md](polish/REPORT.md) for current behavior, before/after screenshots, recordings and final test evidence. Current build: 528 modules, 42 production files; main CSS 34.18 kB (7.70 kB gzip), main interaction JS 10.23 kB (4.27 kB gzip), enhancement chunk 225.50 kB (70.81 kB gzip). The historical first-build measurements below are retained for context.

---

# Validation report — 28 September 2026

**Result: four-page local preview built and tested. Not launch-ready until the map, domain and live enquiry configuration are confirmed.**

## Actually executed

- `npm install`: completed; 78 packages installed, npm audit reported zero vulnerabilities at installation. Reproducible package-lock.json included.
- `npm run dev`: successful, Vite server on 127.0.0.1:5173. Agent-browser opened the page, inspected its accessible controls and captured a development screenshot.
- `npm run build`: successful; Vite 7.3.6, 523 modules transformed. Initial sandbox execution could not spawn esbuild; the authorised build succeeded. Final build: 41 files, exactly four HTML marketing pages, 12,295,115 bytes total including all selected video/image files and software notices.
- `npm run preview -- --port 4173`: successful production preview.
- `npm run check`: passed all local asset/link targets, service anchors, single H1/footer per page, preview noindex, clean output audit and mocked delivery-adapter success/failure.
- `npm run test:browser`: passed in installed Chrome against production output. Evidence: `validation/browser-report.json`.
- `node scripts/extended-check.mjs`: passed. Evidence: `validation/extended-report.json`.

## Browser findings

| Check | Result |
|---|---|
| Direct visits to all four production HTML routes | Pass; one H1 and correct unique titles |
| Widths 360, 390, 768, 1024, 1440, 1920 | 24 route/width combinations; no horizontal document overflow |
| Small laptop height | 1440×720 layout checked |
| Approved fonts | Barlow Semi Condensed and Manrope loaded successfully on all four routes |
| Mobile menu | Open/close, expanded state, Escape and focus return passed |
| Service gallery | Arrow keys move focus; Enter follows the correct Services anchor |
| Work gallery | Next control and alternate DOM photo-list mode passed |
| Reduced motion | Static heading/cards and paused hero video passed |
| JavaScript disabled | All four pages retain headings, navigation, content and usable links |
| Scripts and fonts blocked | Static contact page, navigation and contact links remain usable |
| Video blocked | Supplied poster and complete heading remain visible |
| WebGL unavailable / context lost | Real DOM gallery restored; effect unmounts |
| Enquiry fields | Required name/message/contact validation and focus tested; valid service prefill, unrecognised query ignored |
| Delivery UI | Intercepted 200 with delivered=true and 503 failure tested on local dev form; no real email sent |
| Automated accessibility | Axe WCAG 2 A/AA + 2.1 AA tags: zero detected violations on all four desktop pages |
| Console / local network | Zero unexpected JavaScript errors and zero local HTTP failures in normal production-page tests |
| Zoom reflow | 200% equivalent 720×450 CSS viewport at device scale 2 passed on all four pages; native browser zoom itself was not automated |
| Asset integrity | All 20 selected public media/brand files SHA-256 match the supplied ZIP |

## Visual review and refinements

Reviewed actual full-page desktop captures of all four pages plus Home and About/Contact mobile captures. Verified the real logo, red/navy system, machinery-safe hero copy position, prominent genuine truck, distinct page heroes, readable footer actions and recognisable decorative SHADRECK lettering. Adjusted the portrait bulk-earthworks focal point to expose the excavator/tipper; set carousel cardHeight to 0.7 inside its 560px container so photographs are substantial. Removed unused source demo-photo arrays.

The capture script scrolls through pages to load lazy images, waits for effects, then returns to the top; earlier incomplete captures were replaced. Final screenshots are in `validation/`. The large desktop footer word scales via its SVG viewBox after font readiness. Public content contains no invented clients, statistics, project names, machine capacities, policies or social links.

## Build size and limitations

Measured final build assets: main CSS 17.71 kB (4.61 kB gzip), ordinary interaction JS 7.65 kB (3.34 kB gzip), shared React enhancement chunk 225.73 kB (70.89 kB gzip). GSAP/ScrollTrigger, Motion and OGL-related effect chunks are separate; the WorkCarousel chunk is 77.83 kB (24.48 kB gzip) and is requested only near its Work-page gallery. Video files total 5,049,913 bytes across three pages and are never requested globally. These are build measurements, not real-user timing or a Lighthouse score. No Lighthouse or throttled mobile performance benchmark was run.

Automated accessibility checks do not replace assistive-technology user testing. Safari/iOS, Firefox, native 200% browser zoom, slow-network physical devices, screen readers and deployed-host behaviour were not directly verified. Actual map embedding and real mail delivery cannot be tested until the pending configuration is resolved. No live enquiries, publication, DNS changes or purchases were performed.

Production output was checked to exclude original archives, excluded/reference photography, source registries, source documentation, font binaries, node_modules and secrets. Only the four pages, chosen media/brand files, compiled CSS/JS, robots.txt and required software notices are in the deployable ZIP.
