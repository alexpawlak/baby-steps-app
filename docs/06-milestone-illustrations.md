# Milestone illustrations

One small illustration per milestone, all in one style. Generate them with any image model (Google Antigravity / Gemini "Nano Banana", or similar), then drop the files into `public/milestones/` and set `image` on each milestone in `src/data.ts`.

## File spec

| Item | Value |
| --- | --- |
| Generate at | 1024 × 1024, square (1:1) |
| Ship as | WebP, 512 × 512, quality ~80 (about 25–50 KB each) |
| File name | `public/milestones/<milestone id>.webp`, e.g. `cdc_02m_social_04.webp` |
| Shown at | 64 × 64 CSS px in the card (512 px is enough for retina and a later larger view) |

Convert with: `cwebp -q 80 -resize 512 512 in.png -o <id>.webp` (or Squoosh.app).

## Keeping the style consistent

1. Generate the **style anchor** first (prompt below) and pick the best one.
2. For every other image, attach the anchor as a reference image and start the prompt with: *"Same style, palette, and baby character as the reference image."*
3. Generate in one session, one domain at a time. Reject anything with text, extra fingers, or an unsafe scene.

## Base style prompt (prepend to every image)

> Soft, flat editorial illustration with a subtle paper-grain texture, like gouache cut-paper. Warm cream background (#F6F0E6). Limited palette: deep green (#213D32), coral (#E26E4F), warm sand (#D8C59B), sunny yellow (#F0C962), soft sage (#B8D5B5), pale sky blue (#C0D9E8). Rounded, simple shapes, no outlines, gentle shading. One small baby with a round head, a tuft of dark hair, and simple dot eyes, wearing a plain cream onesie. Adults shown only as hands, arms, or a partial face, never fully. Calm, tender mood. Centered composition with generous empty space so it reads at thumbnail size. No text, no letters, no logos, no frames.

**Safety rules for every scene:** tummy time always has an adult hand or face nearby; any sleeping baby lies on their back on a flat surface with no pillows, blankets, or toys; no small objects near the mouth.

## Style anchor

> [Base style] A newborn lying on their back on a sand-coloured mat, looking up and gripping an adult's finger.

## Per-milestone scenes

| Milestone id | Scene (append after the base style) |
| --- | --- |
| nb_reflex_rooting | Newborn in an adult's arms turning their head toward a fingertip touching their cheek. |
| nb_reflex_sucking | Close-up of a newborn contentedly sucking, cradled against a coral-sleeved arm. |
| nb_reflex_grasp | Tiny baby hand wrapped tightly around one adult finger, close-up. |
| nb_reflex_startle | Newborn on their back with arms flung wide and fingers spread, small motion lines. |
| nb_reflex_stepping | Adult hands holding a newborn upright, baby's feet touching a mat mid-"step". |
| nb_reflex_fencing | Newborn on their back, head turned to one side, that arm stretched out, the other bent by the head. |
| cdc_02m_movement_02 | Newborn on their back kicking both legs and waving both arms. |
| nb_language_cry | Newborn crying with a small open mouth, an adult hand reaching in gently. |
| cdc_02m_language_02 | Newborn with wide eyes and startled arms, a yellow sound burst in the corner. |
| nb_social_face | Newborn held close, gazing at an adult's partial smiling face very near. |
| nb_movement_tummy_turn | Newborn on their tummy on an adult's chest, head turned to one side. |
| nb_cognitive_contrast | Newborn on their back staring at a bold black-and-white striped card held above. |
| nb_social_voice | Newborn turning toward a speaking adult face at the edge, soft sound curves. |
| nb_movement_hands_mouth | Newborn with a fist raised near their mouth and eyes. |
| cdc_02m_social_01 | Crying baby calming in skin-to-skin contact on an adult's chest. |
| cdc_02m_social_02 | Baby looking steadily up at an adult face, eyes connected. |
| nb_movement_head_lift | Baby on tummy lifting head just off the mat, adult hand nearby. |
| nb_cognitive_follow | Baby's eyes tracking a coral ball moving in an arc, dotted path. |
| cdc_02m_movement_03 | Baby's hand opening from a fist, fingers spread. |
| cdc_02m_cognitive_01 | Baby on their back watching an adult walk past, head following. |
| cdc_02m_social_04 | Baby giving a big first smile to an adult's smiling face. |
| cdc_02m_social_03 | Baby wriggling happily as an adult leans in, arms and legs moving. |
| cdc_02m_movement_01 | Baby on tummy holding head up, looking at a yellow toy at eye level, adult nearby. |
| cdc_02m_language_01 | Baby making a small "O" mouth, with a soft coral speech curve (no letters). |
| cdc_02m_cognitive_02 | Baby gazing at a colourful rattle held in front of them. |
| lincs_03m_feet_weight | Adult hands holding a baby upright, baby's feet pressing flat on a mat, legs slightly bearing weight. |
| cdc_04m_language_coo | Baby cooing with round mouth, two soft sound curves (no letters). |
| cdc_04m_language_reply | Adult and baby face to face, alternating soft speech curves between them. |
| cdc_04m_language_voice | Baby lying down turning head toward an adult speaking from the side. |
| cdc_04m_social_smile | Baby smiling up unprompted at an adult who is looking elsewhere. |
| cdc_04m_cognitive_hands | Baby on their back holding their hands up and studying them. |
| cdc_04m_cognitive_feed | Hungry baby opening mouth wide at the sight of a bottle held nearby. |
| cdc_04m_movement_hold | Baby's hand holding a small sage-green rattle. |
| lincs_03m_hands_together | Baby on their back with hands clasped together over their chest. |
| cdc_04m_movement_head_steady | Baby held upright on an adult's shoulder, head steady, looking around. |
| cdc_04m_movement_swing | Baby on a play mat swiping an arm at a hanging soft toy. |
| cdc_04m_social_chuckle | Baby laughing while an adult blows a raspberry on their tummy. |
| cdc_04m_social_attention | Baby reaching and cooing toward an adult to get their attention. |
| cdc_04m_movement_forearms | Baby on tummy propped up on forearms, chest lifted, adult nearby. |
