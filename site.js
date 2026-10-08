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


// Phase 4: privacy-conscious interaction measurement.
// Only sends events when the page already has the Google Analytics tag.
// No form fields, client identifiers, diagnostic answers or URLs with query
// parameters are included in the custom event payload.
document.addEventListener('DOMContentLoaded', () => {
  const pendingContactKey = 'hmn_contact_pending_at';
  const pendingTtlMs = 60 * 60 * 1000;

  function track(eventName, parameters) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, parameters);
  }

  // Booking and diagnostic clicks indicate interest, not completed actions.
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!target || typeof target.closest !== 'function') return;
    const link = target.closest('a[href]');
    if (!link) return;

    let destination;
    try {
      destination = new URL(link.href, window.location.href);
    } catch (_) {
      return;
    }

    const section = link.closest('.site-nav, .nav-mobile')
      ? 'navigation'
      : link.closest('.site-footer')
        ? 'footer'
        : 'content';

    if (destination.hostname === 'calendly.com' &&
        destination.pathname.replace(/\\/$/, '') === '/hire-me-now-resumes/15') {
      track('booking_click', { destination_type: 'calendly', site_section: section });
    } else if (destination.hostname === 'diagnostic.hiremenowresumes.ca') {
      track('diagnostic_click', { destination_type: 'career_diagnostic', site_section: section });
    }
  });

  // Do not count a submit-button click as a lead. Only note a valid attempt
  // to post the existing form to FormSubmit in this browser tab.
  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!form || !form.matches || !form.matches('form.contact-form')) return;
    if (!form.checkValidity()) return;

    try {
      const action = new URL(form.action, window.location.href);
      if (action.hostname !== 'formsubmit.co') return;
      window.sessionStorage.setItem(pendingContactKey, String(Date.now()));
    } catch (_) {
      // Storage may be unavailable; never interrupt form delivery.
    }
  });

  // FormSubmit redirects to /thanks.html after processing a form.
  // Require a recent same-tab submission marker, then consume it once.
  // This is a redirect-confirmed inquiry, not an inbox-delivery guarantee.
  if (window.location.pathname === '/thanks.html') {
    try {
      const submittedAt = Number(window.sessionStorage.getItem(pendingContactKey));
      window.sessionStorage.removeItem(pendingContactKey);
      const age = Date.now() - submittedAt;
      if (submittedAt > 0 && age >= 0 && age < pendingTtlMs) {
        track('generate_lead', { lead_source: 'website_contact_form' });
      }
    } catch (_) {
      // A direct thank-you page view does not count as a lead.
    }
  }
});
