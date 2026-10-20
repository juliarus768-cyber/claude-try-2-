# Phase 2 QA record

October 20, 2026. Baseline: main `d7a26d06e62badb794e69fd78da56e9c00cc25ad` (includes merged PR #73). Review branch: `codex/phase2-content-conversion`.

## Completed

- **Production baseline:** direct public browser requests confirmed the Phase 1 homepage H1/credentials and both newcomer pages at HTTP 200, desktop/mobile navigation and no horizontal overflow. Deployed sitemap includes both newcomer URLs; services/resources/shared script/diagnostic respond. A follow-up check of all 10 distinct internal header/footer destinations collected from those pages returned HTTP 200. Direct verification superseded a stale web-search view. See `PHASE2-REVIEW.md`.
- **Browser regression:** all 25 content pages at 375/768/1440px: 75 page/viewport combinations passed. Checked one H1, metadata, JSON-LD parse, duplicate IDs, internal links and fragments, missing images, responsive overflow, mobile-menu open/Escape state and JavaScript errors.
- **Accessibility:** axe-core 4.10.3 WCAG 2 A/AA, 2.1 AA and best-practice checks for 12 representative pages at three widths: 36 checks, zero violations. Covers both new articles, Resources, ATS, both homepages, both services pages, resume-writing, contact and both newcomer pages. Existing-page comparisons show no introduced violations. Newcomer disclosure controls still work by keyboard. This is not an accessibility certification or physical screen-reader test.
- **Article SEO/content structure:** `python scripts/check-site.py` passes for all 25 pages, plus new article-specific assertions for canonical URLs, Article schema, author/language, visible/schema publication dates, resources/sitemap entries, fictional-example labels and heading order. Both articles have one editorial service button. No Russian counterpart or alternate-article hreflang was invented.
- **Pricing/service invariants:** English and Russian package descriptive text matches the main baseline; all package prices and booking destinations are unchanged. Existing service/homepage/package files were not edited. All three contact query prefills still work.
- **Contact/booking:** a valid form POST was intercepted locally; no message was sent. Existing hidden redirect and provider wiring remain unchanged. Calendly renders the existing 15-minute event/calendar. No appointment was created. Provider email delivery is not proven by a browser POST.
- **New event:** nine source/consent scenarios (two articles plus English newcomer page, with unset/rejected/accepted choices) passed. No event before consent or after rejection; one `service_click` after acceptance; fixed source/service parameters; no event for header navigation; existing booking and diagnostic clicks each emit once. Russian pages remain outside GA4.
- **Existing analytics behavior:** tag absent before consent; one configuration after acceptance; lead marker and redirect event work; a thank-you reload does not repeat the lead. Google script requests were stubbed, so no real analytics data was sent.
- **Consent audit:** acceptance/rejection persistence, footer withdrawal/reload, explicit cross-tab changes, invalid initial preference, unavailable storage and English/Russian navigation passed. All eight Russian pages remain untracked for unset/accepted/rejected English consent. The current 17 English content pages remain opt-in.
- **Source checks:** `node --check site.js`, `git diff --check`, sitemap XML and local destination checks pass. The static website has no configured framework build or package test suite. No dependencies were installed or added.
- **Visual/editorial review:** inspected full desktop/mobile article screenshots, examples, lists, CTA wrapping and navigation. Reviewed original guidance for clear Canadian English, accurate titles/authority and distinction between support and guaranteed outcomes. Fictional examples contain no claimed client results. Current official Job Bank/CICIC guidance supports the linked resume/occupation-reference context; jurisdiction-specific title use is referred to the appropriate authority.
- **Diagnostic source audit:** public `script.js` exactly matches inspected diagnostic-v2 commit after line-ending normalization. Six prose sections and an unconditional generic CTA were verified; typed service categories do not exist. Specification is grounded in that finding. No diagnostic API, prompt, assessment logic, source repository or production setting was changed. No private source or credentials enter this PR.

## Changed files

- Added two English HTML articles: `international-work-experience-canadian-resume.html`, `explain-foreign-job-titles-canadian-resume.html`.
- Updated `resources.html`, `canadian-resume-newcomers.html`, `ats-resume-tips-canadian-job-seekers.html`, `sitemap.xml`, and `docs/CONTENT-ROADMAP.md` with relevant entries/links/status. ATS modification date changed for its new related-reading paragraph, preserving publication date.
- Updated `site.js` with the single consent-gated content-to-service event and extended `scripts/check-site.py` for article-specific metadata checks.
- Added `docs/PHASE2-REVIEW.md`, `PHASE2-DIAGNOSTIC-SPEC.md`, `PHASE2-MEASUREMENT.md` and this QA record. Existing Jekyll excludes keep review docs/scripts unpublished.

## Manual actions and boundaries

1. Julia's editorial approval of both English articles before merge/publication. If actual publication occurs after October 20, align article visible/schema dates and sitemap entries with that date.
2. After a separately approved deployment, verify both new production URLs, links, sitemap and indexing; use Search Console access to establish an indexing/query baseline. The new articles are not claimed live in this task.
3. Verify real GA4 ingestion/settings and custom dimensions with account access; events tested with a stub do not prove collection. Keep micro-conversions separate from qualified inquiries and completed bookings.
4. Verify FormSubmit mailbox delivery/activation and production thank-you redirect. A real delivery test requires owner oversight; no test email was sent here.
5. Completed Calendly bookings need a supported account integration or reviewed webhook. Clicks do not confirm appointments. Diagnostic measurement needs its own consent review on its separate host.
6. Implement the diagnostic presentation specification only in a separate reviewed change to the verified diagnostic repository. No automatic classifier/scoring or blanket paid recommendation is authorized by this website PR.
7. Physical-device and assistive-technology checks remain manual. A full external HTML conformance validator was unavailable; structural checks, browser rendering and axe do not constitute W3C conformance validation.

No merge, deployment, new credential, Russian tracking or claimed traffic/conversion gain. Evidence JSON and screenshots are retained locally under `phase1-audit/phase2-evidence/` outside publication.
