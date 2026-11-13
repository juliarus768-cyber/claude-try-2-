# Service-click measurement fix — QA

## Scope

The existing three English content pages queue `service_click` and then navigate away in the same tab. Isolated tests using production snapshots and the real Google library reproduced an event lost during navigation while page views continued to work.

`site.js` now carries consented, fixed source/service identifiers and a timestamp in tab-scoped sessionStorage to either existing commercial destination. After tag readiness, the destination validates the identifiers, path and 30-second lifetime, consumes the marker and emits one interest event. Refresh cannot emit it again. Native navigation is neither intercepted nor delayed. The privacy paragraph describes this short-lived marker.

No new event, tracked language, content source or diagnostic instrumentation is added. Contact markup/handling, confirmation logic, page-view configuration, prices, booking destinations and SEO are unchanged.

## Verification

- Original isolated matrix: 20 Chromium cases at 375px passed, covering unset/accepted/rejected/saved consent, withdrawal, navigation page views, existing booking/diagnostic interest, all three service sources, simulated contact success/error states, storage/tag blockers and Russian exclusion.
- Desktop 1440px consent/page-view/navigation and service-interest cases passed.
- Final focused browser checks assert exactly one service event after navigation and refresh, an empty consumed marker and only the two fixed custom parameters. Contact success, invalid/direct/expired/future confirmation, provider failure, no consent, tag blocking and withdrawal are checked again.
- Eleven offline regression tests cover marker consumption/deduplication, all sources/destinations, expiry/allowlists, consent withdrawal before tag readiness, modified/new-tab links, blocked storage and contact safeguards.
- JavaScript syntax, 25-page structural/internal-link checks and `git diff --check` pass.

Run the portable offline regression tests:

```sh
node --test scripts/test-service-click.cjs
node --check site.js
python scripts/check-site.py
```

Browser tests used existing local production snapshots and a locally supplied Google tag library. Every browser network request was fulfilled locally or aborted, including Analytics collection and FormSubmit requests. No live traffic, inquiry, booking or diagnostic assessment was generated. Browser captures, downloaded libraries, account reports and investigation files are excluded from the PR.

Synthetic private email/message/resume sentinels were absent from intercepted Analytics payloads. The custom service event contains only `source_content` and `service_interest`; the lead event contains only `lead_source`. The tab marker contains fixed source, service, destination pathname and timestamp. No form contents enter it. Standard GA4 page/referrer/link URLs remain part of the existing implementation: personal data must not be placed in URLs.

## Limits and configuration recommendations

- This verifies browser event emission, not Google's live ingestion or email delivery. Physical iPhone Safari and Android testing remains manual; no Safari result is claimed.
- The service event is reported on the destination, with the originating article preserved as `source_content`. A blocked tag, departure before readiness, loading beyond 30 seconds or blocked storage can still lose an event. Blocked storage uses existing best-effort immediate tracking.
- `generate_lead` remains a redirect-confirmed, consented inquiry heuristic, not proof of mailbox delivery. Its existing one-hour/same-tab/storage constraints remain. Direct confirmation visits do not count without a pending marker; a manually opened confirmation URL after a pending attempt could mimic success.
- Keep `generate_lead` as a key event and booking/diagnostic/service clicks as interest. Generic form interactions are not provider-confirmed leads.
- Keep consent gating, Russian exclusion and the diagnostic unchanged. Monitor the existing collection warning against natural consenting traffic; do not generate test traffic or weaken consent to clear it. Updating the stream URL label to HTTPS is optional housekeeping, not a fix for visitor volume.

No merge, deployment or GA4 setting change is part of this PR.
