> Latest refinement: [MEDIA-AND-UPLOAD.md](MEDIA-AND-UPLOAD.md) supersedes the photo, playback-control and upload-path details below. Previous evidence is retained as history.

# Current component update

The approved motion upgrade supersedes the short video and WebGL gallery settings below. Current source attribution, implementation changes and evidence are recorded in [MOTION-UPGRADE.md](MOTION-UPGRADE.md). All selected business media remain unchanged.

---

# Asset and implementation audit

Inspected 28 September 2026: supplied master brief; both ZIPs; existing extracted assets; asset README and manifest; Brickox Documentation/index.html; index, service, project, about and contact HTML; CSS; main.js, plugin.js and lenis.js. There was no existing website project, package.json, lockfile or edited source to replace. New work is isolated in `Website/shadreck-website`; both source archives and all originals are preserved. The template ZIP was extracted with path traversal checks to the separate `_source-review` folder. Every selected public media file is SHA-256 matched to the supplied asset ZIP (see asset-integrity.json).

## Brickox retained and removed

Retained/adapted: light header, wide constrained container, row/column editorial layout, generous media-led hero, split company introduction, compact service/project grids, breadcrumb-style internal introductions, contact/map columns and a substantial image-backed footer. The original grid semantics (`container`, `row`, `col-lg-6`) are implemented in the small scoped stylesheet instead of distributing the whole Bootstrap utility library. The approved brief intentionally supersedes Brickox's orange branding, timeline, oversized counters and demo pages.

`main.js` contains a blocking preloader, cloned sticky headers, legacy jQuery navigation and broad GSAP text selectors. `plugin.js` includes GSAP 3.13.0, ScrollTrigger and SplitText, which would duplicate the npm runtime. `lenis.js` adds another scroll runtime. None ships. Native scrolling, one sticky header, one npm-managed GSAP/plugin set, Motion only for BlurText and OGL only for WorkCarousel are used. No legacy selector mutates a React island. No Tailwind or reset was installed.

## Public media allocation

All paths below are relative to `public/assets/`. The full original manifest is internal documentation; excluded/reference files are absent from public and dist.

| Page/use | Asset(s) | Treatment |
|---|---|---|
| Header/favicon | brand/shadreck-logo-horizontal.png; shadreck-wing-mark.png | Original supplied images; no redrawing |
| Home hero | media/01-home/home-hero-earthmoving.mp4 + poster.webp | Poster first, one muted inline entrance; at most 4.4 seconds, then supplied poster |
| Home proof + work gallery | media/01-home/home-shadreck-branded-truck.webp | Prominent genuine truck; natural responsive crop |
| Home gallery + services | media/02-services/service-civil-works-poster.webp, service-sand-stone.webp, service-plot-clearing.webp, service-demolition.webp, service-bulk-earthworks-client.webp, service-machine-hire.webp | Six mapped services; bulk earthworks uses a high focal point to keep the machinery visible |
| Services hero | media/02-services/services-hero-quarry.mp4 + poster.webp | Illustrative industry video |
| Work hero | media/03-work-equipment/work-hero-earthmoving.mp4 + poster.webp | Illustrative industry video |
| Work gallery | media/03-work-equipment/work-shadreck-truck-01.webp, work-earthmoving-01.webp, work-materials-stone.webp + flagship truck above | Four truthful client-photo captions; no invented project names or fleet inventory |
| About hero | media/04-about-contact/about-hero-excavator-sunset.webp | Dark directional overlay; static photograph |
| Shared close | media/05-shared/global-cta-shadreck.webp | Wide excavator image; navy overlay, readable CTA, decorative SVG lettering |

Not selected: obstructed work-site-operation-01 / work-machine-01, truck-detail/about operation photo with prominent old printing, optional stock equipment gallery, duplicated CTA/earthworks photos, original brand JPG, originals, reference screenshots and every Exclude entry. The About story does not repeat an unsuitable vehicle crop. The actual flagship truck carries its supplied real lettering; no decal or text has been generated. Its visible upper telephone number matches the approved contact number.

The supplied MP4 derivatives are already compact: home 2,413,936 bytes; services 1,306,687; work 1,329,290. They are reused without generation loss or overwriting masters. Only the current page video is referenced; preload=none, poster first, source attachment gated by visibility/preferences. No unnecessary transcode is claimed. No new imagery or upscaling was performed.

## Official React Bits sources and licences

