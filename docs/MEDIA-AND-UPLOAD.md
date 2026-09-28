# Media and upload refinement

The client-provided replacement truck image is used on Home, About and the Work gallery through the shared media reference. Its original 1536 × 1024 PNG is retained in `vendor/client-supplied/media/home-shadreck-branded-truck-hd.png`; its full-resolution web copy is `public/assets/media/01-home/home-shadreck-branded-truck-hd.webp`.

Two soft site photographs received AI-assisted clarity/color enhancement using the built-in image-generation tool. These are enhanced derivatives, not untouched documentary originals. The original photographs remain in `vendor/client-supplied/media` and the source asset archive. Outputs:

- `public/assets/media/03-work-equipment/work-earthmoving-enhanced.webp` — also used for Bulk Earthworks.
- `public/assets/media/03-work-equipment/work-tipper-enhanced.webp`.

The original generated PNGs are retained beside the client source PNG. The three new web images total 1,823,420 bytes, down from 8,501,532 bytes of PNGs, with all pixel dimensions retained. Existing stock photographs are already 1600–2048 pixels wide; no synthetic replacement was needed for them. The stone photo was already clear enough at its rendered size.

## Enhancement prompts

Built-in tool, earthmoving photograph: "Edit target: the supplied portrait photograph of a yellow excavator loading a red tipper on the actual earthworks site. Photo restoration / clarity enhancement only. Preserve exactly the camera viewpoint, full original composition, aspect ratio, machinery shapes, wheel/track counts, positions, logos, readable markings, earth piles, distant buildings, trees and sky. Do not invent, add, remove, replace or rearrange any objects or lettering. Gently reduce haze and compression softness, correct the warm/green cast toward natural daylight, and recover clean realistic edge definition without halos or artificial textures. Keep realistic weathering, dirt, and photographic character. Output a high resolution faithful enhanced version of this same photo, portrait, at least the original resolution. No cropping, no reframing, no creative reimagining, no new content."

Built-in tool, tipper photograph: "Photo restoration / clarity enhancement only. Edit the supplied actual portrait photograph of a red tipper lorry standing on an earthworks site. Preserve the original full framing and portrait aspect ratio, exact same vehicle, cab and trailer shapes, number and placement of wheels, weathering, markings, ground, trenches, shadows, distant hills, fences, buildings and sky. Do not add, remove, replace, reimagine, move or invent objects or text. Correct the excessive yellow-green color cast toward natural daylight and gently reduce compression artifacts and softness. Increase clarity with realistic restrained sharpening and natural detail, no halo edges or synthetic texture. Keep the original red paint and all identifiable details. Output a high resolution faithful enhanced copy of this same photograph, portrait, no crop and no reframing."

## Display and motion

Truck figures use their natural 3:2 ratio. Service frames follow the selected photograph's proportions with a full-image fit and bounded height. Work cards retain the photo-card carousel, with portrait widths matched to the media and a complete landscape truck image on phones. Active Home service panels show the complete image. Mobile hero videos/posters use full-width media proportions instead of narrow portrait crops. The decorative footer background also fits fully on phones.

Visible video/gallery pause buttons are removed as requested. Videos loop while in view, pause offscreen/in hidden tabs and respect reduced motion. The gallery pauses on hover, focus and touch; after interaction it waits before resuming. Photo dialogs and previous/next arrows remain.

## Upload structure

The main `Website` folder is the generated upload output. All source, archives and development tools moved to sibling `Website-Source`. `npm run build` refreshes `Website` automatically after a successful build. The upload script checks paths and unexpected files before modifying output. Relative URLs support root or subfolder hosting. Stable asset filenames and optional Apache cache revalidation support repeated folder uploads.

See the workspace's `FILEZILLA-UPLOAD.md` for the exact FileZilla paths and update workflow. Old ZIPs are historical snapshots; they are not the current upload package.

## Verification evidence

Current screenshots and the responsive/media report are in [media-refinement](media-refinement/). The standard regression report remains in [validation/browser-report.json](validation/browser-report.json). These are Chrome viewport/emulation checks, not a claim to have tested every physical device or hosting configuration. The remote mrbrand page could not be verified; no deployment or remote deletion was performed.

Results: build/link checks pass; 24 route/viewport cases from 320–1920px pass; standard browser regression passes with zero console/request errors and zero axe findings on all four desktop pages; four additional mobile axe scans pass. All three videos loop through their endpoints. Upload verification confirms all 47 files match the build and all four routes load at the root and both nested paths.
