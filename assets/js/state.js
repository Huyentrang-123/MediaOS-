/* ============================================================
   MediaOS — Application State & Persistence
   ============================================================ */

'use strict';

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

function persist(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
}

function saveState() {
  persist('lc_saved', state.savedVideos);
  persist('lc_campaigns', state.campaigns);
  persist('lc_ideas', state.ideas);
}
