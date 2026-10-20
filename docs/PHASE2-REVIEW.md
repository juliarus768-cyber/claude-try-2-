# Phase 2: content and client conversion

Branch `codex/phase2-content-conversion`, based on latest main `d7a26d06e62badb794e69fd78da56e9c00cc25ad`, including merged PR #73. No merge or deployment is part of this task. Earlier unrelated edits in the original workspace remain untouched.

## Production verification before editing

Direct Chrome requests on October 20, 2026 confirmed:

- The live homepage returns HTTP 200 and displays the Phase 1 H1 “Professional Resume Writing & Career Coaching for the Canadian Job Market,” the compact verified credential line and the resume-services CTA.
- `/canadian-resume-newcomers.html` and `/ru/rezume-dlya-novichkov-v-kanade.html` return HTTP 200.
- These three pages have no horizontal overflow at 375/1440px. Their mobile menus open with the correct expanded state and respond to Escape. Header/footer links were inspected; Phase 2's local checks also validate all internal destinations against the merged source.
- The live sitemap returns HTTP 200 and includes both newcomer URLs. Services, Resources, the shared script and diagnostic also return HTTP 200.
- A follow-up read-only check of the 10 distinct internal header/footer destinations collected from the verified pages returned HTTP 200 for every destination.
- The deployed diagnostic script was matched to the inspected public repository; see `PHASE2-DIAGNOSTIC-SPEC.md`.

The web-search/open cache initially returned an old homepage view and could not fetch some new paths. Direct browser requests confirmed the actual deployed content. Merge status alone was not used as deployment evidence. Actual email delivery, GA4 ingestion and booking completion were not verified by these public reads.

## Content and implementation

Two finished English articles are supplied for editorial review:

1. `/international-work-experience-canadian-resume.html`: employer context, posting-to-evidence worksheet, responsibilities, transferable skills, before/after examples and an accuracy checklist.
2. `/explain-foreign-job-titles-canadian-resume.html`: translation versus explanation, functional scope, honest seniority, regulated titles and consistent records.

Both use the existing article layout, fonts, navigation, byline convention, brand assets and responsive styles. Julia Cher's existing verified CPC credentials are retained without invented personal experiences. Examples are explicitly fictional. Each article has one editorial service CTA, relevant reading links, unique metadata, a self-canonical, Article/BreadcrumbList data and an English publication date of 2026-10-20. This is the prepared publication date, not a claim that these drafts are already live; adjust it if publication occurs on a later date. No alternate-language article or false translation hreflang was created. RU navigation leads to the existing Russian resources index.

Added Resources cards, related-reading links from the English newcomer and ATS pages, and sitemap entries. The ATS modification date/byline was updated for its new related-reading paragraph; its original publication date remains unchanged. Other unchanged sitemap dates, package pricing/descriptions, contact wiring, booking links and branding are preserved.

Added only the consent-gated internal `service_click` measurement described in `PHASE2-MEASUREMENT.md`. The diagnostic brief is grounded in accessible deployed-source structure but remains a specification in this one website PR. No separate diagnostic runtime, prompt, scoring or API was modified. No model request, real resume submission or new credential was needed.

## Review and manual actions

Review both English articles and approve the PR before publication. If the publication date differs, update each article's visible date, Article dates and sitemap lastmod to the real publication date. Verify production mailbox delivery/redirect and actual GA4 receipt with account access. Confirm any Calendly completion integration separately. Physical mobile-device and assistive-technology review remain manual. The occupation-title article links to CICIC's official directory and tells readers to confirm jurisdiction-specific requirements with the relevant authority.

After an approved merge/deployment performed separately, check both article URLs, metadata and sitemap in production, then request Search Console indexing as appropriate. None of those post-publication actions is claimed complete here. The existing consent/privacy requirements remain prerequisites for any Russian analytics extension.

Detailed local QA results and test boundaries are recorded in `PHASE2-QA.md`. Local screenshots and machine-readable evidence remain outside publication in `phase1-audit/phase2-evidence/`. `docs/` and `scripts/` are already excluded from Jekyll output.
