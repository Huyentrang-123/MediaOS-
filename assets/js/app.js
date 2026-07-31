/* ============================================================
   MediaOS — Application Logic
   ============================================================ */

'use strict';

/* --- State --- */
const state = {
  page: 'research',
  theme: localStorage.getItem('lc_theme') || 'light',
  search: {
    query: '',
    regions: ['global'],
    platform: 'all',
    category: 'all',
    sortBy: 'relevance',
    tab: 'keyword',
    results: [],
    hasSearched: false
  },
  savedVideos: JSON.parse(localStorage.getItem('lc_saved') || '[]'),
  campaigns: JSON.parse(localStorage.getItem('lc_campaigns') || 'null') || DATA.campaigns,
  ideas: JSON.parse(localStorage.getItem('lc_ideas') || 'null') || DATA.ideas,
  knowledgeFilter: 'all',
  knowledgeQuery: '',
  campaignFilter: 'all',
  modalStack: []
};

/* --- Persistence --- */
function persist(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
}

function saveState() {
  persist('lc_saved', state.savedVideos);
  persist('lc_campaigns', state.campaigns);
  persist('lc_ideas', state.ideas);
}

/* --- Utils --- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function genId() {
  return Date.now() + Math.random().toString(36).slice(2, 7);
}

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric' });
}

function parseMetric(s) {
  if (!s) return 0;
  const n = parseFloat(s);
  if (String(s).includes('M')) return n * 1000000;
  if (String(s).includes('K')) return n * 1000;
  return n;
}

function getVideoUrl(v) {
  const q = encodeURIComponent(v.tags[0] || 'skincare');
  const map = {
    tiktok:   `https://www.tiktok.com/search?q=${q}`,
    facebook: `https://www.facebook.com/search/videos?q=${q}`,
    douyin:   `https://www.douyin.com/search/${q}`,
    rednote:  `https://www.xiaohongshu.com/search_result?keyword=${q}&source=unknown&type=51`
  };
  return map[v.platform] || map.tiktok;
}

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

/* --- Navigation --- */
const PAGE_TITLES = {
  research: 'Viral Research Hub',
  trends: 'Trend Analysis',
  knowledge: 'Knowledge Base',
  campaigns: 'Campaigns',
  ideas: 'Ideas Board',
  team: 'Team',
  guidelines: 'Guidelines & SOP'
};

