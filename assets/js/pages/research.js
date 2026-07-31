/* ============================================================
   MediaOS — Research Page
   ============================================================ */

'use strict';

function renderResearch() {
  const saved = state.savedVideos;
  const container = $('#pageContainer');

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title">📊 Viral Content Research Hub</div>
      <div class="page-subtitle">Tìm kiếm video viral mỹ phẩm toàn cầu — Hàn Quốc, Trung Quốc, Đài Loan, Nhật Bản, Thái Lan, Mỹ...</div>
    </div>

    <div class="tabs" id="researchTabs">
      <button class="tab-btn ${state.search.tab==='keyword'?'active':''}" data-tab="keyword">🔍 Tìm từ khóa</button>
      <button class="tab-btn ${state.search.tab==='similar'?'active':''}" data-tab="similar">🔄 Tìm video tương tự</button>
      <button class="tab-btn ${state.search.tab==='watchlist'?'active':''}" data-tab="watchlist">📌 Video đã lưu <span class="section-count">${saved.length}</span></button>
    </div>

    <div id="tabContent"></div>
  `;

  renderResearchTab(state.search.tab);

  $$('.tab-btn', $('#researchTabs')).forEach(btn => {
    btn.addEventListener('click', () => {
      state.search.tab = btn.dataset.tab;
      $$('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderResearchTab(state.search.tab);
    });
  });
}

function renderResearchTab(tab) {
  const container = $('#tabContent');
  if (tab === 'keyword')   renderKeywordTab(container);
  else if (tab === 'similar') renderSimilarTab(container);
  else renderWatchlistTab(container);
}

function renderKeywordTab(container) {
  const regionChips = DATA.regions.map(r => `
    <button class="chip ${state.search.regions.includes(r.id)?'active':''}" data-region="${r.id}">${r.label}</button>
  `).join('');

  const platformChips = DATA.platforms.map(p => `
    <button class="chip chip-platform ${state.search.platform===p.id?'active':''}" data-platform="${p.id}">${p.label}</button>
  `).join('');

  const categoryOpts = DATA.categories.map(c =>
    `<option value="${c.id}" ${state.search.category===c.id?'selected':''}>${c.label}</option>`
  ).join('');

  const sortOptions = [
    { id:'relevance', label:'⭐ Liên quan' },
    { id:'trending',  label:'🔥 Xu hướng 10 ngày' },
    { id:'views',     label:'👁️ Nhiều view nhất' },
    { id:'comments',  label:'💬 Nhiều comment nhất' }
  ];
  const sortChips = sortOptions.map(s => `
    <button class="chip chip-light ${state.search.sortBy===s.id?'active':''}" data-sort="${s.id}">${s.label}</button>
  `).join('');

  container.innerHTML = `
    <div class="research-hero">
      <div class="research-hero-title">🔍 Tìm kiếm nội dung</div>
      <div class="research-hero-sub">Tìm video viral mỹ phẩm đa quốc gia, đa nền tảng, đa ngôn ngữ</div>

      <div class="search-row">
        <div class="search-box search-box-dark">
          <input id="searchInput" class="search-input" type="text"
            placeholder="VD: serum viral, kem nám, before after skincare, 美白精华..."
            value="${esc(state.search.query)}">
          <button class="search-btn" id="doSearch">🔴 Tìm kiếm</button>
        </div>
      </div>

      <div class="region-label" style="margin-top:14px">KHU VỰC:</div>
      <div class="chip-group region-chips mb-12" id="regionChips">${regionChips}</div>

      <div class="filter-row mb-12">
        <div style="flex:1">
          <div class="region-label" style="margin-bottom:6px">NỀN TẢNG:</div>
          <div class="chip-group" id="platformChips">${platformChips}</div>
        </div>
        <div style="flex:1">
          <div class="region-label" style="margin-bottom:6px">LOẠI:</div>
          <select class="filter-select" id="categoryFilter">${categoryOpts}</select>
        </div>
      </div>

      <div class="region-label" style="margin-bottom:6px">SẮP XẾP THEO:</div>
      <div class="chip-group mb-4" id="sortChips">${sortChips}</div>
    </div>

    <div id="searchResults"></div>
  `;

  // Region chips
  $$('.chip[data-region]').forEach(chip => {
    chip.addEventListener('click', () => {
      const r = chip.dataset.region;
      if (r === 'global') {
        state.search.regions = ['global'];
      } else {
        state.search.regions = state.search.regions.filter(x => x !== 'global');
        if (state.search.regions.includes(r)) {
          state.search.regions = state.search.regions.filter(x => x !== r);
          if (state.search.regions.length === 0) state.search.regions = ['global'];
        } else {
          state.search.regions.push(r);
        }
      }
      $$('.chip[data-region]').forEach(c => {
        c.classList.toggle('active', state.search.regions.includes(c.dataset.region));
      });
      if (state.search.hasSearched) doSearch();
    });
  });

  // Platform chips
  $$('.chip[data-platform]').forEach(chip => {
    chip.addEventListener('click', () => {
      state.search.platform = chip.dataset.platform;
      $$('.chip[data-platform]').forEach(c => c.classList.toggle('active', c.dataset.platform === state.search.platform));
      if (state.search.hasSearched) doSearch();
    });
  });

  // Category filter
  $('#categoryFilter').addEventListener('change', e => {
    state.search.category = e.target.value;
    if (state.search.hasSearched) doSearch();
  });

  // Sort chips
  $$('.chip[data-sort]').forEach(chip => {
    chip.addEventListener('click', () => {
      state.search.sortBy = chip.dataset.sort;
      $$('.chip[data-sort]').forEach(c => c.classList.toggle('active', c.dataset.sort === state.search.sortBy));
      if (state.search.hasSearched) doSearch();
    });
  });

  // Search
  $('#doSearch').addEventListener('click', doSearch);
  $('#searchInput').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  if (state.search.hasSearched) renderSearchResults();
}

function doSearch() {
  state.search.query = $('#searchInput').value.trim();
  state.search.hasSearched = true;

  let results = DATA.videos.filter(v => {
    const regionMatch   = state.search.regions.includes('global') || state.search.regions.includes(v.region);
    const platformMatch = state.search.platform === 'all' || v.platform === state.search.platform;
    const categoryMatch = state.search.category === 'all' || v.category === state.search.category;
    const queryMatch    = !state.search.query ||
      v.title.toLowerCase().includes(state.search.query.toLowerCase()) ||
      v.tags.some(t => t.toLowerCase().includes(state.search.query.toLowerCase())) ||
      v.author.toLowerCase().includes(state.search.query.toLowerCase());
    return regionMatch && platformMatch && categoryMatch && queryMatch;
  });

  switch (state.search.sortBy) {
    case 'trending':
      results = results.filter(v => v.trending);
      break;
    case 'views':
      results.sort((a, b) => parseMetric(b.views) - parseMetric(a.views));
      break;
    case 'comments':
      results.sort((a, b) => parseMetric(b.comments) - parseMetric(a.comments));
      break;
  }

  state.search.results = results;
  renderSearchResults();
}

function renderSearchResults() {
  const container = $('#searchResults');
  if (!container) return;
  const results = state.search.results;
  const q = encodeURIComponent(state.search.query || 'skincare');
  const platformLinks = [
    { label:'🎵 TikTok',   url:`https://www.tiktok.com/search?q=${q}`,                                                 cls:'tiktok'  },
    { label:'👤 Facebook', url:`https://www.facebook.com/search/videos?q=${q}`,                                        cls:'facebook' },
    { label:'🎬 Douyin',   url:`https://www.douyin.com/search/${q}`,                                                    cls:'douyin'  },
    { label:'📕 RedNote',  url:`https://www.xiaohongshu.com/search_result?keyword=${q}&source=unknown&type=51`,         cls:'rednote' }
  ];

  const linksHTML = `
    <div style="margin-top:16px;margin-bottom:4px">
      <div class="region-label" style="margin-bottom:8px">🔗 XEM THÊM TRỰC TIẾP TRÊN NỀN TẢNG:</div>
      <div class="platform-links">${platformLinks.map(l =>
        `<a class="platform-link ${l.cls}" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`
      ).join('')}</div>
    </div>`;

  if (results.length === 0) {
    container.innerHTML = `
      ${linksHTML}
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-title">Không tìm thấy kết quả trong dữ liệu</div>
        <div class="empty-state-desc">Nhấn vào các nền tảng bên trên để tìm trực tiếp, hoặc thử đổi từ khóa / bộ lọc</div>
      </div>`;
    return;
  }

  const sortLabel = { relevance:'Liên quan', trending:'Xu hướng 10 ngày', views:'Nhiều view', comments:'Nhiều comment' };
  container.innerHTML = `
    ${linksHTML}
    <div class="section-header" style="margin-top:20px">
      <div class="section-title">📹 Kết quả tìm kiếm <span class="section-count">${results.length}</span></div>
      <div style="font-size:12px;color:var(--text-muted)">Sắp xếp: ${sortLabel[state.search.sortBy] || ''}</div>
    </div>
    <div class="grid-auto">
      ${results.map(v => videoCard(v)).join('')}
    </div>`;

  attachVideoHandlers(container);
}

