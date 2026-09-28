# Product and safety plan

## Product statement

Baby Steps is a private, two-caregiver PWA for noticing, recording, and sharing a baby's development over time. It should make today's time with the baby feel more useful and celebratory, not turn development into a pass/fail scorecard.

The primary action is: **record an observation or choose a small activity for today.**

## V1 outcome

On either parent's phone, a caregiver can:

1. See a short, age-appropriate "Today" set of activities.
2. Mark a milestone as **Observed**, **Emerging**, or **Not yet** and add an optional note.
3. See the same shared state on the other phone.
4. Review a chronological timeline of observations.

## The experience to build

### Home

Three calm, skimmable sections:

| Section | Job | V1 behaviour |
| --- | --- | --- |
| Today | Give the parents something positive and practical to do now. | Show 2–3 activity prompts from the current age window. |
| Milestones | Support low-friction developmental monitoring. | Group items by domain; show a labelled status control and an optional note. |
| Timeline | Preserve family memory and support doctor conversations. | Show recorded changes newest first, with date and caregiver attribution. |

### Milestone language and visual rules

- Use **"around this age"** and **"coming up"**, never "your baby should" or weekly pass/fail wording.
- Keep age windows as the underlying model. The UI can feel current and weekly, but each item belongs to an evidence-based checkpoint, not an invented week.
- Keep **age window** and **status** independent. An older, incomplete item remains recognisable without being treated as a failure.
- Age-window colour is only a secondary cue. Every item also has a written age label and status icon/text, so colour is never the only signal.
- `Observed`, `Emerging`, and `Not yet` are descriptive caregiver observations, not diagnoses or scores.
- Reserve red for a human-authored, non-diagnostic "Talk with your child's doctor" guidance state. Do not generate risk scores, alerts, or medical recommendations.

CDC describes milestones as things most children (75% or more) can do by a certain age and publishes checklists at age checkpoints such as 2, 4, 6, 9, and 12 months. Its checklists are for developmental monitoring and are not a substitute for validated developmental screening. [CDC milestone checklists](https://www.cdc.gov/act-early/resources/milestones-checklist-by-age.html) and [CDC monitoring and screening guidance](https://www.cdc.gov/act-early/about/developmental-monitoring-and-screening.html).

## Scope boundaries

### Include in V1

- One baby profile: nickname and birth date. V1 always calculates age from birth date.
- Curated milestones and short activity prompts from approved sources.
- Shared observation status, optional note, date, and caregiver name.
- Responsive mobile-first web app, installable as a PWA.
- A shared private access secret/PIN checked by the server.

### Explicitly defer

- Accounts, social sharing, grandparents, multiple families, and role management.
- Photos, video, push notifications, charts, AI advice, automated concern detection, and medical screening.
- A custom CMS/admin UI. The spreadsheet is the initial editorial interface.
- Multiple children. Design identifiers so this is possible later, but do not make it a V1 workflow.

## Content governance

1. Use CDC as the initial milestone source of record; record source URL, age checkpoint, and source-review date for every row.
2. Do not copy a full source dataset blindly. Before publishing, manually review wording, age grouping, and each activity prompt against the source.
3. Keep "Try this" prompts supportive and concrete, not prescriptive. They must be sourced or authored and clinically reviewed as appropriate; label authored content separately.
4. Put a short, persistent footer/link in the app: "This is a family observation tool, not a medical screening tool. If you have a concern, talk with your child's doctor."
5. The concern route should encourage sharing the recorded observations with a clinician, not make an interpretation. CDC likewise advises parents with concerns or missed milestones to talk with their child's doctor. [CDC: concerned about development](https://www.cdc.gov/act-early/families/concerned.html).

## Approved V1 decisions

- **Language:** English-only. Add another locale only after its content has been independently reviewed.
- **Age basis:** Calculate from birth date only. Do not offer corrected age in V1.
- **Content range:** Birth through 3 months. Do not add 4-month content until the family has reviewed the initial experience.
- **Caregiver labels:** Fixed as `Mum` and `Dad`.
- **Family access:** One shared, memorable family passphrase, validated by the server. Do not use a short numeric PIN.

The spreadsheet is now ready to create. Its schema and safe sharing model are in [02-data-and-spreadsheet-spec.md](02-data-and-spreadsheet-spec.md).
