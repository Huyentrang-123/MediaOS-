/* ============================================================
   MediaOS — Trends Page
   ============================================================ */

'use strict';

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
      <div class="card" style="grid-column:1/-1">
        <div class="section-title mb-16">🏷️ Hashtag trending theo nền tảng</div>
        <div style="overflow-x:auto">
          <table class="hashtag-table">
            <thead>
              <tr><th>Hashtag</th><th>Nền tảng</th><th>Khu vực</th><th>Số bài</th><th>Tăng trưởng</th><th>Trạng thái</th></tr>
            </thead>
            <tbody>${hashtagRows}</tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <div class="section-title mb-16">📦 Category đang hot nhất</div>
        ${catBars}
      </div>

      <div class="card">
        <div class="section-title mb-16">🎬 Hiệu quả theo format video</div>
        <div class="grid-2" style="gap:12px">${formatCards}</div>
      </div>
    </div>

    <div class="card" style="border-left:4px solid var(--primary)">
      <div class="section-title mb-12">📅 Dịp quan trọng sắp tới</div>
      <div class="grid-3" style="gap:12px">
        ${[
          { icon:'🧧', name:'Tết Ất Tỵ 2025',       date:'29/01/2025', note:'Son môi đỏ, gift set, brightening' },
          { icon:'💝', name:'Valentine 14/2',         date:'14/02/2025', note:'Perfume, gift set đôi, makeup glam' },
          { icon:'👩', name:'Quốc tế Phụ nữ 8/3',   date:'08/03/2025', note:'Premium skincare, self-care bundle' }
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
