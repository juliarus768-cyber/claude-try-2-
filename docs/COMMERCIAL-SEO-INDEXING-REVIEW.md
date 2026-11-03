# Commercial SEO and indexing review — November 2, 2026

Status: reviewed and tested on `codex/commercial-seo-indexing`, based on main `0316d8280da9e96523e1cfd5821d3236f960cfbb`. Approved sitemap-report cleanup completed November 3, 2026. No deployment, merge or indexing request performed; deployment remains explicitly on hold. The functioning FormSubmit implementation is unchanged. The separate Cloudflare/Zoho replacement remains an undeployed fallback on `codex/lead-generation-repair`; none of that code is included here.

## 1. Current indexing evidence

Read from the authorized URL-prefix property `https://hiremenowresumes.ca/` on November 2, after reviewing Phase 5, Phase 6 and the lead-generation audit. These are current URL Inspection results, not deductions from historical impressions. Times are as displayed by Search Console.

| URL | Current Google Index record | Current live test | Canonicals |
| --- | --- | --- | --- |
| `/services.html` | Not indexed: **Discovered – currently not indexed**. Last crawl, fetch and canonical fields N/A. Sitemap detected; referring pages include homepage, About and Russian services. | Nov 2, 7:18:12 PM: Google Inspection Tool smartphone; crawl allowed **Yes**, fetch **Successful**, indexing allowed **Yes**. URL available to Google; page can be indexed. | Live user-declared canonical matches the exact HTTPS URL. Google-selected canonical only determined after indexing. |
| `/resume-writing-services.html` | Not indexed: **URL is unknown to Google**. No referring sitemap/page detected in that record; last crawl and canonical fields N/A. This differs from the earlier November 2 audit and is reported as observed. | Nov 2, 7:19:46 PM: smartphone inspection; crawl allowed **Yes**, fetch **Successful**, indexing allowed **Yes**. URL available to Google; page can be indexed. | Live user-declared canonical matches the exact HTTPS URL. Google-selected canonical only determined after indexing. |

**Confirmed:** neither index record reports a production indexing crawl; both pass Google's current live fetch/indexability test. Both return HTTP 200 without a redirect at their canonical URLs; robots.txt allows crawling, meta robots is `index, follow`, and no blocking X-Robots-Tag was found. Both are in the live XML sitemap and have working homepage/navigation/footer links. A live inspection fetch is not an indexing crawl, and eligibility is not actual indexing.

**Unknown:** Google's internal scheduling/selection reason, whether/when either URL will be indexed, and whether quality, overlap, external reputation or crawl prioritization influences that decision. The resume page's missing discovery fields do not prove its actual links or sitemap entry are absent. N/A in an uncrawled index record does not mean the live canonical is missing. No evidence supports blaming the contact form, assuming a Google-selected competing canonical, or claiming a robots block.

## 2. Verified sitemap-report errors

Before cleanup, Search Console listed these three submitted entries (November 2 inspection):

| Submitted path | Last read | Status | Discovered pages |
| --- | --- | --- | ---: |
| `/sitemap.xml` | Nov 1, 2026 | **Success** | 24 |
| `/services.html` | Oct 30, 2026 | **Sitemap is HTML**, one instance | 0 |
| `/international-work-experience-canadian-resume.html` | Oct 30, 2026 | **Sitemap is HTML**, one instance | 0 |

The two HTML pages were submitted October 22 as if they were XML sitemap documents. Their report errors are real; they are not page-fetch failures. The correct XML contains both commercial URLs and all 24 expected content URLs. It was processed after the latest published changes, so another sitemap submission is not currently necessary.

**Completed November 3 with Julia's explicit approval:** removed only the two mistaken **submitted sitemap report entries**. The report now contains exactly one entry, `/sitemap.xml`, still marked **Success**, last read November 1, with **24** discovered pages. Both actual HTML pages and the XML sitemap were then independently fetched and still return HTTP 200 at their original URLs. No page was deleted, blocked or submitted to Google's URL Removals tool. No indexing request, new sitemap submission or deployment was performed. Evidence: `submitted-sitemaps-after.png` and `sitemap-cleanup-completed.json` in local evidence. The erroneous submissions are not proven to cause non-indexing, and their cleanup is not a claim of successful indexing.

## 3. Commercial intent and content review

Source: owner's November 2 Search Console export, `https___hiremenowresumes.ca_-Performance-on-Search-2026-11-02.xlsx`, Web (text-based), Chart dates August 1–October 31. It is a historical whole-property export, not a page-by-query report or keyword-volume tool.

| Exported query | Clicks | Impressions | Average position |
| --- | ---: | ---: | ---: |
| resume writing toronto | 0 | 4 | 31.00 |
| resume writing services near me | 0 | 4 | 8.50 |
| professional resume writers | 0 | 3 | 21.00 |
| resume writing services | 0 | 3 | 27.67 |
| resume writing | 1 | 1 | 1.00 |

These samples support relevance, not a reliable demand estimate or CTR diagnosis. The single-impression row is not evidence of stable first-place ranking. No exact exported row establishes volume for the requested Toronto coaching, Canada service or LinkedIn-writing phrases; absence from this site's visible query rows does not mean no market demand. Query rows cover only 8 of 38 chart clicks and 661 of 1,337 chart impressions, so they cannot classify all traffic by intent. Do not treat Search Console clicks as inquiries or sales.

The homepage already names resume writing/career coaching in its title/H1 and Toronto/GTA/Canada in visible copy. Its title and service-page titles remain descriptive and geographically relevant. The resume page has a distinct document-development purpose; services compares packages, specialized services and policies. Shared package facts are intentional, not evidence of a duplicate-page indexing exclusion. Both contain substantive service, inclusion, pricing and process information. No exact duplicate or verified thin-content defect was established.

