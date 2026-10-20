# SEO and conversion improvements — review record

Prepared October 20, 2026. No production deployment is authorized in this phase.

## Baseline and audit

Implementation uses current GitHub `main` at `22f8e1245c139b074bb9ae7a0dc0d0aa33cc65bb`. The original workspace is older and has unrelated uncommitted changes; those were preserved. Changes live in the isolated `phase1-audit/seo-conversion-worktree` checkout on `codex/seo-conversion-phase1`.

The website is buildless static HTML with shared `styles.css` and `site.js`, published through GitHub Pages/Jekyll. There is no package manifest, build command, or existing test suite in current main. No dependencies were added. The existing portrait, navy/gold/white palette, fonts, components, forms and SEO infrastructure remain in use.

Inspected the English homepage, services, dedicated resume-writing page, resources, six articles, about, contact, privacy and thank-you pages; Russian homepage, services, resources and four articles; shared navigation, footer, scripts, sitemap and robots configuration. The live homepage and services were also fetched for comparison.

Findings and changes:

- The homepage hero emphasized international experience without immediately naming the service. It now identifies resume writing and career coaching and explicitly includes Canadian professionals and career changers. The main CTA goes to the existing resume-writing page; the secondary CTA retains Calendly.
- Two English homepage sections repeated the diagnostic journey. The later duplicate was removed; the early diagnostic entry remains, with a new newcomer entry before the pain-points section.
- A useful English newcomer service page was missing. Added `/canadian-resume-newcomers.html` and a complete Russian counterpart at `/ru/rezume-dlya-novichkov-v-kanade.html`. They explain titles, employers, credentials, international CV differences, transferable skills, posting-specific targeting, package selection and consultation scope. Examples are explicitly fictional and illustrative.
- Existing packages were verified against current main and the live service page: Career Clarity Session $149 CAD, Resume Strategy Package $349 CAD, Multi-Path Career Strategy $549 CAD, HST included. Their descriptions and inclusions are preserved. Package buttons now describe the visitor's intent, and explanatory copy distinguishes the free call from paid work.
- Package contact links preselect a package in the existing inquiry form using an allowlisted `service` parameter. Calendly's working destination is preserved without inventing package URLs or relying on unsupported booking parameters. `data-service` adds context to the existing consented click event; it does not send service selection to Calendly. Visitors are told to name their preferred service when booking.
- Current main already uses consistent English header/mobile labels, including Services, Resources and Free Resume Diagnostic. Russian navigation uses Услуги, Материалы and Диагностика резюме. Preserve these familiar labels. Standardized English diagnostic prose and retained all existing destinations. Footer service links target package anchors; Russian service anchors are now available. Added newcomer links in footers rather than crowding the main menu. Russian about/contact/privacy destinations remain English because Russian equivalents do not exist.
- New pages use unique titles/descriptions, self-canonicals, WebPage structured data, reciprocal en/ru/x-default hreflang, and language switchers. Existing structured data is retained. Sitemap dates changed only for modified pages; the new pages were added. `robots.txt` and verification files remain unchanged.
- Existing mobile menus have synchronized accessible state and Escape handling. New FAQ disclosures use native `details`/`summary`; no extra library is required. Responsive additions reuse the current hero and article styles. Browser checks and limits are recorded in `QA-RESULTS.md`.

## Analytics inventory and remaining access

Current main already has GA4 `G-TPT9151J9N`, loaded only after explicit consent on English pages. Russian pages intentionally remain untracked. No new tracking ID, verification token or credential was introduced. Existing automatic page views cover the homepage, service pages and new English landing page after consent. No manual page-view event was added.

Existing events are `diagnostic_click`, `booking_click` and `generate_lead`. The latter uses a short-lived session marker and a thank-you redirect; it confirms the redirect, not email delivery. This phase adds only `service_interest` to `booking_click`, with allowed values `career-clarity`, `resume-strategy`, `multi-path`, and `unspecified`. Event payloads exclude form fields, names, email addresses, messages, resumes and diagnostic answers. Links and forms continue working without consent or JavaScript.

The following require account access or a separate project:

1. GA4 access: inspect enhanced-measurement settings and existing key events; confirm page views and events in DebugView/Realtime after merge. Register `service_interest` as an event-scoped custom dimension if package reporting is needed. Review whether existing automatic outbound `click` events are used in reports; do not sum them with `booking_click` as separate conversions. Consider `generate_lead` a key event only after provider delivery is manually verified. No booking-rate improvement is claimed.
2. Calendly access: confirm a supported booking-completion integration for the account and its plan. An outbound click is not a completed appointment. For an external booking page, use an authorized integration or authenticated webhook with event IDs, cancellation handling, consent review and deduplication. Do not infer success from a click or create a public success URL that anyone can trigger. Test with an owner-approved appointment before enabling a completed-booking key event.
3. FormSubmit mailbox/provider access: verify activation, inbox delivery, spam handling and the production thank-you redirect. Automated tests intercept outgoing requests and do not send messages.
4. Search Console access: inspect indexing and canonical selection for the two new URLs after merge, submit the updated sitemap, establish query/page baselines, and compare qualified inquiries over a meaningful period. No ranking or traffic improvement is claimed.
5. Diagnostic repository access: the assessment code is absent from this repository. The separate implementation specification below is not an implemented feature.

## Diagnostic results implementation specification

Keep assessment scoring and interpretation unchanged. In the diagnostic project, locate the existing results renderer and map only existing, explicit result categories to optional next steps. Do not infer a score-to-service relationship without reviewing the actual assessment.

| Existing result finding | Suggested next step | Destination |
| --- | --- | --- |
| Career direction unclear | Review role options; optionally discuss Career Clarity | `https://hiremenowresumes.ca/services.html#career-clarity` |
| Target clear, resume positioning weak | Start with relevant self-help; optionally compare Resume Strategy | `https://hiremenowresumes.ca/services.html#resume-strategy` |
| Two distinct target directions | Explain why separate positioning may help; optionally compare Multi-Path | `https://hiremenowresumes.ca/services.html#multi-path` |
| No clear need for paid support or insufficient evidence | Offer a relevant article and explain the limitation | `https://hiremenowresumes.ca/resources.html` |

Show the finding that supports a recommendation in plain language. Provide a self-help route alongside any paid service suggestion. Avoid urgency, purchase gating or suggesting everyone needs a paid service. Link Russian results to matching `/ru/services.html` anchors where the diagnostic supports Russian. Include a brief explanation that the free fit call is separate from paid coaching and writing. Never place answers, uploaded resume data or personal identifiers in outbound URLs or analytics. Preserve result navigation and all existing assessment behavior.

Acceptance checks for that separate project: each real result category and mixed/unknown case renders appropriate guidance; no unconditional purchase recommendation; existing scoring tests pass unchanged; desktop/mobile and keyboard checks; only consented non-personal events; service links and language links resolve. This requires the actual repository and result taxonomy before implementation.

## Next phase

Review and merge this PR after the remaining manual checks. Submit the sitemap and establish consented measurement baselines. Publish two thoroughly edited articles per month using `CONTENT-ROADMAP.md`; adapt existing Russian resources rather than duplicating them. Implement diagnostic result recommendations only after reviewing its code. Prioritize qualified inquiries and completed consultations over traffic totals.
