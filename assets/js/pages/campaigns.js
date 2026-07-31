/* ============================================================
   MediaOS — Campaigns Page
   ============================================================ */

'use strict';

function renderCampaigns() {
  const container = $('#pageContainer');
  const statusConfig = DATA.statusConfig;

  const filtered = state.campaigns.filter(c =>
    state.campaignFilter === 'all' || c.status === state.campaignFilter
  );

  const statusTabs = [
    { id:'all',       label:'Tất cả' },
    { id:'active',    label:'Đang chạy' },
    { id:'planning',  label:'Lên kế hoạch' },
    { id:'completed', label:'Hoàn thành' }
  ];

  const tabsHTML = statusTabs.map(t => `
    <button class="tab-btn ${state.campaignFilter===t.id?'active':''}" data-cfilter="${t.id}">
      ${t.label} <span class="section-count">${t.id==='all' ? state.campaigns.length : state.campaigns.filter(c => c.status===t.id).length}</span>
    </button>`).join('');

  const cards = filtered.map(c => `
    <div class="campaign-card">
      <div class="campaign-header">
        <div class="campaign-name">${esc(c.name)}</div>
        <span class="badge ${statusConfig[c.status]?.class || 'badge-gray'}">${statusConfig[c.status]?.label || c.status}</span>
      </div>
      <div class="campaign-platforms">${c.platforms.map(p => `<span class="campaign-platform" title="${p}">${DATA.platformEmoji[p] || p}</span>`).join('')}</div>
      <div class="campaign-dates">
        <span>📅 ${formatDate(c.startDate)}</span>
        <span>→ ${formatDate(c.endDate)}</span>
      </div>
      <div class="campaign-desc">${esc(c.desc || c.description || '')}</div>
      ${c.kol ? `<div style="font-size:12px;color:var(--text-secondary);margin-bottom:8px">🤝 KOL: ${esc(c.kol)}</div>` : ''}
      <div class="campaign-budget">💰 Budget: ${esc(c.budget)} đ</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${c.progress||0}%"></div></div>
      <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px">Tiến độ: ${c.progress||0}%</div>
      <div class="campaign-actions">
        <button class="btn btn-sm btn-ghost flex-1" data-edit="${c.id}">✏️ Sửa</button>
        <button class="btn btn-sm btn-ghost" data-delete="${c.id}">🗑️</button>
        <button class="btn btn-sm btn-primary" data-brief="${c.id}">📋 Brief</button>
      </div>
    </div>`).join('');

  container.innerHTML = `
    <div class="page-header flex justify-between items-center">
      <div>
        <div class="page-title">🗓️ Campaigns</div>
        <div class="page-subtitle">Quản lý và theo dõi các chiến dịch marketing mỹ phẩm</div>
      </div>
      <button class="btn btn-primary" id="newCampaign">+ Tạo Campaign</button>
    </div>

    <div class="tabs" style="margin-bottom:20px">${tabsHTML}</div>

    ${filtered.length === 0
      ? `<div class="empty-state">
           <div class="empty-state-icon">🗓️</div>
           <div class="empty-state-title">Chưa có campaign nào</div>
           <div class="empty-state-desc">Tạo campaign đầu tiên để bắt đầu theo dõi tiến độ</div>
           <button class="btn btn-primary" id="newCampaign2">+ Tạo Campaign</button>
         </div>`
      : `<div class="grid-3">${cards}</div>`
    }`;

  // Tab filter
  $$('.tab-btn[data-cfilter]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.campaignFilter = btn.dataset.cfilter;
      renderCampaigns();
    });
  });

  // New campaign
  ['newCampaign', 'newCampaign2'].forEach(id => {
    const btn = $(`#${id}`);
    if (btn) btn.addEventListener('click', openNewCampaignModal);
  });

  // Edit
  $$('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = state.campaigns.find(x => x.id == btn.dataset.edit);
      if (c) openEditCampaignModal(c);
    });
  });

  // Delete
  $$('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = state.campaigns.find(x => x.id == btn.dataset.delete);
      if (!c) return;
      openModal('Xác nhận xóa',
        `<p>Bạn có chắc muốn xóa campaign <strong>"${esc(c.name)}"</strong>?</p>`,
        `<button class="btn btn-ghost" onclick="closeModal()">Hủy</button>
         <button class="btn btn-danger" id="confirmDelete">Xóa</button>`);
      $('#confirmDelete').addEventListener('click', () => {
        state.campaigns = state.campaigns.filter(x => x.id != btn.dataset.delete);
        saveState();
        closeModal();
        renderCampaigns();
        toast('Đã xóa campaign', 'info');
      });
    });
  });

  // Brief
  $$('[data-brief]').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = state.campaigns.find(x => x.id == btn.dataset.brief);
      if (!c) return;
      const status = DATA.statusConfig[c.status];
      openModal(`📋 Campaign Brief: ${c.name}`, `
        <div style="display:grid;gap:14px">
          <div><strong>Trạng thái:</strong> <span class="badge ${status?.class||'badge-gray'}">${status?.label||c.status}</span></div>
          <div><strong>Thời gian:</strong> ${formatDate(c.startDate)} → ${formatDate(c.endDate)}</div>
          <div><strong>Budget:</strong> ${esc(c.budget)} đ</div>
          <div><strong>Nền tảng:</strong> ${c.platforms.map(p => DATA.platformEmoji[p]+' '+p).join(' | ')}</div>
          ${c.kol ? `<div><strong>KOL:</strong> ${esc(c.kol)}</div>` : ''}
          <div><strong>Mô tả:</strong><br>${esc(c.desc||c.description||'')}</div>
          <div class="progress-bar"><div class="progress-fill" style="width:${c.progress||0}%"></div></div>
          <div style="font-size:12px;color:var(--text-muted)">Tiến độ: ${c.progress||0}%</div>
        </div>
      `, '<button class="btn btn-ghost" onclick="closeModal()">Đóng</button><button class="btn btn-primary" onclick="window.print()">🖨️ In Brief</button>', false);
    });
  });
}

