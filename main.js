// Tab navigation
function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
  const tabContent = document.getElementById('tab-content-' + name);
  const tabBtn = document.getElementById('tab-' + name);
  if (tabContent) tabContent.classList.add('active');
  if (tabBtn) tabBtn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (name === 'history' && typeof loadHistoryTab === 'function') {
    loadHistoryTab();
  }
  if (name === 'characters' && typeof loadCharactersTab === 'function') {
    loadCharactersTab();
  }
  if (name === 'npcs' && typeof loadNpcsTab === 'function') {
    loadNpcsTab();
  }
  if (name === 'monsters' && typeof loadMonstersTab === 'function') {
    loadMonstersTab();
  }
  if (name === 'orgs' && typeof loadOrgsTab === 'function') {
    loadOrgsTab();
  }
  if (name === 'pending' && typeof loadPendingTab === 'function') {
    loadPendingTab();
  }
  if (name === 'learn-abilities' && typeof loadLearnAbilitiesTab === 'function') {
    loadLearnAbilitiesTab();
  }
}

// Sub-abas de Localizações (Balistia, etc.)
function showLocationSubtab(locName) {
  document.querySelectorAll('.location-subtab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.location-subtab-content').forEach(panel => panel.style.display = 'none');

  const btn = document.getElementById('location-subtab-btn-' + locName);
  const panel = document.getElementById('location-subtab-' + locName);
  if (btn) btn.classList.add('active');
  if (panel) panel.style.display = 'block';
}

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
            <div class="subrace-row">
              ${s.image ? `
                <div class="subrace-thumb-wrap">
                  <img src="${s.image}" alt="${s.name}" class="subrace-thumb-img">
                </div>
              ` : ''}
              <div class="subrace-body-col">
                <div class="subrace-name">${s.name}</div>
                <div class="subrace-desc">${s.desc.replace(/\n\n/g, '<br><br>')}</div>
              </div>
            </div>
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
      <div class="race-card-body">
        <div class="race-desc-row">
          ${race.image ? `
            <div class="race-thumb-wrap">
              <img src="${race.image}" alt="${race.name}" class="race-thumb-img">
            </div>
          ` : ''}
          <div class="race-desc-content">
            <div class="race-section-label">📖 Descrição</div>
            <div class="race-description">${race.description.replace(/\n\n/g, '<br><br>')}</div>
          </div>
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

  // Renderizar seção de CINESES abaixo de Trevas / Elementos
  if (window.KENSWORD_CINESIS_DB && Object.keys(window.KENSWORD_CINESIS_DB).length > 0) {
    const cinesisList = Object.values(window.KENSWORD_CINESIS_DB).filter(Boolean);

    html += `
      <div class="ornament-divider" style="margin: 4rem 0 2rem;"><span>✦ 🌀 ✦</span></div>

      <div class="cinesis-header" style="text-align:center; margin-bottom: 2rem;">
        <h2 class="section-title" style="font-size:2rem; margin-bottom: 0.5rem;">Cineses</h2>
        <div style="font-family:'Cinzel',serif; font-size:0.95rem; color:var(--gold); letter-spacing:0.1em; margin-bottom:1rem;">
          SISTEMA DE MANIPULAÇÃO CINÉTICA
        </div>
      </div>

      <!-- Painel de Regras Gerais das Cineses -->
      <div class="cinesis-rules-box" style="background: rgba(18, 14, 12, 0.75); border: 1px solid var(--wood-plank); border-left: 4px solid var(--gold); border-radius: 8px; padding: 1.5rem; margin-bottom: 2.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
        <h4 style="font-family:'Cinzel',serif; color:var(--gold); font-size:1.15rem; margin-top:0; margin-bottom:0.8rem; display:flex; align-items:center; gap:0.5rem;">
          📜 Regras Gerais sobre Cineses
        </h4>
        <ul style="margin:0; padding-left:1.2rem; line-height:1.7; font-size:0.92rem; color:var(--ink);">
          <li><strong>Perícia Requerida:</strong> Cineses dentro do universo do RPG <em>usam Perícia Manipulação para funcionar</em>.</li>
          <li><strong>Atributo de Dano:</strong> No sistema, o atributo de dano é o atributo <em>Magia</em> (com exceção da <em>Osseocinese</em>, que utiliza <em>Resistência</em>).</li>
          <li><strong>Restrição de Alvo:</strong> É <strong>proibido manipular o corpo de pessoas</strong> através de Cineses <em>(com exceção de Hemocinese para a raça Vampiro no LvL 15)</em>.</li>
          <li><strong>Limite por Personagem:</strong> Você pode ter no <strong>máximo uma cinese</strong>.</li>
          <li><strong>Diferença de Elemento:</strong> Cinese é <strong>diferente de Elemento</strong>, por isso <em>não existem cineses dos elementos</em>.</li>
          <li><strong>Slot de Habilidade:</strong> Para manipular uma cinese, é <strong>necessário usar um slot de habilidade</strong>.</li>
        </ul>
      </div>

      <h3 class="section-title" style="margin-top:1.5rem; font-size:1.5rem; text-align:left;">Cineses Disponíveis</h3>
      <div class="races-grid">
        ${cinesisList.map(cin => {
          const dmgStat = cin.damageStat || 'Magia';
          const statBadge = dmgStat === 'Resistência'
            ? `<span style="background:rgba(180, 80, 40, 0.25); color:#ff9d76; border:1px solid rgba(255,120,60,0.3); padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:bold;">🛡️ Dano: Resistência</span>`
            : `<span style="background:rgba(40, 140, 80, 0.25); color:#8bc34a; border:1px solid rgba(139,195,74,0.3); padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:bold;">✨ Dano: Magia</span>`;

          const vampBadge = cin.restriction
            ? `<span style="background:rgba(180, 20, 30, 0.3); color:#ff6b6b; border:1px solid rgba(255,80,80,0.4); padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:bold;">🩸 ${cin.restriction}</span>`
            : '';

          return `
            <div class="element-card" style="border: 1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; background:rgba(0,0,0,0.25); box-shadow:0 4px 6px rgba(0,0,0,0.15); display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div class="el-title" style="font-family:'Cinzel',serif; font-size:1.2rem; font-weight:bold; color:var(--gold); margin-bottom:0.4rem; display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                  <span>${cin.emoji} ${cin.name}</span>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.6rem;">
                  <span style="background:rgba(212,175,55,0.15); color:var(--gold); border:1px solid rgba(212,175,55,0.3); padding:2px 8px; border-radius:4px; font-size:0.75rem;">🎯 Perícia: Manipulação</span>
                  ${statBadge}
                  <span style="background:rgba(150,150,150,0.15); color:#ccc; border:1px solid rgba(255,255,255,0.15); padding:2px 8px; border-radius:4px; font-size:0.75rem;">🔮 1 Slot de Habilidade</span>
                  ${vampBadge}
                </div>
                <div class="el-traits" style="font-style:italic; font-size:0.83rem; color:#aaa; margin-bottom:0.6rem;">${cin.traits ? cin.traits.join(' • ') : ''}</div>
                <div class="el-desc" style="font-size:0.88rem; line-height:1.5; color:var(--ink); margin-bottom:0.8rem;">${cin.description}</div>
              </div>

              ${cin.specialRule ? `
                <div style="margin-top:auto; font-size:0.82rem; color:var(--gold); background:rgba(0,0,0,0.3); border-left:3px solid var(--gold); padding:6px 10px; border-radius:0 4px 4px 0;">
                  <strong>⚡ Efeito / Regra:</strong> ${cin.specialRule}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  container.innerHTML = html;
}

// Build level table dynamically
function buildLevelTable() {
  const container = document.getElementById('level-table-rows');
  if (!container) return;
  let html = '';
  for (let lvl = 1; lvl <= 50; lvl++) {
    const xpNeeded = lvl * 100;
    const isEven = lvl % 2 === 0;
    const isMilestone = lvl % 10 === 0;
    const bg = isMilestone
      ? 'background:rgba(212,175,55,0.12);'
      : isEven ? 'background:rgba(255,255,255,0.02);' : '';
    const borderTop = isMilestone ? 'border-top:1px solid rgba(212,175,55,0.3);' : '';
    const lvlColor = isMilestone ? 'color:var(--gold); font-weight:bold;' : 'color:var(--ink);';
    const milestoneTag = isMilestone
      ? `<span style="font-size:0.7rem; background:rgba(212,175,55,0.2); color:var(--gold); border:1px solid rgba(212,175,55,0.4); padding:1px 6px; border-radius:3px; margin-left:6px;">+10 pts</span>`
      : '';
    html += `
      <div style="display:grid; grid-template-columns:1fr 1fr; padding:0.55rem 1.2rem; ${bg} ${borderTop} transition:background 0.15s;">
        <span style="font-family:'Cinzel',serif; font-size:0.92rem; ${lvlColor}">Lvl ${String(lvl).padStart(2, '0')} ${milestoneTag}</span>
        <span style="font-size:0.88rem; color:var(--ink-light);">[ 000 / ${xpNeeded.toLocaleString('pt-BR')} XP ]</span>
      </div>
    `;
  }
  container.innerHTML = html;
}

// Init
buildRaces();
buildElements();
buildLevelTable();

// Active tab from URL hash
const hash = window.location.hash.replace('#', '');
const validTabs = ['history','races','elements','nivelamento','pericias','map','characters','npcs','orgs','monsters','profile','pending','learn-abilities'];
if (validTabs.includes(hash)) showTab(hash);
