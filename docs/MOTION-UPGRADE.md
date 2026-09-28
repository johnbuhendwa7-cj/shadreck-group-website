> Latest refinement: [MEDIA-AND-UPLOAD.md](MEDIA-AND-UPLOAD.md) supersedes the photo, playback-control and upload-path details below. Previous evidence is retained as history.

# Approved motion and gallery upgrade

Implemented in the existing four-page Vite/React website on 28 September 2026. The checkpoint is `Website/checkpoints/before-motion-upgrade-20260928-122217.zip`. Prior source/build deliverables remain intact. Nothing was deployed and no live enquiry was sent.

## What changed

- **ScrollFloat** now animates selected below-fold headings as visitors scroll. **ScrollReveal** animates selected introductions and descriptions. Whole words and authored line breaks are preserved; descriptive text retains readable contrast throughout the reveal. Hero FoldText and footer StrokeText keep their established roles.
- **Services** uses the supplied Aceternity Animated Testimonials pattern as a service showcase: a substantial layered photograph, animated service copy, six named selectors and previous/next controls. Desktop images are 590px tall; phone images are 340px tall. On phones the selectors sit above the image and the active selection stays in view. No fabricated testimonials, people or remote demo photos are used.
- **Work & Equipment** replaces the WebGL distortion with large Apple-style photo cards. The cards move gently after a 2.5-second reading interval while at least half the gallery is visible. Movement pauses on hover, focus, touch interaction, an open photo dialog, hidden tabs and offscreen state. The pause/play button gives explicit control. Touch and wheel interaction stop automatic movement until the visitor chooses Play.
- **Expanded photographs** use native modal dialogs, full-image framing, useful service-related descriptions and enquiry links. Escape closes the dialog, focus returns to its card, and document scrolling is restored.
- **Work-page content** now explains the site, scope and equipment information useful for an enquiry. The asset-provenance explanations and the rejected “A family business. A personal approach.” caption were removed from the public website.
- **Video heroes loop again**, with muted inline playback and discreet pause/play controls. They stop offscreen or in hidden tabs. Explicit pause is remembered per video for the current browser session, including back navigation; reduced motion uses the poster. Blocked autoplay is not repeatedly forced. The mobile hero footage blends into the navy text area without the hard horizontal seam found in review.
- **Navigation details:** consistent SVG arrows, a proper back-to-top arrow, and the requested linked “Powered by Dotcom Africa.” footer credit. The approved footer photograph, enquiry composition and large SHADRECK treatment are preserved.

## Screenshots and recordings

All captures are from the actual local production preview with the approved fonts loaded. Viewport screenshots show sections after scrolling into them; recordings show the scroll-driven transitions and interactive galleries. They are stored outside `dist/`.

| View | Desktop | Phone |
|---|---|---|
| Homepage opening | [1440px](motion-upgrade/index-hero-1440.jpg) | [390px](motion-upgrade/index-hero-390.jpg) |
| Company introduction | [1440px](motion-upgrade/home-proof-1440.jpg) | [390px](motion-upgrade/home-proof-390.jpg) |
| Services showcase | [1440px](motion-upgrade/services-showcase-1440.jpg) | [390px](motion-upgrade/services-showcase-390.jpg) |
| Selected service | [1440px](motion-upgrade/services-selected-1440.jpg) | [390px](motion-upgrade/services-selected-390.jpg) |
| Work gallery | [1440px](motion-upgrade/work-gallery-1440.jpg) | [390px](motion-upgrade/work-gallery-390.jpg) |
| Expanded photograph | [1440px](motion-upgrade/work-dialog-1440.jpg) | [390px](motion-upgrade/work-dialog-390.jpg) |
| New project-planning content | [1440px](motion-upgrade/work-planning-1440.jpg) | [390px](motion-upgrade/work-planning-390.jpg) |
| About story | [1440px](motion-upgrade/about-story-1440.jpg) | [390px](motion-upgrade/about-story-390.jpg) |
| Preserved footer | [1440px](motion-upgrade/index-footer-1440.jpg) | [390px](motion-upgrade/index-footer-390.jpg) |

[Complete footer animation](motion-upgrade/footer-motion-390.webm) · [Desktop walkthrough](motion-upgrade/walkthrough-1440.webm) · [Phone walkthrough](motion-upgrade/walkthrough-390.webm) · [Phone footer credit](motion-upgrade/footer-credit-390.jpg) · [320px opening](motion-upgrade/home-final-320.jpg)