function renderSimilarTab(container) {
  container.innerHTML = `
    <div class="card" style="margin-bottom:16px">
      <h3 style="font-size:15px;font-weight:700;margin-bottom:8px;color:var(--text-primary)">🔄 Tìm video tương tự</h3>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">Nhập URL video hoặc mô tả nội dung để tìm video có nội dung tương tự</p>
      <div class="search-box" style="margin-bottom:12px">
        <input class="search-input" id="similarInput" placeholder="Dán URL video TikTok / YouTube / mô tả nội dung..." type="text">
        <button class="search-btn" id="doSimilar">🔄 Tìm tương tự</button>
      </div>
      <div style="font-size:12px;color:var(--text-muted)">💡 Tip: Mô tả format video (VD: "before after skincare 30 ngày" hoặc "unboxing serum vitamin c")</div>
    </div>
    <div id="similarResults"></div>`;

  $('#doSimilar').addEventListener('click', () => {
    const q = $('#similarInput').value.trim();
    if (!q) { toast('Nhập URL hoặc mô tả video cần tìm', 'warning'); return; }
    const results = DATA.videos.slice().sort(() => Math.random() - 0.5).slice(0, 6);
    $('#similarResults').innerHTML = `
      <div class="section-header">
        <div class="section-title">✨ Video tương tự được đề xuất <span class="section-count">${results.length}</span></div>
      </div>
      <div class="grid-auto">${results.map(v => videoCard(v)).join('')}</div>`;
    attachVideoHandlers($('#similarResults'));
  });
}

