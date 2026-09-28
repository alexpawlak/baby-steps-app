# Data and spreadsheet specification

## Decision: create the sheet after plan approval, before implementation

The Google Sheet is created before a frontend is built. All V1 product decisions are approved, so this is the right moment because:

- the first content review can happen in a familiar, editable place;
- stable column IDs can drive the application without a later migration;
- no family observations or credentials need to be created while the product rules are still unsettled.

The sheet is an editorial data source, not the public application database. The browser must never receive Google service-account credentials.

## Workbook record

Created 2026-09-28 through the Google Drive connector, from an `.xlsx` converted to a Google Sheet.

| Item | Value |
| --- | --- |
| Name | `Baby Steps — family data` |
| Link | [Google Sheet](https://docs.google.com/spreadsheets/d/1E4hf36ZD0DIhstpUNtPW0DI2DCgl8SvGgzB40uimZ6w/edit) |
| File ID | `1E4hf36ZD0DIhstpUNtPW0DI2DCgl8SvGgzB40uimZ6w` |
| Owner | `alexpawlak@gmail.com` (My Drive root); no other permissions |
| `settings` | Headers plus one placeholder row: `baby_001`, `Placeholder`, `2026-08-01`, `Mum`, `Dad`, `en`, `Europe/Paris` |
| `milestones` | Headers only; seed content waits for approval of [04-initial-content-draft.md](04-initial-content-draft.md) |
| `observations` | Headers only; empty history |

Verified by reading the file back: ownership, privacy, three tabs, column headers, and the placeholder row. The header rows are bold and frozen.

Dropdowns were written into the `.xlsx` before conversion: `status`, `content_status`, `domain`, `age_colour_key`, `locale` / `content_locale`, and `Mum` / `Dad` labels. Their survival through the conversion has not been checked yet.

### Outstanding manual corrections (before entering content)

1. **`age_checkpoint_months` dropdown:** it was created as `0, 2`; change it to `2` only (Data → Data validation on `milestones!B2:B`).
2. **Protect column A in `settings` and `milestones` only** (Data → Protect sheets and ranges). Leave `observations` column A unprotected so the future server can write new observation IDs.
3. **Confirm the dropdowns:** tap a cell in each validated column to check the dropdown is present.

## Minimum workbook structure

Use one private workbook, for example `Baby Steps — family data`, with three tabs. Freeze the header row and use dropdown validation for enumerated fields. Protect the identifier columns in `settings` and `milestones`, but **do not protect the `observations` ID column**: the later server connection must write a new ID when it appends an observation.

### 1. `settings`

Exactly one populated row in V1.

| Column | Type | Notes |
| --- | --- | --- |
| `baby_id` | immutable text | Example: `baby_001`; enables a future migration. |
| `display_name` | text | Nickname only; avoid unnecessary identifying data. |
| `birth_date` | ISO date | Required. |
| `caregiver_1_name` | fixed text | `Mum` in V1. |
| `caregiver_2_name` | fixed text | `Dad` in V1. |
| `content_locale` | enum | `en` for V1; add another locale only after translated content is reviewed. |
| `timezone` | IANA zone | Default proposed: `Europe/Paris`. |

### 2. `milestones`

This is curated, versioned content. One row per milestone, never edited by the app.

| Column | Type | Notes |
| --- | --- | --- |
| `milestone_id` | immutable text | Example: `cdc_04m_social_01`. |
| `age_checkpoint_months` | integer | V1 source checkpoint: `2` only. Birth through 3 months is the product window, not a separate milestone checkpoint. |
| `age_window_label` | text | Example: `2–4 months`; display context, not a deadline. |
| `age_colour_key` | enum | `violet`, `blue`, `green`, `orange`; never status. |
| `domain` | enum | `social_emotional`, `language_communication`, `cognitive_learning`, `movement_physical`. Confirm exact taxonomy during curation. |
| `milestone_text` | text | Reviewed, parent-friendly wording. |
| `activity_text` | text | Optional "Try this" prompt. |
| `source_name` | text | Example: `CDC Learn the Signs. Act Early.` |
| `source_url` | URL | Direct authoritative source page. |
| `source_reviewed_on` | ISO date | Last manual verification. |
| `content_status` | enum | `draft`, `reviewed`, `published`, `retired`. Only `published` appears in the app. |
| `locale` | enum | `en` for V1. |

### 3. `observations`

Append one row every time a caregiver records a change. This creates the timeline and preserves history; the current status is the newest valid observation for each milestone.

| Column | Type | Notes |
| --- | --- | --- |
| `observation_id` | immutable text | Generated server-side. |
| `baby_id` | text | References `settings.baby_id`. |
| `milestone_id` | text | References `milestones.milestone_id`. |
| `status` | enum | `observed`, `emerging`, `not_yet`. |
| `observed_on` | ISO date | Defaults to today, editable for a remembered observation. |
| `note` | text, optional | Keep brief; no clinical interpretation. |
| `recorded_by` | text | One of the configured caregiver labels. |
| `created_at` | ISO timestamp | Server-generated audit field. |
| `supersedes_observation_id` | text, optional | Lets the app correct an entry without erasing history. |

## Read/write rules

| Actor | Can read | Can write |
| --- | --- | --- |
| Parent using the app | Curated milestones and this family's current/history observations, through the server endpoint | New observations and corrections, through the server endpoint |
| Parent editing the workbook | All three tabs | Settings and curated content; only manual corrections in observations |
| Netlify Function service account | This one workbook only | Append/update `observations` only |
| Browser | App response only | Never direct Google Sheets access |

The server should validate IDs, allowed statuses, date formats, note length, and the shared family passphrase before it writes. It should return only the fields the mobile client needs and should not log the passphrase or Google credentials.

## Access needed for the app connection

You do **not** need to share a Google password or copy credentials into chat. The workbook already exists in your Drive; once the service account exists, add its email to the workbook as an **Editor**.

For the app connection, we will later need these scoped actions:

- A Google Cloud project under your control with the Google Sheets API enabled.
- A dedicated service account restricted to this workbook; share only this workbook with its email address as Editor.
- Its credential stored only as a Netlify environment secret (or an equivalent server-side secret store), never committed or exposed to the PWA.
- Netlify site access only when it is time to deploy; no Netlify rights are needed for this planning stage.

## First spreadsheet review checklist

- [x] Workbook is private and owned by the family Google account.
- [x] `settings` has one test row using non-sensitive placeholder data, birth-date calculation, and fixed `Mum` / `Dad` labels.
- [ ] Every published milestone has an ID, direct source URL, review date, and approved locale.
- [ ] The `age_checkpoint_months` dropdown contains `2` only; do not create 0-month milestone rows.
- [ ] Dropdown validation exists for statuses and content state (created; confirm it survived conversion).
- [ ] Identifier columns in `settings` and `milestones` are protected; `observations` remains appendable for the future server write path.
- [ ] `observations` is append-only for normal app activity.
- [x] No service-account JSON or shared family passphrase is stored inside any cell.
