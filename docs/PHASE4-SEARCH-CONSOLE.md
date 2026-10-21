# Search Console evidence and ATS review

## Provenance and limits

On October 21, 2026, read the existing **URL-prefix property `https://hiremenowresumes.ca/`**, Web search, July 20–October 19, 2026. The domain property was inaccessible, but the URL-prefix property was available. Downloaded `https___hiremenowresumes.ca_-Performance-on-Search-2026-10-21.zip` to the local Downloads directory and extracted Chart, Queries, Pages, Countries, Devices, Search appearance and Filters CSVs outside the published repository. The chart contains the requested dates; Filters labels the date as Last 3 months. The user-supplied Excel export `https___hiremenowresumes.ca_-Performance-on-Search-2026-10-21.xlsx` was also read without modification. All seven sheets match the CSV rows and values after normalizing numeric/percentage formatting (no differences). Its SHA256 is `93eb487d85765321f306f824acecc9c9c3f23826c4332c0f9dc159b13b91710c`. It contains no additional page-filtered ATS query table. Raw exports are not committed. Export SHA256: `71f292567e057957a3b6d6d6cd78eb2946156dbe5bfae010caa04f7f1a2347cf`.

This is a verified historical baseline, not current post-release performance. PRs #73/#74 and the diagnostic's Phase 3 release must not be credited with these results. The separate diagnostic hostname is outside this property.

| Property-level metric | Verified value |
| --- | --- |
| Clicks / impressions | 33 / 1,253 |
| CTR | 2.63% (33 ÷ 1,253) |
| Average position | 13.1 in UI; daily impression-weighted reconstruction approximately 13.15 using rounded CSV positions |
| Canada | 29 clicks / 963 impressions; 3.01% CTR; position 13.60 |
| Desktop | 21 clicks / 733 impressions; 2.86% CTR; position 15.91 |
| Mobile | 12 clicks / 517 impressions; 2.32% CTR; position 9.23 |
| Tablet | 0 clicks / 3 impressions |

Canada represents 87.9% of clicks and 76.9% of impressions. This supports retaining Canadian relevance, but country data does not establish Toronto/GTA demand or the visitor's willingness to buy. Country, language and service eligibility are different dimensions. No city-level inference is justified.

## Landing-page visibility

| Page | Clicks | Impressions | CTR | Average position | Interpretation |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | 26 | 430 | 6.05% | 8.40 | Largest observed click contributor; preserve Toronto + Canada positioning |
| `/contact.html` | 4 | 191 | 2.09% | 12.42 | Some contact-page discovery; does not prove inquiries |
| `/about.html` | 2 | 244 | 0.82% | 16.34 | Trust page has visibility; inspect its queries before rewriting its snippet |
| `/how-to-explain-employment-gaps-canadian-resume.html` | 1 | 72 | 1.39% | 12.40 | Existing informational entry point |
| `/ru/` | 1 | 61 | 1.64% | 8.77 | Russian entry visibility; GA4 remains disabled there |
| `/resources.html` | 1 | 35 | 2.86% | 9.66 | Small resource discovery baseline |
| `/ats-resume-tips-canadian-job-seekers.html` | 0 | 258 | 0% | 16.64 | Investigate query mix and position before blaming snippet copy |
| `/optimize-linkedin-canadian-job-market.html` | 0 | 65 | 0% | 13.75 | Secondary review candidate after ATS |
| `/do-you-still-need-cover-letter-canada.html` | 0 | 21 | 0% | 10.05 | Too little evidence for a rewrite |
| Other three exported pages | 0 | 26 combined | — | — | Privacy and two articles; no commercial conclusion |