function campaignFormHTML(c = {}) {
  const platOpts = ['tiktok','facebook','douyin','rednote','shopee'].map(p =>
    `<label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
      <input type="checkbox" name="platform" value="${p}" ${(c.platforms||[]).includes(p)?'checked':''}> ${DATA.platformEmoji[p]||''} ${p}
    </label>`).join('');

  return `
    <div class="form-group"><label class="form-label">Tên Campaign *</label>
      <input class="form-control" id="cf_name" value="${esc(c.name||'')}" placeholder="VD: Ra mắt Serum Vitamin C"></div>
    <div class="grid-2">
      <div class="form-group"><label class="form-label">Ngày bắt đầu</label>
        <input class="form-control" type="date" id="cf_start" value="${c.startDate||''}"></div>
      <div class="form-group"><label class="form-label">Ngày kết thúc</label>
        <input class="form-control" type="date" id="cf_end" value="${c.endDate||''}"></div>
    </div>
    <div class="grid-2">
      <div class="form-group"><label class="form-label">Budget (đ)</label>
        <input class="form-control" id="cf_budget" value="${esc(c.budget||'')}" placeholder="VD: 50,000,000"></div>
      <div class="form-group"><label class="form-label">Trạng thái</label>
        <select class="form-control" id="cf_status">
          ${['planning','active','completed','paused'].map(s =>
            `<option value="${s}" ${c.status===s?'selected':''}>${DATA.statusConfig[s]?.label||s}</option>`
          ).join('')}
        </select></div>
    </div>
    <div class="form-group"><label class="form-label">Nền tảng</label>
      <div style="display:flex;flex-wrap:wrap;gap:12px">${platOpts}</div></div>
    <div class="form-group"><label class="form-label">KOL/KOC</label>
      <input class="form-control" id="cf_kol" value="${esc(c.kol||'')}" placeholder="VD: Tier 2 (10 người)"></div>
    <div class="form-group"><label class="form-label">Tiến độ (%)</label>
      <input class="form-control" type="number" min="0" max="100" id="cf_progress" value="${c.progress||0}"></div>
    <div class="form-group"><label class="form-label">Mô tả</label>
      <textarea class="form-control" id="cf_desc" placeholder="Mô tả mục tiêu, thông điệp campaign...">${esc(c.description||c.desc||'')}</textarea></div>`;
}

function collectCampaignForm() {
  const platforms = [...document.querySelectorAll('input[name="platform"]:checked')].map(el => el.value);
  return {
    name:        $('#cf_name').value.trim(),
    startDate:   $('#cf_start').value,
    endDate:     $('#cf_end').value,
    budget:      $('#cf_budget').value.trim(),
    status:      $('#cf_status').value,
    kol:         $('#cf_kol').value.trim(),
    progress:    parseInt($('#cf_progress').value) || 0,
    description: $('#cf_desc').value.trim(),
    platforms
  };
}

function openNewCampaignModal() {
  openModal('+ Tạo Campaign mới', campaignFormHTML(), `
    <button class="btn btn-ghost" onclick="closeModal()">Hủy</button>
    <button class="btn btn-primary" id="saveCampaign">Lưu Campaign</button>`, true);
  $('#saveCampaign').addEventListener('click', () => {
    const data = collectCampaignForm();
    if (!data.name) { toast('Nhập tên campaign', 'warning'); return; }
    data.id = genId();
    state.campaigns.unshift(data);
    saveState();
    closeModal();
    renderCampaigns();
    toast(`Đã tạo campaign: ${data.name}`, 'success');
  });
}

function openEditCampaignModal(c) {
  openModal(`✏️ Sửa: ${c.name}`, campaignFormHTML(c), `
    <button class="btn btn-ghost" onclick="closeModal()">Hủy</button>
    <button class="btn btn-primary" id="saveCampaign">Lưu thay đổi</button>`, true);
  $('#saveCampaign').addEventListener('click', () => {
    const data = collectCampaignForm();
    if (!data.name) { toast('Nhập tên campaign', 'warning'); return; }
    Object.assign(c, data);
    saveState();
    closeModal();
    renderCampaigns();
    toast('Đã cập nhật campaign', 'success');
  });
}
