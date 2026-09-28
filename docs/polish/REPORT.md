# Shadreck Group — completed design polish

The existing four-page site has been refined in place. The production output is in `dist/`; no deployment or live enquiry was made. A checkpoint of the prior site is saved at `Website/checkpoints/before-polish-20260928-111727.zip`.

## What changed

- **Opening:** a tighter light header, quieter active navigation, two-line headline, directional hero shading and a separate, wider machinery view on phones. The genuine branded truck has a larger natural-ratio frame in the introduction.
- **Services:** the homepage keeps the official AccordionGallery. Phone visitors tap a numbered row to expand its image, then use a separate Explore link. The Services page now pairs a large active photograph with six concise expanding rows. Keyboard navigation, direct anchors and enquiry preselection work. Without JavaScript, every description and image is already present and open.
- **Work:** larger photographs, a single caption/count/control row and restrained arrows. The official WebGL gallery remains active on ordinary phones. Horizontal touch changes photographs; vertical touch scrolls the page. Failure or deliberate photo-list selection retains the real photographs in a scroll-snap alternative.
- **Contact:** the story now connects to the real truck photograph. Contact details, service area and concise directions note align beside the form. The action says **Prepare email enquiry** and never claims an unsent message was delivered.
- **Preserved:** four routes, factual copy, six services, selected approved media, horizontal logo, fonts and palette. The footer's photograph, composition, contact actions and large SHADRECK treatment are retained.

## Motion behavior

Video heroes use **one short cinematic entry**, not continuous video. There is one muted inline playback attempt, a 4.4-second wall-clock deadline, and an earlier stop at approximately 4.1 seconds of decoded footage. The sequence settles on the supplied poster. It never loops, retries rejected autoplay, or re-arms when scrolling back. Hidden/offscreen and reduced-motion conditions also settle it permanently. The intrusive video/motion controls were removed together with looping behavior.

Ordinary phones retain FoldText, selected SplitText headings, the short BlurText statement, both touch-adapted galleries and footer StrokeText. Reduced-motion users automatically receive finished static content. No new animation framework or dependency installation was needed. Phone WebGL resolution is capped at 1.5 DPR, with the source pixel budget still applied; this is a rendering-cost adjustment, not a claimed performance benchmark.

The visual correction pass retained authored line breaks through SplitText. Touch testing also exposed an inherited `overscroll-behavior: contain` rule: the scoped `auto` override restored vertical page movement without removing horizontal carousel gestures. Reproducible vendor changes are documented in [ASSETS-AND-SOURCES.md](../ASSETS-AND-SOURCES.md).

## Before / after evidence

All four routes have full-page, hero, middle and footer captures at **1440×900** and **390×844**. The same capture procedure scrolls the page to load media/effects, waits for the approved fonts, and returns to the same named sections. Middle viewports can begin within a section because the capture centers that section; use the full-page images to assess its heading and spacing. Capture reports confirm both fonts, no missing images and no horizontal overflow.

| View | Before | Final |
|---|---|---|
| Home opening, desktop | [Before](baseline/index-1440-hero.jpg) | [After](final/index-1440-hero.jpg) |
| Home opening, phone | [Before](baseline/index-390-hero.jpg) | [After](final/index-390-hero.jpg) |
| Home services, desktop | [Before](baseline/index-1440-middle.jpg) | [After](final/index-1440-middle.jpg) |
| Home services, phone | [Before](baseline/index-390-middle.jpg) | [After](final/index-390-middle.jpg) |
| Services, desktop | [Before](baseline/services-1440-full.jpg) | [After](final/services-1440-full.jpg) |
| Services, phone | [Before](baseline/services-390-full.jpg) | [After](final/services-390-full.jpg) |
| Work gallery, desktop | [Before](baseline/work-equipment-1440-middle.jpg) | [After](final/work-equipment-1440-middle.jpg) |
| Work gallery, phone | [Before](baseline/work-equipment-390-middle.jpg) | [After](final/work-equipment-390-middle.jpg) |
| Contact section, desktop | [Before](baseline/about-contact-1440-middle.jpg) | [After](final/about-contact-1440-middle.jpg) |
| About/contact, phone | [Before](baseline/about-contact-390-full.jpg) | [After](final/about-contact-390-full.jpg) |
| Preserved footer, desktop | [Before](baseline/index-1440-footer.jpg) | [After](final/index-1440-footer.jpg) |
| Preserved footer, phone | [Before](baseline/index-390-footer.jpg) | [After](final/index-390-footer.jpg) |

Recordings show actual title/video motion, gallery interaction, mobile menu and footer drawing:

- [Desktop before](baseline/interactions-1440.webm) / [desktop after](final/interactions-1440.webm)
- [Phone before](baseline/interactions-390.webm) / [phone after](final/interactions-390.webm)
- [Beginning](final-checks/hero-entry-mobile.jpg), [middle](final-checks/hero-middle-mobile.jpg) and [settled](final-checks/hero-settled-mobile.jpg) phone hero states.

The initial baseline recording attempt lacked Playwright's FFmpeg executable. After obtaining the encoder, both baseline recordings were captured successfully; [recording-report.json](baseline/recording-report.json) records no errors. The `revised/` directory is the first design-review pass; `final/` includes the corrected heading composition. The last CSS-only touch-scroll correction does not change those still compositions and is separately checked against the final production build.

## Checks actually run

`npm run generate`, `npm run build`, `npm run check`, `npm run test:browser`, `node scripts/extended-check.mjs`, and `node scripts/polish-check.mjs` were run, alongside both development and production previews. No dependencies were reinstalled for this polish pass.

- Four direct HTML routes; existing checks validate local references, deep links, exactly one H1/footer per route, six services and preview noindex.
- Widths 360, 390, 430, 768, 1024, 1440 and 1920; short laptop 1366×650; phone landscape 844×390; 200% zoom-equivalent reflow at 720×450 CSS pixels with device scale 2.
- Menu open/close, Escape/focus return; service tap versus navigation; active rows and arrow/Home/End navigation; direct service anchor, back navigation and enquiry preselection.
- Chrome CDP touch input verifies horizontal work-photo changes and vertical page scrolling; live orientation resize retains one canvas.
- Reduced motion, JavaScript disabled, scripts/fonts blocked, video failure, rejected autoplay, unsupported WebGL and context loss.
- Required/contact form validation plus intercepted delivery success/failure. No real client message was sent.
- Axe checks on four desktop pages and the phone work gallery; normal-route JavaScript/local request checks.

Final result: all listed suites pass. The production browser report contains 28 width/route combinations, four clear desktop axe scans, zero unexpected JavaScript errors and zero local request failures. The additional phone gallery axe scan and touch checks pass. The measured hero sample settled at 4.106 seconds after one playback attempt.

Machine-readable evidence: [browser report](../validation/browser-report.json), [failure/mocked-delivery report](../validation/extended-report.json), [polish checks](final-checks/report.json), and [capture report](final/capture-report.json).

These are Chrome desktop and touch-emulation tests. Physical phones, Safari/iOS, Firefox, native browser 200% zoom, assistive-technology user testing and deployed hosting were not verified. The zoom test verifies equivalent layout reflow and is not represented as native browser zoom. No Lighthouse score or real-user speed claim is made.

## Remaining launch decisions

Confirm the correct map, live enquiry-delivery configuration and production domain. The supplied map link remains unchanged in configuration because it resolved to a different business; the public page offers a call for directions. The form remains an email-draft flow, and preview indexing stays disabled. The existing [launch checklist](../LAUNCH-CHECKLIST.md) also records client media-licence, privacy wording and hosting decisions.
