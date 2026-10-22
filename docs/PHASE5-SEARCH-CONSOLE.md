# Phase 5 Search Console findings

Read October 21, 2026 from the authorized **URL-prefix property `https://hiremenowresumes.ca/`**. These are actual URL Inspection and Sitemaps results, not deductions from missing impressions. Dates/times below are recorded as displayed; the UI did not show a timezone. Raw inspection snapshots and the downloaded export are retained locally outside the published repository.

## Priority URL inspections

| URL path | Google indexing result | Google-selected canonical | Last crawl | Sitemap discovery / exclusion detail |
| --- | --- | --- | --- | --- |
| `/` | Indexed; URL is on Google | Inspected URL (`https://hiremenowresumes.ca/`) | Oct 18, 2026, 3:02:31 PM | `https://hiremenowresumes.ca/sitemap.xml`; smartphone Googlebot, crawl allowed, successful fetch, indexing allowed |
| `/services.html` | Not indexed: **Discovered – currently not indexed** | N/A | N/A | Sitemap known; referring pages include About and homepage. Crawl/fetch/indexing-allowed fields N/A, not a reported robots block |
| `/resume-writing-services.html` | Not indexed: **Discovered – currently not indexed** | N/A | N/A | Sitemap known; no referring page detected in this report. The live page has internal links; report absence is not proof of no links |
| `/canadian-resume-newcomers.html` | Not indexed: **URL is unknown to Google** | N/A | N/A | No referring sitemap/page reported; report notes the URL might be known from other unreported sources |
| `/ru/rezume-dlya-novichkov-v-kanade.html` | Not indexed: **URL is unknown to Google** | N/A | N/A | No referring sitemap/page reported |
| `/international-work-experience-canadian-resume.html` | Not indexed: **URL is unknown to Google** | N/A | N/A | No referring sitemap/page reported |
| `/explain-foreign-job-titles-canadian-resume.html` | Not indexed: **URL is unknown to Google** | N/A | N/A | No referring sitemap/page reported |
| `/ats-resume-tips-canadian-job-seekers.html` | Indexed; URL is on Google | Inspected URL (`https://hiremenowresumes.ca/ats-resume-tips-canadian-job-seekers.html`) | Sep 27, 2026, 3:34:07 AM | Sitemap known; smartphone Googlebot, crawl allowed, successful fetch, indexing allowed |

For the two indexed URLs, Google's user-declared canonical field is the same inspected HTTPS URL. For the six unindexed URLs, Google's user-declared canonical field also displays **N/A** because no crawl information is reported. The live HTML's self-canonical is a separate technical observation; do not fill Google's N/A fields with that value or interpret N/A as a canonical error.

These eight inspections complete the priority-URL research that was blocked in Phase 4. They do not enumerate every URL in the site's Page Indexing report or establish why Google has not scheduled a crawl.

## Sitemap processing

The submitted `/sitemap.xml` row shows:

- Submitted: **June 5, 2026**.
- Last read: **October 13, 2026**.
- Status: **Success**.
- Discovered pages: **20**; videos: 0.

The live XML fetched in this phase contains **24** unique content URLs, including the four new landing/article URLs. The intentional noindex thank-you URL is omitted. Google's last reported sitemap read predates the October 20 changes, so its count of 20 is not evidence that the current XML is missing four URLs. The unknown-URL results are consistent with that reporting/crawl timing, but the timing does not prove the sole cause of Google's scheduling decisions.

## Corrective actions warranted

1. Prioritize discovery/crawling of the existing service and new pages. No verified HTTP, robots, canonical or sitemap syntax defect requires a source edit. The same-day Phase 4 crawl and structural checks passed; current sitemap and marketing destinations were rechecked in Phase 5.
2. Julia can use **Test Live URL** on an important eligible URL, confirm fetch/indexability, then consider one indexing request through the owner account. For `/services.html` and resume-writing, this is more useful than changing titles solely because historical impressions are absent. Requests do not guarantee indexing; do not submit repeated requests or invent an indexing timeline.
3. Keep the existing sitemap URL. Recheck last-read/discovered count after Google processes it; if the owner chooses to resubmit it once, use the same correct URL rather than duplicate sitemap entries. A new sitemap implementation is not needed.
4. Keep the already working homepage/newcomer/article/package links. If a live test later reveals a real fetch or canonical defect, fix that exact issue in a separately reviewed change. Monitor Google-selected canonical after the first reported crawl.