Both pages are server-delivered static HTML, with content and crawlable links available without JavaScript. The homepage directly links to the resume page in its hero and service content; the navigation links to the service catalogue. Source link auditing confirms the commercial pages are not orphaned. Breadcrumb JSON-LD is valid, and Google live tests detect one valid Breadcrumb item on each page. Existing organization/service markup and verified prices do not warrant speculative schema expansion, invented location addresses or rating markup.

## 4. Targeted changes prepared

- `services.html`: include comparison, specialized/additional support, policies, FAQs and final CTA inside the single main landmark. Previously main closed immediately after the three packages. Update its accessible label to Career services. This is a verified semantic/accessibility correction; Google could already read the later body content, so it is **not** represented as an indexing unblock.
- `services.html`: change the vague H1 to **Resume writing and career coaching services**, making the paid offer explicit. Clarify the hero booking label to **Book a Free 15-Minute Intro Call**, matching the existing package CTAs. The booking URL is identical.
- `sitemap.xml`: update only services.html's lastmod to November 2 to match its actual candidate changes. All URL entries and other dates are unchanged.
- This report records evidence, limits, validation and release steps. No homepage/resume-page metadata rewrite was justified by the small samples. No additional articles, location pages, schema, redirects, analytics or design changes were introduced.

History: July baseline `48b1121` already had the vague services H1 and early main closing; October 15 `22f8e124` already had the current commercial titles/self-canonicals. The resume page was introduced before the reported October 19 incident. These facts do not establish a last-known successful inquiry date, but do show the landmark/H1 issue is not a new October 19 regression. No rollback is warranted.

## 5. Verification

- **24/24** current sitemap pages: HTTP 200, no deployed/main content mismatch. Both canonical commercial URLs respond directly; tested HTTP variants and www services URL redirect once via 301 to the intended HTTPS/non-www URL.
- Existing **25-page** structural/SEO tests pass: internal links/fragments, H1s, metadata, JSON-LD, sitemap destinations and bilingual hreflang checks.
- Existing browser suite: **36 page/viewport checks** at 375, 768 and 1440px; no tested axe violations, horizontal overflow, broken images or page JS errors. Keyboard mobile-menu behavior passes. This is not a universal screen-reader certification.
- Focused before/after checks at those three widths: package prices, all other paragraphs/inclusions, H2/H3 text, every link destination, section widths and computed backgrounds unchanged. All service sections are now in main; footer stays outside. Keyboard FAQ Enter/toggle behavior and booking-link focus pass. Mobile/desktop hero screenshots visually reviewed.
- Existing contact tests pass for unset/rejected/accepted consent, blocked storage and JavaScript disabled, with provider requests intercepted. **Zero live inquiries/analytics transmissions** in this task. Contact HTML, site.js, privacy, CAPTCHA configuration, GA4 tracking, all Russian files and diagnostic integration remain byte-for-byte identical to main.
- Public Calendly destination loads and displays **15 min**. No booking was made. The owner's latest real-phone test independently confirms fast live contact submission and email notification in about two minutes; this audit did not repeat it.

Raw evidence and screenshots are retained in the excluded local commercial-seo-evidence folder. No credentials, unrelated mailbox data or raw personal information are included in this branch.

## 6. Approval and Search Console follow-up

Source changes are ready for review; **do not merge or deploy without Julia's approval**. After an approved release, verify the live services H1, complete main landmark, original contact/booking destinations and the updated sitemap lastmod. Keep the existing FormSubmit form and undeployed fallback as instructed.

The approved sitemap-report cleanup is complete; retain the sole successful XML entry and recheck its next read rather than submitting duplicate sitemap URLs. For services.html, Phase 6 recorded a failed October 22 request; verify that no later request was accepted, then consider **one** Request Indexing after the changed page passes its live test. For resume-writing, the October 22 request was accepted: do not duplicate it merely because its current record says unknown. Check again around **November 9** and **November 16**, recording actual index status, indexing crawl time and Google-selected canonical. These are review dates, not promised indexing dates. If unchanged, review the evidence and page usefulness instead of repeating requests daily.

Google explicitly states that crawl requests do not guarantee inclusion and repeated requests do not accelerate crawling. [Google recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [Page indexing explanations](https://support.google.com/webmasters/answer/7440203), [Descriptive title guidance](https://developers.google.com/search/docs/appearance/title-link).

## 7. Three priorities for the next 30 days

1. **Week 1: monitor the two commercial URLs after the completed sitemap cleanup.** Approve the small release if desired; use the above single-request rules. Maintain a weekly record of eligibility versus actual indexing/canonical selection.
2. **Weeks 1–3: improve qualified discovery through existing assets.** Keep the indexed homepage's Toronto/Canada positioning and direct resume-service path. Use existing resume/newcomer/LinkedIn guidance in relevant owner-controlled marketing/referral channels, pointing readers to the most suitable paid service or the free introductory call. Verify the business's existing Google Business Profile eligibility/details before considering changes; do not invent a storefront or create doorway pages. No outbound posting/account edits are included in this task.
3. **Weeks 2–4: measure qualified inquiries alongside search data.** Compare equal periods after a real crawl/index change, separating commercial versus informational and branded queries where visible, plus Canada/mobile performance. Review actual inquiry quality, bookings and paid clients alongside existing consent-based events; do not change GA4 or count every click as a lead. With low volumes, prioritize useful patterns and confirmed outcomes rather than percentage swings.

Expected benefit: clearer service recognition, a more complete main landmark and an unambiguous introductory-call action. Indexing could broaden eligibility for relevant searches if Google chooses these pages. Ranking, search volume, inquiry increases and paid-client growth cannot be guaranteed, and these small edits alone are not a traffic forecast.
