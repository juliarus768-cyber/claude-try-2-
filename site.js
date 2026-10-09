// Keep the mobile menu's visible state and accessible state synchronized.
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.nav-hamburger');
  const menu = document.getElementById('mobileNav');
  if (!button || !menu) return;
  button.removeAttribute('onclick');
  button.setAttribute('aria-controls', menu.id);
  const sync = () => button.setAttribute('aria-expanded', String(menu.classList.contains('open')));
  button.addEventListener('click', () => { menu.classList.toggle('open'); sync(); });
  new MutationObserver(sync).observe(menu, { attributes: true, attributeFilter: ['class'] });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      button.focus();
    }
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) menu.classList.remove('open');
  });
  sync();
});


// Phase 4: basic, opt-in consent. English pages only: the Russian pages
// have never had this Google Analytics tag and remain untracked.
(function () {
  'use strict';

  if (!/^en(?:-|$)/i.test(document.documentElement.lang || '')) return;

  const measurementId = 'G-TPT9151J9N';
  const preferenceKey = 'hmn_analytics_consent_v1';
  let choice = 'unset';
  let started = false;
  let analyticsReady = false;
  const analyticsReadyCallbacks = [];

  try {
    const saved = window.localStorage.getItem(preferenceKey);
    if (saved === 'accepted' || saved === 'rejected') choice = saved;
  } catch (_) {
    // Browsers with blocked storage still offer a per-page choice.
  }

  function isGranted() {
    return choice === 'accepted';
  }

  function whenAnalyticsReady(callback) {
    if (!isGranted()) return;
    if (analyticsReady) callback();
    else analyticsReadyCallbacks.push(callback);
  }

  window.HMNConsent = { isGranted, whenAnalyticsReady };

  function remember(next) {
    choice = next;
    try {
      window.localStorage.setItem(preferenceKey, next);
    } catch (_) {
      // Storage must not prevent visitors from using the site.
    }
  }

  function clearAnalyticsCookies() {
    // Best effort removal of first-party GA cookies if consent is withdrawn.
    // This cannot remove data previously delivered to Google.
    const known = document.cookie.split(';').map((part) => part.trim().split('=')[0])
      .filter((name) => /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name));
    known.forEach((name) => {
      ['', '; Domain=hiremenowresumes.ca', '; Domain=.hiremenowresumes.ca'].forEach((domain) => {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' + domain;
      });
    });
  }

  function startAnalytics() {
    if (started || !isGranted()) return;
    started = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    tag.addEventListener('load', () => {
      if (!isGranted()) return;
      analyticsReady = true;
      analyticsReadyCallbacks.splice(0).forEach((callback) => callback());
    });
    document.head.appendChild(tag);
  }

  if (isGranted()) startAnalytics();
  if (choice === 'rejected') clearAnalyticsCookies();

  document.addEventListener('DOMContentLoaded', () => {
    const bar = document.createElement('div');
    bar.className = 'analytics-consent-banner';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Optional website analytics');
    bar.innerHTML =
      '<p class="analytics-consent-copy"><strong>Optional analytics.</strong> ' +
      'We use Google Analytics cookies to understand website visits. ' +
      'Your choice will not affect access to this site. ' +
      '<a href="/privacy.html#website-analytics">Privacy details</a></p>' +
      '<div class="analytics-consent-actions">' +
      '<button type="button" class="analytics-consent-reject">Reject analytics</button>' +
      '<button type="button" class="analytics-consent-accept">Accept analytics</button>' +
      '</div>';

    bar.hidden = choice !== 'unset';
    document.body.appendChild(bar);

    function closeBar() { bar.hidden = true; }

    bar.querySelector('.analytics-consent-accept').addEventListener('click', () => {
      remember('accepted');
      closeBar();
      startAnalytics();
    });

    bar.querySelector('.analytics-consent-reject').addEventListener('click', () => {
      const previouslyTracked = started;
      remember('rejected');
      clearAnalyticsCookies();
      try { window.sessionStorage.removeItem('hmn_contact_pending_at'); } catch (_) {}
      closeBar();
      // A previously loaded GA library cannot reliably be unloaded in-place.
      // Reload with the saved rejection so the Google tag is never loaded.
      if (previouslyTracked) window.location.reload();
    });

    // A small footer control allows changing consent later without showing
    // the bar again on every visit.
    const privacyLink = document.querySelector('.site-footer a[href$="privacy.html"]');
    if (privacyLink && privacyLink.parentNode) {
      const preferences = document.createElement('button');
      preferences.type = 'button';
      preferences.className = 'analytics-preferences-link';
      preferences.textContent = 'Analytics preferences';
      preferences.addEventListener('click', () => {
        bar.hidden = false;
        bar.querySelector(isGranted()
          ? '.analytics-consent-reject'
          : '.analytics-consent-accept').focus();
      });
      privacyLink.parentNode.appendChild(preferences);
    }
  });

  // Choices changed in another tab must be honoured here as well.
  window.addEventListener('storage', (event) => {
    if (event.key !== preferenceKey) return;
    if (event.newValue !== 'accepted' && event.newValue !== 'rejected') return;
    if (event.newValue === choice) return;
    choice = event.newValue;
    // Restart the page with its new consent state (without any pre-consent tag).
    window.location.reload();
  });
})();


