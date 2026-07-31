/* ============================================================
   MediaOS — Hash-Based Router
   ============================================================ */

'use strict';

const PAGE_TITLES = {
  research:   'Viral Research Hub',
  trends:     'Trend Analysis',
  knowledge:  'Knowledge Base',
  campaigns:  'Campaigns',
  ideas:      'Ideas Board',
  team:       'Team',
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
    research:   renderResearch,
    trends:     renderTrends,
    knowledge:  renderKnowledge,
    campaigns:  renderCampaigns,
    ideas:      renderIdeas,
    team:       renderTeam,
    guidelines: renderGuidelines
  };

  renderers[page]();

  $('#sidebar').classList.remove('mobile-open');
  $('#sidebarOverlay').classList.remove('visible');
}
