# English and Russian analytics coverage

PR #73 refinement, October 20, 2026. This is a technical audit of the repository and browser behavior. No tracking was added or enabled, and `site.js` is unchanged by the refinement.

## Current coverage

All 23 content pages load the shared script once; none embeds a separate Google Analytics tag. The verification HTML file is not a content page and does not load analytics.

| Pages | Current measurement | Consent controls |
| --- | --- | --- |
| 15 English pages, including the homepage, services, resume-writing page, newcomer page and contact/thank-you pages | Existing GA4 property `G-TPT9151J9N`, only after explicit acceptance | English accept/reject banner and footer preferences control |
| 8 Russian pages, including both new/existing landing pages and resources | No GA4 page views or custom events; the language guard exits before setup | No analytics banner or preferences control, because analytics is disabled |
| External Calendly and diagnostic | Separate hosts/applications; outside this shared script | Their own consent and privacy implementations need separate review |

English page views use the existing single GA configuration, with no manual duplicate page view. Existing custom events are `booking_click`, `diagnostic_click` and redirect-confirmed `generate_lead`. The last is not proof of email delivery; booking clicks are not completed appointments. Only package CTAs with an existing allowlisted `data-service` attribute provide package context. Other booking links retain `unspecified` context. The refinement does not broaden this tracking.

The consent preference is kept in same-origin localStorage under `hmn_analytics_consent_v1`. A choice made on an English page survives navigation to `/ru/`, but the Russian language guard still prevents analytics initialization and event dispatch. Returning to English honors the saved choice. Cookies created during an earlier accepted English visit can remain in the browser while viewing Russian pages; an absent Russian tag does not erase those cookies. The audit confirms no Google tag requests from Russian pages, not that the browser holds no prior cookies.

The current basic approach blocks the Google tag until acceptance, then queues the default-denied state before the analytics-only grant and configuration. Advertising storage, advertising user data and personalized advertising remain denied. This matches Google's documented distinction between basic and advanced consent mode; it does not intentionally send pre-consent cookieless measurement pings. See [Google's consent-mode documentation](https://developers.google.com/tag-platform/security/concepts/consent-mode).

## Can tracking extend to Russian pages?

Yes, technically, using the existing GA4 property and the same basic opt-in architecture. **It is not ready to enable by removing the language guard alone.** Russian readers currently have neither localized analytics controls nor a Russian privacy explanation, and the published English policy describes English-only tracking. Russian measurement remains disabled in this PR.

Before a separately reviewed extension:

1. Provide natural Russian consent copy explaining optional Google Analytics, cookies, purpose, and the effect of accepting or rejecting. Make accept and reject equally accessible and keep navigation, forms and booking usable when rejected. Provide a persistent Russian preferences control for changing the choice.
2. Provide a comprehensible Russian analytics/privacy notice and update the English policy's scope. Describe page and interaction measurement, Google as provider, cookies, withdrawal and relevant provider processing. Reuse the actual verified account practices; do not assert unverified retention, residency or deletion guarantees. Confirm the notices and proposed scope with the owner before enabling measurement.
3. Because the currently described scope is English-only, request a fresh explicit choice for the expanded bilingual scope using a versioned consent preference. Apply the same version and choice across both language paths on this origin. Do not silently interpret an old English-only acceptance as new consent to Russian measurement. Do not share this local preference with Calendly or the diagnostic subdomain by assumption.
4. Keep no tag requests, custom events or pending lead markers before consent or after rejection. Retain one configuration per page and the existing allowed service identifiers. Do not add a second GA script or manually duplicate page views. Page-path reporting can distinguish `/ru/` without a separate measurement ID or an inferred user-language profile.
5. Verify withdrawal, reload and all cross-tab transitions in both languages. The existing storage listener handles explicit `accepted`/`rejected` changes, but ignores removal of the key (`null`) and other values. Before extending it, define a conservative reset/invalid-state policy that stops further collection and requests a new choice; test key removal, invalid values and blocked storage rather than assuming they work. With blocked storage, the current choice is per-page only.
6. Keep names, email addresses, phone numbers, resume text, messages and diagnostic answers out of event payloads and URLs. Static public page titles are currently non-personal; the new form query parameter uses fixed service identifiers. GA also collects page URLs/titles, so custom-event allowlists alone do not prove that every account-side feature is safe. Review incoming query parameters, automatic form/search measurement and data-redaction settings. See [Google's PII guidance](https://support.google.com/analytics/answer/6366371).
7. Review actual GA4 data-retention, data-sharing, Google Signals, enhanced-measurement and consent settings with account access. Then verify real ingestion in DebugView/Realtime using non-personal test data and the consent matrix below. No account-side settings were changed or verified in this task.

These are implementation acceptance requirements. Production privacy compliance and the suitability of the notices for the actual audience still require the owner's review; the code audit alone cannot establish them.

## Verification performed without sending analytics

Google tag requests were intercepted and fulfilled with an empty script. The tests checked the site's request gating and queued commands; they did not send data to GA4 or validate Google ingestion.

- Fresh visitor: no tag or events before a choice; banner visible.
- Rejection: no tag; choice persists after reload.
- Acceptance: one configuration, default-denied command before analytics grant; advertising permissions remain denied.
- Withdrawal through footer preferences: choice saved as rejected, page reloads, and no new tag loads.
- Explicit acceptance/rejection in another same-origin tab: existing tab reloads and honors the new choice.
- Invalid stored preference at page load: treated as unset; no tag before a fresh choice.
- Blocked localStorage: no tag by default; explicit acceptance works for that page only; the next page requests consent again.
- Every Russian page with unset, accepted and rejected English preferences: no Google tag, GA function, custom analytics events or analytics UI.
- English → Russian → English: preference survives, Russian tracking remains absent, and returning English gets one configuration for that page.

No code change is needed to keep Russian pages untracked. A localized bilingual extension, real account configuration and successful-booking measurement remain separate work.
