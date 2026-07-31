/* ============================================================
   MediaOS — Ideas Kanban Page
   ============================================================ */

'use strict';

function renderIdeas() {
  const container = $('#pageContainer');
  const statuses = ['new', 'in-progress', 'done'];
  const statusLabels = { new:'💡 Ý tưởng mới', 'in-progress':'⚡ Đang thực hiện', done:'✅ Hoàn thành' };
  const statusColors = { new:'#3182ce', 'in-progress':'#d69e2e', done:'#38a169' };

  const colsHTML = statuses.map(status => {
    const ideas     = state.ideas.filter(i => i.status === status);
    const cardsHTML = ideas.map(idea => ideaCardHTML(idea)).join('');
    return `
      <div class="kanban-col">
        <div class="kanban-col-header">
          <div class="kanban-col-title" style="color:${statusColors[status]}">${statusLabels[status]}</div>
          <span class="kanban-col-count">${ideas.length}</span>
        </div>
        <div id="col-${status}">${cardsHTML}</div>
        <button class="add-idea-btn" data-add="${status}">+ Thêm ý tưởng</button>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="page-header flex justify-between items-center">
      <div>
        <div class="page-title">💡 Ideas Board</div>
        <div class="page-subtitle">Quản lý và phát triển ý tưởng nội dung theo dạng Kanban</div>
      </div>
      <button class="btn btn-primary" id="newIdea">+ Thêm Ý tưởng</button>
    </div>
    <div class="kanban-board">${colsHTML}</div>`;

  $$('.add-idea-btn').forEach(btn => {
    btn.addEventListener('click', () => openIdeaModal(null, btn.dataset.add));
  });

  $('#newIdea').addEventListener('click', () => openIdeaModal(null, 'new'));

  attachIdeaHandlers();
}

function ideaCardHTML(idea) {
  const cfg   = DATA.ideaStatusConfig;
  const prCfg = DATA.priorityConfig[idea.priority] || { label:'?', emoji:'⚪' };
  const nextStatus = cfg[idea.status]?.next;
  const nextLabel  = cfg[idea.status]?.nextLabel || '';

  return `
    <div class="idea-card" data-idea="${idea.id}">
      <div class="idea-card-header">
        <div class="idea-title">${esc(idea.title)}</div>
        <span class="idea-priority" title="Ưu tiên ${prCfg.label}">${prCfg.emoji}</span>
      </div>
      <div class="idea-desc">${esc(idea.description || '')}</div>
      <div class="idea-footer">
        <div class="idea-tags">${(idea.tags||[]).slice(0,2).map(t => `<span class="tag">#${t}</span>`).join('')}</div>
        ${nextStatus ? `<button class="idea-move-btn" data-move="${idea.id}" data-to="${nextStatus}">${nextLabel}</button>` : ''}
      </div>
    </div>`;
}

function attachIdeaHandlers() {
  $$('.idea-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.idea-move-btn')) return;
      const id   = card.dataset.idea;
      const idea = state.ideas.find(i => i.id == id || i.id === id);
      if (idea) openIdeaModal(idea, idea.status);
    });
  });

  $$('.idea-move-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id   = btn.dataset.move;
      const to   = btn.dataset.to;
      const idea = state.ideas.find(i => i.id == id || i.id === id);
      if (idea) {
        idea.status = to;
        saveState();
        renderIdeas();
        toast(`Đã chuyển: "${idea.title.substring(0, 30)}"`, 'success');
      }
    });
  });
}

function openIdeaModal(idea = null, defaultStatus = 'new') {
  const isEdit = !!idea;
  const title  = isEdit ? `✏️ ${idea.title}` : '+ Ý tưởng mới';

  const statusOpts = Object.keys(DATA.ideaStatusConfig).map(s =>
    `<option value="${s}" ${(idea?.status||defaultStatus)===s?'selected':''}>${DATA.ideaStatusConfig[s].label}</option>`
  ).join('');

  const prOpts = Object.keys(DATA.priorityConfig).map(p =>
    `<option value="${p}" ${(idea?.priority||'medium')===p?'selected':''}>${DATA.priorityConfig[p].emoji} ${DATA.priorityConfig[p].label}</option>`
  ).join('');

  openModal(title, `
    <div class="form-group"><label class="form-label">Tiêu đề *</label>
      <input class="form-control" id="if_title" value="${esc(idea?.title||'')}" placeholder="VD: Before/After Challenge 30 ngày"></div>
    <div class="grid-2">
      <div class="form-group"><label class="form-label">Trạng thái</label>
        <select class="form-control" id="if_status">${statusOpts}</select></div>
      <div class="form-group"><label class="form-label">Ưu tiên</label>
        <select class="form-control" id="if_priority">${prOpts}</select></div>
    </div>
    <div class="form-group"><label class="form-label">Category</label>
      <input class="form-control" id="if_category" value="${esc(idea?.category||'')}" placeholder="VD: UGC, Tutorial, Review..."></div>
    <div class="form-group"><label class="form-label">Mô tả ý tưởng</label>
      <textarea class="form-control" id="if_desc" placeholder="Mô tả chi tiết ý tưởng nội dung...">${esc(idea?.description||'')}</textarea></div>
    <div class="form-group"><label class="form-label">Tags (cách nhau bởi dấu phẩy)</label>
      <input class="form-control" id="if_tags" value="${esc((idea?.tags||[]).join(', '))}" placeholder="VD: skincare, viral, ugc"></div>
    ${isEdit ? `<button class="btn btn-danger btn-sm" id="deleteIdea" style="margin-top:8px">🗑️ Xóa ý tưởng này</button>` : ''}
  `, `
    <button class="btn btn-ghost" onclick="closeModal()">Hủy</button>
    <button class="btn btn-primary" id="saveIdea">${isEdit ? 'Lưu thay đổi' : 'Thêm ý tưởng'}</button>`);

  $('#saveIdea').addEventListener('click', () => {
    const title = $('#if_title').value.trim();
    if (!title) { toast('Nhập tiêu đề ý tưởng', 'warning'); return; }
    const data = {
      title,
      status:      $('#if_status').value,
      priority:    $('#if_priority').value,
      category:    $('#if_category').value.trim(),
      description: $('#if_desc').value.trim(),
      tags:        $('#if_tags').value.split(',').map(t => t.trim()).filter(Boolean)
    };
    if (isEdit) {
      Object.assign(idea, data);
      toast('Đã cập nhật ý tưởng', 'success');
    } else {
      data.id = genId();
      state.ideas.unshift(data);
      toast(`Đã thêm: "${title}"`, 'success');
    }
    saveState();
    closeModal();
    renderIdeas();
  });

  if (isEdit) {
    $('#deleteIdea')?.addEventListener('click', () => {
      state.ideas = state.ideas.filter(i => i.id != idea.id && i.id !== idea.id);
      saveState();
      closeModal();
      renderIdeas();
      toast('Đã xóa ý tưởng', 'info');
    });
  }
}