function navigate(page) {
  if (!PAGE_TITLES[page]) page = 'research';
  state.page = page;

  $$('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  $('#topbarTitle').textContent = PAGE_TITLES[page];
  window.location.hash = page;

  const container = $('#pageContainer');
  container.innerHTML = '';

  const renderers = {
    research: renderResearch,
    trends: renderTrends,
    knowledge: renderKnowledge,
    campaigns: renderCampaigns,
    ideas: renderIdeas,
    team: renderTeam,
    guidelines: renderGuidelines
  };

  renderers[page]();

  // close mobile sidebar
  $('#sidebar').classList.remove('mobile-open');
  $('#sidebarOverlay').classList.remove('visible');
}

/* ============================================================
   RESEARCH PAGE
   ============================================================ */
function renderResearch() {
  const saved = state.savedVideos;
  const container = $('#pageContainer');

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title">📊 Viral Content Research Hub</div>
      <div class="page-subtitle">Tìm kiếm video viral mỹ phẩm toàn cầu — Hàn Quốc, Trung Quốc, Đài Loan, Nhật Bản, Thái Lan, Mỹ...</div>
    </div>

    <!-- Tabs -->
    <div class="tabs" id="researchTabs">
      <button class="tab-btn ${state.search.tab==='keyword'?'active':''}" data-tab="keyword">🔍 Tìm từ khóa</button>
      <button class="tab-btn ${state.search.tab==='similar'?'active':''}" data-tab="similar">🔄 Tìm video tương tự</button>
      <button class="tab-btn ${state.search.tab==='watchlist'?'active':''}" data-tab="watchlist">📌 Video đã lưu <span class="section-count">${saved.length}</span></button>
    </div>

    <div id="tabContent"></div>
  `;

  renderResearchTab(state.search.tab);

  // Tab listeners
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
  if (tab === 'keyword') renderKeywordTab(container);
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
    const regionMatch = state.search.regions.includes('global') || state.search.regions.includes(v.region);
    const platformMatch = state.search.platform === 'all' || v.platform === state.search.platform;
    const categoryMatch = state.search.category === 'all' || v.category === state.search.category;
    const queryMatch = !state.search.query ||
      v.title.toLowerCase().includes(state.search.query.toLowerCase()) ||
      v.tags.some(t => t.toLowerCase().includes(state.search.query.toLowerCase())) ||
      v.author.toLowerCase().includes(state.search.query.toLowerCase());
    return regionMatch && platformMatch && categoryMatch && queryMatch;
  });

  // Sort
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
    { label:'🎵 TikTok',        url:`https://www.tiktok.com/search?q=${q}`,                                                     cls:'tiktok'   },
    { label:'👤 Facebook',      url:`https://www.facebook.com/search/videos?q=${q}`,                                            cls:'facebook'  },
    { label:'🎬 Douyin',        url:`https://www.douyin.com/search/${q}`,                                                        cls:'douyin'   },
    { label:'📕 RedNote',       url:`https://www.xiaohongshu.com/search_result?keyword=${q}&source=unknown&type=51`,             cls:'rednote'  }
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
      <div style="font-size:12px;color:var(--text-muted)">Sắp xếp: ${sortLabel[state.search.sortBy]||''}</div>
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
  const trendBadge = v.trending ? '<span class="badge badge-error" style="font-size:10px;padding:2px 6px">🔥 Trending</span>' : '';

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
        toast(`Đã lưu: ${video.title.substring(0,40)}...`, 'success');
      } else {
        state.savedVideos.splice(idx, 1);
        btn.textContent = '☆ Lưu';
        toast('Đã bỏ lưu video', 'info');
      }
      saveState();
      // update tab count
      const tabCount = $('.section-count', $('.tab-btn[data-tab="watchlist"]'));
      if (tabCount) tabCount.textContent = state.savedVideos.length;
    });
  });

}

/* ============================================================
   TRENDS PAGE
   ============================================================ */
