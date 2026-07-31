/* ============================================================
   MediaOS — Initialization
   ============================================================ */

'use strict';

function init() {
  applyTheme(state.theme);

  // Navigation
  $$('.nav-item').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigate(el.dataset.page);
    });
  });

  // Theme toggle
  $('#themeToggle').addEventListener('click', toggleTheme);

  // Modal close
  $('#modalClose').addEventListener('click', closeModal);
  $('#modalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && $('#modalOverlay').classList.contains('open')) closeModal();
  });

  // Mobile sidebar
  const openSidebar = () => {
    $('#sidebar').classList.add('mobile-open');
    $('#sidebarOverlay').classList.add('visible');
  };
  $('#topbarMenu').addEventListener('click', openSidebar);
  $('#sidebarOverlay').addEventListener('click', () => {
    $('#sidebar').classList.remove('mobile-open');
    $('#sidebarOverlay').classList.remove('visible');
  });

  // Sidebar collapse (desktop)
  $('#sidebarToggle').addEventListener('click', () => {
    $('#sidebar').classList.toggle('collapsed');
  });

  // Hash routing
  const hash = window.location.hash.slice(1);
  navigate(hash || 'research');

  window.addEventListener('hashchange', () => {
    const p = window.location.hash.slice(1);
    if (p && p !== state.page) navigate(p);
  });
}

// Expose closeModal globally for inline onclick handlers in modal footers
window.closeModal = closeModal;

window.addEventListener('DOMContentLoaded', init);
