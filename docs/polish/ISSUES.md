# Focused issue register

Baseline: fresh running-site capture on 28 September 2026, all four routes at 1440×900 and 390×844; actual Google Fonts loaded and no missing images. Files in baseline/. A timestamped local ZIP checkpoint preserves all prior source, build and documents. No repository exists to branch.

| # | Page / viewport | Observed issue | Cause / correction |
|---|---|---|---|
| 1 | Home, 390×844 | Tall covered portrait crop fragments the loading relationship; two boxed CTAs and player control compete with the title | Cover crop at 65% over a tall text-driven hero. Recompose mobile into a readable text zone above a wider machinery view, with a quieter secondary link. Keep the two-line headline. |
| 2 | Home / Services, desktop and phone | Repeated uniform service cards/index feel assembled; mobile services lose the interaction | Explicit desktop/hover gate and repetitive grid. Keep the sourced desktop accordion, adapt it to a touch selection accordion with separate destination action. Give Services one active large image and six semantic expanding rows. |
| 3 | Work, 390×844 | WebGL presentation disappears completely at narrow widths | Explicit min-width:768 gate. Remove width eligibility gate; retain source's horizontal drag / vertical-pan handling. Use phone-specific image sizing and a lower rendering resolution. |
| 4 | Work, 1440×900 | Caption, small count, instructional sentence and three boxed controls form disconnected rows below the photos | Wrapper/layout issue. Keep the major photographic moment; group caption, count and quiet arrows on one aligned rail. Keep a discreet real photo-list alternative. |
| 5 | About/Contact, both | Large pending-map card competes with the enquiry form, repeats the address and directs visitors to an unconfirmed map | Template hierarchy issue. Use a single contact/service-area column beside the form, concise truthful directions note and phone action. Preserve the original map link in configuration. |
| 6 | Shared mobile navigation | Plain utility button opens unanimated small links and pushes the whole page down | Disclosure layout. Build a brief animated dropdown with substantial links, clear Close action and enquiry/call options; preserve Escape/focus return and non-modal semantics. |
| 7 | Home proof / About story | Equal-weight split and fragmented date labels; About lacks an authentic photographic connection | Tighten the editorial hierarchy, use the existing truck at its natural aspect ratio and give the About story a related photo; preserve facts and paragraphs. |
| 8 | Video heroes, both | Visible player UI interrupts composition; hiding it would leave uncontrolled looping | Implement one attempted muted sequence, max 4.4 seconds from first playback, then settle on the deliberately chosen supplied poster. Stop permanently on hidden/offscreen/reduced-motion; no re-arming. |

Footer: baseline image, composition, SHADRECK word, draw/fill treatment and content are approved; no redesign planned. Existing typography, four routes, business facts, selected media and source dependencies remain the design constraints. Subjective hierarchy findings are design judgements supported by the captures, not claims that the former site was functionally broken.

## Resolution

All eight scoped corrections are implemented. Review found and corrected an authored heading line break lost by the enhancement wrapper. Touch verification additionally confirmed a vertical scroll blocker inherited from the gallery CSS; a scoped overscroll override fixed it. See REPORT.md for evidence and explicit test limits. Footer comparisons confirm the approved composition is retained.
