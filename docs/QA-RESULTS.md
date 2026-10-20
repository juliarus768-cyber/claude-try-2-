# Phase 1 QA

Date: October 20, 2026. Base: GitHub main `22f8e1245c139b074bb9ae7a0dc0d0aa33cc65bb`.

## Completed checks

- Browser regression: all 23 public HTML content pages at 375, 768 and 1440 pixels wide (69 page/viewport combinations). Checked a single H1, metadata presence, duplicate IDs, JSON-LD parsing, internal links and fragments, local asset destinations, missing images, horizontal overflow and JavaScript errors. Mobile menus opened and closed with Escape. Passed.
- Package invariants: compared the complete descriptive text of all three package blocks on both English and Russian services pages against the base commit, excluding CTA anchors. No price, inclusion or descriptive-copy changes. All six package booking links retain `https://calendly.com/hire-me-now-resumes/15`.
- Contact form: all three service query parameters select the matching existing form option. A valid form POST was intercepted locally. The provider endpoint, hidden redirect fields, required controls and honeypot remain intact. No test inquiry was sent.
- Analytics with Google library stubbed: no tag before consent; exactly one GA configuration after acceptance; one booking event with allowlisted service context; one diagnostic click event; a pending inquiry marker followed by one redirect-confirmed `generate_lead`; reloading the thank-you page does not repeat the lead. Russian pages remain untracked. No real analytics data was sent during these checks.
- Automated accessibility: axe-core 4.10.3, WCAG 2 A/AA, 2.1 AA and best-practice rules, for homepage, services and contact plus the two new pages at 375 and 1440 pixels (14 checks). Zero violations in the checked states. Existing-page comparisons against the base also reported zero violations. Native FAQ disclosures work with Enter. This is not a complete accessibility certification.
- SEO/structural check: `python scripts/check-site.py` passes for all 23 pages, including links/fragments, H1s, metadata counts, JSON-LD, newcomer heading order, canonical/hreflang sets, sitemap XML, unique sitemap URLs and file destinations. The two newcomer language switchers target each other.
- `node --check site.js` and `git diff --check` pass. No package manifest or existing build/test command exists; no framework build or dependency installation was needed.
- Visually reviewed full-page desktop/mobile screenshots of the homepage and both new landing pages. Corrected inherited section padding on the new reading layout. Shared branding and imagery remain intact.
- External verification: Calendly and the diagnostic return HTTP 200. Calendly renders Julia Cher's “Free 15-Minute Fit Call,” its 15-minute duration, calendar and timezone picker. The diagnostic renders its target-role/resume form and privacy notice. No appointment or diagnostic was submitted.
- `robots.txt`, existing verification file, package prices and service inclusions are unchanged. No new credential, tracking ID, client testimonial or outcome claim was introduced. Review documentation and scripts are excluded from Jekyll publication.

## Files and pages changed

Added: `canadian-resume-newcomers.html`, `ru/rezume-dlya-novichkov-v-kanade.html`, `scripts/check-site.py`, and the three review documents in `docs/`.

Substantive existing-page updates: `index.html`, `ru/index.html`, `services.html`, `ru/services.html`, and `contact.html`. Shared changes: `site.js`, `styles.css`, `sitemap.xml`, `_config.yml`.

Footer entry points and/or diagnostic-label consistency: `about.html`, `resources.html`, `privacy.html`, `thanks.html`, `resume-writing-services.html`, the six English article pages, `ru/resources.html`, and the four Russian article pages. Existing article bodies remain unchanged except diagnostic terminology where applicable. Existing URLs are preserved. Sitemap lastmod changes reflect modified pages, not a blanket date refresh.

## Manual verification and limits

- Verify inbox delivery and FormSubmit activation/redirect in the production account after merge. The automated POST check proves browser wiring, not email delivery.
- Verify real GA4 collection in DebugView/Realtime and existing enhanced-measurement/key-event settings. Stubbed tests prove event dispatch and consent behavior, not Google ingestion. Review before reporting conversions.
- Successful consultation booking tracking requires Calendly account access and an authorized integration. Outbound clicks remain interest events.
- Diagnostic result recommendations are specification only: its code is absent. Do not treat the assessment as changed.
- Search Console indexing, selected canonical URLs and production sitemap processing require account access and post-merge checks. No traffic, ranking or conversion lift is claimed.
- A full external HTML conformance validator was not available in the installed toolchain. HTML parsing, rendered DOM, metadata, links and axe were checked; these do not constitute a W3C conformance result.
- Assistive-technology testing and physical iOS/Android testing remain manual. Automated layouts used Chrome at representative widths.
- Review the complete English/Russian wording before merge as normal editorial approval. This branch was not deployed.

The three-month article roadmap and all remaining measurement/diagnostic implementation requirements are in the accompanying documents. Local screenshots and detailed browser JSON are retained in `phase1-audit/seo-conversion-evidence/` outside publication.