Before this upgrade: [Services](polish/final/services-1440-middle.jpg), [Work gallery](polish/final/work-equipment-1440-middle.jpg), and [phone opening](polish/final/index-390-hero.jpg).

## Implementation and sources

No framework migration or dependency installation was needed. GSAP and Motion were already installed. Next.js image helpers, TypeScript-only types, Tailwind classes and Tabler icons in the supplied examples were adapted to native images, the existing JavaScript/scoped-CSS architecture and small SVG icons.

- React Bits ScrollFloat: source supplied in the approved conversation; integrated in `src/components/react-bits/ScrollFloat.jsx` and its CSS. Scoped character selectors, whole-word groups, semantic H2 output, a single accessible text representation, and GSAP context cleanup replace the original unscoped lifecycle.
- React Bits ScrollReveal: the attached source is retained internally in `vendor/client-supplied/ScrollReveal-source.md`. The integration uses valid paragraph markup and scoped GSAP context cleanup, so unmounting one instance cannot kill other page animations. Initial text opacity/colour was adjusted after the contrast audit.
- Aceternity [Animated Testimonials](https://ui.aceternity.com/components/animated-testimonials) supplied-source pattern is adapted in `ServiceShowcase.jsx` with deterministic image angles and real service data.
- Aceternity [Apple Cards Carousel](https://ui.aceternity.com/components/apple-cards-carousel) supplied-source pattern is adapted in `AppleCardsCarousel.jsx`; browser-native scrolling and dialogs provide touch, focus containment and full-image viewing. The related [Aceternity licence](https://ui.aceternity.com/licence) and source attribution are retained in the software notices. These are site-specific integrations, not a standalone component library for resale.

The old FlexCarousel/WorkCarousel source is retained for history but is not imported or shipped in the new production bundle. No WebGL gallery or OGL runtime is loaded by the site. The original six-component vendor rematerialisation script does not overwrite the two new React Bits files.

Authoring locations: `templates/pages.js`, `templates/partials/shared.js`, `src/styles/motion-upgrade.css`, `src/entries/enhancements.jsx`, `src/components/shadreck/`, and `src/data/work.js`. Generated HTML must continue to be rebuilt from templates.

## Verification

Executed: `npm run build`, `npm run check`, `npm run test:browser`, `node scripts/motion-check.mjs`, `node scripts/extended-check.mjs`, `node scripts/motion-final-check.mjs`, `node scripts/motion-edge-check.mjs`, and the screenshot/recording capture scripts.

**Result:** all listed checks pass. Four desktop axe scans and the additional phone/modal scans report no detected violations; normal-page tests report no unexpected JavaScript errors or local request failures. The final build contains 47 production files.

The browser suite checks all four direct routes at 360, 390, 430, 768, 1024, 1440 and 1920px, plus a short laptop viewport. Additional checks cover 320px, 200% zoom-equivalent reflow, phone service navigation, touch gestures, native modal focus/Escape behavior, loop/pause/resume, explicit pause on back navigation, and the Dotcom Africa link. Four desktop axe scans and the phone service/dialog scans are included. Normal-page JavaScript and local request failures are checked.

Failure checks cover JavaScript disabled, blocked scripts/fonts, failed video, failed carousel import, reduced motion, and intercepted enquiry-delivery success/failure. Static HTML retains all six service descriptions and four work photographs with enquiry links. No live client message is used for testing.

Evidence: [browser report](validation/browser-report.json), [motion interactions](motion-upgrade/interaction-report.json), [final narrow-phone/back-navigation checks](motion-upgrade/final-check-report.json), [failure/mocked-form report](validation/extended-report.json), and [capture report](motion-upgrade/capture-report.json), and [loop rollover / carousel boundaries](motion-upgrade/edge-report.json).

These are installed-Chrome and touch-emulation checks, not physical-phone, Safari/iOS, Firefox or screen-reader user tests. The zoom check is equivalent layout reflow, not native browser zoom. No universal browser or real-user performance score is claimed.

## Launch status

The production domain, correct map and live enquiry-delivery configuration remain unresolved. The form prepares an email draft, the map link remains preserved in configuration, and preview indexing stays disabled. See [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md). The deployable artifact is `dist/` only; documentation, recordings, registry sources and project files stay outside it.
