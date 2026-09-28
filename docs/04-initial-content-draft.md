# Initial content draft — birth through 3 months

## Status and use

**Review required. Do not paste this into the `milestones` sheet yet.**

This is a deliberately small, English-only seed for V1. The authoritative milestone checkpoint is **2 months**. The product may be used from birth, but it must not imply that a newborn is expected to meet the 2-month items. Until the baby is in the 2-month window, the home screen should show only the supportive activity prompts below, under **Things to do together**, not a checklist.

Source reviewed: 2026-09-28. Source: [CDC — Milestones by 2 Months](https://www.cdc.gov/act-early/milestones/2-months.html). CDC describes these as things most babies can do by 2 months; they are for developmental monitoring and do not replace validated screening.

## Proposed milestone rows

For the first data review, use these fields in the `milestones` tab: `milestone_id`, `age_checkpoint_months`, `age_window_label`, `age_colour_key`, `domain`, `milestone_text`, `activity_text`, `source_name`, `source_url`, `source_reviewed_on`, `content_status`, `locale`.

**Organized by age checkpoint (next to validate on top):**

### Around 2 months

| `milestone_id` | Domain | Parent-facing text | `activity_text` to pair | Status | Timing |
| --- | --- | --- | --- | --- | --- |
| `cdc_02m_social_01` | `social_emotional` | Calms when spoken to or picked up |  | `reviewed` | On track |
| `cdc_02m_social_02` | `social_emotional` | Looks at your face |  | `reviewed` | On track |
| `cdc_02m_social_03` | `social_emotional` | Seems happy when you come close |  | `reviewed` | On track |
| `cdc_02m_social_04` | `social_emotional` | Smiles when you talk or smile | Talk, read, or sing together for a few minutes. | `reviewed` | On track |
| `cdc_02m_language_01` | `language_communication` | Makes sounds other than crying | When your baby makes a sound, smile and answer back. Then pause for their response. | `reviewed` | On track |
| `cdc_02m_language_02` | `language_communication` | Reacts to loud sounds |  | `reviewed` | On track |
| `cdc_02m_cognitive_01` | `cognitive_learning` | Watches you as you move |  | `reviewed` | On track |
| `cdc_02m_cognitive_02` | `cognitive_learning` | Looks at a toy for several seconds | Look at a bright picture or familiar face together and describe what you see. | `reviewed` | On track |
| `cdc_02m_movement_01` | `movement_physical` | Holds head up during tummy time | Try supervised tummy time while your baby is awake, with something interesting at eye level. If sleepy, place baby on their back in a safe sleep space. | `reviewed` | On track |
| `cdc_02m_movement_02` | `movement_physical` | Moves both arms and both legs |  | `reviewed` | On track |
| `cdc_02m_movement_03` | `movement_physical` | Opens hands briefly |  | `reviewed` | On track |

For all rows: `age_checkpoint_months = 2`, `age_window_label = Around 2 months`, `age_colour_key = violet`, `source_name = CDC Learn the Signs. Act Early.`, `source_url = https://www.cdc.gov/act-early/milestones/2-months.html`, `source_reviewed_on = 2026-09-28`, and `locale = en`.

**Timing logic:** As you add more age checkpoints, the app will show upcoming milestones sorted youngest-first. The timing column indicates whether a baby's current age is before ("Early"), within ("On track"), or after ("Late") the window for that checkpoint—helping parents know which milestone set is next to watch for.

The app can select two or three non-empty `activity_text` values for the Home screen. Before the 2-month checkpoint, show these as **Things to do together**, not as tests or missing milestones.

## Review gate before publishing

- [ ] Confirm that the wording feels supportive and not like a scorecard.
- [ ] Confirm the app uses `Around 2 months`, not `should by 2 months`.
- [ ] Confirm new users see activity prompts before the 2-month checkpoint, not a missing-milestone list.
- [ ] Confirm the concern link says to talk with the child's doctor and does not provide diagnoses or risk scores.
- [ ] Change all `content_status` values to `published` only after this review.