All six exact JS-CSS registry URLs from the brief were successfully retrieved directly from reactbits.dev on 2026-09-28. Initial sandbox/web-tool requests failed; an authorised network request succeeded. The manual materialisation route allowed by the brief was chosen to preserve plain CSS without shadcn/Tailwind reset configuration. Exact JSON files, file lists, listed dependency ranges, timestamps and URLs live in `vendor/react-bits-registry/`. Lockfile records the resolved dependencies. `llms.txt` and the official GitHub `LICENSE.md` were retrieved as reference. The licence is **MIT + Commons Clause**, not plain MIT; it permits use as part of a website but restricts component redistribution on its own. Applicable software notices are also shipped in `dist/third-party-notices.txt`.

| Effect | Placement | Production adaptation |
|---|---|---|
| FoldText | Home H1 only | Exact phrase; semantic H1; initial viewport trigger; 44–52px mobile / up to 112px desktop |
| SplitText | Home service heading; internal H1s | Correct tag; 22ms desktop / 18ms phone stagger, 0.6s duration; fonts awaited by vendor; selected headings only |
| BlurText | About statement only | Approved sentence, Manrope, no nested paragraphs |
| AccordionGallery | Home services, desktop and phones | Index 4, six genuine links and separate persistent six-service index; phone vertical tap-to-expand with separate Explore link |
| FlexCarousel | Work only, near viewport | Four supplied photos; 550px desktop / 360px phone container, cardHeight 0.82 / 0.72; restrained distortion, no autoplay, no vertical-wheel capture; native arrow controls plus buttons and photo-list mode |
| StrokeText | Shared decorative footer | Font readiness before mount; numeric 128 size; responsive SVG; aria-hidden parent; once per visit |

### Vendor patches

`scripts/patch-vendor.mjs` can rematerialise the exact saved snapshots and reapply these edits. Wrappers and presets are separate from the vendor files.

1. Accordion arrows now move actual keyboard focus along with the active index. Navigation/link semantics replace list roles that masked links. Unused remote demo items removed.
2. FlexCarousel stops its RAF on a hidden tab, guards hidden/offscreen frames and restarts on visibility. Its existing observers, listener removal, texture disposal and GPU context release remain. An `onFailure` callback restores the static view on unsupported WebGL2 or image failure. A wrapper captures WebGL context loss, unmounts the effect and restores real DOM images. Unused remote demo items removed.
3. BlurText's unused Tailwind-style class string replaced with equivalent inline display/will-change declarations; no Tailwind dependency introduced.
4. Scoped CSS overrides remove panel shadows, apply approved fonts/palette, restore strong focus outlines and set the bulk-earthworks focal point. Originals remain unchanged in registry JSON.

All islands run in React StrictMode during development and are protected by an error boundary. Failed imports retain authored static HTML. Reduced motion dynamically restores original HTML; ordinary phones retain both interactive galleries; WebGL failure and explicit photo-list selection use a scroll-snap DOM gallery. The live gallery's text description is exposed once; its visual captions are hidden from assistive technology, and its alternate photo list replaces the canvas instead of duplicating an accessible gallery.

StrokeText measures after the approved font is ready; its SVG viewBox scales on resize without remounting or replaying. Reduced motion uses the static completed word. No extra footer, second H1, continuous carousel drift or competing scroll engine is shipped.

## Known external decisions

Map discrepancy and endpoint/domain settings are documented separately in LAUNCH-CHECKLIST.md. No production credentials, origin, guessed map coordinates, policies, hours, testimonials or accreditation claims have been added. Google Fonts stylesheet uses only Barlow Semi Condensed 600/700 and Manrope 400/500/600 with display=swap; no font binaries are packaged.

## Focused polish patches (28 September 2026)

- AccordionGallery adds `selectionOnly` and `onActiveChange`. Phone panels are real buttons with expanded state, retain arrow-focus support, and select without navigating. The existing supported `orientation` API is used; six numbered captions and a separate destination action come from the wrapper.
- FlexCarousel adds `maxDpr`, applied both at renderer creation and resize (1.5 phone / 2 desktop, still subject to the source pixel budget). No new animation runtime or automatic drift was introduced. Its source pointer slop already distinguishes horizontal drag from vertical movement. A measured touch failure came from `overscroll-behavior: contain` on the clipped canvas container; scoped CSS overrides it to `auto`. CDP touch input then scrolled the page by 165px while horizontal input still changed the photograph.
- SplitText now renders authored newline boundaries as explicit `br` elements. The wrapper retains those boundaries instead of flattening headings into a single string. GSAP remains the sole animation owner.
- `scripts/patch-vendor.mjs` resets from the same retained official snapshots and reproduces these modifications. No components or dependencies were reinstalled.
- Footer template and footer styling retain their original composition. Its sourced StrokeText runs on ordinary phones as well as desktop; reduced motion keeps the finished static word.
