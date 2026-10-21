# Commercial service pages, internal links and consultation journey

October 21, 2026. Reviewed current main and live HTML; no page changes proposed without an identified gap. The previous phases already added useful commercial information. Preserve the division of purpose below rather than create competing pages.

## Service intent and optimization plan

| Existing page | Primary job | Verified strengths | Next evidence / limited improvement candidate |
| --- | --- | --- | --- |
| Homepage | Introduce resume writing and career coaching in Toronto/GTA and online across Canada | Geographic title, Canadian-market H1, near-top qualifications, newcomer route, packages and introductory call | Keep title stable; inspect query-to-page mapping for local service phrases before any snippet experiment |
| `resume-writing-services.html` | Explain targeted document-writing support | Audience, process, role relevance, FAQs, two writing packages and remote delivery; title includes Toronto | Primary candidate for professional/local writing intent; inspect index/canonical first. A contextual link from the newcomer audience paragraph to the newcomer guide could help readers; current link is in footer. Do not add a second Toronto writing page |
| `services.html` | Compare paid support and verified inclusions/policies | $149 Career Clarity, $349 Resume Strategy, $549 Multi-Path; HST-inclusive pricing, payment/revisions/cancellation details; linked package anchors | Keep broad comparison role. Its H1 is broad, but title/intro/content already explain services. Review with commercial query evidence before replacing the H1 or expanding keyword repetition |
| `canadian-resume-newcomers.html` | Explain international experience in Canadian applications | Targeted audience, accurate international-experience FAQ, process and qualification context; articles and package routes | Monitor new-page indexing; avoid another internationally-trained-professionals page covering the same intent |
| `ru/rezume-dlya-novichkov-v-kanade.html` | Russian-language newcomer entry | Russian content, reciprocal English alternate, Russian service route | Preserve natural Russian wording and separate language path; no Russian GA4 until consent/privacy extension is separately approved |
| `about.html` | Establish Julia's credibility | Existing CPC/CRS qualifications, personal approach and service/contact navigation | 244 historical impressions at position 16.34 do not prove a title problem. Export its queries and check Google-selected canonical before a snippet test |

Existing standard package prices and inclusions remain authoritative. The $149 session offers review/direction rather than document writing. The $349 package supports one agreed target; the $549 package supports two agreed directions. The existing services page owns the detailed inclusions and terms; no new service facts, delivery times, locations, testimonials or awards are introduced here.

The site already explains problems, audiences, process, pricing, qualifications and how to begin. No broad rewrite is warranted. A contact inquiry or free 15-minute introductory call starts a discussion of fit; it is not a purchase or delivery of paid writing/coaching. Do not imply that the free call includes a rewritten resume or full coaching session. Preserve existing contact/Calendly wiring.

## Verified linking review

The technical inventory counts distinct source pages linking to a destination, including navigation/footer links. These are **not** contextual-link counts or Google backlink counts. Requested URLs all have incoming links; no orphan was found. Local link/fragment verification passes across all 25 content pages.

| Journey | Existing connection verified | Judgment |
| --- | --- | --- |
| Homepage → resume-writing → writing packages | Homepage body links to resume-writing; its package section links to services/booking | Complete; avoid another promotional button |
| Homepage → newcomer page | Existing targeted newcomer section and footer link | Complete |
| Newcomer page → international-experience / foreign-title articles | Both articles linked in useful reading context | Complete |
| Articles → paid package | Both new articles have a single contextual Resume Strategy package link | Complete; destination fragment exists |
| ATS → writing support / related articles | Resume-writing, resume-strategy, career-clarity and both new articles linked | Already strong; no extra CTA justified |
| Resources → articles and commercial navigation | Article entries and normal service/navigation links present | Complete; preserve clear informational purpose |
| Services → resume-writing | Existing contextual links describe document support | Complete |
| Resume-writing → newcomer guidance | Newcomer destination appears in footer, not the audience paragraph | Low-priority contextual candidate: link the existing newcomer audience phrase; one link, no new button. Not implemented to avoid marginal churn before indexing/query evidence |
| Newcomer English ↔ Russian | Reciprocal metadata alternates and visible language links | Complete |
| Writing page → Russian services | Navigation links to related Russian service overview, with no fabricated translated writing-page alternate | Acceptable related-language navigation; do not assert an exact hreflang counterpart |
| Diagnostic → optional resources / services / call | Approved five-choice UI deployed separately as `6338845` / `39fbf4ab`; live synthetic result and every option verified in preceding investigation on October 21 | Preserve; diagnostic repo/API is outside this PR |
| Package → inquiry / introductory booking | Three service-prefill contact destinations, Calendly and contact links verified | Working destination is not proof of actual email delivery or appointment confirmation |

Examples of high-value paths already available: international-experience article → Resume Strategy details → free introductory call; newcomer guide → role-title article → package comparison; diagnostic → self-help resources or optional paid support, based on the visitor's own selection. Self-help remains a legitimate endpoint, not a failed conversion.

## Remaining conversion friction and decisions

1. **Unknown lead quality:** Search Console clicks cannot establish consultations or paid clients. Use Julia's restricted inquiry/booking records to record source, service need, Canadian target market, attended call, suitability and paid outcome. Do not publish client details or resumes in analytics/this repo.
2. **Event meaning:** English `service_click`, `booking_click`, `diagnostic_click` and redirect-confirmed `generate_lead` already exist after consent. Clicks and redirects are micro-conversions, not verified bookings or revenue. Diagnostic is a separate host; do not assume cross-domain measurement or shared consent.
3. **Email delivery:** contact form navigation and provider wiring can be checked locally; actual mailbox delivery/activation requires Julia's oversight. Do not send an unapproved test inquiry.
4. **Booking fulfillment:** Calendly event and available dates were verified during the October 21 production investigation. Successful booking, reminder delivery and attendance remain business-account checks. No appointment was created.
5. **Intake expectations:** preserve “free 15-minute introductory call” wording and optional written inquiry. If actual inquiries reveal confusion, prepare one small explanatory sentence near the relevant CTA; validate with Julia before claiming any conversion effect.
6. **Capacity and economics:** Julia should define available paid-work capacity and which prospects suit each package before increasing acquisition activity. No conversion-rate or revenue target is invented here.

No internal links, CTA destinations, pricing, packages or booking integrations were changed in Phase 4. Proposed link additions are explicitly deferred, not reported as implemented improvements.
