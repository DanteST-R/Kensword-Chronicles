// =====================================================================
// KENSWORD CHRONICLES - WORLD CONTENT MODULE
// Gerencia Histórias/Missões, NPCs, Monstros (Bestiário) e Organizações
// Com suporte a criação/edição/exclusão pelo Mestre Supremo (Admin)
// =====================================================================

let ALL_STORIES = [];
let ALL_MONSTERS = [];
let ALL_ORGS = [];
let ALL_NPCS_CACHE = {};

// Helper: Verifica se o usuário atual é Mestre Supremo ou Staff
function isStaffOrAdminUser() {
  if (!_auth || !_auth.currentUser) return false;
  const user = _auth.currentUser;
  const currentUserData = (typeof ALL_CHARACTERS !== 'undefined' && ALL_CHARACTERS[user.uid]) ? ALL_CHARACTERS[user.uid] : null;
  const isDante = user && (
    (user.email && user.email.toLowerCase().includes('dantestr')) ||
    (currentUserData && currentUserData.player && currentUserData.player.name && 
     (currentUserData.player.name.trim().toLowerCase() === 'dantestr' || 
      currentUserData.player.name.trim().toLowerCase() === 'dantest-r')) ||
    (currentUserData && currentUserData.character && currentUserData.character.name && 
     (currentUserData.character.name.trim().toLowerCase() === 'dantestr' || 
      currentUserData.character.name.trim().toLowerCase() === 'dantest-r'))
  );
  return !!(isDante || (currentUserData && (
    currentUserData.isAdmin || 
    currentUserData.isSubAdmin || 
    currentUserData.user_role === 'admin' || 
    currentUserData.user_role === 'sub-admin'
  )));
}