function renderTrends() {
  const { trending } = DATA;
  const container = $('#pageContainer');

  const hashtagRows = trending.hashtags.map(h => `
    <tr>
      <td><span class="hashtag-name">${esc(h.tag)}</span></td>
      <td>${DATA.platformEmoji[h.platform] || h.platform} ${h.platform}</td>
      <td>${h.region.toUpperCase()}</td>
      <td style="font-weight:700">${h.posts}</td>
      <td><span style="color:${h.growth.startsWith('+')?'var(--success)':'var(--error)'};font-weight:700">${h.growth}</span></td>
      <td>${h.hot ? '<span class="badge badge-error">🔥 Hot</span>' : '<span class="badge badge-gray">Bình thường</span>'}</td>
    </tr>`).join('');

  const catBars = trending.categories.map(c => `
    <div class="trend-bar-item">
      <div class="trend-bar-label">${esc(c.name)}</div>
      <div class="trend-bar-track"><div class="trend-bar-fill" style="width:${c.share}%"></div></div>
      <div class="trend-bar-value">${c.share}%</div>
      <span style="font-size:14px">${c.trend==='up'?'📈':c.trend==='down'?'📉':'➡️'}</span>
    </div>`).join('');

  const formatCards = trending.formats.map(f => `
    <div class="card" style="text-align:center">
      <div style="font-size:32px;margin-bottom:8px">${f.icon}</div>
      <div style="font-size:13px;font-weight:700;color:var(--text-primary);margin-bottom:8px">${esc(f.format)}</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${f.effectiveness}%"></div></div>
      <div style="font-size:12px;color:var(--text-secondary);margin-top:6px">Hiệu quả: <strong style="color:var(--primary)">${f.effectiveness}%</strong></div>
    </div>`).join('');

  container.innerHTML = `
    <div class="page-header">
      <div class="page-title">📈 Trend Analysis</div>
      <div class="page-subtitle">Xu hướng nội dung mỹ phẩm theo thời gian thực — cập nhật hàng tuần</div>
    </div>

    <!-- Stats -->
    <div class="trend-stat-grid mb-24">
      <div class="stat-card">
        <div class="stat-number">2.4M</div>
        <div class="stat-label">Videos viral tuần này</div>
        <div class="stat-change up">↑ 12% so với tuần trước</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">89</div>
        <div class="stat-label">Hashtag trending</div>
        <div class="stat-change up">↑ 7 hashtag mới</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">6</div>
        <div class="stat-label">Format nội dung hot</div>
        <div class="stat-change up">Before/After dẫn đầu</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">4</div>
        <div class="stat-label">Khu vực đang bùng nổ</div>
        <div class="stat-change up">VN, KR, CN, JP</div>
      </div>
    </div>

    <div class="grid-2 mb-24">
      <!-- Hashtag Table -->
      <div class="card" style="grid-column:1/-1">
        <div class="section-title mb-16">🏷️ Hashtag trending theo nền tảng</div>
        <div style="overflow-x:auto">
          <table class="hashtag-table">
            <thead>
              <tr>
                <th>Hashtag</th><th>Nền tảng</th><th>Khu vực</th><th>Số bài</th><th>Tăng trưởng</th><th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>${hashtagRows}</tbody>
          </table>
        </div>
      </div>

      <!-- Category bar chart -->
      <div class="card">
        <div class="section-title mb-16">📦 Category đang hot nhất</div>
        ${catBars}
      </div>

      <!-- Format effectiveness -->
      <div class="card">
        <div class="section-title mb-16">🎬 Hiệu quả theo format video</div>
        <div class="grid-2" style="gap:12px">${formatCards}</div>
      </div>
    </div>

    <!-- Calendar note -->
    <div class="card card" style="border-left:4px solid var(--primary)">
      <div class="section-title mb-12">📅 Dịp quan trọng sắp tới</div>
      <div class="grid-3" style="gap:12px">
        ${[
          { icon:'🧧', name:'Tết Ất Tỵ 2025', date:'29/01/2025', note:'Son môi đỏ, gift set, brightening' },
          { icon:'💝', name:'Valentine 14/2', date:'14/02/2025', note:'Perfume, gift set đôi, makeup glam' },
          { icon:'👩', name:'Quốc tế Phụ nữ 8/3', date:'08/03/2025', note:'Premium skincare, self-care bundle' }
        ].map(e => `
          <div style="background:var(--main-bg);border-radius:8px;padding:14px">
            <div style="font-size:24px;margin-bottom:6px">${e.icon}</div>
            <div style="font-weight:700;font-size:13px;color:var(--text-primary)">${e.name}</div>
            <div style="font-size:12px;color:var(--primary);font-weight:700;margin-bottom:4px">${e.date}</div>
            <div style="font-size:12px;color:var(--text-secondary)">${e.note}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

/* ============================================================
   KNOWLEDGE BASE
   ============================================================ */
function renderKnowledge() {
  const container = $('#pageContainer');

  const catChips = DATA.articleCategories.map(c =>
    `<button class="chip chip-light ${state.knowledgeFilter===c.id?'active':''}" data-cat="${c.id}">${c.label}</button>`
  ).join('');

  const catLabels = { strategy:'🎯 Chiến lược', platform:'📱 Nền tảng', creative:'✏️ Sáng tạo', analytics:'📊 Phân tích' };

  const filtered = DATA.articles.filter(a => {
    const catMatch = state.knowledgeFilter === 'all' || a.category === state.knowledgeFilter;
    const qMatch = !state.knowledgeQuery ||
      a.title.toLowerCase().includes(state.knowledgeQuery.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(state.knowledgeQuery.toLowerCase()));
    return catMatch && qMatch;
  });

  const articleCards = filtered.map(a => `
    <div class="article-card" data-article="${a.id}">
      <div class="article-category"><span class="badge badge-${a.category==='strategy'?'primary':a.category==='platform'?'info':a.category==='creative'?'success':'warning'}">${catLabels[a.category] || a.category}</span></div>
      <div class="article-title">${esc(a.title)}</div>
      <div class="article-excerpt">${esc(a.excerpt)}</div>
      <div class="article-meta">
        <span>⏱️ ${a.readTime}</span>
        ${a.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
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

    ${filtered.length === 0 ?
      `<div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-title">Không tìm thấy bài viết</div><div class="empty-state-desc">Thử từ khóa khác hoặc chọn danh mục khác</div></div>` :
      `<div class="grid-auto">${articleCards}</div>`
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

  // Article click
  $$('.article-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.article);
      const article = DATA.articles.find(a => a.id === id);
      if (!article) return;
      const catLabelsMap = { strategy:'🎯 Chiến lược', platform:'📱 Nền tảng', creative:'✏️ Sáng tạo', analytics:'📊 Phân tích' };
      openModal(article.title, `
        <div style="margin-bottom:16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <span class="badge badge-primary">${catLabelsMap[article.category] || article.category}</span>
          <span style="font-size:12px;color:var(--text-muted)">⏱️ ${article.readTime}</span>
          ${article.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="article-content">${article.content}</div>
      `, '<button class="btn btn-ghost" onclick="closeModal()">Đóng</button>', true);
    });
  });
}

