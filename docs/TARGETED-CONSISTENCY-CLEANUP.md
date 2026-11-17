# Targeted consistency cleanup — November 17, 2026

Prepared from main `ac415e3` on a separate branch. Source changes only; no merge or deployment.

## Changes and exact reasons

| File | Reason |
|---|---|
| `index.html` | Add the two missing contextual international-experience/foreign-title text links below the existing newcomer button. Underlined text links remain visually secondary; hero, H1, title, credentials and geographic statement are preserved. |
| `international-work-experience-canadian-resume.html` | Use the requested descriptive title and matching `og:title`, consistent with the published H1/resource card. Remove repeated “practical” from description, OG description and Article description; update existing `dateModified`. Body and canonical unchanged. |
| `resources.html` | Match that article card's summary to its corrected description. No new cards, language links or booking buttons. |
| `ru/index.html` | Use Юлия Чер in the badge/portrait alt and grammatical Юлии Чер in Russian description; preserve English professional credentials and JSON-LD name. Translate privacy footer label. |
| `ru/ats-rezume-kanada.html` | Russian visible author name, translated privacy footer label and accurate existing Article modification date. |
| `ru/kak-sostavit-rezume-v-kanade.html` | Same visible-author/footer/date corrections. |
| `ru/kanadskoe-rezume-i-evropeyskoe-cv.html` | Same visible-author/footer/date corrections. |
| `ru/pereryv-v-rabote-rezume-kanada.html` | Same visible-author/footer/date corrections. |
| `ru/rezume-dlya-novichkov-v-kanade.html` | Correct the specified “канадское резюме” heading, two visible consultation-name references and privacy footer label. |
| `ru/resources.html` | Translate only the privacy footer label; destination unchanged. |
| `ru/services.html` | Translate only the privacy footer label; destination unchanged. |
| `sitemap.xml` | Set November 17 lastmod only for these 11 changed HTML URLs. Keep all 24 unique destinations and other dates. Both international articles already existed once. |
| This report | Record decisions, verification and remaining translation gaps. |

## Already correct; skipped

- Homepage title and OG title remain **Resume Writing & Career Coaching Toronto | Hire Me Now Resumes**. The proposed alternative is relevant, but there is insufficient search evidence that it will improve results. The available November 4–10 homepage-filtered observation was only one click/31 impressions; this cannot identify a title problem or evaluate a controlled title change. Keep the current broad positioning and Toronto term; reconsider only with meaningful matched-period, page-filtered evidence.
- The homepage H1 remains **Professional Resume Writing & Career Coaching for the Canadian Job Market**. Broad audiences, Toronto/GTA/Canada coverage, existing verified credentials and primary CTA remain intact.
- All 17 top-level English pages already share the homepage's main/mobile navigation destinations, booking CTA/destination and service-footer links. Language destinations agree across desktop/mobile/footer and use a counterpart or appropriate Russian landing/resources fallback. Existing active states are preserved, including Services on the dedicated resume-writing page. Articles and utility pages are not given an invented active top-level page. No English navigation/footer correction was needed.
- Resources already has both international-experience cards, Russian switcher, free 15-minute introductory-call navigation and matching service footer. All eight cards have unique destinations and appropriate categories/summaries. Seven titles match article H1s exactly; the interview card intentionally uses the matching shorter title, with its summary identifying the STAR method. No duplicates were inserted.
- Verified pricing/inclusions, Calendly URLs, all canonical/hreflang URLs, JSON-LD `Julia Cher` names, English credentials, brand/URL/filenames, contact form, confirmation behavior, CSS and analytics/consent code are preserved.

## Russian language and equivalent-page findings

All eight Russian pages have `lang="ru"` and a correct self-canonical. These six existing pairs already have reciprocal `en`, `ru` and English `x-default` metadata; no hreflang edits were necessary:

| English | Russian |
|---|---|
| `/` | `/ru/` |
| `/services.html` | `/ru/services.html` |
| `/resources.html` | `/ru/resources.html` |
| `/ats-resume-tips-canadian-job-seekers.html` | `/ru/ats-rezume-kanada.html` |
| `/how-to-explain-employment-gaps-canadian-resume.html` | `/ru/pereryv-v-rabote-rezume-kanada.html` |
| `/canadian-resume-newcomers.html` | `/ru/rezume-dlya-novichkov-v-kanade.html` |

Missing counterparts, intentionally not manufactured:

- `/ru/kak-sostavit-rezume-v-kanade.html` and `/ru/kanadskoe-rezume-i-evropeyskoe-cv.html` have no equivalent English articles; retain self-canonicals without invented alternates.
- `/ru/about.html` and `/ru/contact.html` do not exist in source and return HTTP 404 live. Russian “О Юлии” and “Контакты” therefore keep working English destinations. The translated privacy label still opens the existing English privacy page.
- Other English pages without direct Russian translations: About, Contact, Privacy, the dedicated resume-writing service, cover-letter/photo/LinkedIn/interview articles, the two international-experience articles and the noindex thank-you page. Existing navigation fallbacks are not presented as equivalent-page hreflang relationships.

Creating translations or new pages requires separate scope/approval. Other established resume/CV terminology was not broadly rewritten.

## Verification

- `python scripts/check-site.py`: 25 pages pass internal links/fragments, sitemap uniqueness/destinations, headings, metadata and JSON-LD checks.
- Supplemental source checks: all self-canonicals, six reciprocal hreflang pairs, language-switcher destinations, unchanged English navigation/footers/active states, preserved H1s/prices/credentials, eight unique resource cards, unchanged article body and protected contact/analytics/CSS files pass. Exactly 11 changed sitemap URLs receive the new date; other dates remain unchanged.
- Responsive/accessibility: **75 checks** (all 25 pages at 375, 768 and 1440px), zero axe violations in tested states, horizontal overflow, broken images or JavaScript errors. Keyboard Enter/Escape mobile navigation and available native FAQ disclosures pass. The homepage mobile screenshot confirms the added article links remain below the existing newcomer CTA.
- Existing GA4/contact regression suite: **11 tests pass**. `site.js` and contact/confirmation files are byte-equivalent to main after line-ending normalization. Browser QA rejected analytics and intercepted collection: zero tracking requests. No inquiries, bookings or diagnostic assessments submitted.
- `git diff --check`: pass. Screenshots, raw source audits and live-response captures remain local, outside the PR.

Responsive browser checks used desktop Chromium at the specified widths; physical iPhone/Android testing was not performed.

## Live versus source status

Public HTTP checks on November 17 returned **200** for all 25 existing HTML pages, `site.js`, sitemap and robots (28 existing resources), and the expected **404** for the two absent Russian pages. Existing live bodies match main; the 11 edited HTML pages and sitemap differ from this candidate as expected. These changes are **not deployed**.

Observed on homepage/resources/international article/Russian newcomer/sitemap responses: `Cache-Control: max-age=600`, `Server: GitHub.com`, `Last-Modified: Fri, 13 Nov 2026 14:30:58 GMT`, ETags, `Age: 0`, `Via: 1.1 varnish`, and cache MISS headers. These are observed response headers, not an assumption about a particular CDN or proof of publishing this branch. After an approved future deployment, verify live body/title/links and sitemap dates again.

No additional code, tracking, translations, credentials, services or design changes are proposed.