The page table sums to 35 clicks and 1,403 impressions, while the property chart is 33/1,253. Retain these separate aggregation levels; do not force them to reconcile or calculate page shares using property totals. [Google explains property-versus-page aggregation](https://support.google.com/webmasters/answer/17011364?hl=en-GW).

Services, resume-writing, both newcomer landing pages and the two new international-experience articles have no rows in this period. **No row does not mean not indexed.** New pages also postdate the measured period. Individual URL inspection is required.

## Queries, brand and intent

The export exposes **98 queries with only 2 clicks and 618 impressions**, compared with 33/1,253 in the chart. Do not assign the other 31 clicks to brand or non-brand, nor label the 635-impression difference as an identifiable topic. Privacy omission and reporting limits prevent complete query attribution. [Google documents anonymized-query omissions](https://developers.google.com/search/blog/2022/10/performance-data-deep-dive).

| Query | Clicks / impressions | Position | Working interpretation |
| --- | --- | ---: | --- |
| `julia cher` | 0 / 40 | 6.85 | Explicit owner-brand query |
| `hire me now` | 0 / 16 | 6.19 | Explicit business-name phrase; some ambiguity remains |
| `hiremenow` | 0 / 13 | 4.23 | Explicit business-name variant |
| `hireme` | 1 / 40 | 3.90 | Ambiguous phrase; do not classify automatically as business-brand demand |
| `hire me` | 0 / 93 | 8.10 | Ambiguous job-seeking phrase |
| `hire mel` | 0 / 53 | 17.83 | Ambiguous; no optimization target |
| `resume writing` | 1 / 1 | 1.00 | Service-relevant but one observation; 100% CTR is not a useful benchmark |
| `resume writing services near me` | 0 / 4 | 8.50 | Commercial/local intent; existing resume-writing page is a candidate, landing URL not yet joined |
| `resume writing service` | 0 / 3 | 17.67 | Commercial intent, very small sample |
| `resume writing toronto` | 0 / 3 | 27.67 | Relevant local service intent, not evidence for a new Toronto page |
| `professional resume writing` | 0 / 2 | 21.00 | Relevant commercial candidate |
| `contact info in resume` | 0 / 22 | 9.82 | Informational; existing ATS article covers it, but association with that URL is unverified |
| `good resume titles` | 0 / 19 | 13.32 | Informational; existing title guidance may serve it |
| `help with resume wording` | 0 / 17 | 18.29 | Mixed informational/help intent; not automatically purchase intent |
| `what is ats resume` | 0 / 10 | 17.00 | Informational; page association unverified |

The three explicit brand rows above total 69 impressions/0 clicks **within visible queries only**. A complete brand share, non-brand CTR or commercial conversion rate cannot be computed. No visible career-coaching cluster supports another landing page. Role-specific customer-service and IT query variants exist, but are small and informational; do not publish occupation-specific pages just to match them.

## Trend

Daily Chart CSV, equal adjacent 28-day periods:

| Dates | Clicks | Impressions | CTR |
| --- | ---: | ---: | ---: |
| August 25–September 21 | 8 | 289 | 2.77% |
| September 22–October 19 | 17 | 618 | 2.75% |

Impressions rose 113.8% and clicks 112.5%; CTR stayed approximately flat. This is descriptive, not evidence that leads improved or that a specific edit caused growth. Query mix, geography, device and seasonality may contribute. GSC also displayed an ATS recommendation comparing October 11–17 with October 4–10 (92% fewer impressions). That short comparison needs page-filtered daily evidence; do not treat the sitewide increase as steady ATS growth.

## ATS article: decision before editing

Current title/H1: **ATS Resume Tips for Canadian Job Seekers** (title adds Hire Me Now Resumes). Description already promises clear format, accurate resume titles, contact details and relevant keywords. The introduction frames ATS guidance for Canadian applications. Existing sections answer what an ATS is, contact information, headings, file format, truthful role titles and keywords. Existing contextual links lead to resume-writing, the $349 package, the $149 review option and related resources; one editorial service CTA avoids repeated promotion.

**The export is sitewide, not a page/query join.** Chrome disconnected before the ATS filter could be read. None of the sitewide queries above can safely be presented as the ATS page's actual queries. No ATS title, description, H1, introduction or body edit is included.

Next: Performance → same date range → Page filter **Exact URL** of the ATS article → Queries → export all four metrics. Repeat for Canada and mobile only where counts support comparison; compare equal 28-day periods. Save filter/date metadata. Inspect URL indexing and Google's canonical alongside it.

Conditional recommendations, to be reviewed after that export:

- If definition queries dominate, test a concise definition near the opening and a definition-led description; preserve accurate limitations and existing practical advice.
- If formatting/contact/title queries dominate, foreground the corresponding existing section in the introduction or add a short linked contents list only if the mobile journey needs it.
- If most relevant impressions remain around position 16–20, improve answer relevance and trusted discovery before treating zero CTR as proof of a bad title. Position averages are not a fixed rank or proof of first-page exposure.
- If commercial queries reach ATS instead of the service page, strengthen one relevant contextual route to the existing resume-writing/service page; do not turn the article into a second commercial landing page.

Search spot-checks for ATS Canada topics showed competing publisher pages such as [Resumefy's Canadian ATS guide](https://resumefy.ca/blog/ats-resume-tips-canada) and [Aplica's ATS definition](https://www.aplica.ca/blog/what-is-an-ats-resume). This establishes competing answer formats, not their traffic, Google rank in Toronto, or which competitors appeared for this property's actual page-filtered queries. Do not copy universal ATS scores, rejection percentages or guarantees. A controlled Canada/device query comparison remains outstanding.
