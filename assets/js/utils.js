/* ============================================================
   MediaOS — Utility Helpers
   ============================================================ */

'use strict';

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