function renderWatchlistTab(container) {
  const saved = state.savedVideos;
  container.innerHTML = `
    <div class="section-header">
      <div class="section-title">⭐ VIDEO ĐÃ LƯU <span class="section-count">${saved.length}</span></div>
      ${saved.length > 0 ? `<button class="btn btn-ghost btn-sm" id="clearSaved">🗑️ Xóa tất cả</button>` : ''}
    </div>
    ${saved.length === 0 ? `
      <div class="empty-state">
        <div class="empty-state-icon">📌</div>
        <div class="empty-state-title">Chưa có video nào được lưu</div>
        <div class="empty-state-desc">Tìm kiếm video và nhấn "Lưu" để thêm vào danh sách watchlist của bạn</div>
      </div>` :
      `<div class="grid-auto">${saved.map(v => videoCard(v, true)).join('')}</div>`
    }`;

  const clearBtn = $('#clearSaved');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.savedVideos = [];
      saveState();
      renderWatchlistTab(container);
      toast('Đã xóa tất cả video đã lưu', 'info');
    });
  }
  attachVideoHandlers(container);
}

function videoCard(v, isSaved = false) {
  const savedIds = state.savedVideos.map(x => x.id);
  const alreadySaved = savedIds.includes(v.id);
  const regionInfo = DATA.regions.find(r => r.id === v.region) || { label: v.region };
  const videoUrl = getVideoUrl(v);
  const trendBadge = v.trending
    ? '<span class="badge badge-error" style="font-size:10px;padding:2px 6px">🔥 Trending</span>'
    : '';

  return `
    <div class="video-card" data-id="${v.id}">
      <div class="video-thumb">
        <div class="video-platform-badge platform-${v.platform}">${DATA.platformEmoji[v.platform] || v.platform}</div>
        <span style="font-size:44px">${v.emoji}</span>
        <div class="video-duration">${v.duration}</div>
      </div>
      <div class="video-body">
        <a class="video-title video-title-link" href="${videoUrl}" target="_blank" rel="noopener" title="Xem trên ${v.platform}">${esc(v.title)}</a>
        <div class="video-author">${esc(v.author)} · ${regionInfo.label} ${trendBadge}</div>
        <div class="video-stats">
          <span class="video-stat">👁️ ${v.views}</span>
          <span class="video-stat">❤️ ${v.likes}</span>
          <span class="video-stat">💬 ${v.comments}</span>
          <span class="video-stat">🔗 ${v.shares}</span>
        </div>
        <div class="video-tags">${v.tags.slice(0,3).map(t => `<span class="tag">#${t}</span>`).join('')}</div>
        <div class="video-actions">
          <button class="btn btn-sm btn-ghost flex-1 save-btn" data-vid="${v.id}" title="${alreadySaved?'Bỏ lưu':'Lưu video'}">
            ${alreadySaved ? '⭐ Đã lưu' : '☆ Lưu'}
          </button>
          <a class="btn btn-sm btn-primary" href="${videoUrl}" target="_blank" rel="noopener">🔗 Xem</a>
        </div>
      </div>
    </div>`;
}

function attachVideoHandlers(container) {
  $$('.save-btn', container).forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.vid);
      const video = DATA.videos.find(v => v.id === id) ||
                    state.savedVideos.find(v => v.id === id);
      if (!video) return;
      const idx = state.savedVideos.findIndex(v => v.id === id);
      if (idx === -1) {
        state.savedVideos.push(video);
        btn.textContent = '⭐ Đã lưu';
        toast(`Đã lưu: ${video.title.substring(0, 40)}...`, 'success');
      } else {
        state.savedVideos.splice(idx, 1);
        btn.textContent = '☆ Lưu';
        toast('Đã bỏ lưu video', 'info');
      }
      saveState();
      const tabCount = $('.section-count', $('.tab-btn[data-tab="watchlist"]'));
      if (tabCount) tabCount.textContent = state.savedVideos.length;
    });
  });
}