// ─────────────────────────────────────────────────────────────────────
// MODAL GERAL DE CONTEÚDO DO MUNDO
// ─────────────────────────────────────────────────────────────────────
function openWorldContentModal(htmlContent, title = '') {
  let modal = document.getElementById('world-content-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'world-content-modal';
    modal.className = 'modal-overlay';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="modal-content parchment-panel" style="max-width:760px; position:relative; max-height:92vh; overflow-y:auto; padding:2rem 1.8rem;">
        <button onclick="closeWorldContentModal()" class="close-btn" style="position:absolute; top:12px; right:18px; font-size:1.8rem; background:none; border:none; cursor:pointer; color:var(--red-wax); z-index:20;">&times;</button>
        <div id="world-content-modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  const body = document.getElementById('world-content-modal-body');
  if (body) body.innerHTML = htmlContent;
  modal.style.display = 'flex';
}

function closeWorldContentModal() {
  const modal = document.getElementById('world-content-modal');
  if (modal) modal.style.display = 'none';
}

// Zoom de Fotos da Missão
function zoomPhoto(url, caption = '') {
  let zoomModal = document.getElementById('photo-zoom-modal');
  if (!zoomModal) {
    zoomModal = document.createElement('div');
    zoomModal.id = 'photo-zoom-modal';
    zoomModal.className = 'modal-overlay';
    zoomModal.style.zIndex = '100000';
    zoomModal.style.display = 'none';
    zoomModal.onclick = () => { zoomModal.style.display = 'none'; };
    zoomModal.innerHTML = `
      <div style="max-width:90vw; max-height:90vh; text-align:center; position:relative;" onclick="event.stopPropagation()">
        <button onclick="document.getElementById('photo-zoom-modal').style.display='none'" style="position:absolute; top:-35px; right:0; font-size:2rem; background:none; border:none; color:#fff; cursor:pointer;">&times;</button>
        <img id="photo-zoom-img" src="" style="max-width:85vw; max-height:80vh; object-fit:contain; border-radius:8px; border:2px solid var(--gold); box-shadow:0 8px 30px rgba(0,0,0,0.8);">
        <p id="photo-zoom-caption" style="color:var(--gold-bright); font-family:'Cinzel',serif; font-size:1rem; margin-top:0.8rem; text-shadow:0 2px 4px #000;"></p>
      </div>
    `;
    document.body.appendChild(zoomModal);
  }
  const img = document.getElementById('photo-zoom-img');
  const cap = document.getElementById('photo-zoom-caption');
  if (img) img.src = url;
  if (cap) cap.textContent = caption || '';
  zoomModal.style.display = 'flex';
}

// Visualizador de Entidade Customizada (NPC/Monstro/Organização que foi descrito diretamente na missão)
function openCustomEntityViewer(name, type, details, image) {
  const icon = type === 'npc' ? '🎭' : type === 'monster' ? '👾' : '🏰';
  const typeLabel = type === 'npc' ? 'NPC da Missão' : type === 'monster' ? 'Monstro da Missão' : 'Organização da Missão';
  const defaultImg = type === 'npc' ? 'Photos/demihuman.webp' : type === 'monster' ? 'Photos/Goblin.jpg' : 'Photos/Angel.jpg';

  const html = `
    <div style="text-align:center; margin-bottom:1.5rem;">
      <span style="font-size:2rem;">${icon}</span>
      <h2 style="font-family:'Cinzel',serif; color:var(--gold-bright); margin:0.3rem 0;">${name}</h2>
      <span class="story-badge badge-type">${typeLabel}</span>
    </div>
    <div style="display:flex; gap:1.5rem; flex-wrap:wrap; justify-content:center; margin-bottom:1.5rem;">
      ${image ? `<img src="${image}" alt="${name}" style="width:140px; height:140px; object-fit:cover; border-radius:8px; border:2px solid var(--gold); box-shadow:0 4px 10px rgba(0,0,0,0.4);">` : ''}
      <div style="flex:1; min-width:240px; background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem;">
        <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">Ficha &amp; Informações</h4>
        <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${details || 'Sem informações adicionais registradas.'}</div>
      </div>
    </div>
  `;
  openWorldContentModal(html);
}

// ─────────────────────────────────────────────────────────────────────
// 1. ABA HISTÓRIAS & MISSÕES
// ─────────────────────────────────────────────────────────────────────

async function loadHistoryTab() {
  const container = document.getElementById('history-container');
  const adminActions = document.getElementById('history-admin-actions');
  if (!container) return;

  const isStaff = isStaffOrAdminUser();
  if (adminActions) {
    adminActions.innerHTML = isStaff ? `
      <button onclick="openStoryEditor()" class="admin-action-btn">
        <span>➕</span> Nova História / Missão
      </button>
    ` : '';
  }

  container.innerHTML = '<div class="auth-loading active" style="margin:2rem auto;"><div class="auth-spinner"></div></div>';

  try {
    let stories = [];
    if (_db) {
      const snap = await _db.collection('stories').get();
      snap.forEach(doc => {
        stories.push({ id: doc.id, ...doc.data() });
      });
    }

    // Se ainda não houver nenhuma no banco, carrega missão starter inicial
    if (stories.length === 0) {
      stories = getStarterStories();
    }

    // Ordena mais recentes primeiro
    stories.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    ALL_STORIES = stories;

    renderStoriesList(stories);
  } catch (err) {
    console.error('Erro ao carregar histórias:', err);
    container.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar histórias e missões.</p>';
  }
}

function getStarterStories() {
  return [
    {
      id: 'starter_mission_1',
      title: 'A Queda do Posto Avançado de Balistia',
      category: 'Missão Oficial de Guilda',
      status: 'Em Andamento',
      date: 'Ano 42 — Era da Lâmina',
      location: 'Arredores de Balistia (Bairro Plebeu & Muralhas Externas)',
      summary: 'Estranhas movimentações de criaturas do subsolo foram detectadas próximo ao perímetro de Balistia. A Guilda convoca aventureiros habilitados para investigar o desaparecimento de mercadores e patrulheiros.',
      content: `Relatório oficial emitido pela Guilda dos Aventureiros sob supervisão do Mestre Supremo DanteSTR.\n\nNas últimas luas, relatos de fazendeiros do Bairro Plebeu indicam que matilhas de Goblins e batedores Kobolds estão atacando rotas de comércio ao anoitecer. Testemunhas afirmam ter visto figuras encapuzadas portando símbolos desconhecidos operando nas sombras das ruínas vizinhas.\n\nObjetivos da Missão:\n1. Patrulhar o perímetro leste de Balistia e resgatar sobreviventes.\n2. Localizar o ninho subterrâneo das criaturas e eliminar a ameaça.\n3. Descobrir se há envolvimento de alguma facção herética ou do culto secreto.\n\nRecompensa da Missão:\n• 100 XP por aventureiro participante\n• 3.500 Moedas divididas entre os membros do grupo\n• Reconhecimento da Guilda e acesso a contratos de Rank Superior.`,
      photos: [
        'Photos/Kensword_Map.jpeg',
        'Photos/Goblin.jpg',
        'Photos/Kobold.webp'
      ],
      npcs: [
        { name: 'Mestre DanteSTR', details: 'Líder Supremo da Guilda e Mestre do Continente de Kensword.', avatar: 'Photos/demihuman.webp' }
      ],
      monsters: [
        { name: 'Goblin Espreitador', rank: 'Rank E', details: 'Criaturas ágeis que atacam em bando usando adagas envenenadas.', avatar: 'Photos/Goblin.jpg' },
        { name: 'Kobold Caçador', rank: 'Rank D', details: 'Especialistas em emboscadas armadas com arcos e lanças.', avatar: 'Photos/Kobold.webp' }
      ],
      orgs: [
        { name: 'Guilda dos Aventureiros de Balistia', details: 'Sede central de expedições e contratos de Kensword.', avatar: 'Photos/Angel.jpg' }
      ],
      createdAt: Date.now()
    }
  ];
}

function renderStoriesList(stories) {
  const container = document.getElementById('history-container');
  if (!container) return;

  if (stories.length === 0) {
    container.innerHTML = `
      <div class="coming-soon">
        <div class="cs-icon">📖</div>
        <h3>Nenhuma História ou Missão Registrada</h3>
        <p>O Mestre Supremo ainda não cadastrou crônicas para esta era.</p>
      </div>
    `;
    return;
  }

  const isStaff = isStaffOrAdminUser();
  let html = '';

  stories.forEach(story => {
    const statusClass = story.status === 'Ativa' ? 'badge-status-active' :
                        story.status === 'Em Andamento' ? 'badge-status-ongoing' :
                        story.status === 'Concluída' ? 'badge-status-completed' : 'badge-status-historic';

    // Fotos relacionadas (140x140px)
    const photos = story.photos || [];
    let photosHtml = '';
    if (photos.length > 0) {
      photosHtml = `
        <div style="margin-top:1rem;">
          <div style="font-family:'Cinzel',serif; font-size:0.85rem; color:var(--gold-bright); font-weight:bold; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
            <span>📸</span> Fotos Relacionadas com a Missão (${photos.length}):
          </div>
          <div class="story-photo-gallery">
            ${photos.map((pUrl, idx) => `
              <div class="story-photo-item" onclick="zoomPhoto('${pUrl}', '${story.title.replace(/'/g, "\\'")} - Foto #${idx+1}')" title="Clique para ampliar">
                <img src="${pUrl}" alt="Foto da Missão">
                <div class="photo-zoom-hint">🔍 Ampliar</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // NPCs Relacionados
    const npcs = story.npcs || [];
    let npcsHtml = '';
    if (npcs.length > 0) {
      npcsHtml = `
        <div class="story-entity-row">
          <div class="story-entity-label"><span>🎭</span> NPCs:</div>
          <div class="story-chips-container">
            ${npcs.map(npc => {
              const name = typeof npc === 'string' ? npc : (npc.name || 'NPC');
              const details = (typeof npc === 'object' && npc.details) ? npc.details.replace(/"/g, '&quot;') : '';
              const avatar = (typeof npc === 'object' && npc.avatar) ? npc.avatar : 'Photos/demihuman.webp';
              const npcId = typeof npc === 'object' ? npc.id : null;
              
              if (npcId && ALL_CHARACTERS && ALL_CHARACTERS[npcId]) {
                return `
                  <div class="entity-chip" onclick="openCharacterSheet('${npcId}')" title="Clique para ver a ficha completa">
                    <img src="${avatar}" class="entity-chip-avatar" alt="${name}">
                    <strong>${name}</strong>
                  </div>
                `;
              }
              return `
                <div class="entity-chip" onclick="openCustomEntityViewer('${name}', 'npc', '${details}', '${avatar}')" title="Clique para ver detalhes do NPC">
                  <img src="${avatar}" class="entity-chip-avatar" alt="${name}">
                  <strong>${name}</strong>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Monstros na Missão
    const monsters = story.monsters || [];
    let monstersHtml = '';
    if (monsters.length > 0) {
      monstersHtml = `
        <div class="story-entity-row">
          <div class="story-entity-label"><span>👾</span> Monstros:</div>
          <div class="story-chips-container">
            ${monsters.map(mon => {
              const name = typeof mon === 'string' ? mon : (mon.name || 'Monstro');
              const rank = (typeof mon === 'object' && mon.rank) ? mon.rank : '';
              const details = (typeof mon === 'object' && mon.details) ? mon.details.replace(/"/g, '&quot;') : '';
              const avatar = (typeof mon === 'object' && mon.avatar) ? mon.avatar : 'Photos/Goblin.jpg';
              const monId = typeof mon === 'object' ? mon.id : null;

              if (monId && ALL_MONSTERS.some(m => m.id === monId)) {
                return `
                  <div class="entity-chip" onclick="openMonsterDetails('${monId}')" title="Clique para ver a ficha do Monstro">
                    <img src="${avatar}" class="entity-chip-avatar" alt="${name}">
                    <strong>${name}</strong>
                    ${rank ? `<span class="rank-badge rank-c">${rank}</span>` : ''}
                  </div>
                `;
              }
              return `
                <div class="entity-chip" onclick="openCustomEntityViewer('${name}', 'monster', '${details}', '${avatar}')" title="Clique para ver a ficha do Monstro">
                  <img src="${avatar}" class="entity-chip-avatar" alt="${name}">
                  <strong>${name}</strong>
                  ${rank ? `<span class="rank-badge rank-c">${rank}</span>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Organizações Relacionadas
    const orgs = story.orgs || [];
    let orgsHtml = '';
    if (orgs.length > 0) {
      orgsHtml = `
        <div class="story-entity-row">
          <div class="story-entity-label"><span>🏰</span> Organizações:</div>
          <div class="story-chips-container">
            ${orgs.map(org => {
              const name = typeof org === 'string' ? org : (org.name || 'Organização');
              const details = (typeof org === 'object' && org.details) ? org.details.replace(/"/g, '&quot;') : '';
              const avatar = (typeof org === 'object' && org.avatar) ? org.avatar : 'Photos/Angel.jpg';
              const orgId = typeof org === 'object' ? org.id : null;

              if (orgId && ALL_ORGS.some(o => o.id === orgId)) {
                return `
                  <div class="entity-chip" onclick="openOrgDetails('${orgId}')" title="Clique para ver a ficha da Organização">
                    <img src="${avatar}" class="entity-chip-avatar" alt="${name}">
                    <strong>${name}</strong>
                  </div>
                `;
              }
              return `
                <div class="entity-chip" onclick="openCustomEntityViewer('${name}', 'org', '${details}', '${avatar}')" title="Clique para ver detalhes da Organização">
                  <img src="${avatar}" class="entity-chip-avatar" alt="${name}">
                  <strong>${name}</strong>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // Botões de administração
    let adminControls = '';
    if (isStaff) {
      adminControls = `
        <div style="display:flex; gap:0.5rem; margin-top:0.4rem;">
          <button onclick="openStoryEditor('${story.id}')" class="admin-action-btn" style="padding:0.3rem 0.8rem; font-size:0.75rem;">
            ✏️ Editar
          </button>
          <button onclick="deleteStory('${story.id}')" class="admin-action-btn" style="padding:0.3rem 0.8rem; font-size:0.75rem; border-color:var(--red-wax); color:#ff6b6b;">
            🗑️ Excluir
          </button>
        </div>
      `;
    }

    html += `
      <div class="story-card" id="story-card-${story.id}">
        <div class="story-header">
          <div>
            <h3 class="story-title">${story.title}</h3>
            <div class="story-meta">
              ${story.date ? `<span>📅 ${story.date}</span>` : ''}
              ${story.location ? `<span>📍 ${story.location}</span>` : ''}
            </div>
          </div>
          <div style="display:flex; flex-direction:column; align-items:flex-end; gap:0.4rem;">
            <div class="story-badges">
              ${story.category ? `<span class="story-badge badge-type">${story.category}</span>` : ''}
              <span class="story-badge ${statusClass}">${story.status || 'Ativa'}</span>
            </div>
            ${adminControls}
          </div>
        </div>

        <div class="story-summary">
          ${story.summary}
        </div>

        ${photosHtml}

        <div class="story-entities-section">
          ${npcsHtml}
          ${monstersHtml}
          ${orgsHtml}
        </div>

        <div style="margin-top:1.5rem; text-align:right;">
          <button onclick="openStoryDetails('${story.id}')" class="form-submit-btn" style="width:auto; padding:0.5rem 1.5rem; font-family:'Cinzel',serif; font-size:0.85rem; background:rgba(212,175,55,0.15); border-color:var(--gold); color:var(--gold-bright);">
            📜 Ler Relato Completo &amp; Detalhes
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Detalhes Completos da História / Missão
function openStoryDetails(storyId) {
  const story = ALL_STORIES.find(s => s.id === storyId);
  if (!story) return;

  const photos = story.photos || [];
  const statusClass = story.status === 'Ativa' ? 'badge-status-active' :
                      story.status === 'Em Andamento' ? 'badge-status-ongoing' :
                      story.status === 'Concluída' ? 'badge-status-completed' : 'badge-status-historic';

  const html = `
    <div>
      <div style="text-align:center; margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:1rem;">
        <span class="story-badge ${statusClass}" style="margin-bottom:0.5rem; display:inline-block;">${story.status || 'Ativa'}</span>
        <h2 style="font-family:'Cinzel Decorative',serif; color:var(--gold-bright); margin:0.3rem 0 0.5rem;">${story.title}</h2>
        <div style="font-size:0.9rem; color:var(--ink-light); display:flex; justify-content:center; gap:1.5rem; flex-wrap:wrap;">
          ${story.category ? `<span>🏷️ <strong>Categoria:</strong> ${story.category}</span>` : ''}
          ${story.date ? `<span>📅 <strong>Data:</strong> ${story.date}</span>` : ''}
          ${story.location ? `<span>📍 <strong>Local:</strong> ${story.location}</span>` : ''}
        </div>
      </div>

      ${photos.length > 0 ? `
        <div style="margin-bottom:1.5rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-bottom:0.6rem;">📸 Fotos e Registros da Missão:</h4>
          <div class="story-photo-gallery">
            ${photos.map((p, idx) => `
              <div class="story-photo-item" onclick="zoomPhoto('${p}', '${story.title.replace(/'/g, "\\'")} - Foto #${idx+1}')" title="Clique para ampliar">
                <img src="${p}" alt="Foto">
                <div class="photo-zoom-hint">🔍 Ampliar</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.5rem; margin-bottom:1.5rem;">
        <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">📖 Relato Oficial dos Fatos:</h4>
        <div style="font-size:0.95rem; color:var(--ink); line-height:1.7; white-space:pre-wrap;">${story.content || story.summary}</div>
      </div>

      <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.5rem;">
        <button onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.6rem 2rem;">
          Fechar
        </button>
      </div>
    </div>
  `;

  openWorldContentModal(html);
}

// Editor de História / Missão (Mestre Supremo)
async function openStoryEditor(storyId = null) {
  if (!isStaffOrAdminUser()) {
    showToast('⚠️ Apenas o Administrador/Mestre Supremo pode adicionar ou editar histórias.', 'error');
    return;
  }

  const isEdit = !!storyId;
  const story = isEdit ? ALL_STORIES.find(s => s.id === storyId) || {} : {};

  // Carrega listas para vincular
  await refreshNpcCache();
  await refreshMonsterCache();
  await refreshOrgCache();

  const allNpcKeys = Object.keys(ALL_NPCS_CACHE);
  const selectedNpcIds = (story.npcs || []).map(n => typeof n === 'object' ? n.id : n).filter(Boolean);
  const selectedMonIds = (story.monsters || []).map(m => typeof m === 'object' ? m.id : m).filter(Boolean);
  const selectedOrgIds = (story.orgs || []).map(o => typeof o === 'object' ? o.id : o).filter(Boolean);

  const existingPhotosStr = (story.photos || []).join('\n');

  const html = `
    <div>
      <h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--gold-bright); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">
        ${isEdit ? '✏️ Editar História / Missão' : '📜 Registrar Nova História / Missão'}
      </h2>

      <form id="story-editor-form" onsubmit="saveStory(event, '${storyId || ''}')">
        
        <div class="field-group">
          <label>Título da História / Missão *</label>
          <input type="text" id="se-title" value="${(story.title || '').replace(/"/g, '&quot;')}" required placeholder="Ex: A Batalha das Minas de Balistia">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <label>Categoria</label>
            <select id="se-category" style="width:100%; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">
              <option value="Missão Oficial de Guilda" ${story.category === 'Missão Oficial de Guilda' ? 'selected' : ''}>Missão Oficial de Guilda</option>
              <option value="Crônica Histórica" ${story.category === 'Crônica Histórica' ? 'selected' : ''}>Crônica Histórica</option>
              <option value="Evento Global" ${story.category === 'Evento Global' ? 'selected' : ''}>Evento Global</option>
              <option value="Exploração de Andar" ${story.category === 'Exploração de Andar' ? 'selected' : ''}>Exploração de Andar</option>
            </select>
          </div>
          <div class="field-group">
            <label>Status</label>
            <select id="se-status" style="width:100%; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">
              <option value="Ativa" ${story.status === 'Ativa' ? 'selected' : ''}>Ativa</option>
              <option value="Em Andamento" ${story.status === 'Em Andamento' ? 'selected' : ''}>Em Andamento</option>
              <option value="Concluída" ${story.status === 'Concluída' ? 'selected' : ''}>Concluída</option>
              <option value="Histórica" ${story.status === 'Histórica' ? 'selected' : ''}>Histórica</option>
            </select>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <label>Data / Era</label>
            <input type="text" id="se-date" value="${(story.date || '').replace(/"/g, '&quot;')}" placeholder="Ex: Ano 42 da Era da Lâmina">
          </div>
          <div class="field-group">
            <label>Localização</label>
            <input type="text" id="se-location" value="${(story.location || '').replace(/"/g, '&quot;')}" placeholder="Ex: Balistia - Bairro Plebeu">
          </div>
        </div>

        <div class="field-group">
          <label>Resumo / Sinopse da Missão *</label>
          <textarea id="se-summary" rows="3" required placeholder="Breve resumo da missão que aparece no card..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:sans-serif;">${story.summary || ''}</textarea>
        </div>

        <div class="field-group">
          <label>Conteúdo Completo &amp; Relato Detalhado *</label>
          <textarea id="se-content" rows="6" required placeholder="Escreva os detalhes completos, objetivos, diálogos e recompensas da história..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:sans-serif;">${story.content || ''}</textarea>
        </div>

        <!-- FOTOS RELACIONADAS (140x140px) -->
        <div style="background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.3); border-radius:8px; padding:1.2rem; margin-bottom:1.5rem;">
          <label style="font-family:'Cinzel',serif; font-size:1rem; color:var(--gold-bright); font-weight:bold; display:block; margin-bottom:0.4rem;">
            📸 Fotos Relacionadas com a Missão (Miniaturas 140x140px):
          </label>
          <span style="font-size:0.82rem; color:var(--ink-light); display:block; margin-bottom:0.6rem;">
            Insira as URLs das imagens (uma por linha) ou escolha um arquivo do computador. Elas ficarão quadradas em 140x140px como as raças do site.
          </span>
          <textarea id="se-photos" rows="3" placeholder="https://exemplo.com/foto1.jpg&#10;Photos/Goblin.jpg&#10;Photos/Kobold.webp" style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:monospace; font-size:0.85rem;">${existingPhotosStr}</textarea>
          
          <div style="margin-top:0.6rem; display:flex; gap:0.8rem; align-items:center;">
            <input type="file" id="se-photo-file" accept="image/*" style="display:none;" onchange="handleStoryPhotoUpload(event)">
            <button type="button" onclick="document.getElementById('se-photo-file').click()" class="admin-action-btn" style="font-size:0.8rem; padding:0.35rem 0.8rem;">
              📁 Upload de Foto do PC
            </button>
            <span style="font-size:0.8rem; color:var(--ink-light);">Sugestões locais: Photos/Goblin.jpg, Photos/Kobold.webp, Photos/Ghoul.jpg</span>
          </div>
        </div>

        <!-- NPCS RELACIONADOS -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; margin-bottom:1.5rem;">
          <label style="font-family:'Cinzel',serif; font-size:0.95rem; color:var(--gold); font-weight:bold; display:block; margin-bottom:0.4rem;">
            🎭 NPCs Relacionados com a Missão:
          </label>
          <span style="font-size:0.82rem; color:var(--ink-light); display:block; margin-bottom:0.8rem;">
            Marque os NPCs existentes na aba NPCs ou adicione novos NPCs específicos para este evento:
          </span>

          <div style="display:flex; flex-wrap:wrap; gap:0.6rem; max-height:140px; overflow-y:auto; padding:0.5rem; background:rgba(0,0,0,0.2); border-radius:4px; margin-bottom:0.8rem;">
            ${allNpcKeys.length > 0 ? allNpcKeys.map(k => {
              const npcDoc = ALL_NPCS_CACHE[k];
              const char = npcDoc.character || {};
              const isChecked = selectedNpcIds.includes(k);
              return `
                <label style="display:inline-flex; align-items:center; gap:0.4rem; background:rgba(255,255,255,0.05); padding:3px 8px; border-radius:4px; font-size:0.85rem; cursor:pointer;">
                  <input type="checkbox" name="se-npcs-checkbox" value="${k}" ${isChecked ? 'checked' : ''}>
                  ${char.name || 'NPC'}
                </label>
              `;
            }).join('') : '<span style="font-size:0.85rem; color:#888; font-style:italic;">Nenhum NPC cadastrado no sistema ainda. Você pode adicionar abaixo!</span>'}
          </div>

          <div class="field-group" style="margin-bottom:0;">
            <label style="font-size:0.85rem;">Adicionar Outro NPC (Nome e Ficha rápida):</label>
            <input type="text" id="se-custom-npc-name" placeholder="Nome do NPC Adicional" style="margin-bottom:0.4rem;">
            <textarea id="se-custom-npc-desc" rows="2" placeholder="Ficha e detalhes deste NPC na missão..." style="width:100%; box-sizing:border-box; padding:0.5rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem;"></textarea>
          </div>
        </div>

        <!-- MONSTROS NA MISSÃO -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; margin-bottom:1.5rem;">
          <label style="font-family:'Cinzel',serif; font-size:0.95rem; color:var(--gold); font-weight:bold; display:block; margin-bottom:0.4rem;">
            👾 Monstros Presentes na Missão:
          </label>
          <span style="font-size:0.82rem; color:var(--ink-light); display:block; margin-bottom:0.8rem;">
            Marque os monstros da aba Monstros/Bestiário ou insira um monstro novo:
          </span>

          <div style="display:flex; flex-wrap:wrap; gap:0.6rem; max-height:140px; overflow-y:auto; padding:0.5rem; background:rgba(0,0,0,0.2); border-radius:4px; margin-bottom:0.8rem;">
            ${ALL_MONSTERS.map(m => {
              const isChecked = selectedMonIds.includes(m.id);
              return `
                <label style="display:inline-flex; align-items:center; gap:0.4rem; background:rgba(255,255,255,0.05); padding:3px 8px; border-radius:4px; font-size:0.85rem; cursor:pointer;">
                  <input type="checkbox" name="se-monsters-checkbox" value="${m.id}" ${isChecked ? 'checked' : ''}>
                  ${m.name} (${m.rank || 'Rank D'})
                </label>
              `;
            }).join('')}
          </div>

          <div class="field-group" style="margin-bottom:0;">
            <label style="font-size:0.85rem;">Adicionar Outro Monstro (Nome e Ficha rápida):</label>
            <input type="text" id="se-custom-mon-name" placeholder="Nome do Monstro / Chefe" style="margin-bottom:0.4rem;">
            <textarea id="se-custom-mon-desc" rows="2" placeholder="Ficha, atributos e habilidades deste monstro na missão..." style="width:100%; box-sizing:border-box; padding:0.5rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem;"></textarea>
          </div>
        </div>

        <!-- ORGANIZAÇÕES RELACIONADAS -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; margin-bottom:1.5rem;">
          <label style="font-family:'Cinzel',serif; font-size:0.95rem; color:var(--gold); font-weight:bold; display:block; margin-bottom:0.4rem;">
            🏰 Organizações Relacionadas com a Missão:
          </label>
          <span style="font-size:0.82rem; color:var(--ink-light); display:block; margin-bottom:0.8rem;">
            Marque as organizações da aba Organizações ou descreva uma nova facção participante:
          </span>

          <div style="display:flex; flex-wrap:wrap; gap:0.6rem; max-height:140px; overflow-y:auto; padding:0.5rem; background:rgba(0,0,0,0.2); border-radius:4px; margin-bottom:0.8rem;">
            ${ALL_ORGS.map(o => {
              const isChecked = selectedOrgIds.includes(o.id);
              return `
                <label style="display:inline-flex; align-items:center; gap:0.4rem; background:rgba(255,255,255,0.05); padding:3px 8px; border-radius:4px; font-size:0.85rem; cursor:pointer;">
                  <input type="checkbox" name="se-orgs-checkbox" value="${o.id}" ${isChecked ? 'checked' : ''}>
                  ${o.name}
                </label>
              `;
            }).join('')}
          </div>

          <div class="field-group" style="margin-bottom:0;">
            <label style="font-size:0.85rem;">Adicionar Outra Organização (Nome e Ficha rápida):</label>
            <input type="text" id="se-custom-org-name" placeholder="Nome da Organização / Facção" style="margin-bottom:0.4rem;">
            <textarea id="se-custom-org-desc" rows="2" placeholder="Objetivos e papel desta organização no evento..." style="width:100%; box-sizing:border-box; padding:0.5rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem;"></textarea>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:1.2rem; margin-top:2rem;">
          <button type="button" onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.8rem 2rem; background:rgba(0,0,0,0.4); border-color:var(--wood-plank);">
            Cancelar
          </button>
          <button type="submit" class="form-submit-btn" style="width:auto; padding:0.8rem 2.5rem; background:var(--gold); border-color:var(--gold); color:#1a0f08; font-weight:bold;">
            💾 ${isEdit ? 'Atualizar História' : 'Salvar História / Missão'}
          </button>
        </div>

      </form>
    </div>
  `;

  openWorldContentModal(html);
}

function handleStoryPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    const txtArea = document.getElementById('se-photos');
    if (txtArea) {
      const current = txtArea.value.trim();
      txtArea.value = current ? current + '\n' + dataUrl : dataUrl;
      showToast('📸 Foto carregada com sucesso!', 'success');
    }
  };
  reader.readAsDataURL(file);
}

async function saveStory(event, storyId) {
  event.preventDefault();
  if (!isStaffOrAdminUser()) {
    showToast('⚠️ Operação não permitida.', 'error');
    return;
  }

  const title = document.getElementById('se-title').value.trim();
  const category = document.getElementById('se-category').value;
  const status = document.getElementById('se-status').value;
  const date = document.getElementById('se-date').value.trim();
  const location = document.getElementById('se-location').value.trim();
  const summary = document.getElementById('se-summary').value.trim();
  const content = document.getElementById('se-content').value.trim();

  // Fotos
  const photosRaw = document.getElementById('se-photos').value.split('\n');
  const photos = photosRaw.map(p => p.trim()).filter(Boolean);

  // NPCs selecionados
  const npcs = [];
  document.querySelectorAll('input[name="se-npcs-checkbox"]:checked').forEach(cb => {
    const npcDoc = ALL_NPCS_CACHE[cb.value];
    if (npcDoc) {
      npcs.push({
        id: cb.value,
        name: npcDoc.character?.name || 'NPC',
        avatar: npcDoc.character?.avatar || 'Photos/demihuman.webp',
        details: npcDoc.character?.description || ''
      });
    }
  });

  const customNpcName = document.getElementById('se-custom-npc-name').value.trim();
  const customNpcDesc = document.getElementById('se-custom-npc-desc').value.trim();
  if (customNpcName) {
    npcs.push({
      name: customNpcName,
      details: customNpcDesc,
      avatar: 'Photos/demihuman.webp'
    });
  }

  // Monstros selecionados
  const monsters = [];
  document.querySelectorAll('input[name="se-monsters-checkbox"]:checked').forEach(cb => {
    const mon = ALL_MONSTERS.find(m => m.id === cb.value);
    if (mon) {
      monsters.push({
        id: mon.id,
        name: mon.name,
        rank: mon.rank || 'Rank D',
        avatar: mon.image || 'Photos/Goblin.jpg',
        details: mon.description || ''
      });
    }
  });

  const customMonName = document.getElementById('se-custom-mon-name').value.trim();
  const customMonDesc = document.getElementById('se-custom-mon-desc').value.trim();
  if (customMonName) {
    monsters.push({
      name: customMonName,
      details: customMonDesc,
      rank: 'Rank Especial',
      avatar: 'Photos/Goblin.jpg'
    });
  }

  // Organizações selecionadas
  const orgs = [];
  document.querySelectorAll('input[name="se-orgs-checkbox"]:checked').forEach(cb => {
    const org = ALL_ORGS.find(o => o.id === cb.value);
    if (org) {
      orgs.push({
        id: org.id,
        name: org.name,
        avatar: org.image || 'Photos/Angel.jpg',
        details: org.description || ''
      });
    }
  });

  const customOrgName = document.getElementById('se-custom-org-name').value.trim();
  const customOrgDesc = document.getElementById('se-custom-org-desc').value.trim();
  if (customOrgName) {
    orgs.push({
      name: customOrgName,
      details: customOrgDesc,
      avatar: 'Photos/Angel.jpg'
    });
  }

  const storyData = {
    title,
    category,
    status,
    date,
    location,
    summary,
    content,
    photos,
    npcs,
    monsters,
    orgs,
    updatedAt: Date.now()
  };

  try {
    showToast('💾 Salvando história...', 'info');

    if (storyId) {
      await _db.collection('stories').doc(storyId).set(storyData, { merge: true });
    } else {
      storyData.createdAt = Date.now();
      await _db.collection('stories').add(storyData);
    }

    showToast('✅ História salva com sucesso!', 'success');
    closeWorldContentModal();
    await loadHistoryTab();
  } catch (err) {
    console.error('Erro ao salvar história:', err);
    showToast('❌ Falha ao salvar história.', 'error');
  }
}

async function deleteStory(storyId) {
  if (!isStaffOrAdminUser()) return;
  if (!confirm('⚠️ Tem certeza que deseja excluir esta história/missão permanentemente?')) return;

  try {
    showToast('🗑️ Excluindo história...', 'info');
    await _db.collection('stories').doc(storyId).delete();
    showToast('✅ História excluída com sucesso!', 'success');
    await loadHistoryTab();
  } catch (err) {
    console.error('Erro ao excluir história:', err);
    showToast('❌ Falha ao excluir história.', 'error');
  }
}

// ─────────────────────────────────────────────────────────────────────
// 2. ABA NPCS (Personagens Não-Jogáveis)
// ─────────────────────────────────────────────────────────────────────

async function refreshNpcCache() {
  ALL_NPCS_CACHE = {};
  if (typeof getAllCharacters === 'function') {
    const chars = await getAllCharacters();
    Object.keys(chars).forEach(k => {
      if (chars[k].type === 'NPC') {
        ALL_NPCS_CACHE[k] = chars[k];
      }
    });
  }
}

async function loadNpcsTab() {
  const container = document.getElementById('npcs-grid');
  const adminActions = document.getElementById('npcs-admin-actions');
  if (!container) return;

  const isStaff = isStaffOrAdminUser();
  if (adminActions) {
    adminActions.innerHTML = isStaff ? `
      <button onclick="openNpcEditor()" class="admin-action-btn">
        <span>➕</span> Adicionar NPC
      </button>
    ` : '';
  }

  container.innerHTML = '<div class="auth-loading active" style="margin:2rem auto;"><div class="auth-spinner"></div></div>';

  try {
    ALL_CHARACTERS = await getAllCharacters();
    await refreshNpcCache();

    const keys = Object.keys(ALL_NPCS_CACHE);
    let html = '';
    let npcCount = 0;

    keys.forEach(uid => {
      const doc = ALL_NPCS_CACHE[uid];
      if (doc.status !== 'approved') return;
      if (!doc.character || !doc.character.name) return;

      npcCount++;
      const char = doc.character;
      const name = char.name;
      const avatar = char.avatar || 'Photos/demihuman.webp';
      const role = char.title || char.class || char.race || 'NPC';

      html += `
        <div class="character-card" style="position:relative;">
          <div onclick="openNpcDetails('${uid}')">
            <img src="${avatar}" alt="${name}">
            <div class="char-card-name" style="padding-bottom:0.2rem;">${name}</div>
            <div style="font-size:0.78rem; color:var(--gold); padding-bottom:0.6rem; font-family:'Cinzel',serif;">${role}</div>
          </div>
          ${isStaff ? `
            <div style="display:flex; justify-content:center; gap:0.4rem; padding:0.4rem; border-top:1px solid var(--wood-plank); background:rgba(0,0,0,0.3);">
              <button onclick="openNpcEditor('${uid}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="Editar NPC">✏️</button>
              <button onclick="deleteNpc('${uid}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="Excluir NPC">🗑️</button>
            </div>
          ` : ''}
        </div>
      `;
    });

    if (npcCount === 0) {
      container.innerHTML = `
        <div class="coming-soon" style="grid-column: 1 / -1;">
          <div class="cs-icon">🎭</div>
          <h3>Nenhum NPC Cadastrado</h3>
          <p>O Administrador pode adicionar novos NPCs usando o botão acima.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = html;
  } catch (err) {
    console.error('Erro ao carregar NPCs:', err);
    container.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar NPCs.</p>';
  }
}

// Modal Detalhes do NPC
function openNpcDetails(uid) {
  const doc = ALL_NPCS_CACHE[uid] || (ALL_CHARACTERS ? ALL_CHARACTERS[uid] : null);
  if (!doc) {
    if (typeof openCharacterSheet === 'function') openCharacterSheet(uid);
    return;
  }

  const char = doc.character || {};
  const isStaff = isStaffOrAdminUser();

  const html = `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.8rem;">
        <div>
          <span class="story-badge badge-type">NPC de Kensword</span>
          <h2 style="font-family:'Cinzel',serif; color:var(--gold-bright); margin:0.3rem 0 0;">${char.name || 'NPC'}</h2>
          <span style="font-size:0.85rem; color:var(--ink-light);">${char.title || char.class || 'Aventureiro / Morador'}</span>
        </div>
        ${isStaff ? `
          <div style="display:flex; gap:0.5rem;">
            <button onclick="openNpcEditor('${uid}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem;">✏️ Editar</button>
            <button onclick="deleteNpc('${uid}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-color:var(--red-wax); color:#ff6b6b;">🗑️ Excluir</button>
          </div>
        ` : ''}
      </div>

      <div style="display:flex; gap:1.5rem; margin-bottom:1.5rem; flex-wrap:wrap; justify-content:center;">
        <img src="${char.avatar || 'Photos/demihuman.webp'}" alt="${char.name}" style="width:160px; height:160px; object-fit:cover; border-radius:8px; border:2px solid var(--gold); box-shadow:0 4px 10px rgba(0,0,0,0.4);">
        <div style="flex:1; min-width:220px; display:flex; flex-direction:column; justify-content:center; gap:0.4rem;">
          <p style="margin:0;"><strong>Raça:</strong> ${char.race || 'Humano'}</p>
          <p style="margin:0;"><strong>Ocupação / Título:</strong> ${char.title || char.class || '—'}</p>
          <p style="margin:0;"><strong>Localização Frequente:</strong> ${char.location || 'Continente de Kensword'}</p>
          <p style="margin:0;"><strong>Personalidade:</strong> ${char.personality || '—'}</p>
        </div>
      </div>

      <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; margin-bottom:1.5rem;">
        <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">📜 História &amp; Comportamento:</h4>
        <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${char.description || char.history || 'Sem história detalhada.'}</div>
      </div>

      ${char.statsOrAbilities ? `
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; margin-bottom:1.5rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">⚔️ Ficha &amp; Habilidades em Combate:</h4>
          <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${char.statsOrAbilities}</div>
        </div>
      ` : ''}

      <div style="text-align:center; margin-top:1.5rem;">
        <button onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.6rem 2rem;">
          Fechar
        </button>
      </div>
    </div>
  `;

  openWorldContentModal(html);
}

// Editor de NPC (Mestre Supremo)
function openNpcEditor(uid = null) {
  if (!isStaffOrAdminUser()) {
    showToast('⚠️ Apenas o Administrador pode adicionar ou editar NPCs.', 'error');
    return;
  }

  const isEdit = !!uid;
  const doc = isEdit ? (ALL_NPCS_CACHE[uid] || {}) : {};
  const char = doc.character || {};

  const html = `
    <div>
      <h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--gold-bright); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">
        ${isEdit ? '✏️ Editar NPC' : '🎭 Cadastrar Novo NPC'}
      </h2>

      <form onsubmit="saveNpc(event, '${uid || ''}')">
        <div class="field-group">
          <label>Nome do NPC *</label>
          <input type="text" id="npc-name" value="${(char.name || '').replace(/"/g, '&quot;')}" required placeholder="Ex: Mestre Elian, o Ferreiro">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <label>Raça</label>
            <input type="text" id="npc-race" value="${(char.race || 'Humano').replace(/"/g, '&quot;')}" placeholder="Ex: Elfo Nobre, Anão, Humano">
          </div>
          <div class="field-group">
            <label>Título / Profissão</label>
            <input type="text" id="npc-title" value="${(char.title || char.class || '').replace(/"/g, '&quot;')}" placeholder="Ex: Comandante da Guarda, Grão-Mago">
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <label>Localização Principal</label>
            <input type="text" id="npc-location" value="${(char.location || 'Balistia').replace(/"/g, '&quot;')}" placeholder="Ex: Balistia - Bairro Nobre">
          </div>
          <div class="field-group">
            <label>Personalidade</label>
            <input type="text" id="npc-personality" value="${(char.personality || '').replace(/"/g, '&quot;')}" placeholder="Ex: Sério, austero, leal à Guilda">
          </div>
        </div>

        <div class="field-group">
          <label>Foto / Avatar do NPC (URL ou Arquivo)</label>
          <input type="text" id="npc-avatar" value="${(char.avatar || 'Photos/demihuman.webp').replace(/"/g, '&quot;')}" placeholder="URL da foto ou caminho relativo">
          <div style="margin-top:0.4rem; display:flex; gap:0.6rem; align-items:center;">
            <input type="file" id="npc-avatar-file" accept="image/*" style="display:none;" onchange="handleNpcAvatarUpload(event)">
            <button type="button" onclick="document.getElementById('npc-avatar-file').click()" class="admin-action-btn" style="font-size:0.75rem; padding:0.25rem 0.6rem;">
              📁 Upload Imagem
            </button>
            <span style="font-size:0.75rem; color:var(--ink-light);">Sugestões: Photos/demihuman.webp, Photos/Elf.jpg, Photos/Dwarf.jpg, Photos/Human.jpg</span>
          </div>
        </div>

        <div class="field-group">
          <label>Descrição / História do NPC</label>
          <textarea id="npc-desc" rows="4" placeholder="Origem do NPC, motivações e importância para os aventureiros..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:sans-serif;">${char.description || char.history || ''}</textarea>
        </div>

        <div class="field-group">
          <label>Ficha &amp; Habilidades em Combate (Atributos, Magias, etc.)</label>
          <textarea id="npc-stats" rows="4" placeholder="Ex: HP: 450 | Força: 80 | Magia: 120&#10;Habilidades: Golpe Sísmico, Escudo Sagrado..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:sans-serif;">${char.statsOrAbilities || ''}</textarea>
        </div>

        <div style="display:flex; justify-content:center; gap:1.2rem; margin-top:2rem;">
          <button type="button" onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.8rem 2rem; background:rgba(0,0,0,0.4); border-color:var(--wood-plank);">
            Cancelar
          </button>
          <button type="submit" class="form-submit-btn" style="width:auto; padding:0.8rem 2.5rem; background:var(--gold); border-color:var(--gold); color:#1a0f08; font-weight:bold;">
            💾 ${isEdit ? 'Atualizar NPC' : 'Cadastrar NPC'}
          </button>
        </div>
      </form>
    </div>
  `;

  openWorldContentModal(html);
}

function handleNpcAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('npc-avatar').value = e.target.result;
    showToast('🖼️ Avatar carregado!', 'success');
  };
  reader.readAsDataURL(file);
}

async function saveNpc(event, uid) {
  event.preventDefault();
  if (!isStaffOrAdminUser()) return;

  const name = document.getElementById('npc-name').value.trim();
  const race = document.getElementById('npc-race').value.trim();
  const title = document.getElementById('npc-title').value.trim();
  const location = document.getElementById('npc-location').value.trim();
  const personality = document.getElementById('npc-personality').value.trim();
  const avatar = document.getElementById('npc-avatar').value.trim() || 'Photos/demihuman.webp';
  const description = document.getElementById('npc-desc').value.trim();
  const statsOrAbilities = document.getElementById('npc-stats').value.trim();

  const npcDocId = uid || ('npc_' + Date.now());

  const npcData = {
    type: 'NPC',
    status: 'approved',
    character: {
      name,
      race,
      title,
      class: title,
      location,
      personality,
      avatar,
      description,
      statsOrAbilities,
      isNpc: true
    },
    updatedAt: Date.now()
  };

  try {
    showToast('💾 Salvando NPC...', 'info');
    await _db.collection('characters').doc(npcDocId).set(npcData, { merge: true });
    showToast('✅ NPC salvo com sucesso!', 'success');
    closeWorldContentModal();
    await loadNpcsTab();
  } catch (err) {
    console.error('Erro ao salvar NPC:', err);
    showToast('❌ Falha ao salvar NPC.', 'error');
  }
}

async function deleteNpc(uid) {
  if (!isStaffOrAdminUser()) return;
  if (!confirm('⚠️ Tem certeza que deseja excluir este NPC permanentemente?')) return;

  try {
    showToast('🗑️ Excluindo NPC...', 'info');
    await _db.collection('characters').doc(uid).delete();
    delete ALL_CHARACTERS[uid];
    delete ALL_NPCS_CACHE[uid];
    showToast('✅ NPC excluído com sucesso!', 'success');
    await loadNpcsTab();
  } catch (err) {
    console.error('Erro ao excluir NPC:', err);
    showToast('❌ Falha ao excluir NPC.', 'error');
  }
}

// ─────────────────────────────────────────────────────────────────────
// 3. ABA MONSTROS (Bestiário de Kensword)
// ─────────────────────────────────────────────────────────────────────

async function refreshMonsterCache() {
  ALL_MONSTERS = [];
  try {
    if (_db) {
      const snap = await _db.collection('monsters').get();
      snap.forEach(doc => {
        ALL_MONSTERS.push({ id: doc.id, ...doc.data() });
      });
    }
  } catch (e) {
    console.warn('Erro ao atualizar cache de monstros:', e);
  }
  if (ALL_MONSTERS.length === 0) {
    ALL_MONSTERS = getStarterMonsters();
  }
}

function getStarterMonsters() {
  return [
    {
      id: 'monster_goblin',
      name: 'Goblin Espreitador',
      image: 'Photos/Goblin.jpg',
      rank: 'Rank E',
      habitat: 'Cavernas, Florestas Sombrias e Ruínas',
      species: 'Humanoide Monstruoso',
      description: 'Criaturas de baixa estatura porém ardilosas. Atacam em bandos numerosos utilizando emboscadas, venenos rústicos e armadilhas.',
      stats: 'HP: 60 | Força: 18 Kg | Resistência: 15 Kg | Magia: 0 | Velocidade: 22 Km/h',
      abilities: 'Ataque em Matilha (+10% dano quando em grupo de 3+), Furtividade Básica, Mordida Venenosa.',
      weakness: 'Fogo, Luz Sagrada e ataques de corte direto.',
      drops: 'Orelha de Goblin, Adaga Quebrada, Bolsa de Moedas (5 a 20 moedas).'
    },
    {
      id: 'monster_kobold',
      name: 'Kobold Caçador',
      image: 'Photos/Kobold.webp',
      rank: 'Rank D',
      habitat: 'Masmorras dos Primeiros Andares e Galerias Subterrâneas',
      species: 'Dracônico Inferior',
      description: 'Parentes distantes dos grandes répteis, os Kobolds possuem escamas rígidas e visão noturna perfeita. Costumam servir criaturas mais poderosas.',
      stats: 'HP: 110 | Força: 28 Kg | Resistência: 30 Kg | Magia: 10 | Velocidade: 26 Km/h',
      abilities: 'Flecha Perfurante, Camuflagem Rochosa, Sentido Dracônico.',
      weakness: 'Frio extremo e ataques de concussão pesada.',
      drops: 'Escama de Kobold, Arco de Caça Rústico, Minério de Cobre (1x).'
    },
    {
      id: 'monster_ghoul',
      name: 'Ghoul Carniçal',
      image: 'Photos/Ghoul.jpg',
      rank: 'Rank C',
      habitat: 'Cemitérios e Criptas Ancestrais',
      species: 'Morto-Vivo Canibal',
      description: 'Seres amaldiçoados que devoram cadáveres. Possuem a habilidade Estômago de Aço, imunes a doenças e maldições transmitidas por carne putrefata.',
      stats: 'HP: 240 | Força: 55 Kg | Resistência: 50 Kg | Magia: 20 | Velocidade: 28 Km/h',
      abilities: 'Estômago de Aço, Garras Paralisantes (chance de paralisar por 1 rodada), Salto Carniceiro.',
      weakness: 'Elemento Sagrado, Fogo Puro.',
      drops: 'Pó de Cadáver, Dente Amaldiçoado, Essência de Trevas.'
    },
    {
      id: 'monster_succubus',
      name: 'Succubus Tentadora',
      image: 'Photos/Succubus.jpg',
      rank: 'Rank B',
      habitat: 'Andares Médios e Câmaras Ilusórias',
      species: 'Demônio Arcana',
      description: 'Demônios de grande beleza que manipulam mentes e corações de aventureiros desavisados para sugar sua energia vital.',
      stats: 'HP: 380 | Força: 40 Kg | Resistência: 45 Kg | Magia: 180 | Velocidade: 35 Km/h',
      abilities: 'Charme Ilusório, Drenagem de Vitalidade (recupera HP ao atacar), Asas Sombrias.',
      weakness: 'Elemento Luz, Mente Focada (Perícia Concentração Lvl 5+).',
      drops: 'Asa Demoníaca, Fragmento de Alma, Joia Mágica.'
    }
  ];
}

async function loadMonstersTab() {
  const container = document.getElementById('monsters-grid');
  const adminActions = document.getElementById('monsters-admin-actions');
  if (!container) return;

  const isStaff = isStaffOrAdminUser();
  if (adminActions) {
    adminActions.innerHTML = isStaff ? `
      <button onclick="openMonsterEditor()" class="admin-action-btn">
        <span>➕</span> Adicionar Monstro
      </button>
    ` : '';
  }

  container.innerHTML = '<div class="auth-loading active" style="margin:2rem auto;"><div class="auth-spinner"></div></div>';

  try {
    await refreshMonsterCache();
    renderMonstersGrid(ALL_MONSTERS);
  } catch (err) {
    console.error('Erro ao carregar monstros:', err);
    container.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar Bestiário.</p>';
  }
}

function renderMonstersGrid(monsters) {
  const container = document.getElementById('monsters-grid');
  if (!container) return;

  const isStaff = isStaffOrAdminUser();
  let html = '';

  monsters.forEach(m => {
    const rankClass = (m.rank || '').toLowerCase().includes('s') ? 'rank-s' :
                      (m.rank || '').toLowerCase().includes('a') || (m.rank || '').toLowerCase().includes('b') ? 'rank-a' : 'rank-c';

    html += `
      <div class="character-card" style="position:relative;">
        <div onclick="openMonsterDetails('${m.id}')">
          <span style="position:absolute; top:6px; right:6px; z-index:2;" class="rank-badge ${rankClass}">${m.rank || 'Rank D'}</span>
          <img src="${m.image || 'Photos/Goblin.jpg'}" alt="${m.name}">
          <div class="char-card-name" style="padding-bottom:0.2rem;">${m.name}</div>
          <div style="font-size:0.75rem; color:var(--ink-light); padding-bottom:0.6rem;">${m.species || m.habitat || 'Criatura'}</div>
        </div>
        ${isStaff ? `
          <div style="display:flex; justify-content:center; gap:0.4rem; padding:0.4rem; border-top:1px solid var(--wood-plank); background:rgba(0,0,0,0.3);">
            <button onclick="openMonsterEditor('${m.id}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="Editar Monstro">✏️</button>
            <button onclick="deleteMonster('${m.id}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="Excluir Monstro">🗑️</button>
          </div>
        ` : ''}
      </div>
    `;
  });

  container.innerHTML = html;
}

// Modal Detalhes do Monstro
function openMonsterDetails(monsterId) {
  const m = ALL_MONSTERS.find(mon => mon.id === monsterId);
  if (!m) return;

  const isStaff = isStaffOrAdminUser();
  const rankClass = (m.rank || '').toLowerCase().includes('s') ? 'rank-s' :
                    (m.rank || '').toLowerCase().includes('a') || (m.rank || '').toLowerCase().includes('b') ? 'rank-a' : 'rank-c';

  const html = `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.8rem;">
        <div>
          <span class="rank-badge ${rankClass}">${m.rank || 'Rank D'}</span>
          <h2 style="font-family:'Cinzel Decorative',serif; color:var(--gold-bright); margin:0.3rem 0 0;">${m.name}</h2>
          <span style="font-size:0.85rem; color:var(--ink-light);">${m.species || 'Criatura de Kensword'}</span>
        </div>
        ${isStaff ? `
          <div style="display:flex; gap:0.5rem;">
            <button onclick="openMonsterEditor('${m.id}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem;">✏️ Editar</button>
            <button onclick="deleteMonster('${m.id}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-color:var(--red-wax); color:#ff6b6b;">🗑️ Excluir</button>
          </div>
        ` : ''}
      </div>

      <div style="display:flex; gap:1.5rem; margin-bottom:1.5rem; flex-wrap:wrap; justify-content:center;">
        <img src="${m.image || 'Photos/Goblin.jpg'}" alt="${m.name}" style="width:160px; height:160px; object-fit:cover; border-radius:8px; border:2px solid var(--gold); box-shadow:0 4px 10px rgba(0,0,0,0.4);">
        <div style="flex:1; min-width:220px; display:flex; flex-direction:column; justify-content:center; gap:0.4rem;">
          <p style="margin:0;"><strong>Rank de Ameaça:</strong> <span class="rank-badge ${rankClass}">${m.rank || 'Rank D'}</span></p>
          <p style="margin:0;"><strong>Habitat Natural:</strong> ${m.habitat || '—'}</p>
          <p style="margin:0;"><strong>Espécie / Tipo:</strong> ${m.species || 'Besta'}</p>
          ${m.weakness ? `<p style="margin:0; color:#e74c3c;"><strong>⚠️ Fraquezas:</strong> ${m.weakness}</p>` : ''}
        </div>
      </div>

      <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; margin-bottom:1.2rem;">
        <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">📖 Ecologia &amp; Comportamento:</h4>
        <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${m.description || 'Sem descrição.'}</div>
      </div>

      ${m.stats ? `
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">⚔️ Ficha &amp; Atributos de Combate:</h4>
          <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${m.stats}</div>
        </div>
      ` : ''}

      ${m.abilities ? `
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">💥 Habilidades Especiais &amp; Ataques:</h4>
          <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${m.abilities}</div>
        </div>
      ` : ''}

      ${m.drops ? `
        <div style="background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.3); border-radius:8px; padding:1.2rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold-bright); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">💰 Recompensas &amp; Drops:</h4>
          <div style="font-size:0.95rem; color:var(--ink); line-height:1.6;">${m.drops}</div>
        </div>
      ` : ''}

      <div style="text-align:center; margin-top:1.5rem;">
        <button onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.6rem 2rem;">
          Fechar
        </button>
      </div>
    </div>
  `;

  openWorldContentModal(html);
}

// Editor de Monstros (Mestre Supremo)
function openMonsterEditor(monsterId = null) {
  if (!isStaffOrAdminUser()) {
    showToast('⚠️ Apenas o Administrador pode adicionar ou editar monstros.', 'error');
    return;
  }

  const isEdit = !!monsterId;
  const m = isEdit ? ALL_MONSTERS.find(mon => mon.id === monsterId) || {} : {};

  const html = `
    <div>
      <h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--gold-bright); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">
        ${isEdit ? '✏️ Editar Monstro' : '👾 Cadastrar Novo Monstro no Bestiário'}
      </h2>

      <form onsubmit="saveMonster(event, '${monsterId || ''}')">
        <div class="field-group">
          <label>Nome do Monstro / Criatura *</label>
          <input type="text" id="mon-name" value="${(m.name || '').replace(/"/g, '&quot;')}" required placeholder="Ex: Lobo Alfa da Meia-Noite">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <label>Rank de Ameaça</label>
            <select id="mon-rank" style="width:100%; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">
              <option value="Rank F" ${m.rank === 'Rank F' ? 'selected' : ''}>Rank F (Pragas / Animais Pequenos)</option>
              <option value="Rank E" ${m.rank === 'Rank E' ? 'selected' : ''}>Rank E (Goblins, Kobolds Comuns)</option>
              <option value="Rank D" ${m.rank === 'Rank D' ? 'selected' : ''}>Rank D (Bandos / Criaturas Hostis)</option>
              <option value="Rank C" ${m.rank === 'Rank C' ? 'selected' : ''}>Rank C (Ghouls, Bestas Ferozes)</option>
              <option value="Rank B" ${m.rank === 'Rank B' ? 'selected' : ''}>Rank B (Criaturas de Elite)</option>
              <option value="Rank A" ${m.rank === 'Rank A' ? 'selected' : ''}>Rank A (Demônios Maiores, Quimeras)</option>
              <option value="Rank S" ${m.rank === 'Rank S' ? 'selected' : ''}>Rank S (Dragões, Senhores da Noite)</option>
              <option value="Boss de Andar" ${m.rank === 'Boss de Andar' ? 'selected' : ''}>Boss de Andar (10.000 XP)</option>
            </select>
          </div>
          <div class="field-group">
            <label>Espécie / Tipo</label>
            <input type="text" id="mon-species" value="${(m.species || '').replace(/"/g, '&quot;')}" placeholder="Ex: Besta Mágica, Morto-Vivo, Demônio">
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <label>Habitat Natural</label>
            <input type="text" id="mon-habitat" value="${(m.habitat || '').replace(/"/g, '&quot;')}" placeholder="Ex: Floresta de Balistia, Andar 2">
          </div>
          <div class="field-group">
            <label>Fraquezas</label>
            <input type="text" id="mon-weakness" value="${(m.weakness || '').replace(/"/g, '&quot;')}" placeholder="Ex: Fogo, Luz Sagrada, Pancadas">
          </div>
        </div>

        <div class="field-group">
          <label>Imagem da Criatura (URL ou Arquivo)</label>
          <input type="text" id="mon-image" value="${(m.image || 'Photos/Goblin.jpg').replace(/"/g, '&quot;')}" placeholder="URL da imagem">
          <div style="margin-top:0.4rem; display:flex; gap:0.6rem; align-items:center;">
            <input type="file" id="mon-image-file" accept="image/*" style="display:none;" onchange="handleMonImageUpload(event)">
            <button type="button" onclick="document.getElementById('mon-image-file').click()" class="admin-action-btn" style="font-size:0.75rem; padding:0.25rem 0.6rem;">
              📁 Upload Imagem
            </button>
            <span style="font-size:0.75rem; color:var(--ink-light);">Sugestões: Photos/Goblin.jpg, Photos/Kobold.webp, Photos/Ghoul.jpg, Photos/Demon.png</span>
          </div>
        </div>

        <div class="field-group">
          <label>Descrição &amp; Comportamento *</label>
          <textarea id="mon-desc" rows="3" required placeholder="Como a criatura age, se ataca em bando ou solitária..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:sans-serif;">${m.description || ''}</textarea>
        </div>

        <div class="field-group">
          <label>Ficha de Combate / Atributos (HP, Força, Resistência, etc.)</label>
          <textarea id="mon-stats" rows="3" placeholder="HP: 150 | Força: 40 Kg | Resistência: 30 Kg | Magia: 10 | Velocidade: 25 Km/h" style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:sans-serif;">${m.stats || ''}</textarea>
        </div>

        <div class="field-group">
          <label>Habilidades Especiais &amp; Ataques</label>
          <textarea id="mon-abilities" rows="2" placeholder="Ex: Mordida Ácida, Investida Selvagem, Camuflagem..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:sans-serif;">${m.abilities || ''}</textarea>
        </div>

        <div class="field-group">
          <label>Recompensas &amp; Drops</label>
          <input type="text" id="mon-drops" value="${(m.drops || '').replace(/"/g, '&quot;')}" placeholder="Ex: Couro Resistente (1x), Dente de Lobo, 50 Moedas">
        </div>

        <div style="display:flex; justify-content:center; gap:1.2rem; margin-top:2rem;">
          <button type="button" onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.8rem 2rem; background:rgba(0,0,0,0.4); border-color:var(--wood-plank);">
            Cancelar
          </button>
          <button type="submit" class="form-submit-btn" style="width:auto; padding:0.8rem 2.5rem; background:var(--gold); border-color:var(--gold); color:#1a0f08; font-weight:bold;">
            💾 ${isEdit ? 'Atualizar Monstro' : 'Cadastrar Monstro'}
          </button>
        </div>
      </form>
    </div>
  `;

  openWorldContentModal(html);
}

function handleMonImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('mon-image').value = e.target.result;
    showToast('🖼️ Imagem do monstro carregada!', 'success');
  };
  reader.readAsDataURL(file);
}

async function saveMonster(event, monsterId) {
  event.preventDefault();
  if (!isStaffOrAdminUser()) return;

  const name = document.getElementById('mon-name').value.trim();
  const rank = document.getElementById('mon-rank').value;
  const species = document.getElementById('mon-species').value.trim();
  const habitat = document.getElementById('mon-habitat').value.trim();
  const weakness = document.getElementById('mon-weakness').value.trim();
  const image = document.getElementById('mon-image').value.trim() || 'Photos/Goblin.jpg';
  const description = document.getElementById('mon-desc').value.trim();
  const stats = document.getElementById('mon-stats').value.trim();
  const abilities = document.getElementById('mon-abilities').value.trim();
  const drops = document.getElementById('mon-drops').value.trim();

  const monData = {
    name,
    rank,
    species,
    habitat,
    weakness,
    image,
    description,
    stats,
    abilities,
    drops,
    updatedAt: Date.now()
  };

  try {
    showToast('💾 Salvando monstro...', 'info');
    if (monsterId) {
      await _db.collection('monsters').doc(monsterId).set(monData, { merge: true });
    } else {
      monData.createdAt = Date.now();
      await _db.collection('monsters').add(monData);
    }
    showToast('✅ Monstro cadastrado com sucesso!', 'success');
    closeWorldContentModal();
    await loadMonstersTab();
  } catch (err) {
    console.error('Erro ao salvar monstro:', err);
    showToast('❌ Falha ao salvar monstro.', 'error');
  }
}

async function deleteMonster(monsterId) {
  if (!isStaffOrAdminUser()) return;
  if (!confirm('⚠️ Tem certeza que deseja excluir este monstro do bestiário?')) return;

  try {
    showToast('🗑️ Excluindo monstro...', 'info');
    await _db.collection('monsters').doc(monsterId).delete();
    showToast('✅ Monstro excluído com sucesso!', 'success');
    await loadMonstersTab();
  } catch (err) {
    console.error('Erro ao excluir monstro:', err);
    showToast('❌ Falha ao excluir monstro.', 'error');
  }
}

// ─────────────────────────────────────────────────────────────────────
// 4. ABA ORGANIZAÇÕES & FACÇÕES
// ─────────────────────────────────────────────────────────────────────

async function refreshOrgCache() {
  ALL_ORGS = [];
  try {
    if (_db) {
      const snap = await _db.collection('organizations').get();
      snap.forEach(doc => {
        ALL_ORGS.push({ id: doc.id, ...doc.data() });
      });
    }
  } catch (e) {
    console.warn('Erro ao carregar organizações:', e);
  }
  if (ALL_ORGS.length === 0) {
    ALL_ORGS = getStarterOrganizations();
  }
}

function getStarterOrganizations() {
  return [
    {
      id: 'org_guilda',
      name: 'Guilda dos Aventureiros de Balistia',
      image: 'Photos/Angel.jpg',
      type: 'Guilda Oficial de Aventureiros',
      leader: 'Mestre Supremo DanteSTR',
      headquarters: 'Centro Cívico de Balistia',
      motto: 'Pela lâmina, pela honra e pela glória de Kensword.',
      description: 'A maior e mais respeitada instituição de mercenários e aventureiros do continente. Responsável pela emissão de licenças, recompensas por monstros e regulação das subidas de andar.',
      influence: 'Alta — Presença em todas as cidades e postos avançados.',
      benefits: 'Acesso a missões remuneradas, seguro de equipamentos e treino em dupla.'
    },
    {
      id: 'org_igreja_dourada',
      name: 'Igreja Dourada',
      image: 'Photos/demihuman.webp',
      type: 'Ordem Religiosa Solar',
      leader: 'Sumo Sacerdote Aurélio',
      headquarters: 'Catedral da Luz Dourada (Bairro Nobre de Balistia)',
      motto: 'A Luz que purifica o ouro também purifica a alma.',
      description: 'Uma das ordens religiosas mais ricas e influentes de Kensword. Pregam a prosperidade e a retidão divina, auxiliando os nobres e mantendo os registros sagrados.',
      influence: 'Extrema — Controle sobre templos de cura e finanças sacras.',
      benefits: 'Bênçãos sagradas, purificação de maldições e acolhimento em templos.'
    },
    {
      id: 'org_fogo_eterno',
      name: 'Igreja do Fogo Eterno',
      image: 'Photos/Demon.png',
      type: 'Culto Fervoroso Elemental',
      leader: 'Grão-Inquisidor Ignis',
      headquarters: 'Bastião das Chamas Rubras',
      motto: 'Apenas no fogo o metal é forjado e a fraqueza é destruída.',
      description: 'Ordem combativa e intransigente que cultua o elemento Fogo como a força primordial de renovação do mundo. Vêem criaturas das trevas com desprezo absoluto.',
      influence: 'Média-Alta — Facção militar de forte apelo marcial.',
      benefits: 'Treinamento avançado no elemento Fogo e forja de armamentos bélicos.'
    }
  ];
}

async function loadOrgsTab() {
  const container = document.getElementById('orgs-grid');
  const adminActions = document.getElementById('orgs-admin-actions');
  if (!container) return;

  const isStaff = isStaffOrAdminUser();
  if (adminActions) {
    adminActions.innerHTML = isStaff ? `
      <button onclick="openOrgEditor()" class="admin-action-btn">
        <span>➕</span> Adicionar Organização
      </button>
    ` : '';
  }

  container.innerHTML = '<div class="auth-loading active" style="margin:2rem auto;"><div class="auth-spinner"></div></div>';

  try {
    await refreshOrgCache();
    renderOrgsGrid(ALL_ORGS);
  } catch (err) {
    console.error('Erro ao carregar organizações:', err);
    container.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar Organizações.</p>';
  }
}

function renderOrgsGrid(orgs) {
  const container = document.getElementById('orgs-grid');
  if (!container) return;

  const isStaff = isStaffOrAdminUser();
  let html = '';

  orgs.forEach(o => {
    html += `
      <div class="character-card" style="position:relative;">
        <div onclick="openOrgDetails('${o.id}')">
          <img src="${o.image || 'Photos/Angel.jpg'}" alt="${o.name}">
          <div class="char-card-name" style="padding-bottom:0.2rem;">${o.name}</div>
          <div style="font-size:0.75rem; color:var(--gold); padding-bottom:0.6rem; font-family:'Cinzel',serif;">${o.type || 'Organização'}</div>
        </div>
        ${isStaff ? `
          <div style="display:flex; justify-content:center; gap:0.4rem; padding:0.4rem; border-top:1px solid var(--wood-plank); background:rgba(0,0,0,0.3);">
            <button onclick="openOrgEditor('${o.id}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="Editar Organização">✏️</button>
            <button onclick="deleteOrg('${o.id}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="Excluir Organização">🗑️</button>
          </div>
        ` : ''}
      </div>
    `;
  });

  container.innerHTML = html;
}

// Modal Detalhes da Organização
function openOrgDetails(orgId) {
  const o = ALL_ORGS.find(org => org.id === orgId);
  if (!o) return;

  const isStaff = isStaffOrAdminUser();

  const html = `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.8rem;">
        <div>
          <span class="story-badge badge-type">${o.type || 'Organização'}</span>
          <h2 style="font-family:'Cinzel Decorative',serif; color:var(--gold-bright); margin:0.3rem 0 0;">${o.name}</h2>
          ${o.motto ? `<p style="margin:0.2rem 0 0; font-style:italic; font-size:0.88rem; color:var(--ink-light);">"${o.motto}"</p>` : ''}
        </div>
        ${isStaff ? `
          <div style="display:flex; gap:0.5rem;">
            <button onclick="openOrgEditor('${o.id}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem;">✏️ Editar</button>
            <button onclick="deleteOrg('${o.id}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-color:var(--red-wax); color:#ff6b6b;">🗑️ Excluir</button>
          </div>
        ` : ''}
      </div>

      <div style="display:flex; gap:1.5rem; margin-bottom:1.5rem; flex-wrap:wrap; justify-content:center;">
        <img src="${o.image || 'Photos/Angel.jpg'}" alt="${o.name}" style="width:160px; height:160px; object-fit:cover; border-radius:8px; border:2px solid var(--gold); box-shadow:0 4px 10px rgba(0,0,0,0.4);">
        <div style="flex:1; min-width:220px; display:flex; flex-direction:column; justify-content:center; gap:0.4rem;">
          <p style="margin:0;"><strong>Líder / Fundador:</strong> ${o.leader || '—'}</p>
          <p style="margin:0;"><strong>Sede Principal:</strong> ${o.headquarters || 'Balistia'}</p>
          <p style="margin:0;"><strong>Grau de Influência:</strong> ${o.influence || 'Moderada'}</p>
        </div>
      </div>

      <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; margin-bottom:1.2rem;">
        <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">🏛️ História &amp; Filosofia:</h4>
        <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${o.description || 'Sem descrição.'}</div>
      </div>

      ${o.benefits ? `
        <div style="background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.3); border-radius:8px; padding:1.2rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold-bright); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">🌟 Vantagens &amp; Atuação para Membros:</h4>
          <div style="font-size:0.95rem; color:var(--ink); line-height:1.6;">${o.benefits}</div>
        </div>
      ` : ''}

      <div style="text-align:center; margin-top:1.5rem;">
        <button onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.6rem 2rem;">
          Fechar
        </button>
      </div>
    </div>
  `;

  openWorldContentModal(html);
}

// Editor de Organização (Mestre Supremo)
function openOrgEditor(orgId = null) {
  if (!isStaffOrAdminUser()) {
    showToast('⚠️ Apenas o Administrador pode adicionar ou editar organizações.', 'error');
    return;
  }

  const isEdit = !!orgId;
  const o = isEdit ? ALL_ORGS.find(org => org.id === orgId) || {} : {};

  const html = `
    <div>
      <h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--gold-bright); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">
        ${isEdit ? '✏️ Editar Organização' : '🏰 Cadastrar Nova Organização / Facção'}
      </h2>

      <form onsubmit="saveOrg(event, '${orgId || ''}')">
        <div class="field-group">
          <label>Nome da Organização *</label>
          <input type="text" id="org-name" value="${(o.name || '').replace(/"/g, '&quot;')}" required placeholder="Ex: Ordem dos Cavaleiros de Balistia">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <label>Tipo de Organização</label>
            <input type="text" id="org-type" value="${(o.type || 'Guilda / Ordem').replace(/"/g, '&quot;')}" placeholder="Ex: Ordem Religiosa, Guilda Comercial">
          </div>
          <div class="field-group">
            <label>Líder / Fundador</label>
            <input type="text" id="org-leader" value="${(o.leader || '').replace(/"/g, '&quot;')}" placeholder="Ex: Grão-Mestre DanteSTR">
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <label>Sede Principal</label>
            <input type="text" id="org-headquarters" value="${(o.headquarters || 'Balistia').replace(/"/g, '&quot;')}" placeholder="Ex: Balistia - Bairro Nobre">
          </div>
          <div class="field-group">
            <label>Grau de Influência</label>
            <input type="text" id="org-influence" value="${(o.influence || 'Alta').replace(/"/g, '&quot;')}" placeholder="Ex: Extrema, Alta, Regional">
          </div>
        </div>

        <div class="field-group">
          <label>Lema / Ideologia</label>
          <input type="text" id="org-motto" value="${(o.motto || '').replace(/"/g, '&quot;')}" placeholder="Ex: Pela honra e pela proteção do reino">
        </div>

        <div class="field-group">
          <label>Brasão / Imagem (URL ou Arquivo)</label>
          <input type="text" id="org-image" value="${(o.image || 'Photos/Angel.jpg').replace(/"/g, '&quot;')}" placeholder="URL da foto ou caminho">
          <div style="margin-top:0.4rem; display:flex; gap:0.6rem; align-items:center;">
            <input type="file" id="org-image-file" accept="image/*" style="display:none;" onchange="handleOrgImageUpload(event)">
            <button type="button" onclick="document.getElementById('org-image-file').click()" class="admin-action-btn" style="font-size:0.75rem; padding:0.25rem 0.6rem;">
              📁 Upload Brasão
            </button>
            <span style="font-size:0.75rem; color:var(--ink-light);">Sugestões: Photos/Angel.jpg, Photos/demihuman.webp, Photos/Demon.png</span>
          </div>
        </div>

        <div class="field-group">
          <label>História &amp; Descrição Detalhada *</label>
          <textarea id="org-desc" rows="4" required placeholder="Origens da organização, propósito e atuação no RPG..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:sans-serif;">${o.description || ''}</textarea>
        </div>

        <div class="field-group">
          <label>Vantagens &amp; Atuação para Membros</label>
          <textarea id="org-benefits" rows="2" placeholder="Benefícios que membros da organização recebem..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:sans-serif;">${o.benefits || ''}</textarea>
        </div>

        <div style="display:flex; justify-content:center; gap:1.2rem; margin-top:2rem;">
          <button type="button" onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.8rem 2rem; background:rgba(0,0,0,0.4); border-color:var(--wood-plank);">
            Cancelar
          </button>
          <button type="submit" class="form-submit-btn" style="width:auto; padding:0.8rem 2.5rem; background:var(--gold); border-color:var(--gold); color:#1a0f08; font-weight:bold;">
            💾 ${isEdit ? 'Atualizar Organização' : 'Cadastrar Organização'}
          </button>
        </div>
      </form>
    </div>
  `;

  openWorldContentModal(html);
}

function handleOrgImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('org-image').value = e.target.result;
    showToast('🖼️ Brasão carregado!', 'success');
  };
  reader.readAsDataURL(file);
}

async function saveOrg(event, orgId) {
  event.preventDefault();
  if (!isStaffOrAdminUser()) return;

  const name = document.getElementById('org-name').value.trim();
  const type = document.getElementById('org-type').value.trim();
  const leader = document.getElementById('org-leader').value.trim();
  const headquarters = document.getElementById('org-headquarters').value.trim();
  const influence = document.getElementById('org-influence').value.trim();
  const motto = document.getElementById('org-motto').value.trim();
  const image = document.getElementById('org-image').value.trim() || 'Photos/Angel.jpg';
  const description = document.getElementById('org-desc').value.trim();
  const benefits = document.getElementById('org-benefits').value.trim();

  const orgData = {
    name,
    type,
    leader,
    headquarters,
    influence,
    motto,
    image,
    description,
    benefits,
    updatedAt: Date.now()
  };

  try {
    showToast('💾 Salvando organização...', 'info');
    if (orgId) {
      await _db.collection('organizations').doc(orgId).set(orgData, { merge: true });
    } else {
      orgData.createdAt = Date.now();
      await _db.collection('organizations').add(orgData);
    }
    showToast('✅ Organização salva com sucesso!', 'success');
    closeWorldContentModal();
    await loadOrgsTab();
  } catch (err) {
    console.error('Erro ao salvar organização:', err);
    showToast('❌ Falha ao salvar organização.', 'error');
  }
}

async function deleteOrg(orgId) {
  if (!isStaffOrAdminUser()) return;
  if (!confirm('⚠️ Tem certeza que deseja excluir esta organização permanentemente?')) return;

  try {
    showToast('🗑️ Excluindo organização...', 'info');
    await _db.collection('organizations').doc(orgId).delete();
    showToast('✅ Organização excluída com sucesso!', 'success');
    await loadOrgsTab();
  } catch (err) {
    console.error('Erro ao excluir organização:', err);
    showToast('❌ Falha ao excluir organização.', 'error');
  }
}

// Inicializa a aba de história ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  if (typeof loadHistoryTab === 'function') {
    loadHistoryTab();
  }
});
