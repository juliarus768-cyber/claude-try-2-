# Diagnostic next-step recommendations: implementation brief

Prepared October 20, 2026. Specification only; no diagnostic code or scoring was changed in this website PR.

## Source access and verified boundaries

Source is accessible. Inspected `juliarus768-cyber/hiremenow-diagnostic-v2` at commit `9d35b8875352f80e5909416c16ff214c1bed110f`. Its `script.js`, normalized to LF, exactly matches the public script served by `https://diagnostic.hiremenowresumes.ca/script.js` (SHA-256 `8294bf78b4f5f41e0e2a659973fea5d72d86ad962581c4c8cbdcb0b53e91a782`). The source README identifies a standalone Cloudflare Pages application.

The separate career-diagnostic foundation repository is also accessible, but its governance restricts recommendations and public delivery. It is not the deployed static renderer and must not be treated as authorization to enable its experimental classifications. No private source or documents were copied into this public PR.

In the deployed-source candidate:

- `functions/api/diagnostic.js` returns `{ result: resultText }`, not a typed service-eligibility/category object.
- `script.js` defines six prose sections: What I See First; Summary and Introduction; Experience Section; Language and Mechanics; Format and First Impression; Overall Strategy.
- `normalizeResultText()`, `getSectionBody()`, `parseSections()` and `paragraphize()` parse and escape those sections. There are no verified deterministic categories for unclear direction, weak positioning, multiple targets or no paid need.
- `renderResult(rawText)` renders the six sections and appends `renderInlineCta()` unconditionally. That CTA uses “Need Help Fixing These Issues?” and points a “Book a Free 15-Minute Fit Call” button to the general contact page. This is a general inquiry route, not a direct calendar booking.

The earlier Phase 1 category mapping was illustrative. It cannot be wired to this renderer as though typed categories already exist. Inferring categories from words such as “unclear” in model prose could reverse a negated sentence or turn missing information into a sales recommendation.

## Proposed implementation without changing assessment logic

Replace only the appended CTA presentation with a neutral, optional next-step panel, headed **“What would you like to work on next?”** Explain: **“Choose the situation that fits you. These links are optional resources, not an additional diagnostic finding.”**

Use an accessible labelled radio group or select with an unselected initial option and these choices. Show guidance only after the visitor makes a choice. Keep the result text intact. Do not preselect a paid route or label a choice as a diagnosis.

| Visitor-selected situation | Free first step | Optional paid-service link and wording |
| --- | --- | --- |
| “I am still deciding which roles to target” | Use the posting-to-evidence worksheet in `/international-work-experience-canadian-resume.html`; explain that comparing requirements may reveal what needs further research | `/services.html#career-clarity`: “If you want an individual review of your direction, compare the Career Clarity Session.” Note that resume writing is not included. |
| “My target is clear, but my resume does not explain my fit” | `/international-work-experience-canadian-resume.html` and `/explain-foreign-job-titles-canadian-resume.html` | `/services.html#resume-strategy`: “If you need help preparing documents for one agreed target, review the Resume Strategy Package.” |
| “I am considering two different career directions” | Compare two postings using the article worksheet; identify shared evidence and the genuinely different requirements. Do not assume that similar titles need two packages. | `/services.html#multi-path`: “For two agreed directions needing separate documents, compare Multi-Path Career Strategy.” |
| “I can make the changes myself / I do not need paid help now” | Show the relevant article links and `/resources.html`. Explain that a paid service is optional, and that the tool cannot determine every support need. | No paid-service recommendation in this choice. Retain normal site navigation. |
| “I am not sure / the diagnostic did not provide enough detail” | Suggest reviewing the supplied target and posting, then reading the newcomer guide. Do not force a service match. | An optional general inquiry link may be available, with no claim that paid help is necessary. |

When a visitor chooses a paid-information route, include a single secondary free-call option only if useful: `https://calendly.com/hire-me-now-resumes/15`, labelled **“Book a Free 15-Minute Introductory Call.”** Explain that it discusses fit and next steps and does not include paid coaching or resume writing. Do not describe a contact-form link as a direct booking. Link to current service terms rather than duplicate prices that can drift.

## Technical acceptance requirements

1. Work in the verified diagnostic repository on its own approved branch/PR. This website PR supplies the specification and public destination pages only. No API calls, secrets, model prompt changes, deployment or real resume submissions are needed to test presentation.
2. Preserve `SECTIONS`, API request/response shape, all assessment prompts, interpretation, validation, model settings and parsing. Do not introduce a score, category classifier or service decision based on keyword searches through the prose.
3. Change the result-footer renderer and add scoped presentation controls only. Use the existing escaping helper for result content; build fixed-option labels/links from an allowlist. Never insert submitted text into `innerHTML` as markup.
4. Scope listeners to the new result panel. Re-running a result must replace controls and reset the choice without accumulating handlers. Do not persist selections, resume text, postings or answers in localStorage, URLs or an analytics payload.
5. If API results are empty, partial, malformed or an error, do not show a paid recommendation as if findings justified it. Preserve existing error handling and missing-section notices. A generic free resources link is sufficient.
6. Keep keyboard navigation, focus indicators, semantic headings and the existing `aria-live` behavior usable. Avoid announcing a full result repeatedly when one option changes. Ensure external navigation and narrow layouts remain usable.
7. No diagnostic analytics is authorized by this specification. The website's consent/localStorage does not automatically apply to a different host. Any diagnostic measurement requires its own consent review. No psychological, clinical, licensing or regulated-assessment claims may be added.
8. For a future automatic recommendation, first agree a typed, reviewed evidence contract and method of handling uncertainty, mixed findings and contrary evidence. That would be separate assessment work; it is outside this presentation-only specification.

## Required tests before any separate implementation is accepted

Use synthetic result text and intercepted API responses only. Cover all five choices plus untouched/default state; positive, negated and conflicting prose; each missing section; empty/malformed/error responses; repeated result generation; keyboard operation; 375/768/1440px layouts; escaping and malicious markup; exact link destinations; absence of stored/passed personal data. Assert that every result section remains byte-for-byte equivalent after parsing and that the no-paid-help choice contains no paid recommendation. Check that the free-call label opens Calendly and that inquiry links are identified as inquiries. No successful result, consultation, booking or scoring change is claimed by this website PR.
