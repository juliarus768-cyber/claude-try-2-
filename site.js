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