**No live-test request, indexing request, sitemap submission, removal request, canonical change or account configuration was performed in this phase.** Only existing reports were read. The account-side actions above are owner follow-up, not reported as completed corrections.

## Exact ATS page-filtered performance export

Filter: **Page → Exact URL → `https://hiremenowresumes.ca/ats-resume-tips-canadian-job-seekers.html`**. Search type: Web (text-based). Dates: **July 20–October 19, 2026**, as shown on the chart. All four metrics were enabled. No country, device or query filter was added.

Downloaded `https___hiremenowresumes.ca_-Performance-on-Search-2026-10-21 (1).zip`. SHA256: `e10e137523ed1217475effcc61f00889291e0f71c91489849dbb1ad050aad252`. The included Filters CSV records the exact page URL and Last 3 months. This is a different export from the sitewide Phase 4 workbook. The complete non-identifying query table is included as [PHASE5-ATS-QUERIES.csv](PHASE5-ATS-QUERIES.csv), preserving all 34 exported rows and their metrics.

Page totals: **0 clicks, 258 impressions, 0% CTR, average position 16.64** (UI rounded to 16.6). Visible query rows sum to **224 impressions/0 clicks**. The remaining 34 impressions have no visible query row; do not assign them an intent or assume they belong to a particular query.

| Actual ATS query | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| contact info in resume | 0 | 22 | 0% | 9.82 |
| good resume titles | 0 | 19 | 0% | 13.32 |
| help with resume wording | 0 | 17 | 0% | 18.29 |
| a good resume title | 0 | 16 | 0% | 19.06 |
| how should a resume look | 0 | 16 | 0% | 23.81 |
| resume for customer service jobs | 0 | 16 | 0% | 27.88 |
| it support resumes | 0 | 14 | 0% | 24.50 |
| what a resume should look like | 0 | 13 | 0% | 14.00 |
| good resume title | 0 | 12 | 0% | 21.08 |
| what is ats resume | 0 | 10 | 0% | 17.00 |

## Interpretation and small-change decision

- **Indexing is not the ATS page's primary issue:** it is indexed with the expected Google-selected canonical. This differs from the service/new-page findings.
- **Intent:** visible queries concern practical resume content, titles, wording, layout, role examples and ATS definitions. They are mostly informational. The small skills-section-service query is mixed intent; it does not establish purchase demand or justify a new page.
- **Position is a material constraint:** query rows with an average position above 10 account for 175 of 224 visible impressions (78.1%). This groups query averages, not individual search-result positions, and cannot prove a fixed rank. It makes zero clicks less diagnostic of a bad snippet.
- **Snippet-specific evidence is weak:** the leading contact-info query has only 22 impressions. Zero clicks at that sample size does not identify the title/description as the cause. We have not observed Google's actual rendered snippet for every impression.
- **Timing matters:** Google's last reported ATS crawl is September 27. The current article's October 20 additions already cover contact details, resume-title accuracy and a readable structure. Historical data ending October 19 and a pre-change crawl cannot evaluate that new copy.

**Recommendation: keep the current ATS title, description, H1 and article text.** First verify a new crawl and gather a comparable post-crawl period. No further rewrite or new article is implemented. If a later page-filtered export shows the same relevant queries with adequate volume and stronger positions but persistently weak CTR, prepare one small description test emphasizing the existing contact/title/format examples. Record the exact before/after and date, then compare matched periods; do not claim improvement from a few impressions.

The ATS-specific research is now complete for this historical window. Remaining verification is Google's next crawl/index changes, live eligibility tests/owner requests if chosen, post-change performance, and actual consultation/client outcomes. No Search Console clicks are treated as inquiries.
