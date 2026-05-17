// Tab navigation
function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-content-' + name).classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
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
}

// Build race cards
// Build race cards
function buildRaces() {
  const container = document.getElementById('races-container');
  const monsterNote = document.getElementById('monster-note');
  let firstMonster = true;

  // Adicionar uma seção no início para Habilidades Simples do Banco de Dados
  if (window.KENSWORD_ABILITIES_DB && KENSWORD_ABILITIES_DB["Simples"]) {
    const simpleCard = document.createElement('div');
    simpleCard.className = 'race-card';
    simpleCard.style.borderColor = 'var(--gold)';
    simpleCard.style.boxShadow = '0 4px 15px rgba(201, 147, 58, 0.15)';

    const simpleAbilitiesHTML = KENSWORD_ABILITIES_DB["Simples"].map(ab => `
      <div style="background:rgba(0,0,0,0.05); border:1px solid rgba(201,147,58,0.15); border-radius:4px; padding:0.6rem; margin-bottom:0.6rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.2rem; flex-wrap:wrap;">
          <strong style="color:var(--gold); font-size:0.88rem;">【 ${ab.name} 】</strong>
          <span style="font-size:0.72rem; background:rgba(201,147,58,0.15); color:var(--gold); padding:1px 6px; border-radius:3px; font-weight:500;">${ab.type}</span>
        </div>
        <div style="font-size:0.85rem; color:var(--ink); line-height:1.4; margin-bottom:0.2rem;">${ab.description}</div>
        ${ab.details ? `<div style="font-size:0.8rem; color:#555; font-style:italic; margin-bottom:0.1rem;">🔹 ${ab.details}</div>` : ''}
        ${ab.scaling ? `<div style="font-size:0.8rem; color:var(--gold); font-weight:500;">📈 Escalonamento: ${ab.scaling}</div>` : ''}
      </div>
    `).join('');

    simpleCard.innerHTML = `
      <div class="race-card-header">
        <span class="race-emoji">🌀</span>
        <div>
          <div class="race-name">Habilidades Simples</div>
          <div class="race-creator">Banco de Dados Geral</div>
        </div>
      </div>
      <div class="race-card-body">
        <div class="race-section">
          <div class="race-section-label">⚔️ Habilidades Comuns & Universais</div>
          <p style="font-size:0.88rem; margin-bottom:1rem; font-style:italic; color:#555;">Habilidades gerais que podem ser adquiridas por missões ou sob condições especiais no RPG.</p>
          ${simpleAbilitiesHTML}
        </div>
      </div>
    `;
    container.appendChild(simpleCard);
  }

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

    // Consultar habilidades específicas desta raça no KENSWORD_ABILITIES_DB
    let dbAbilitiesHTML = '';
    if (window.KENSWORD_ABILITIES_DB) {
      let dbKey = race.name;
      if (race.name === 'Humano') dbKey = 'Humano';
      else if (race.name === 'Elfo') dbKey = 'Elfo';
      else if (race.name === 'Demi-Humano') dbKey = 'Demi-Humano';
      else if (race.name === 'Gigante') dbKey = 'Gigante';
      else if (race.name === 'Anão') dbKey = 'Anão';
      else if (race.name === 'Demônio') dbKey = 'Demônio';
      else if (race.name === 'Valquíria') dbKey = 'Valquíria';
      else if (race.name === 'Draconiano') dbKey = 'Dracônico';
      else if (race.name === 'Vampiro') dbKey = 'Vampiro';

      const dbAbilitiesList = KENSWORD_ABILITIES_DB[dbKey] || [];
      if (dbAbilitiesList.length > 0) {
        dbAbilitiesHTML = `
          <div style="margin-top:1rem; border-top:1px dashed var(--wood-plank); padding-top:0.8rem;">
            <div style="font-family:'Cinzel',serif; font-size:0.95rem; font-weight:bold; color:var(--gold); margin-bottom:0.5rem; letter-spacing:0.05em;">📚 Compêndio de Habilidades (${race.name})</div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              ${dbAbilitiesList.map(ab => `
                <div style="background:rgba(0,0,0,0.05); border:1px solid rgba(201,147,58,0.15); border-radius:4px; padding:0.6rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.2rem; flex-wrap:wrap;">
                    <strong style="color:var(--gold); font-size:0.88rem;">【 ${ab.name} 】</strong>
                    <span style="font-size:0.72rem; background:rgba(201,147,58,0.15); color:var(--gold); padding:1px 6px; border-radius:3px; font-weight:500;">${ab.type || ab.category}</span>
                  </div>
                  <div style="font-size:0.85rem; color:var(--ink); line-height:1.4; margin-bottom:0.2rem;">${ab.description}</div>
                  ${ab.details ? `<div style="font-size:0.8rem; color:#555; font-style:italic; margin-bottom:0.1rem;">🔹 ${ab.details}</div>` : ''}
                  ${ab.scaling ? `<div style="font-size:0.8rem; color:var(--gold); font-weight:500;">📈 Escalonamento: ${ab.scaling}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
    }

    // Subraces HTML
    let subracesHTML = '';
    if (race.subraces && race.subraces.length > 0) {
      const subList = race.subraces.map(s => {
        // Consultar habilidades específicas desta sub-raça
        let subDbHTML = '';
        if (window.KENSWORD_ABILITIES_DB) {
          let subDbKey = s.name.replace(/^[^\w\s]*\s*/, ''); // Remove emojis
          if (subDbKey === 'Alto Elfo') subDbKey = 'Alto Elfo';
          else if (subDbKey === 'Drow (Elfo Negro)') subDbKey = 'Drow';
          else if (subDbKey === 'Succubus / Incubus') subDbKey = 'Demônio';
          else if (subDbKey === 'Ghoul da Noite') subDbKey = 'Vampiro';

          const subAbilitiesList = KENSWORD_ABILITIES_DB[subDbKey] || [];
          // Filtrar apenas se corresponder especificamente à sub-raça
          const filteredSubList = subAbilitiesList.filter(ab => {
            const lowerType = (ab.type || '').toLowerCase();
            const lowerName = subDbKey.toLowerCase();
            return lowerType.includes(lowerName) || lowerType.includes('alto elfo') || lowerType.includes('drow') || lowerType.includes('succubus') || lowerType.includes('ghoul');
          });

          if (filteredSubList.length > 0) {
            subDbHTML = `
              <div style="margin-top:0.8rem; border-top:1px dashed rgba(0,0,0,0.1); padding-top:0.6rem;">
                <div style="font-family:'Cinzel',serif; font-size:0.85rem; font-weight:bold; color:var(--gold); margin-bottom:0.4rem;">📚 Habilidades da Sub-Raça (${subDbKey})</div>
                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                  ${filteredSubList.map(ab => `
                    <div style="background:rgba(0,0,0,0.03); border:1px solid rgba(201,147,58,0.1); border-radius:4px; padding:0.5rem;">
                      <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.2rem; flex-wrap:wrap;">
                        <strong style="color:var(--gold); font-size:0.82rem;">【 ${ab.name} 】</strong>
                        <span style="font-size:0.7rem; background:rgba(201,147,58,0.1); color:var(--gold); padding:1px 5px; border-radius:3px;">${ab.type || ab.category}</span>
                      </div>
                      <div style="font-size:0.82rem; color:var(--ink); line-height:1.4; margin-bottom:0.1rem;">${ab.description}</div>
                      ${ab.details ? `<div style="font-size:0.78rem; color:#555; font-style:italic; margin-bottom:0.1rem;">🔹 ${ab.details}</div>` : ''}
                      ${ab.scaling ? `<div style="font-size:0.78rem; color:var(--gold); font-weight:500;">📈 Escalonamento: ${ab.scaling}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }
        }

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
            ${subDbHTML}
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
        ${dbAbilitiesHTML}
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
const validTabs = ['history','races','elements','map','characters','npcs','orgs','monsters','profile','pending'];
if (validTabs.includes(hash)) showTab(hash);
