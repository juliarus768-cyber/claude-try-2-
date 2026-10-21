# Phase 4 QA and access requirements

October 21, 2026. Base main `ab1777c`. This PR contains review documents only. No HTML, CSS, JavaScript, sitemap, configuration, package, image, booking integration or diagnostic source change is included. Reports remain under `docs/`, already excluded from the Jekyll publication configuration.

The supplied Excel export was compared read-only with all seven CSV tables; row/value comparisons passed after number/percentage normalization. No source workbook was changed.

## Completed checks

| Check | Result and scope |
| --- | --- |
| Direct live HTTP audit | All 25 content pages return 200; HTML matches main after line-ending normalization. robots.txt, sitemap.xml, site.js and styles.css also return 200 |
| Priority crawlability | All eight requested pages indexable by technical directives, self-canonical, sitemap-listed and internally linked. This does not confirm Google's indexing |
| Metadata and structure | 25 unique titles/descriptions; one H1/canonical per page; no duplicate IDs; reciprocal declared metadata hreflang; no heading-level skips found |
| Internal links/fragments | `python scripts/check-site.py` passes for all 25 pages, including all package fragments and new article/resource links |
| Sitemap | XML parses; 24 unique destinations exist. Intentional noindex thank-you page omitted; no date/content changes made |
| Structured data | JSON-LD parsing and existing article/canonical/author/date checks pass. Google overview shows three valid/zero invalid breadcrumb items. Full vocabulary/rich-result eligibility validation remains manual |
| Responsive/accessibility | **36 page/viewport checks, zero axe violations**, using axe-core 4.10.3 tags WCAG 2 A/AA, WCAG 2.1 AA and best practice. 12 pages at 375/768/1440px; no horizontal overflow, missing images or JavaScript errors |
| Keyboard behavior | Mobile navigation opens with Enter and closes with Escape, with aria-expanded synchronized. First native disclosure opens with Enter where present. This was not a full assistive-technology audit |
| Visual review | Reviewed captured mobile service layout and desktop ATS article, including packages, body copy, CTA placement and navigation. Navy/gold styling unchanged. Very long full-page mobile captures can contain stitching artifacts; viewport/DOM checks are the functional evidence |
| Analytics preservation | `site.js` is byte-for-byte unchanged from main. Browser layout/accessibility run with rejected preference emitted zero tracking requests. Existing consent regression passed across 17 English/eight Russian pages, including seven consent scenarios; nine service-event scenarios passed with no duplicate booking/diagnostic events. Google scripts were stubbed; no real analytics sent |
| Business facts | All prices, package inclusions, existing qualifications, testimonials and CTA destinations are unchanged because no production source files changed |
| Diagnostic | No diagnostic source/logic changed. The preceding October 21 production investigation verified commit `6338845`, deployment `39fbf4ab`, six sections plus all five optional choices with a successful invented-data assessment. Phase 4 does not deploy anything |
| Link destinations | Live internal destination URLs return 200; local fragments pass. October 21 diagnostic investigation rechecked all eight guidance destinations and Calendly event availability. No form was submitted or appointment created by Phase 4 |

The 12 responsive/a11y pages are `/`, services, resume-writing, both newcomer pages, ATS, both new international-experience articles, About, Contact, Russian homepage and Russian services. No remaining automated violations were found in these tested page states. This is not a WCAG certification, full W3C HTML validation, physical-device test or proof of audible screen-reader behavior.

Evidence is retained locally in `phase1-audit/phase4-evidence/`: `technical-audit.json`, `browser-qa.json`, raw downloaded CSVs, headers/HTML and six screenshots. These raw files and private exports are not published in this PR. Local audit runners are `phase4-audit.py` (curl-based live crawl), `phase4-browser-qa.cjs` (local server on port 5210, existing Playwright/Chrome and axe), and copies of the existing consent/service-event audits with only evidence output paths changed. No testing dependencies were added to the website.

## Search Console completion boundary

The authenticated URL-prefix property was available and the requested performance export was obtained. Its overview was read. Chrome then disconnected; the following are **pending**, not silently treated as passed:

1. ATS **page-filtered** queries and query/page mapping for commercial/About pages. Sitewide queries do not establish which searches reached ATS.
2. URL Inspection status, crawl dates and Google-selected canonical for all eight priority URLs.
3. The four excluded-page reasons/URLs, discovered-but-not-indexed examples, sitemap processing and report update dates.
4. A controlled Canada/device search-results comparison for the actual ATS queries, once known. Generic topic searches are not that comparison.

No indexing requests, sitemap submissions, property verification or account changes were performed. Missing performance rows are not proof of exclusion.

## GA4, booking and business-account work

- Review actual GA4 ingestion, enhanced measurement, data redaction, retention/sharing and key-event definitions with owner access. Existing script tests cannot prove account settings or collected data quality. No new analytics event or account change is included.
- English tracking requires explicit acceptance. Russian pages remain outside GA4. The existing [language/consent audit](ANALYTICS-LANGUAGE-AUDIT.md) describes the localized notice, fresh consent and implementation review needed before extending scope. Do not remove its language guard or assume diagnostic/Calendly shares consent.
- Consent edge cases already documented in the previous audit remain relevant: removing/invalidating a preference in another tab is not fully handled as a conservative reset. No consent extension is proposed here. Any fix requires a focused review; this PR does not claim all possible consent scenarios pass.
- Owner verifies mailbox activation/delivery and Calendly booking/confirmation/attendance without sending client data into public reports. A clicked link or thank-you redirect does not establish successful delivery or paid acquisition.
- Julia approves each recipient-specific outreach, profile/listing change, post, partnership or spend. Verify actual CPC membership/directory entry, LinkedIn/Facebook admin rights, community policies and available capacity first. Do not publish client-identifying records in this repo.
- Recheck physical mobile devices and screen-reader audio before claiming full accessibility coverage. No Core Web Vitals field data was available in the GSC overview.

No Phase 4 merge, deployment, listing creation, outreach, social publication, paid subscription or new tracking occurred.
