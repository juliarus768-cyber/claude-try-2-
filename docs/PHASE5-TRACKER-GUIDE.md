# Lightweight acquisition tracker

Use the [blank CSV template](PHASE5-CLIENT-ACQUISITION-TEMPLATE.csv) only if Julia does not already have a suitable inquiry/booking ledger. No existing client system was accessed or replaced. If one exists, map these fields into that record instead of maintaining a second tracker.

**Save a working copy in Julia's restricted business storage before entering real information. Never fill in or commit this repository template with real lead/client data.** It contains only headers and no invented leads, metrics, formulas or sample revenue. Excel can open the CSV directly; use an existing approved spreadsheet tool if preferred.

## One row per actual inquiry

Add a row when someone actually inquires about help. A website click, social reaction, follower or anonymous diagnostic run is not a lead row. Give the inquiry a non-identifying internal ID such as `L001`; keep contact details in the existing private contact system, not in this template. Update the same inquiry as its outcome changes. Do not add another row just because the same person books a call or replies through another channel.

| Column | Entry rule |
| --- | --- |
| `lead_id` | Unique internal inquiry reference, not a person's name/email/phone |
| `inquiry_date` | Date first actual inquiry was received, `YYYY-MM-DD` |
| `lead_source` | Source voluntarily reported or reliably known: e.g. LinkedIn post 1, LinkedIn profile, Facebook English, Facebook Russian, CPC directory, TRIEC introduction, Google Search, existing referral. Use `Unknown` when unconfirmed |
| `requested_service` | Reader's stated need: resume writing, career direction, two directions, LinkedIn, interview preparation, other or undecided. Do not infer need from an automated score |
| `initial_inquiry_received` | `Yes` for a real inquiry. Do not enter clicks here. A saved empty preparation row is not an inquiry |
| `introductory_call_booked` | `Yes`, `No` or blank if unknown; verify against actual booking record |
| `call_attended` | `Yes`, `No` or blank if not yet known. A booking/booking click does not establish attendance |
| `qualified_prospect` | `Yes`, `No` or blank until assessed. Define fit with Julia: an actual offered-service need, relevant Canadian target, understanding of paid scope and interest in discussing it. No health, religion, immigration-status or other sensitive inference |
| `paid_client` | `Yes` only once a payment is actually received and work is accepted; otherwise `No` or blank if unknown. A consultation or proposal is not a paid client |
| `package_purchased` | Agreed actual package/service, not a prediction. Examples are Career Clarity Session, Resume Strategy Package, Multi-Path Career Strategy, or another verified service. Leave blank before purchase |
| `revenue_received_cad_optional` | Optional numeric CAD amount actually received for that inquiry under Julia's consistent bookkeeping convention. Blank = not recorded/unknown, not zero. Do not copy list prices in as actual revenue. Avoid counting the same receipt twice |
| `follow_up_status` | Short operational status only: Awaiting reply, Call scheduled, Proposal sent, Follow-up due, Closed—paid, Closed—no fit, or No follow-up requested. No resume text or sensitive notes |

Revenue here is an optional acquisition-management amount, not a replacement for bookkeeping/tax records. Use the same amount convention across rows. Further payments update the same amount rather than duplicate a lead; reconcile with existing records. Track package prices on the authoritative website, not by embedding a price schedule in this template.

## Five-minute weekly review

Filter by the same `inquiry_date` window and `lead_source`. Count actual inquiries, booked calls, attended calls, qualified prospects and paid clients separately. Treat blank statuses as unknown, not No. Do not claim a channel's conversion rate from website clicks or impressions.

For a qualified-attended-call count, a row must have **call_attended = Yes AND qualified_prospect = Yes**. An eventual paying client may not need an introductory call, so do not force every row through all stages or manufacture an attended call. Retain unqualified inquiries in the record rather than deleting them to improve percentages.

With sufficient data, compare paid clients with actual inquiries for the same cohort. If the denominator is zero, report “not available.” Small counts should be shown as counts. Allow time for recent inquiries to mature before comparing channels. Sum optional recorded revenue only for real receipts and disclose missing amounts; a blank total is not evidence of zero sales.

No resume text, medical details, immigration status, personal contact information or narrative client history belongs in this tracker. Do not put lead IDs or personal details in public URLs or analytics parameters. No new tracking, synchronization, CRM account, integration or recurring automation was created.
