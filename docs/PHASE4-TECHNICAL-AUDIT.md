# Live technical SEO audit

Checked October 21, 2026 against main `ab1777c`. All 25 content URLs, robots.txt, sitemap.xml, shared JavaScript and CSS were fetched directly over HTTPS. Live HTML matches repository main after line-ending normalization. This is a technical crawlability check, not a guarantee of Google indexing or rankings.

## Requested pages

All eight priority pages returned HTTP 200 at their expected final URL, with self-referencing HTTPS canonicals, `index, follow`, no X-Robots-Tag exclusion, one H1, a unique nonempty title/description and sitemap inclusion. No redirect/canonical conflict was found. Source pages linking below include navigation/footer links; they are not editorial link counts.

| URL path | HTTP | Sitemap | Distinct linking source pages | JSON-LD types | Metadata alternates |
| --- | --- | --- | ---: | --- | --- |
| `/` | 200 | Yes | 18 | LocalBusiness | en, ru, x-default |
| `/services.html` | 200 | Yes | 18 | BreadcrumbList | en, ru, x-default |
| `/resume-writing-services.html` | 200 | Yes | 17 | BreadcrumbList | None: no equivalent translation declared |
| `/canadian-resume-newcomers.html` | 200 | Yes | 18 | WebPage | en, ru, x-default |
| `/ru/rezume-dlya-novichkov-v-kanade.html` | 200 | Yes | 9 | WebPage | en, ru, x-default |
| `/ats-resume-tips-canadian-job-seekers.html` | 200 | Yes | 9 | Article, FAQPage | en, ru, x-default |
| `/international-work-experience-canadian-resume.html` | 200 | Yes | 5 | Article, BreadcrumbList | None: no equivalent translation declared |
| `/explain-foreign-job-titles-canadian-resume.html` | 200 | Yes | 5 | Article, BreadcrumbList | None: no equivalent translation declared |

## Crawl and metadata findings

- Robots allows crawling and advertises `https://hiremenowresumes.ca/sitemap.xml`. The live XML parses, has 24 unique indexable content URLs and resolves to existing pages. `thanks.html` correctly carries noindex and is omitted. Do not add it to the sitemap or remove its noindex for traffic.
- All 25 content pages have one canonical, one H1 and a unique title and meta description. Live header checks found no X-Robots-Tag exclusions. The intended noindex thank-you page is the exception to indexable status. No critical heading-order skip was found on the eight priority pages.
- All declared metadata hreflang targets exist and reciprocate. English/Russian homepages, services, ATS and newcomer counterparts are paired; `x-default` refers to English. The resume-writing page and two English international-experience articles declare no fabricated Russian counterpart. Related Russian navigation links are not metadata equivalence claims.
- Local site-wide links and fragments resolve, including all three package anchors and the two new article destinations. Requested pages have incoming links and are not orphans. See [commercial linking review](PHASE4-COMMERCIAL-LINKS.md) for context rather than counting shared footer links as editorial coverage.
- JSON-LD blocks parse. Existing LocalBusiness, BreadcrumbList, Article, FAQPage and WebPage markup was inspected where present; article author, language, canonical and visible publication dates are structurally checked by the existing site test. No new schema, ratings, reviews or locations were added. Parse success is not full Schema.org validation or rich-result eligibility. Search Console overview showed three valid breadcrumb items and zero invalid items; a full current Rich Results/Schema validator review remains manual. Do not imply FAQ rich results are guaranteed.
- Homepage and resume-writing title retain Toronto; descriptions retain Canada-wide remote relevance. No canonical/title change is justified by the crawl.
- Responsive/browser checks cover the eight requested pages plus About, Contact, Russian homepage and Russian services at 375/768/1440px. See the [QA record](PHASE4-QA.md).

## Google indexing: observed versus outstanding

The authenticated URL-prefix property's October 21 overview showed **11 indexed pages and four not indexed**. This is an account report snapshot, not the current sitemap's page count or a diagnosis of each excluded URL. The overview also showed no Core Web Vitals data for mobile/desktop, and HTTPS counts of six HTTPS/zero non-HTTPS; those report counts are lagging/limited and are not a census of the live crawl.

Chrome disconnected after the performance export, before detailed Pages, Sitemaps and URL Inspection reports could be retrieved. The following remain **unverified**: which four URLs were excluded; discovered-but-not-indexed examples; latest sitemap submission/read/status; Google-selected canonical and crawl date for each priority URL. No indexing request, ownership verification, sitemap submission or account setting was made.

Owner follow-up: open the existing `https://hiremenowresumes.ca/` property, inspect each priority URL, record Google's canonical and indexing reason, and review sitemap processing. Inspect the canonical HTTPS URL before requesting indexing for a newly published eligible page. Do not infer not-indexed from absent performance rows, force every intentional exclusion into the index, or infer production health from a `site:` search. [Google's Search Console guidance](https://developers.google.com/search/docs/monitor-debug/search-console-start) distinguishes performance, indexing and sitemap reports.

## Changes justified now

None of these technical checks establishes a defect requiring a production edit. Preserve the approved architecture and allow the recently released content to collect evidence. If URL Inspection later identifies a real canonical, robots, sitemap or internal-discovery defect, fix that exact issue in a separate reviewed change rather than manufacture a larger SEO patch.
