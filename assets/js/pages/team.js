/* ============================================================
   MediaOS — Team Page
   ============================================================ */

'use strict';

function renderTeam() {
  const container = $('#pageContainer');

  const cards = DATA.team.map(m => `
    <div class="team-card">
      <div class="team-avatar">${m.emoji}</div>
      <div class="team-name">${esc(m.name)}</div>
      <div class="team-role">${esc(m.role)}</div>
      <div class="team-skills">${m.skills.map(s => `<span class="badge badge-gray">${s}</span>`).join('')}</div>
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

    <div class="card" style="margin-top:24px">
      <div class="section-title mb-16">📋 Phân công trách nhiệm</div>
      <div style="overflow-x:auto">
        <table class="hashtag-table">
          <thead>
            <tr><th>Vai trò</th><th>Phụ trách</th><th>Báo cáo hàng tuần</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Content Lead</strong></td><td>Chiến lược, Phê duyệt nội dung, Họp team</td><td>Content performance report</td></tr>
            <tr><td><strong>Video Creator</strong></td><td>Quay &amp; edit video TikTok, Reels, YouTube</td><td>Video production log</td></tr>
            <tr><td><strong>Social Media Manager</strong></td><td>Lên lịch đăng, Community management, Báo cáo</td><td>Engagement &amp; reach metrics</td></tr>
            <tr><td><strong>Research Analyst</strong></td><td>Nghiên cứu xu hướng, Phân tích competitors</td><td>Trend report + Competitor analysis</td></tr>
            <tr><td><strong>KOL Manager</strong></td><td>Tìm kiếm, Đàm phán và quản lý KOL/KOC</td><td>KOL performance sheet</td></tr>
            <tr><td><strong>Graphic Designer</strong></td><td>Thiết kế thumbnail, infographic, branding assets</td><td>Design deliverables log</td></tr>
          </tbody>
        </table>
      </div>
    </div>`;
}
