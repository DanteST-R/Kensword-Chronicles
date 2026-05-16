// Tab navigation
function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-content-' + name).classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Build race cards
function buildRaces() {
  const container = document.getElementById('races-container');
  const monsterNote = document.getElementById('monster-note');
  let firstMonster = true;

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
      const subList = race.subraces.map(s => `
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
      `).join('');
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
          <div class="race-section-label">⚔ Habilidades</div>
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

// Init
buildRaces();

// Active tab from URL hash
const hash = window.location.hash.replace('#', '');
const validTabs = ['history','races','map','characters','orgs','monsters'];
if (validTabs.includes(hash)) showTab(hash);
