# Delivery plan

## Phase 0 — approve the product rules

This phase is complete. The family approved English-only content, birth-date age calculation, birth-through-3-month scope, fixed `Mum` / `Dad` labels, and one shared family passphrase.

**Exit evidence:** recorded in [01-product-and-safety-plan.md](01-product-and-safety-plan.md). No code, workbook, cloud project, or family data has been created.

## Phase 1 — create and review the content workbook

Create the private workbook exactly to [02-data-and-spreadsheet-spec.md](02-data-and-spreadsheet-spec.md). Populate only a small reviewed seed set for birth through 3 months, not a bulk-imported dataset. Verify the source links and activity wording together before any app consumes it.

**Exit evidence:** the checklist in the spreadsheet spec passes and the family has reviewed the visible content.

## Phase 2 — build a read-only prototype

Build the mobile-first PWA shell with placeholder data: Home, milestone detail/status control, and timeline. Confirm the age-window/status distinction, accessibility labels, install flow, and calm tone on both phones.

**Exit evidence:** the interface works locally with fixture data; no claim is made yet about Google Sheets sync, authentication, or deployment.

## Phase 3 — connect the private data path

Create a Google Cloud service account, share only the single workbook with it, and configure its credentials as server-side Netlify secrets. Add a small server endpoint that validates the shared secret/PIN and reads/writes the defined fields. Test concurrent updates from two devices.

**Exit evidence:** authenticated browser tests demonstrate that an observation written from one authorised session appears in the other. Verify that unauthorised requests are rejected and that browser bundles contain no Google credentials.

## Phase 4 — deploy and operate carefully

Deploy to Netlify, set production secrets, and test installation and data access on both actual phones. Keep a short recovery runbook: where the workbook is, who owns it, how to rotate the PIN, how to revoke the service account, and how to export the observations.

**Exit evidence:** the production URL, build SHA, two-phone read/write behaviour, and secret-free client bundle are individually verified. A successful build alone is not proof of any of those runtime properties.

## Acceptance criteria for V1

- The home screen presents 2–3 age-appropriate activities and a plain-language milestone summary.
- Both parents see the same current milestone state after a refresh.
- Every timeline entry records date, status, and caregiver label.
- An older `Not yet` milestone is visible with its age-window label, but does not display an automated warning or diagnosis.
- Milestone content shows its source provenance in the data model and follows the approved review policy.
- The app tells families it is not a screening or diagnostic tool and directs concerns to a clinician.

## Risks to resolve early

| Risk | Response |
| --- | --- |
| Milestone content feels like a judgement | Test the exact language and status visuals before adding the full dataset. |
| Source material changes | Store direct URL and review date per row; schedule periodic manual review. |
| Shared PIN is leaked | Keep it server-validated, rate-limit attempts, and document rotation. Move to real accounts only if the family scope expands. |
| Spreadsheet becomes inconsistent | Protect ID columns, validate dropdowns, use append-only observations, and have the server validate every write. |
| A colour-only cue excludes users | Pair every colour with text, icon, and accessible contrast. |
