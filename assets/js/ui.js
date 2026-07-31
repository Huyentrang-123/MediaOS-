/* ============================================================
   MediaOS — UI Primitives (toast, modal, theme)
   ============================================================ */

'use strict';

/* --- Toast Notifications --- */
function toast(msg, type = 'info') {
  const container = $('#toastContainer');
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span>${icons[type] || icons.info}</span><span>${esc(msg)}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('removing');
    el.addEventListener('animationend', () => el.remove());
  }, 3200);
}

/* --- Modal --- */
function openModal(title, bodyHTML, footerHTML = '', large = false) {
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = bodyHTML;
  $('#modalFooter').innerHTML = footerHTML;
  const modal = $('#modal');
  modal.className = 'modal' + (large ? ' modal-lg' : '');
  $('#modalOverlay').classList.add('open');
  $('#modalOverlay').setAttribute('aria-hidden', 'false');
  const firstFocus = modal.querySelector('input, textarea, select, button');
  if (firstFocus) firstFocus.focus();
}

function closeModal() {
  $('#modalOverlay').classList.remove('open');
  $('#modalOverlay').setAttribute('aria-hidden', 'true');
}

/* --- Theme --- */
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  $('#themeToggle').textContent = t === 'dark' ? '☀️' : '🌙';
  persist('lc_theme', t);
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(state.theme);
}
