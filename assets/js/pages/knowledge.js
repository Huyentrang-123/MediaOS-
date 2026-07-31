/* ============================================================
   MediaOS — Knowledge Base Page
   ============================================================ */

'use strict';

function renderKnowledge() {
  const container = $('#pageContainer');

  const catChips = DATA.articleCategories.map(c =>
    `<button class="chip chip-light ${state.knowledgeFilter===c.id?'active':''}" data-cat="${c.id}">${c.label}</button>`
  ).join('');

  const catLabels = {
    strategy: '🎯 Chiến lược',
    platform: '📱 Nền tảng',
    creative: '✏️ Sáng tạo',
    analytics: '📊 Phân tích'
  };

  const filtered = DATA.articles.filter(a => {
    const catMatch = state.knowledgeFilter === 'all' || a.category === state.knowledgeFilter;
    const qMatch   = !state.knowledgeQuery ||
      a.title.toLowerCase().includes(state.knowledgeQuery.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(state.knowledgeQuery.toLowerCase()));
    return catMatch && qMatch;
  });

  const articleCards = filtered.map(a => `
    <div class="article-card" data-article="${a.id}">
      <div class="article-category">
        <span class="badge badge-${a.category==='strategy'?'primary':a.category==='platform'?'info':a.category==='creative'?'success':'warning'}">
          ${catLabels[a.category] || a.category}
        </span>
      </div>
      <div class="article-title">${esc(a.title)}</div>
      <div class="article-excerpt">${esc(a.excerpt)}</div>
      <div class="article-meta">
        <span>⏱️ ${a.readTime}</span>
        ${a.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>`).join('');

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title">📚 Knowledge Base</div>
      <div class="page-subtitle">Tài liệu hướng dẫn, chiến lược và best practice cho team content mỹ phẩm</div>
    </div>

    <div class="knowledge-search-bar">
      <div class="search-box">
        <input class="search-input" id="kbSearch" placeholder="Tìm bài viết..." value="${esc(state.knowledgeQuery)}" type="text">
        <button class="search-btn" id="kbSearchBtn">🔍</button>
      </div>
      <div class="chip-group">${catChips}</div>
    </div>

    ${filtered.length === 0
      ? `<div class="empty-state">
           <div class="empty-state-icon">📭</div>
           <div class="empty-state-title">Không tìm thấy bài viết</div>
           <div class="empty-state-desc">Thử từ khóa khác hoặc chọn danh mục khác</div>
         </div>`
      : `<div class="grid-auto">${articleCards}</div>`
    }`;

  // Category filter
  $$('.chip[data-cat]').forEach(chip => {
    chip.addEventListener('click', () => {
      state.knowledgeFilter = chip.dataset.cat;
      $$('.chip[data-cat]').forEach(c => c.classList.toggle('active', c.dataset.cat === state.knowledgeFilter));
      renderKnowledge();
    });
  });

  // Search
  const doKbSearch = () => {
    state.knowledgeQuery = $('#kbSearch').value.trim();
    renderKnowledge();
  };
  $('#kbSearchBtn').addEventListener('click', doKbSearch);
  $('#kbSearch').addEventListener('keydown', e => { if (e.key === 'Enter') doKbSearch(); });

  // Article click — open in modal
  $$('.article-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.article);
      const article = DATA.articles.find(a => a.id === id);
      if (!article) return;
      const catLabelsMap = {
        strategy: '🎯 Chiến lược',
        platform: '📱 Nền tảng',
        creative: '✏️ Sáng tạo',
        analytics: '📊 Phân tích'
      };
      openModal(article.title, `
        <div style="margin-bottom:16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span class="badge badge-primary">${catLabelsMap[article.category] || article.category}</span>
          <span style="font-size:12px;color:var(--text-muted)">⏱️ ${article.readTime}</span>
          ${article.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="article-content">${article.content}</div>
      `, '<button class="btn btn-ghost" onclick="closeModal()">Đóng</button>', true);
    });
  });
}
