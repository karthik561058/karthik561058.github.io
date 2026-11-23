(() => {
  'use strict';
  const menuButton = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileNav.hidden = true;
  }
  menuButton.addEventListener('click', () => {
    const shouldOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(shouldOpen));
    menuButton.setAttribute('aria-label', shouldOpen ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !shouldOpen;
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 850) closeMenu(); });
  const filters = document.querySelectorAll('.filter-button');
  const cards = document.querySelectorAll('.credential-card');
  filters.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filters.forEach(other => {
        const selected = other === button;
        other.classList.toggle('active', selected);
        other.setAttribute('aria-pressed', String(selected));
      });
      cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
    });
  });
  const dialog = document.getElementById('certificate-dialog');
  const frame = document.getElementById('certificate-frame');
  const dialogTitle = document.getElementById('dialog-title');
  const openPdf = document.getElementById('certificate-open');
  let previousFocus = null;
  document.querySelectorAll('[data-pdf]').forEach(button => {
    button.addEventListener('click', () => {
      const path = button.dataset.pdf;
      if (!path || !path.toLowerCase().endsWith('.pdf')) return;
      previousFocus = document.activeElement;
      dialogTitle.textContent = button.dataset.title || 'Certificate';
      const url = new URL(path, document.baseURI).href;
      frame.src = url;
      openPdf.href = url;
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
        document.body.classList.add('dialog-open');
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });
  function clearDialog() {
    frame.removeAttribute('src');
    document.body.classList.remove('dialog-open');
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }
  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', clearDialog);
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();