# Phase 2 conversion measurement

Uses the existing English-only GA4 consent architecture and existing measurement ID. No credentials, configuration tags, manual page views or Russian tracking were added. See `ANALYTICS-LANGUAGE-AUDIT.md` for Russian prerequisites.

## What the website can measure

| Journey | Event / reporting | Meaning and limits |
| --- | --- | --- |
| Either new article → service information | New `service_click`, from content links inside `main` only | Interest in service information, not a purchase or booking. Navigation/footer links are excluded from this event. |
| English newcomer page → service information | Same `service_click` | Separately identified source; no second event for the same click. |
| Website → diagnostic | Existing `diagnostic_click` | Outbound interest, not a completed diagnostic. |
| Website → Calendly | Existing `booking_click` | Outbound interest, not a confirmed appointment. |
| Valid contact form → thank-you redirect | Existing `generate_lead` with pending marker and expiry | Redirect-confirmed inquiry; mailbox delivery remains a provider/manual check. Direct thank-you visits or reloads do not create a new lead. |
| Completed consultation booking | Not implemented | Requires Calendly account access, supported integration and verified deduplication/cancellation behavior. Never count a click as completion. |
| Landing-page/article visits | Existing consented GA4 automatic page views | No new manual page-view event. Non-consenting visitors and Russian pages remain outside this measurement. |

`service_click` is emitted by the existing delegated listener, not a second listener per link. It uses the existing `track()` consent gate and checks same-origin service destinations. Source identifiers are restricted to `international_experience_article`, `foreign_titles_article`, and `newcomer_page`. `service_interest` is restricted to `career-clarity`, `resume-strategy`, `multi-path`, `resume_writing`, or `services_overview`. No arbitrary URL, hash, title, form text, resume data or diagnostic finding is included. All links remain functional without analytics or JavaScript.

The two new articles target `/services.html#resume-strategy` in their single editorial service CTA. The newcomer page's existing inline package links can identify different service interests. All booking/diagnostic behavior is retained. GA4 enhanced measurement may produce other event types depending on account configuration; never sum generic clicks, service interest and booking interest as if each were a distinct completed consultation.

## Account setup and manual validation

With authorized GA4 access, register event-scoped custom dimensions `source_content` and `service_interest` if reporting by these fields is needed. Inspect existing events/key events before adding any account-side definitions. Service and booking clicks are micro-conversions; report confirmed inquiries and appointments separately. Do not mark every interaction as a paid lead.

After an approved deployment, verify consented page views and one event per actual click in DebugView/Realtime. Test unset, rejected, accepted, withdrawn, blocked-storage and cross-language cases. Stubbed browser tests establish dispatch behavior, not ingestion by Google. Inspect enhanced-measurement, retention, consent and data-redaction settings as described in the language audit. No such account settings were changed here.

For completed bookings, verify the Calendly plan's supported integration or use an authorized server-side webhook. Agree event IDs, deduplication, cancellations/reschedules, minimal retained data and appropriate consent/privacy handling before implementation. Do not put client identifiers or contact details into public success URLs. This repository has no booking-completion endpoint or verified webhook integration.

Use Search Console for query/page indexing and impression baselines after publication. For content performance, compare article visits and `service_click` interest alongside qualified inquiries over a meaningful interval. Julia should define what makes an inquiry qualified and review that privately; do not send inquiry contents to GA4. Readers may return on another visit, so a click funnel does not prove causality. No traffic, ranking, conversion or revenue improvement is claimed.