/* ============================================================
   CAMPAIGNS PAGE
   ============================================================ */
function renderCampaigns() {
  const container = $('#pageContainer');
  const statusConfig = DATA.statusConfig;

  const filtered = state.campaigns.filter(c =>
    state.campaignFilter === 'all' || c.status === state.campaignFilter
  );

  const statusTabs = [
    { id:'all', label:'Tất cả' },
    { id:'active', label:'Đang chạy' },
    { id:'planning', label:'Lên kế hoạch' },
    { id:'completed', label:'Hoàn thành' }
  ];

  const tabsHTML = statusTabs.map(t => `
    <button class="tab-btn ${state.campaignFilter===t.id?'active':''}" data-cfilter="${t.id}">
      ${t.label} <span class="section-count">${t.id==='all'?state.campaigns.length:state.campaigns.filter(c=>c.status===t.id).length}</span>
    </button>`).join('');

  const cards = filtered.map(c => `
    <div class="campaign-card">
      <div class="campaign-header">
        <div class="campaign-name">${esc(c.name)}</div>
        <span class="badge ${statusConfig[c.status]?.class || 'badge-gray'}">${statusConfig[c.status]?.label || c.status}</span>
      </div>
      <div class="campaign-platforms">${c.platforms.map(p=>`<span class="campaign-platform" title="${p}">${DATA.platformEmoji[p]||p}</span>`).join('')}</div>
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

    ${filtered.length === 0 ?
      `<div class="empty-state"><div class="empty-state-icon">🗓️</div><div class="empty-state-title">Chưa có campaign nào</div><div class="empty-state-desc">Tạo campaign đầu tiên để bắt đầu theo dõi tiến độ</div><button class="btn btn-primary" id="newCampaign2">+ Tạo Campaign</button></div>` :
      `<div class="grid-3">${cards}</div>`
    }`;

  // Tab filter
  $$('.tab-btn[data-cfilter]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.campaignFilter = btn.dataset.cfilter;
      renderCampaigns();
    });
  });

  // New campaign
  ['newCampaign','newCampaign2'].forEach(id => {
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
      openModal('Xác nhận xóa', `<p>Bạn có chắc muốn xóa campaign <strong>"${esc(c.name)}"</strong>?</p>`,
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
          <div><strong>Nền tảng:</strong> ${c.platforms.map(p=>DATA.platformEmoji[p]+' '+p).join(' | ')}</div>
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
          ${['planning','active','completed','paused'].map(s => `<option value="${s}" ${c.status===s?'selected':''}>${DATA.statusConfig[s]?.label||s}</option>`).join('')}
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
    name: $('#cf_name').value.trim(),
    startDate: $('#cf_start').value,
    endDate: $('#cf_end').value,
    budget: $('#cf_budget').value.trim(),
    status: $('#cf_status').value,
    kol: $('#cf_kol').value.trim(),
    progress: parseInt($('#cf_progress').value) || 0,
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

/* ============================================================
   IDEAS PAGE
   ============================================================ */
function renderIdeas() {
  const container = $('#pageContainer');
  const statuses = ['new', 'in-progress', 'done'];
  const statusLabels = { new:'💡 Ý tưởng mới', 'in-progress':'⚡ Đang thực hiện', done:'✅ Hoàn thành' };
  const statusColors = { new:'#3182ce', 'in-progress':'#d69e2e', done:'#38a169' };

  const colsHTML = statuses.map(status => {
    const ideas = state.ideas.filter(i => i.status === status);
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

  // Add buttons
  $$('.add-idea-btn').forEach(btn => {
    btn.addEventListener('click', () => openIdeaModal(null, btn.dataset.add));
  });

  $('#newIdea').addEventListener('click', () => openIdeaModal(null, 'new'));

  // Idea cards
  attachIdeaHandlers();
}

function ideaCardHTML(idea) {
  const cfg = DATA.ideaStatusConfig;
  const prCfg = DATA.priorityConfig[idea.priority] || { label:'?', emoji:'⚪' };
  const nextStatus = cfg[idea.status]?.next;
  const nextLabel = cfg[idea.status]?.nextLabel || '';

  return `
    <div class="idea-card" data-idea="${idea.id}">
      <div class="idea-card-header">
        <div class="idea-title">${esc(idea.title)}</div>
        <span class="idea-priority" title="Ưu tiên ${prCfg.label}">${prCfg.emoji}</span>
      </div>
      <div class="idea-desc">${esc(idea.description || '')}</div>
      <div class="idea-footer">
        <div class="idea-tags">${(idea.tags||[]).slice(0,2).map(t=>`<span class="tag">#${t}</span>`).join('')}</div>
        ${nextStatus ? `<button class="idea-move-btn" data-move="${idea.id}" data-to="${nextStatus}">${nextLabel}</button>` : ''}
      </div>
    </div>`;
}

function attachIdeaHandlers() {
  $$('.idea-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.idea-move-btn')) return;
      const id = card.dataset.idea;
      const idea = state.ideas.find(i => i.id == id || i.id === id);
      if (idea) openIdeaModal(idea, idea.status);
    });
  });

  $$('.idea-move-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.dataset.move;
      const to = btn.dataset.to;
      const idea = state.ideas.find(i => i.id == id || i.id === id);
      if (idea) {
        idea.status = to;
        saveState();
        renderIdeas();
        toast(`Đã chuyển: "${idea.title.substring(0,30)}"`, 'success');
      }
    });
  });
}

function openIdeaModal(idea = null, defaultStatus = 'new') {
  const isEdit = !!idea;
  const title = isEdit ? `✏️ ${idea.title}` : '+ Ý tưởng mới';

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
      status: $('#if_status').value,
      priority: $('#if_priority').value,
      category: $('#if_category').value.trim(),
      description: $('#if_desc').value.trim(),
      tags: $('#if_tags').value.split(',').map(t=>t.trim()).filter(Boolean)
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

/* ============================================================
   TEAM PAGE
   ============================================================ */
function renderTeam() {
  const container = $('#pageContainer');

  const cards = DATA.team.map(m => `
    <div class="team-card">
      <div class="team-avatar">${m.emoji}</div>
      <div class="team-name">${esc(m.name)}</div>
      <div class="team-role">${esc(m.role)}</div>
      <div class="team-skills">${m.skills.map(s=>`<span class="badge badge-gray">${s}</span>`).join('')}</div>
      <div class="team-email">✉️ ${esc(m.email)}</div>
      ${m.note ? `<div style="font-size:12px;color:var(--text-secondary);margin-top:10px;line-height:1.5">${esc(m.note)}</div>` : ''}
    </div>`).join('');

  container.innerHTML = `
    <div class="page-header flex justify-between items-center">
      <div>
        <div class="page-title">👥 Team</div>
        <div class="page-subtitle">Thành viên team Content — MediaOS</div>
      </div>
    </div>

    <div class="team-grid">${cards}</div>

    <!-- Team Responsibilities -->
    <div class="card" style="margin-top:24px">
      <div class="section-title mb-16">📋 Phân công trách nhiệm</div>
      <div style="overflow-x:auto">
        <table class="hashtag-table">
          <thead>
            <tr><th>Vai trò</th><th>Phụ trách</th><th>Báo cáo hàng tuần</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Content Lead</strong></td><td>Chiến lược, Phê duyệt nội dung, Họp team</td><td>Content performance report</td></tr>
            <tr><td><strong>Video Creator</strong></td><td>Quay & edit video TikTok, Reels, YouTube</td><td>Video production log</td></tr>
            <tr><td><strong>Social Media Manager</strong></td><td>Lên lịch đăng, Community management, Báo cáo</td><td>Engagement & reach metrics</td></tr>
            <tr><td><strong>Research Analyst</strong></td><td>Nghiên cứu xu hướng, Phân tích competitors</td><td>Trend report + Competitor analysis</td></tr>
            <tr><td><strong>KOL Manager</strong></td><td>Tìm kiếm, Đàm phán và quản lý KOL/KOC</td><td>KOL performance sheet</td></tr>
            <tr><td><strong>Graphic Designer</strong></td><td>Thiết kế thumbnail, infographic, branding assets</td><td>Design deliverables log</td></tr>
          </tbody>
        </table>
      </div>
    </div>`;
}

/* ============================================================
   GUIDELINES / SOP PAGE
   ============================================================ */
function renderGuidelines() {
  const container = $('#pageContainer');
  const guidelines = DATA.guidelines;
  const catIcons = { research:'🔍', production:'🎬', publishing:'📅', kol:'🤝', onboarding:'🎓' };
  const catNames = { research:'Nghiên cứu & Tìm kiếm', production:'Sản xuất nội dung', publishing:'Đăng bài & Báo cáo', kol:'Làm việc với KOL', onboarding:'Onboarding nhân viên mới' };

  const guidelineHTML = guidelines.map(g => {
    const stepsHTML = g.steps ? g.steps.map((s, i) => `
      <div class="sop-step">
        <div class="sop-step-num">${i + 1}</div>
        <div class="sop-step-content">
          <div class="sop-step-title">${esc(s.title)}</div>
          <div class="sop-step-desc">${esc(s.desc)}</div>
        </div>
      </div>`).join('') : '';

    const checklistHTML = g.checklist ? g.checklist.map(item => `
      <label class="checklist-item">
        <input type="checkbox" onchange="this.parentElement.classList.toggle('checked',this.checked)">
        <span>${esc(item)}</span>
      </label>`).join('') : '';

    return `
      <div class="accordion" id="acc-${g.id}">
        <div class="accordion-header" data-acc="${g.id}">
          <span>${g.icon} ${esc(g.title)}</span>
          <span class="accordion-icon">▼</span>
        </div>
        <div class="accordion-body">
          ${g.steps ? `<div class="sop-steps">${stepsHTML}</div>` : ''}
          ${g.checklist ? `
            <div style="margin-bottom:8px;font-size:12px;color:var(--text-secondary)">Đánh dấu các mục đã hoàn thành:</div>
            <div class="checklist">${checklistHTML}</div>` : ''}
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="page-header flex justify-between items-center">
      <div>
        <div class="page-title">📋 Guidelines & SOP</div>
        <div class="page-subtitle">Quy trình làm việc chuẩn dành cho team content và nhân viên mới</div>
      </div>
      <button class="btn btn-ghost" onclick="window.print()">🖨️ In tài liệu</button>
    </div>

    <!-- Quick nav -->
    <div class="chip-group mb-24">
      ${Object.keys(catNames).map(k => `
        <button class="chip chip-light" onclick="document.getElementById('cat-${k}')?.scrollIntoView({behavior:'smooth'})">${catIcons[k]} ${catNames[k]}</button>`).join('')}
    </div>

    <!-- Onboarding highlight -->
    <div class="card" style="border-left:4px solid var(--primary);margin-bottom:24px;background:var(--primary-muted)">
      <div style="font-size:15px;font-weight:800;color:var(--primary);margin-bottom:6px">🎓 Hướng dẫn Onboarding cho nhân viên mới</div>
      <div style="font-size:13px;color:var(--text-secondary)">Nếu bạn là nhân viên mới, hãy bắt đầu với <strong>Checklist Onboarding</strong> ở cuối trang này. Sau đó đọc lần lượt các SOP bên dưới theo thứ tự từ trên xuống.</div>
    </div>

    <div id="guidelinesList">${guidelineHTML}</div>

    <!-- Brand Guidelines -->
    <div class="guideline-section" style="margin-top:32px">
      <div class="guideline-section-title">🎨 Brand Guidelines cơ bản</div>
      <div class="grid-3">
        ${[
          { title:'Màu sắc thương hiệu', icon:'🎨', items:['Primary: #E8315A (đỏ hồng)', 'Secondary: #1A2035 (navy đen)', 'Accent: #FFD700 (vàng gold)', 'Text: #1A202C (đen mềm)'] },
          { title:'Giọng văn (Tone of Voice)', icon:'✍️', items:['Thân thiện & chuyên nghiệp', 'Không dùng ngôn ngữ quá formal', 'Sử dụng emoji có chọn lọc', 'Luôn hướng đến giải pháp cho khách'] },
          { title:'Điều KHÔNG được làm', icon:'🚫', items:['Không nói xấu đối thủ', 'Không cam kết kết quả 100%', 'Không đăng bài chưa được duyệt', 'Không dùng hình ảnh vi phạm bản quyền'] }
        ].map(b => `
          <div class="card">
            <div style="font-size:18px;margin-bottom:8px">${b.icon}</div>
            <div style="font-weight:700;font-size:13.5px;margin-bottom:10px;color:var(--text-primary)">${b.title}</div>
            <ul style="list-style:disc;padding-left:16px">${b.items.map(i=>`<li style="font-size:13px;color:var(--text-secondary);margin-bottom:5px">${esc(i)}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>
    </div>`;

  // Accordion toggle
  $$('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const acc = header.closest('.accordion');
      const isOpen = acc.classList.contains('open');
      // close all others
      $$('.accordion.open').forEach(a => a !== acc && a.classList.remove('open'));
      acc.classList.toggle('open', !isOpen);
    });
  });

  // Auto-open first one
  const firstAcc = $('.accordion');
  if (firstAcc) firstAcc.classList.add('open');
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  // Apply theme
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

// Expose closeModal globally for inline onclick
window.closeModal = closeModal;

// Start app
window.addEventListener('DOMContentLoaded', init);
