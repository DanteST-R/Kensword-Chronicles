// Tab navigation
function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
  const tabContent = document.getElementById('tab-content-' + name);
  const tabBtn = document.getElementById('tab-' + name);
  if (tabContent) tabContent.classList.add('active');
  if (tabBtn) tabBtn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (name === 'characters' && typeof loadCharactersTab === 'function') {
    loadCharactersTab();
  }
  if (name === 'npcs' && typeof loadNpcsTab === 'function') {
    loadNpcsTab();
  }
  if (name === 'pending' && typeof loadPendingTab === 'function') {
    loadPendingTab();
  }
  if (name === 'learn-abilities' && typeof loadLearnAbilitiesTab === 'function') {
    loadLearnAbilitiesTab();
  }
}

// Build race cards
// Build race cards
function buildRaces() {
  const container = document.getElementById('races-container');
  const monsterNote = document.getElementById('monster-note');
  let firstMonster = true;

  if (!container) return;
  container.innerHTML = '';

  RACES_DATA.forEach((race, index) => {
    // Show monster note before first monster
    if (race.isMonster && firstMonster) {
      firstMonster = false;
      monsterNote.style.display = 'block';
    }

    const card = document.createElement('div');
    card.className = 'race-card';

    // Abilities HTML
    const abilitiesHTML = race.abilities.map(a => `
      <div class="ability-box">
        <div class="ability-name">${a.name}</div>
        <div class="ability-desc">${a.desc}</div>
      </div>
    `).join('');

    // Subraces HTML
    let subracesHTML = '';
    if (race.subraces && race.subraces.length > 0) {
      const subList = race.subraces.map(s => {
        return `
          <div class="subrace-card">
            ${s.image ? `<img src="${s.image}" alt="${s.name}" class="race-image subrace-image">` : ''}
            <div class="subrace-name">${s.name}</div>
            <div class="subrace-desc">${s.desc}</div>
            ${s.appearance ? `
            <div class="race-appearance-section">
              <div class="race-section-label">👀 Aparência Geral</div>
              <div class="race-appearance">${s.appearance}</div>
            </div>` : ''}
            <div class="subrace-ability">
              <div class="subrace-ability-name">⚡ ${s.abilityName}</div>
              <div class="subrace-ability-desc">${s.abilityDesc}</div>
            </div>
          </div>
        `;
      }).join('');

      subracesHTML = `
        <div class="subraces-container">
          <div class="subrace-label">Sub-Raças</div>
          ${subList}
        </div>
      `;
    }

    const monsterBadge = race.isMonster
      ? `<span style="background:var(--red-wax);color:#fff;font-family:'Cinzel',serif;font-size:0.65rem;padding:2px 8px;border-radius:2px;letter-spacing:0.1em;">MONSTRO</span>`
      : '';

    const imageHTML = race.image 
      ? `<div class="race-image-container"><img src="${race.image}" alt="${race.name}" class="race-image main-race-image"></div>` 
      : '';
      
    const appearanceHTML = race.appearance
      ? `<div class="race-section">
          <div class="race-section-label">👀 Aparência Geral</div>
          <div class="race-appearance">${race.appearance}</div>
         </div>`
      : '';

    card.innerHTML = `
      <div class="race-card-header">
        <span class="race-emoji">${race.emoji}</span>
        <div>
          <div class="race-name">${race.name} ${monsterBadge}</div>
          <div class="race-creator">Criador(es): ${race.creator}</div>
        </div>
      </div>
      ${imageHTML}
      <div class="race-card-body">
        <div class="race-section">
          <div class="race-section-label">📖 Descrição</div>
          <div class="race-description">${race.description}</div>
        </div>
        ${appearanceHTML}
        <div class="race-section">
          <div class="race-section-label">⚔ Habilidades Básicas</div>
          ${abilitiesHTML}
        </div>
        ${subracesHTML}
      </div>
    `;

    container.appendChild(card);
  });

  // Hide monster note initially — show only when races tab is active
  monsterNote.style.display = 'block';
}

// Build elements dynamically
function buildElements() {
  const container = document.getElementById('dynamic-elements-container');
  if (!container || !window.KENSWORD_ELEMENTS_DB) return;

  const categories = {
    "Básicos": "Elementos Básicos",
    "Arcanos": "Elementos Arcanos",
    "Místicos": "Elementos Místicos",
    "Supremos": "Elementos Supremos"
  };

  let html = '';

  Object.keys(categories).forEach(catKey => {
    const list = Object.values(window.KENSWORD_ELEMENTS_DB).filter(el => el && el.category === catKey);
    if (list.length === 0) return;

    html += `
      <h3 class="section-title" style="margin-top:2.5rem; font-size:1.5rem; text-align:left;">${categories[catKey]}</h3>
      <div class="races-grid">
        ${list.map(el => {
          let bonusText = '';
          if (el.modifiers) {
            bonusText = `<div style="margin-top:0.6rem; font-size:0.78rem; color:var(--gold); border-top:1px solid rgba(255,255,255,0.05); padding-top:0.4rem;">`;
            Object.keys(el.modifiers).forEach(key => {
              if (key === 'lockedStatus') return;
              const val = el.modifiers[key];
              const displayVal = typeof val === 'number' ? (val > 1 ? `+${Math.round((val - 1)*100)}%` : `${val * 100}%`) : val;
              bonusText += `🔸 <strong>${key}:</strong> ${displayVal} &nbsp; `;
            });
            bonusText += `</div>`;
          }
          return `
            <div class="element-card" style="border: 1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 6px rgba(0,0,0,0.15); transition:transform 0.2s hover; cursor:default;">
              <div class="el-title" style="font-family:'Cinzel',serif; font-size:1.2rem; font-weight:bold; color:var(--gold); margin-bottom:0.4rem; display:flex; align-items:center; gap:0.5rem;">
                ${el.emoji} ${el.name} ${el.modifiers?.lockedStatus ? '🔒' : ''}
              </div>
              <div class="el-traits" style="font-style:italic; font-size:0.85rem; color:#aaa; margin-bottom:0.6rem;">${el.traits.join(' • ')}</div>
              <div class="el-desc" style="font-size:0.88rem; line-height:1.5; color:var(--ink);">${el.description}</div>
              ${bonusText}
              ${el.professionalDetails ? `
                <div style="margin-top:0.5rem; font-size:0.78rem; color:#888; font-style:italic; border-top:1px dashed rgba(255,255,255,0.05); padding-top:0.4rem;">
                  <strong>Efeito de Jogo:</strong> ${el.professionalDetails}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  });

  container.innerHTML = html;
}

// Init
buildRaces();
buildElements();

// Active tab from URL hash
const hash = window.location.hash.replace('#', '');
const validTabs = ['history','races','elements','map','characters','npcs','orgs','monsters','profile','pending','learn-abilities'];
if (validTabs.includes(hash)) showTab(hash);