// Phase 4: no form fields, names, email addresses, phone numbers, messages,
// resumes, diagnostic answers or destination URLs enter custom event payloads.
document.addEventListener('DOMContentLoaded', () => {
  const pendingContactKey = 'hmn_contact_pending_at';
  const pendingTtlMs = 60 * 60 * 1000;

  function track(eventName, parameters) {
    if (!window.HMNConsent || !window.HMNConsent.isGranted()) return;
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, parameters);
  }

  // Interest only, not an actual completed booking or diagnostic.
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target || typeof target.closest !== 'function') return;
    const link = target.closest('a[href]');
    if (!link) return;

    let destination;
    try { destination = new URL(link.href, window.location.href); }
    catch (_) { return; }

    const section = link.closest('.site-nav, .nav-mobile') ? 'navigation' :
      link.closest('.site-footer') ? 'footer' : 'content';

    if (destination.hostname === 'calendly.com' &&
        (destination.pathname === '/hire-me-now-resumes/15' ||
         destination.pathname === '/hire-me-now-resumes/15/')) {
      track('booking_click', { destination_type: 'calendly', site_section: section });
    } else if (destination.hostname === 'diagnostic.hiremenowresumes.ca') {
      track('diagnostic_click', { destination_type: 'career_diagnostic', site_section: section });
    }
  });

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!form || !form.matches || !form.matches('form.contact-form')) return;
    if (!form.checkValidity() || !window.HMNConsent || !window.HMNConsent.isGranted()) return;

    try {
      const action = new URL(form.action, window.location.href);
      if (action.hostname !== 'formsubmit.co') return;
      window.sessionStorage.setItem(pendingContactKey, String(Date.now()));
    } catch (_) {
      // The form must still submit even when storage is unavailable.
    }
  });

  // Redirect-confirmed inquiry, not guaranteed email delivery.
  // Wait for the Analytics script to load before consuming the lead marker.
  if (window.location.pathname === '/thanks.html') {
    try {
      const submittedAt = Number(window.sessionStorage.getItem(pendingContactKey));
      const age = Date.now() - submittedAt;
      if (!(submittedAt > 0 && age >= 0 && age < pendingTtlMs)) {
        window.sessionStorage.removeItem(pendingContactKey);
      } else if (!window.HMNConsent || !window.HMNConsent.isGranted()) {
        // Do not record a lead without analytics consent.
        window.sessionStorage.removeItem(pendingContactKey);
      } else {
        window.HMNConsent.whenAnalyticsReady(() => {
          try {
            if (!window.HMNConsent.isGranted()) return;
            const stillPending = Number(window.sessionStorage.getItem(pendingContactKey));
            const elapsed = Date.now() - stillPending;
            if (stillPending !== submittedAt || elapsed < 0 || elapsed >= pendingTtlMs) {
              window.sessionStorage.removeItem(pendingContactKey);
              return;
            }
            if (typeof window.gtag !== 'function') return;
            window.sessionStorage.removeItem(pendingContactKey);
            track('generate_lead', { lead_source: 'website_contact_form' });
          } catch (_) {
            // Disabled storage cannot interfere with normal navigation.
          }
        });
      }
    } catch (_) {
      // Direct visits or disabled storage are not counted as leads.
    }
  }
});
