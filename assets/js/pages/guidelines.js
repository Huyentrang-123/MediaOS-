/* ============================================================
   MediaOS — Guidelines & SOP Page
   ============================================================ */

'use strict';

function renderGuidelines() {
  const container = $('#pageContainer');
  const guidelines = DATA.guidelines;
  const catNames = {
    research:   'Nghiên cứu & Tìm kiếm',
    production: 'Sản xuất nội dung',
    publishing: 'Đăng bài & Báo cáo',
    kol:        'Làm việc với KOL',
    onboarding: 'Onboarding nhân viên mới'
  };
  const catIcons = {
    research:   '🔍',
    production: '🎬',
    publishing: '📅',
    kol:        '🤝',
    onboarding: '🎓'
  };

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
          ${g.steps    ? `<div class="sop-steps">${stepsHTML}</div>` : ''}
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

    <div class="chip-group mb-24">
      ${Object.keys(catNames).map(k => `
        <button class="chip chip-light" onclick="document.getElementById('cat-${k}')?.scrollIntoView({behavior:'smooth'})">${catIcons[k]} ${catNames[k]}</button>`
      ).join('')}
    </div>

    <div class="card" style="border-left:4px solid var(--primary);margin-bottom:24px;background:var(--primary-muted)">
      <div style="font-size:15px;font-weight:800;color:var(--primary);margin-bottom:6px">🎓 Hướng dẫn Onboarding cho nhân viên mới</div>
      <div style="font-size:13px;color:var(--text-secondary)">Nếu bạn là nhân viên mới, hãy bắt đầu với <strong>Checklist Onboarding</strong> ở cuối trang này. Sau đó đọc lần lượt các SOP bên dưới theo thứ tự từ trên xuống.</div>
    </div>

    <div id="guidelinesList">${guidelineHTML}</div>

    <div class="guideline-section" style="margin-top:32px">
      <div class="guideline-section-title">🎨 Brand Guidelines cơ bản</div>
      <div class="grid-3">
        ${[
          { title:'Màu sắc thương hiệu',        icon:'🎨', items:['Primary: #E8315A (đỏ hồng)', 'Secondary: #1A2035 (navy đen)', 'Accent: #FFD700 (vàng gold)', 'Text: #1A202C (đen mềm)'] },
          { title:'Giọng văn (Tone of Voice)',   icon:'✍️', items:['Thân thiện & chuyên nghiệp', 'Không dùng ngôn ngữ quá formal', 'Sử dụng emoji có chọn lọc', 'Luôn hướng đến giải pháp cho khách'] },
          { title:'Điều KHÔNG được làm',         icon:'🚫', items:['Không nói xấu đối thủ', 'Không cam kết kết quả 100%', 'Không đăng bài chưa được duyệt', 'Không dùng hình ảnh vi phạm bản quyền'] }
        ].map(b => `
          <div class="card">
            <div style="font-size:18px;margin-bottom:8px">${b.icon}</div>
            <div style="font-weight:700;font-size:13.5px;margin-bottom:10px;color:var(--text-primary)">${b.title}</div>
            <ul style="list-style:disc;padding-left:16px">
              ${b.items.map(i => `<li style="font-size:13px;color:var(--text-secondary);margin-bottom:5px">${esc(i)}</li>`).join('')}
            </ul>
          </div>`).join('')}
      </div>
    </div>`;

  // Accordion toggle
  $$('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const acc    = header.closest('.accordion');
      const isOpen = acc.classList.contains('open');
      $$('.accordion.open').forEach(a => a !== acc && a.classList.remove('open'));
      acc.classList.toggle('open', !isOpen);
    });
  });

  // Auto-open first accordion
  const firstAcc = $('.accordion');
  if (firstAcc) firstAcc.classList.add('open');
}
