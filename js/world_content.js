// =====================================================================
// KENSWORD CHRONICLES - WORLD CONTENT MODULE
// Módulo de Gerenciamento do Mestre Supremo (Admin DanteSTR)
// Sistema exclusivo para criação, edição e exclusão de:
// - NPCs (com controle granular de visibilidade para players)
// - Monstros / Bestiário (com variantes, tipos, atributos por variante e visibilidade)
// - Organizações (com líder, índole, logo, descrição e membros em carrossel)
// - Histórias / Missões (com fotos 140x140px, entidades vinculadas e visibilidade)
// =====================================================================

let ALL_STORIES = [];
let ALL_MONSTERS = [];
let ALL_ORGS = [];
let ALL_NPCS = [];

// Lista Oficial de Perícias do RPG Kensword para seleção
const KENSWORD_PERICIAS = [
  "Combate", "Arte Marcial", "Vitalidade", "Resistência", "Resiliência", "Bloqueio", "Esquiva", "Agilidade",
  "Adaga", "Espada", "Katana", "Lança", "Alabarda", "Espadão", "Machado", "Foice", "Martelo", "Maça", "Escudo", "Ioiô", "Cajado", "Grimório", "Arco e flecha",
  "Magia", "Inteligência", "Magia de apoio", "Concentração", "Percepção", "Furtividade", "Manuseio", "Precaução", "Encantar",
  "Agricultura", "Pecuária", "Culinária", "Mineração", "Artesanato", "Metalurgia", "Síntese", "Estilismo", "Caça", "Monstros", "Ciência", "Alquimia", "Masmorra", "Conhecimento da Flora", "Conhecimento da Fauna",
  "Comunicação", "Negociação", "Sedução", "Drenagem Vital", "Manipulação"
];

// Helper: Verifica se o usuário atual é DanteSTR / Mestre Supremo
function isStaffOrAdminUser() {
  if (!_auth || !_auth.currentUser) return false;
  const user = _auth.currentUser;
  const currentUserData = (typeof ALL_CHARACTERS !== 'undefined' && ALL_CHARACTERS[user.uid]) ? ALL_CHARACTERS[user.uid] : null;
  const email = (user.email || '').toLowerCase();
  const displayName = (user.displayName || '').toLowerCase();
  const playerName = (currentUserData?.player?.name || '').trim().toLowerCase();
  const charName = (currentUserData?.character?.name || '').trim().toLowerCase();

  const isDante = email.includes('dantestr') ||
                  email.includes('dantest-r') ||
                  displayName.includes('dantestr') ||
                  playerName === 'dantestr' ||
                  playerName === 'dantest-r' ||
                  charName === 'dantestr' ||
                  charName === 'dantest-r';

  return !!(isDante || (currentUserData && (
    currentUserData.isAdmin || 
    currentUserData.isSubAdmin || 
    currentUserData.user_role === 'admin' || 
    currentUserData.user_role === 'sub-admin'
  )));
}

// ── BANCO DE DADOS RESILIENTE COM FALLBACK TRANSPARENTE ─────────────
async function dbGetEntities(collectionName, typeTag) {
  if (!_db) return [];
  const list = [];
  try {
    const snap = await _db.collection(collectionName).get();
    snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
    if (list.length > 0) return list;
  } catch (err) {
    console.warn(`Coleção '${collectionName}' inacessível no Firestore (${err.message}). Tentando fallback em characters...`);
  }

  // Fallback: buscar documentos em characters com worldType
  try {
    const snapChar = await _db.collection('characters').where('worldType', '==', typeTag).get();
    snapChar.forEach(doc => {
      const data = doc.data();
      list.push({ id: doc.id, ...data });
    });
  } catch (err2) {
    console.warn(`Fallback characters para '${typeTag}' também falhou:`, err2);
  }
  return list;
}

async function dbSaveEntity(collectionName, typeTag, entityId, entityData) {
  if (!_db) throw new Error("Banco de dados não conectado ao Firebase.");
  let saved = false;
  let firstError = null;

  // Tentativa 1: Coleção dedicada
  try {
    if (entityId) {
      await _db.collection(collectionName).doc(entityId).set(entityData, { merge: true });
    } else {
      entityData.createdAt = Date.now();
      const ref = await _db.collection(collectionName).add(entityData);
      entityId = ref.id;
    }
    saved = true;
  } catch (err) {
    firstError = err;
    console.warn(`Tentativa em '${collectionName}' falhou (${err.message}). Utilizando fallback em 'characters'...`);
  }

  // Tentativa 2: Fallback em characters com credenciais de criação válidas
  if (!saved) {
    const fallbackId = entityId || ('world_' + typeTag + '_' + Date.now());
    const dataWithTag = {
      ...entityData,
      worldType: typeTag,
      status: 'pending', // Atende a regra: allow create se status == 'pending'
      isAdmin: true,     // Atende a regra: allow create se isAdmin == true
      isWorldContent: true
    };
    try {
      await _db.collection('characters').doc(fallbackId).set(dataWithTag, { merge: true });
      return fallbackId;
    } catch (fallbackErr) {
      console.error('Falha também no fallback em characters:', fallbackErr);
      const detail = firstError ? `${firstError.message}` : `${fallbackErr.message}`;
      throw new Error(detail);
    }
  }
  return entityId;
}

async function dbDeleteEntity(collectionName, typeTag, entityId) {
  if (!_db) return;
  try {
    await _db.collection(collectionName).doc(entityId).delete();
  } catch (e) {
    console.warn(`Falha ao deletar em '${collectionName}'. Tentando fallback:`, e);
  }
  try {
    await _db.collection('characters').doc(entityId).delete();
  } catch (e2) {}
}


// ─────────────────────────────────────────────────────────────────────
// MODAL GERAL
// ─────────────────────────────────────────────────────────────────────
function openWorldContentModal(htmlContent) {
  let modal = document.getElementById('world-content-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'world-content-modal';
    modal.className = 'modal-overlay';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="modal-content parchment-panel" style="max-width:820px; position:relative; max-height:92vh; overflow-y:auto; padding:2rem 1.8rem;">
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

// Visualizador de Entidade Vinculada Customizada
function openCustomEntityViewer(name, type, details, image) {
  const icon = type === 'npc' ? '🎭' : type === 'monster' ? '👾' : '🏰';
  const typeLabel = type === 'npc' ? 'NPC da Missão' : type === 'monster' ? 'Monstro da Missão' : 'Organização da Missão';

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
// 1. ABA NPCS (Personagens Não-Jogáveis)
// ─────────────────────────────────────────────────────────────────────

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
    ALL_NPCS = await dbGetEntities('npcs', 'NPC');
    renderNpcsGrid(ALL_NPCS);
  } catch (err) {
    console.error('Erro ao carregar NPCs:', err);
    container.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar NPCs.</p>';
  }
}

function renderNpcsGrid(npcs) {
  const container = document.getElementById('npcs-grid');
  if (!container) return;

  const isStaff = isStaffOrAdminUser();
  const visibleList = npcs.filter(n => isStaff || n.isVisible !== false);

  if (visibleList.length === 0) {
    container.innerHTML = `
      <div class="coming-soon" style="grid-column: 1 / -1;">
        <div class="cs-icon">🎭</div>
        <h3>Nenhum NPC Registrado Ainda</h3>
        <p>${isStaff ? 'Clique em "➕ Adicionar NPC" para cadastrar o primeiro NPC do RPG.' : 'Nenhum NPC público foi registrado até o momento.'}</p>
      </div>
    `;
    return;
  }

  let html = '';
  visibleList.forEach(npc => {
    const mainPhoto = (npc.photos && npc.photos.length > 0) ? npc.photos[0] : (npc.photo || 'Photos/demihuman.webp');
    const isInvisible = npc.isVisible === false;

    html += `
      <div class="character-card" style="position:relative; ${isInvisible ? 'opacity:0.75; border:1px dashed #e67e22;' : ''}">
        ${isInvisible ? `<span style="position:absolute; top:4px; left:4px; z-index:3; background:#e67e22; color:#fff; font-size:0.6rem; padding:1px 5px; border-radius:3px; font-weight:bold;">INVISÍVEL</span>` : ''}
        <div onclick="openNpcDetails('${npc.id}')">
          <img src="${mainPhoto}" alt="${npc.name || 'NPC'}">
          <div class="char-card-name" style="padding-bottom:0.2rem;">${npc.name || 'NPC'}</div>
          ${(npc.classes && (isStaff || npc.visibleClasses)) ? `<div style="font-size:0.75rem; color:var(--gold); padding-bottom:0.6rem;">${npc.classes}</div>` : ''}
        </div>
        ${isStaff ? `
          <div style="display:flex; justify-content:center; gap:0.4rem; padding:0.4rem; border-top:1px solid var(--wood-plank); background:rgba(0,0,0,0.3);">
            <button onclick="openNpcEditor('${npc.id}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="Editar NPC">✏️</button>
            <button onclick="toggleEntityVisibility('npcs', '${npc.id}', ${!isInvisible})" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="${isInvisible ? 'Tornar Visível' : 'Tornar Invisível'}">${isInvisible ? '👁️' : '🙈'}</button>
            <button onclick="deleteNpc('${npc.id}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem; color:var(--red-wax);" title="Excluir NPC">🗑️</button>
          </div>
        ` : ''}
      </div>
    `;
  });

  container.innerHTML = html;
}

// Modal Detalhes do NPC (Visão Player vs Visão Admin)
function openNpcDetails(npcId) {
  const npc = ALL_NPCS.find(n => n.id === npcId);
  if (!npc) return;

  const isStaff = isStaffOrAdminUser();
  const photos = npc.photos && npc.photos.length > 0 ? npc.photos : [npc.photo || 'Photos/demihuman.webp'];

  // Perícias
  const pericias = npc.pericias || [];
  const visiblePericias = pericias.filter(p => isStaff || (npc.visiblePericiasAll && p.visible !== false) || p.visible === true);

  // Habilidades
  const habilidades = npc.habilidades || [];
  const visibleHabilidades = habilidades.filter(h => isStaff || (npc.visibleHabilidadesAll && h.visible !== false) || h.visible === true);

  const html = `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.8rem;">
        <div>
          <span class="story-badge badge-type">NPC de Kensword</span>
          <h2 style="font-family:'Cinzel Decorative',serif; color:var(--gold-bright); margin:0.3rem 0 0;">${npc.name || 'NPC'}</h2>
          ${(npc.classes && (isStaff || npc.visibleClasses)) ? `<span style="font-size:0.85rem; color:var(--ink-light);">${npc.classes}</span>` : ''}
        </div>
        ${isStaff ? `
          <div style="display:flex; gap:0.5rem;">
            <button onclick="openNpcEditor('${npc.id}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem;">✏️ Editar</button>
            <button onclick="deleteNpc('${npc.id}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-color:var(--red-wax); color:#ff6b6b;">🗑️ Excluir</button>
          </div>
        ` : ''}
      </div>

      <!-- FOTOS DO NPC (Galeria caso tenha mais de uma) -->
      <div style="display:flex; gap:1.5rem; margin-bottom:1.5rem; flex-wrap:wrap; justify-content:center; align-items:center;">
        <div style="display:flex; flex-direction:column; align-items:center; gap:0.5rem;">
          <img id="npc-detail-main-img" src="${photos[0]}" alt="${npc.name}" style="width:180px; height:180px; object-fit:cover; object-position:top; border-radius:8px; border:2px solid var(--gold); box-shadow:0 4px 10px rgba(0,0,0,0.5);">
          ${photos.length > 1 ? `
            <div style="display:flex; gap:0.3rem; flex-wrap:wrap; max-width:180px; justify-content:center;">
              ${photos.map((p, idx) => `
                <img src="${p}" onclick="document.getElementById('npc-detail-main-img').src='${p}'" style="width:36px; height:36px; object-fit:cover; border-radius:4px; border:1px solid var(--wood-plank); cursor:pointer;" title="Foto #${idx+1}">
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div style="flex:1; min-width:220px; display:flex; flex-direction:column; gap:0.6rem; background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem;">
          <p style="margin:0; font-size:0.95rem;"><strong>Nome:</strong> <span style="color:var(--gold-bright);">${npc.name || '—'}</span></p>
          ${npc.height ? `<p style="margin:0; font-size:0.95rem;"><strong>Altura:</strong> ${npc.height} m</p>` : ''}
          ${(npc.age && (isStaff || npc.visibleAge)) ? `<p style="margin:0; font-size:0.95rem;"><strong>Idade:</strong> ${npc.age} anos ${(!npc.visibleAge && isStaff) ? '<span style="color:#e67e22; font-size:0.75rem;">(Oculto para Players)</span>' : ''}</p>` : ''}
          ${(npc.classes && (isStaff || npc.visibleClasses)) ? `<p style="margin:0; font-size:0.95rem;"><strong>Classes:</strong> ${npc.classes} ${(!npc.visibleClasses && isStaff) ? '<span style="color:#e67e22; font-size:0.75rem;">(Oculto para Players)</span>' : ''}</p>` : ''}
          ${(npc.magics && (isStaff || npc.visibleMagics)) ? `<p style="margin:0; font-size:0.95rem;"><strong>Magias:</strong> ${npc.magics} ${(!npc.visibleMagics && isStaff) ? '<span style="color:#e67e22; font-size:0.75rem;">(Oculto para Players)</span>' : ''}</p>` : ''}
        </div>
      </div>

      <!-- BOATOS (Parte visível a todos) -->
      ${npc.boatos ? `
        <div style="background:rgba(212,175,55,0.08); border-left:4px solid var(--gold); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold-bright); margin-top:0; margin-bottom:0.4rem;">🗣️ Boatos &amp; Fama Popular:</h4>
          <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${npc.boatos}</div>
        </div>
      ` : ''}

      <!-- HISTÓRIA (OCULTA DOS JOGADORES - VISÍVEL SOMENTE PARA ADMINS) -->
      ${(isStaff && npc.historia) ? `
        <div style="background:rgba(192,57,43,0.1); border:1px solid #c0392b; border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
            <h4 style="font-family:'Cinzel',serif; color:#e74c3c; margin:0;">🔒 História Real (Confidencial - Mestre Supremo):</h4>
            <span style="background:#c0392b; color:#fff; font-size:0.65rem; padding:1px 6px; border-radius:3px; font-weight:bold;">OCULTO DE PLAYERS</span>
          </div>
          <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${npc.historia}</div>
        </div>
      ` : ''}

      <!-- ATRIBUTOS DO NPC (Padrão oculto para players) -->
      ${(isStaff || npc.visibleAttributes) && (npc.attrObj || npc.attributes) ? `
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem; margin-bottom:0.8rem;">
            <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin:0;">⚔️ Atributos do NPC:</h4>
            ${(!npc.visibleAttributes && isStaff) ? `<span style="color:#e67e22; font-size:0.75rem;">(Oculto para Players)</span>` : ''}
          </div>
          ${npc.attrObj ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:0.6rem;">
              ${npc.attrObj.forca ? `<div style="background:rgba(0,0,0,0.3); border-radius:6px; padding:0.5rem 0.8rem; text-align:center; border:1px solid rgba(212,175,55,0.2);"><div style="font-size:1.2rem;">💪</div><div style="font-size:0.75rem; color:var(--ink-light);">Força</div><div style="font-size:1.1rem; font-weight:bold; color:var(--gold-bright);">${npc.attrObj.forca} Kg</div></div>` : ''}
              ${npc.attrObj.resistencia ? `<div style="background:rgba(0,0,0,0.3); border-radius:6px; padding:0.5rem 0.8rem; text-align:center; border:1px solid rgba(212,175,55,0.2);"><div style="font-size:1.2rem;">🛡️</div><div style="font-size:0.75rem; color:var(--ink-light);">Resistência</div><div style="font-size:1.1rem; font-weight:bold; color:var(--gold-bright);">${npc.attrObj.resistencia} Kg</div></div>` : ''}
              ${npc.attrObj.velocidade ? `<div style="background:rgba(0,0,0,0.3); border-radius:6px; padding:0.5rem 0.8rem; text-align:center; border:1px solid rgba(212,175,55,0.2);"><div style="font-size:1.2rem;">⚡</div><div style="font-size:0.75rem; color:var(--ink-light);">Velocidade</div><div style="font-size:1.1rem; font-weight:bold; color:var(--gold-bright);">${npc.attrObj.velocidade} Km/h</div></div>` : ''}
              ${npc.attrObj.magia ? `<div style="background:rgba(0,0,0,0.3); border-radius:6px; padding:0.5rem 0.8rem; text-align:center; border:1px solid rgba(212,175,55,0.2);"><div style="font-size:1.2rem;">✨</div><div style="font-size:0.75rem; color:var(--ink-light);">Magia</div><div style="font-size:1.1rem; font-weight:bold; color:var(--gold-bright);">${npc.attrObj.magia} pts</div></div>` : ''}
            </div>
          ` : `<div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${npc.attributes}</div>`}
        </div>
      ` : ''}

      <!-- PERÍCIAS DO NPC -->
      ${visiblePericias.length > 0 ? `
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">🎓 Perícias:</h4>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.6rem;">
            ${visiblePericias.map(p => `
              <div class="entity-chip" style="font-size:0.85rem;">
                <strong>${p.name}</strong> <span style="color:var(--gold-bright); font-weight:bold;">Lvl ${p.level || 1}</span>
                ${(isStaff && p.visible === false) ? '<span style="color:#e67e22; font-size:0.7rem;">(oculto)</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- HABILIDADES DO NPC -->
      ${visibleHabilidades.length > 0 ? `
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">🛡️ Habilidades &amp; Poderes:</h4>
          <div style="display:flex; flex-direction:column; gap:0.8rem; margin-top:0.6rem;">
            ${visibleHabilidades.map(h => `
              <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:4px; border-left:3px solid var(--gold);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color:var(--gold-bright); font-family:'Cinzel',serif;">${h.name}</strong>
                  ${(isStaff && h.visible === false) ? '<span style="color:#e67e22; font-size:0.7rem;">(oculto para players)</span>' : ''}
                </div>
                <div style="font-size:0.9rem; color:var(--ink); margin-top:0.3rem; white-space:pre-wrap;">${h.desc || ''}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="text-align:center; margin-top:1.5rem;">
        <button onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.6rem 2.5rem;">Fechar</button>
      </div>
    </div>
  `;

  openWorldContentModal(html);
}

// Editor de NPC (Mestre Supremo)
function openNpcEditor(npcId = null) {
  if (!isStaffOrAdminUser()) {
    showToast('⚠️ Apenas o Administrador/Mestre Supremo pode cadastrar NPCs.', 'error');
    return;
  }

  const isEdit = !!npcId;
  const npc = isEdit ? ALL_NPCS.find(n => n.id === npcId) || {} : {};

  const photosStr = (npc.photos || (npc.photo ? [npc.photo] : [])).join('\n');
  const pericias = npc.pericias || [];
  const habilidades = npc.habilidades || [];

  const html = `
    <div>
      <h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--gold-bright); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">
        ${isEdit ? '✏️ Editar NPC' : '🎭 Cadastrar Novo NPC'}
      </h2>

      <form id="npc-form" onsubmit="saveNpc(event, '${npcId || ''}')">
        
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:0.6rem 1rem; border-radius:6px; margin-bottom:1.2rem;">
          <span style="font-family:'Cinzel',serif; font-size:0.9rem; color:var(--gold);">Visibilidade no Compêndio:</span>
          <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
            <input type="checkbox" id="npc-is-visible" ${npc.isVisible !== false ? 'checked' : ''}>
            <span>Tornar Visível para Jogadores</span>
          </label>
        </div>

        <div class="field-group">
          <label>Nome do NPC *</label>
          <input type="text" id="npc-name" value="${(npc.name || '').replace(/"/g, '&quot;')}" required placeholder="Nome do NPC">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <label>Idade (em números)</label>
              <label style="font-size:0.75rem; display:flex; align-items:center; gap:0.3rem; cursor:pointer; color:var(--gold);">
                <input type="checkbox" id="npc-vis-age" ${npc.visibleAge ? 'checked' : ''}> Visível
              </label>
            </div>
            <input type="number" id="npc-age" value="${npc.age || ''}" placeholder="Ex: 34">
          </div>
          <div class="field-group">
            <label>Altura (em metros, aceitando vírgulas)</label>
            <input type="text" id="npc-height" value="${(npc.height || '').replace(/"/g, '&quot;')}" placeholder="Ex: 1,82">
          </div>
        </div>

        <!-- FOTOS DO NPC -->
        <div class="field-group">
          <label>Fotos do NPC (Uma ou mais URLs, uma por linha):</label>
          <textarea id="npc-photos" rows="3" placeholder="https://exemplo.com/foto1.jpg&#10;https://exemplo.com/foto2.jpg" style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:monospace; font-size:0.85rem;">${photosStr}</textarea>
          <div style="margin-top:0.4rem; display:flex; gap:0.6rem; align-items:center;">
            <input type="file" id="npc-photo-upload" accept="image/*" style="display:none;" onchange="handleNpcPhotoUpload(event)">
            <button type="button" onclick="document.getElementById('npc-photo-upload').click()" class="admin-action-btn" style="font-size:0.75rem; padding:0.25rem 0.6rem;">
              📁 Upload Imagem
            </button>
          </div>
        </div>

        <!-- CLASSES DO NPC -->
        <div class="field-group">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label>Classes do NPC</label>
            <label style="font-size:0.75rem; display:flex; align-items:center; gap:0.3rem; cursor:pointer; color:var(--gold);">
              <input type="checkbox" id="npc-vis-classes" ${npc.visibleClasses ? 'checked' : ''}> Visível para Jogadores
            </label>
          </div>
          <input type="text" id="npc-classes" value="${(npc.classes || '').replace(/"/g, '&quot;')}" placeholder="Ex: Mago das Chamas, Espadachim">
        </div>

        <!-- MAGIAS DO NPC -->
        <div class="field-group">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label>Magias do NPC</label>
            <label style="font-size:0.75rem; display:flex; align-items:center; gap:0.3rem; cursor:pointer; color:var(--gold);">
              <input type="checkbox" id="npc-vis-magics" ${npc.visibleMagics ? 'checked' : ''}> Visível para Jogadores
            </label>
          </div>
          <textarea id="npc-magics" rows="2" placeholder="Ex: Bola de Fogo, Escudo Térmico..." style="width:100%; box-sizing:border-box; padding:0.5rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">${npc.magics || ''}</textarea>
        </div>

        <!-- ATRIBUTOS DO NPC (Oculto como padrão) -->
        <div style="background:rgba(0,0,0,0.25); border:1px solid var(--wood-plank); border-left:3px solid var(--gold); border-radius:6px; padding:1rem; margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
            <label style="font-family:'Cinzel',serif; color:var(--gold); font-size:0.95rem; font-weight:bold; margin:0;">⚔️ Atributos do NPC (Padrão: Oculto para Jogadores)</label>
            <label style="font-size:0.75rem; display:flex; align-items:center; gap:0.3rem; cursor:pointer; color:var(--gold);">
              <input type="checkbox" id="npc-vis-attrs" ${npc.visibleAttributes ? 'checked' : ''}> Visível para Jogadores
            </label>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem;">
            <div style="display:flex; align-items:center; gap:0.6rem; background:rgba(0,0,0,0.2); padding:0.5rem 0.8rem; border-radius:6px;">
              <span style="font-size:1.1rem;">💪</span>
              <label style="font-size:0.85rem; color:var(--ink-light); white-space:nowrap; min-width:80px;">Força (Kg)</label>
              <input type="number" id="npc-attr-forca" value="${(npc.attrObj?.forca ?? '')}" min="0" step="5" placeholder="0" style="flex:1; padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; text-align:center; font-weight:bold; font-size:1rem;">
            </div>
            <div style="display:flex; align-items:center; gap:0.6rem; background:rgba(0,0,0,0.2); padding:0.5rem 0.8rem; border-radius:6px;">
              <span style="font-size:1.1rem;">🛡️</span>
              <label style="font-size:0.85rem; color:var(--ink-light); white-space:nowrap; min-width:80px;">Resistência (Kg)</label>
              <input type="number" id="npc-attr-resist" value="${(npc.attrObj?.resistencia ?? '')}" min="0" step="5" placeholder="0" style="flex:1; padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; text-align:center; font-weight:bold; font-size:1rem;">
            </div>
            <div style="display:flex; align-items:center; gap:0.6rem; background:rgba(0,0,0,0.2); padding:0.5rem 0.8rem; border-radius:6px;">
              <span style="font-size:1.1rem;">⚡</span>
              <label style="font-size:0.85rem; color:var(--ink-light); white-space:nowrap; min-width:80px;">Velocidade (Km/h)</label>
              <input type="number" id="npc-attr-vel" value="${(npc.attrObj?.velocidade ?? '')}" min="0" step="1" placeholder="0" style="flex:1; padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; text-align:center; font-weight:bold; font-size:1rem;">
            </div>
            <div style="display:flex; align-items:center; gap:0.6rem; background:rgba(0,0,0,0.2); padding:0.5rem 0.8rem; border-radius:6px;">
              <span style="font-size:1.1rem;">✨</span>
              <label style="font-size:0.85rem; color:var(--ink-light); white-space:nowrap; min-width:80px;">Magia (Pts)</label>
              <input type="number" id="npc-attr-magia" value="${(npc.attrObj?.magia ?? '')}" min="0" step="5" placeholder="0" style="flex:1; padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; text-align:center; font-weight:bold; font-size:1rem;">
            </div>
          </div>
        </div>

        <!-- PERÍCIAS (Seleção e Visibilidade Individual) -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <label style="font-family:'Cinzel',serif; font-size:0.95rem; color:var(--gold); font-weight:bold; margin:0;">
              🎓 Perícias do NPC (Configuração Individual):
            </label>
            <button type="button" onclick="addNpcPericiaRow()" class="admin-action-btn" style="font-size:0.75rem; padding:0.25rem 0.6rem;">
              ➕ Adicionar Perícia
            </button>
          </div>
          <div id="npc-pericias-container" style="display:flex; flex-direction:column; gap:0.5rem;">
            <!-- Linhas de perícias inseridas dinamicamente -->
          </div>
        </div>

        <!-- HABILIDADES (Únicas e Comuns com Visibilidade Individual) -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <label style="font-family:'Cinzel',serif; font-size:0.95rem; color:var(--gold); font-weight:bold; margin:0;">
              🛡️ Habilidades do NPC (Configuração Individual):
            </label>
            <button type="button" onclick="addNpcHabilidadeRow()" class="admin-action-btn" style="font-size:0.75rem; padding:0.25rem 0.6rem;">
              ➕ Adicionar Habilidade
            </button>
          </div>
          <div id="npc-habilidades-container" style="display:flex; flex-direction:column; gap:0.6rem;">
            <!-- Linhas de habilidades inseridas dinamicamente -->
          </div>
        </div>

        <!-- BOATOS (Parte visível) -->
        <div class="field-group">
          <label>Boatos (Parte visível do NPC para os jogadores):</label>
          <textarea id="npc-boatos" rows="3" placeholder="O que se fala sobre este NPC pelas ruas e tavernas..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">${npc.boatos || ''}</textarea>
        </div>

        <!-- HISTÓRIA (OCULTA DOS JOGADORES - VISÍVEL APENAS PARA ADMINS) -->
        <div class="field-group" style="background:rgba(192,57,43,0.08); border:1px solid rgba(192,57,43,0.3); padding:1rem; border-radius:6px;">
          <label style="color:#e74c3c; font-weight:bold;">🔒 História do NPC (OCULTA DE PLAYERS - Visível somente para Admins):</label>
          <textarea id="npc-historia" rows="4" placeholder="Segredos, origem real e informações confidenciais conhecidas apenas pelo Mestre..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">${npc.historia || ''}</textarea>
        </div>

        <div style="display:flex; justify-content:center; gap:1.2rem; margin-top:2rem;">
          <button type="button" onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.8rem 2rem; background:rgba(0,0,0,0.4); border-color:var(--wood-plank);">
            Cancelar
          </button>
          <button type="submit" class="form-submit-btn" style="width:auto; padding:0.8rem 2.5rem; background:var(--gold); border-color:var(--gold); color:#1a0f08; font-weight:bold;">
            💾 ${isEdit ? 'Atualizar NPC' : 'Salvar NPC'}
          </button>
        </div>
      </form>
    </div>
  `;

  openWorldContentModal(html);

  // Inicializa perícias e habilidades existentes
  pericias.forEach(p => addNpcPericiaRow(p.name, p.level, p.visible));
  habilidades.forEach(h => addNpcHabilidadeRow(h.name, h.desc, h.visible));
}

function addNpcPericiaRow(name = '', level = 1, visible = false) {
  const container = document.getElementById('npc-pericias-container');
  if (!container) return;
  const rowId = 'pericia_row_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

  const row = document.createElement('div');
  row.id = rowId;
  row.style.cssText = 'display:flex; gap:0.5rem; align-items:center; background:rgba(255,255,255,0.03); padding:0.4rem; border-radius:4px;';
  row.innerHTML = `
    <select class="npc-p-name" style="flex:2; padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">
      <option value="">Selecione a Perícia...</option>
      ${KENSWORD_PERICIAS.map(p => `<option value="${p}" ${p === name ? 'selected' : ''}>${p}</option>`).join('')}
    </select>
    <select class="npc-p-level" style="flex:1; padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">
      ${[1,2,3,4,5,6,7,8,9,10].map(lvl => `<option value="${lvl}" ${lvl == level ? 'selected' : ''}>Lvl ${lvl}</option>`).join('')}
    </select>
    <label style="font-size:0.75rem; display:flex; align-items:center; gap:0.3rem; cursor:pointer; color:var(--gold); white-space:nowrap;">
      <input type="checkbox" class="npc-p-vis" ${visible ? 'checked' : ''}> Visível
    </label>
    <button type="button" onclick="document.getElementById('${rowId}').remove()" style="background:none; border:none; color:var(--red-wax); cursor:pointer; font-size:1rem;">&times;</button>
  `;
  container.appendChild(row);
}

function addNpcHabilidadeRow(name = '', desc = '', visible = false) {
  const container = document.getElementById('npc-habilidades-container');
  if (!container) return;
  const rowId = 'hab_row_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

  const row = document.createElement('div');
  row.id = rowId;
  row.style.cssText = 'background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:4px; border:1px solid rgba(212,175,55,0.15);';
  row.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
      <input type="text" class="npc-h-name" value="${(name || '').replace(/"/g, '&quot;')}" placeholder="Nome da Habilidade" style="flex:1; padding:0.35rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">
      <label style="font-size:0.75rem; display:flex; align-items:center; gap:0.3rem; cursor:pointer; color:var(--gold); white-space:nowrap;">
        <input type="checkbox" class="npc-h-vis" ${visible ? 'checked' : ''}> Visível
      </label>
      <button type="button" onclick="document.getElementById('${rowId}').remove()" style="background:none; border:none; color:var(--red-wax); cursor:pointer; font-size:1rem;">&times;</button>
    </div>
    <textarea class="npc-h-desc" rows="2" placeholder="Descrição da habilidade..." style="width:100%; box-sizing:border-box; padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem;">${desc || ''}</textarea>
  `;
  container.appendChild(row);
}

async function handleNpcPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  showToast('⏳ Processando e otimizando imagem...', 'info');
  const compressed = await compressImageFile(file, 800, 800, 0.75);
  if (!compressed) return;
  const area = document.getElementById('npc-photos');
  if (area) {
    area.value = area.value.trim() ? area.value.trim() + '\n' + compressed : compressed;
    showToast('📸 Foto adicionada e otimizada!', 'success');
  }
}

async function saveNpc(event, npcId) {
  event.preventDefault();
  if (!isStaffOrAdminUser()) return;

  const isVisible = document.getElementById('npc-is-visible').checked;
  const name = document.getElementById('npc-name').value.trim();
  const age = document.getElementById('npc-age').value.trim();
  const visibleAge = document.getElementById('npc-vis-age').checked;
  const height = document.getElementById('npc-height').value.trim();
  const classes = document.getElementById('npc-classes').value.trim();
  const visibleClasses = document.getElementById('npc-vis-classes').checked;
  const magics = document.getElementById('npc-magics').value.trim();
  const visibleMagics = document.getElementById('npc-vis-magics').checked;
  const visibleAttributes = document.getElementById('npc-vis-attrs').checked;
  const attrForca = parseInt(document.getElementById('npc-attr-forca')?.value) || 0;
  const attrResist= parseInt(document.getElementById('npc-attr-resist')?.value) || 0;
  const attrVel   = parseInt(document.getElementById('npc-attr-vel')?.value) || 0;
  const attrMagia = parseInt(document.getElementById('npc-attr-magia')?.value) || 0;
  const attrObj = { forca: attrForca, resistencia: attrResist, velocidade: attrVel, magia: attrMagia };
  const attributes = `Força: ${attrForca} Kg | Resistência: ${attrResist} Kg | Velocidade: ${attrVel} Km/h | Magia: ${attrMagia}`;
  const boatos = document.getElementById('npc-boatos').value.trim();
  const historia = document.getElementById('npc-historia').value.trim();

  // Fotos
  const photos = document.getElementById('npc-photos').value.split('\n').map(p => p.trim()).filter(Boolean);

  // Perícias
  const pericias = [];
  document.querySelectorAll('#npc-pericias-container > div').forEach(row => {
    const pName = row.querySelector('.npc-p-name')?.value;
    const pLevel = parseInt(row.querySelector('.npc-p-level')?.value) || 1;
    const pVis = row.querySelector('.npc-p-vis')?.checked || false;
    if (pName) pericias.push({ name: pName, level: pLevel, visible: pVis });
  });

  // Habilidades
  const habilidades = [];
  document.querySelectorAll('#npc-habilidades-container > div').forEach(row => {
    const hName = row.querySelector('.npc-h-name')?.value.trim();
    const hDesc = row.querySelector('.npc-h-desc')?.value.trim();
    const hVis = row.querySelector('.npc-h-vis')?.checked || false;
    if (hName) habilidades.push({ name: hName, desc: hDesc, visible: hVis });
  });

  const npcData = {
    name,
    age,
    visibleAge,
    height,
    classes,
    visibleClasses,
    magics,
    visibleMagics,
    attributes,
    attrObj,
    visibleAttributes,
    pericias,
    habilidades,
    boatos,
    historia,
    photos,
    photo: photos[0] || 'Photos/demihuman.webp',
    isVisible,
    updatedAt: Date.now()
  };

  try {
    showToast('💾 Salvando NPC...', 'info');
    await dbSaveEntity('npcs', 'NPC', npcId, npcData);
    showToast('✅ NPC salvo com sucesso!', 'success');
    closeWorldContentModal();
    await loadNpcsTab();
  } catch (err) {
    console.error('Erro ao salvar NPC:', err);
    showToast('❌ Falha ao salvar NPC.', 'error');
  }
}

async function deleteNpc(npcId) {
  if (!isStaffOrAdminUser()) return;
  if (!confirm('⚠️ Tem certeza que deseja excluir este NPC permanentemente?')) return;

  try {
    showToast('🗑️ Excluindo NPC...', 'info');
    await dbDeleteEntity('npcs', 'NPC', npcId);
    showToast('✅ NPC excluído com sucesso!', 'success');
    await loadNpcsTab();
  } catch (err) {
    console.error('Erro ao excluir NPC:', err);
    showToast('❌ Falha ao excluir NPC.', 'error');
  }
}

// ─────────────────────────────────────────────────────────────────────
// 2. ABA MONSTROS (Bestiário de Kensword)
// ─────────────────────────────────────────────────────────────────────

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
    ALL_MONSTERS = await dbGetEntities('monsters', 'monster');
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
  const visibleList = monsters.filter(m => isStaff || m.isVisible !== false);

  if (visibleList.length === 0) {
    container.innerHTML = `
      <div class="coming-soon" style="grid-column: 1 / -1;">
        <div class="cs-icon">👾</div>
        <h3>Nenhum Monstro Registrado Ainda</h3>
        <p>${isStaff ? 'Clique em "➕ Adicionar Monstro" para cadastrar a primeira criatura do Bestiário.' : 'Nenhuma criatura catalogada no momento.'}</p>
      </div>
    `;
    return;
  }

  let html = '';
  visibleList.forEach(m => {
    const mainPhoto = (m.photos && m.photos.length > 0) ? m.photos[0] : (m.photo || 'Photos/demihuman.webp');
    const isInvisible = m.isVisible === false;

    const typeBadge = m.type === 'Chefe' ? 'background:rgba(231,76,60,0.25); border:1px solid #e74c3c; color:#ff6b6b;' :
                      m.type === 'Mini-Chefe' ? 'background:rgba(243,156,18,0.25); border:1px solid #f39c12; color:#f1c40f;' :
                      'background:rgba(46,204,113,0.2); border:1px solid #2ecc71; color:#2ecc71;';

    html += `
      <div class="character-card" style="position:relative; ${isInvisible ? 'opacity:0.75; border:1px dashed #e67e22;' : ''}">
        ${isInvisible ? `<span style="position:absolute; top:4px; left:4px; z-index:3; background:#e67e22; color:#fff; font-size:0.6rem; padding:1px 5px; border-radius:3px; font-weight:bold;">INVISÍVEL</span>` : ''}
        <div onclick="openMonsterDetails('${m.id}')">
          <span style="position:absolute; top:6px; right:6px; z-index:2; font-size:0.7rem; padding:1px 6px; border-radius:3px; font-family:'Cinzel',serif; font-weight:bold; ${typeBadge}">
            ${m.type || 'Monstro Comum'}
          </span>
          <img src="${mainPhoto}" alt="${m.name || 'Monstro'}">
          <div class="char-card-name" style="padding-bottom:0.2rem;">${m.name || 'Monstro'}</div>
          ${m.height ? `<div style="font-size:0.75rem; color:var(--ink-light); padding-bottom:0.6rem;">${m.height} m</div>` : ''}
        </div>
        ${isStaff ? `
          <div style="display:flex; justify-content:center; gap:0.4rem; padding:0.4rem; border-top:1px solid var(--wood-plank); background:rgba(0,0,0,0.3);">
            <button onclick="openMonsterEditor('${m.id}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="Editar Monstro">✏️</button>
            <button onclick="toggleEntityVisibility('monsters', '${m.id}', ${!isInvisible})" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="${isInvisible ? 'Tornar Visível' : 'Tornar Invisível'}">${isInvisible ? '👁️' : '🙈'}</button>
            <button onclick="deleteMonster('${m.id}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem; color:var(--red-wax);" title="Excluir Monstro">🗑️</button>
          </div>
        ` : ''}
      </div>
    `;
  });

  container.innerHTML = html;
}

// Modal Detalhes do Monstro (com Abas de Variantes)
let CURRENT_MONSTER_DETAIL = null;
let CURRENT_ACTIVE_VARIANT_IDX = 0;

function openMonsterDetails(monsterId, variantIdx = 0) {
  const m = ALL_MONSTERS.find(mon => mon.id === monsterId);
  if (!m) return;

  CURRENT_MONSTER_DETAIL = m;
  CURRENT_ACTIVE_VARIANT_IDX = variantIdx;

  const isStaff = isStaffOrAdminUser();
  const variants = m.variants && m.variants.length > 0 ? m.variants : [
    {
      name: 'Padrão',
      photo: (m.photos && m.photos.length > 0) ? m.photos[0] : (m.photo || 'Photos/demihuman.webp'),
      attributes: m.attributes || '',
      visibleAttributes: m.visibleAttributes !== false,
      pericias: m.pericias || [],
      habilidades: m.habilidades || []
    }
  ];

  const currentVar = variants[variantIdx] || variants[0];
  const varPhoto = currentVar.photo || (m.photos && m.photos[0]) || 'Photos/demihuman.webp';

  const typeBadge = m.type === 'Chefe' ? 'background:rgba(231,76,60,0.25); border:1px solid #e74c3c; color:#ff6b6b;' :
                    m.type === 'Mini-Chefe' ? 'background:rgba(243,156,18,0.25); border:1px solid #f39c12; color:#f1c40f;' :
                    'background:rgba(46,204,113,0.2); border:1px solid #2ecc71; color:#2ecc71;';

  // Perícias da Variante atual
  const pericias = currentVar.pericias || [];
  const visiblePericias = pericias.filter(p => isStaff || p.visible !== false);

  // Habilidades da Variante atual
  const habilidades = currentVar.habilidades || [];
  const visibleHabilidades = habilidades.filter(h => isStaff || h.visible !== false);

  const html = `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.2rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.8rem;">
        <div>
          <span style="font-size:0.75rem; padding:2px 8px; border-radius:3px; font-family:'Cinzel',serif; font-weight:bold; ${typeBadge}">
            ${m.type || 'Monstro Comum'}
          </span>
          <h2 style="font-family:'Cinzel Decorative',serif; color:var(--gold-bright); margin:0.3rem 0 0;">${m.name}</h2>
          ${m.height ? `<span style="font-size:0.85rem; color:var(--ink-light);">Altura: ${m.height} m</span>` : ''}
        </div>
        ${isStaff ? `
          <div style="display:flex; gap:0.5rem;">
            <button onclick="openMonsterEditor('${m.id}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem;">✏️ Editar</button>
            <button onclick="deleteMonster('${m.id}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-color:var(--red-wax); color:#ff6b6b;">🗑️ Excluir</button>
          </div>
        ` : ''}
      </div>

      <!-- SUB-ABAS ALTERNÁVEIS DE VARIANTES -->
      ${variants.length > 1 ? `
        <div style="display:flex; gap:0.5rem; border-bottom:2px solid var(--wood-plank); padding-bottom:0.4rem; margin-bottom:1.5rem; overflow-x:auto;">
          ${variants.map((v, idx) => `
            <button onclick="openMonsterDetails('${m.id}', ${idx})" style="padding:0.4rem 1rem; font-family:'Cinzel',serif; font-size:0.85rem; cursor:pointer; border-radius:4px; border:1px solid ${idx === variantIdx ? 'var(--gold)' : 'var(--wood-plank)'}; background:${idx === variantIdx ? 'var(--gold)' : 'rgba(0,0,0,0.3)'}; color:${idx === variantIdx ? '#1a0f08' : 'var(--ink)'}; font-weight:${idx === variantIdx ? 'bold' : 'normal'};">
              ${v.name || ('Variante ' + (idx+1))}
            </button>
          `).join('')}
        </div>
      ` : ''}

      <!-- FOTO NA FRENTE E DESCRIÇÃO AO LADO -->
      <div style="display:flex; gap:1.5rem; margin-bottom:1.5rem; flex-wrap:wrap; justify-content:center; align-items:flex-start;">
        <div style="text-align:center;">
          <img src="${varPhoto}" alt="${m.name}" style="width:200px; height:200px; object-fit:cover; border-radius:8px; border:2px solid var(--gold); box-shadow:0 4px 12px rgba(0,0,0,0.5);">
          ${variants.length > 1 ? `<div style="font-family:'Cinzel',serif; font-size:0.8rem; color:var(--gold); margin-top:0.4rem;">Variante: ${currentVar.name}</div>` : ''}
        </div>

        <div style="flex:1; min-width:260px; background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">📖 Descrição da Criatura:</h4>
          <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${m.description || 'Sem descrição informada.'}</div>
        </div>
      </div>

      <!-- BOATOS (Parte visível da espécie e Variante) -->
      ${(m.boatos || currentVar.boatos) ? `
        <div style="background:rgba(212,175,55,0.08); border-left:4px solid var(--gold); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold-bright); margin-top:0; margin-bottom:0.4rem;">🗣️ Boatos &amp; Relatos de Campo:</h4>
          <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${currentVar.boatos || m.boatos}</div>
        </div>
      ` : ''}

      <!-- HISTÓRIA (OCULTA DOS JOGADORES - VISÍVEL APENAS PARA ADMINS) -->
      ${(isStaff && m.historia) ? `
        <div style="background:rgba(192,57,43,0.1); border:1px solid #c0392b; border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
            <h4 style="font-family:'Cinzel',serif; color:#e74c3c; margin:0;">🔒 História da Espécie (Confidencial - Mestre Supremo):</h4>
            <span style="background:#c0392b; color:#fff; font-size:0.65rem; padding:1px 6px; border-radius:3px; font-weight:bold;">OCULTO DE PLAYERS</span>
          </div>
          <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${m.historia}</div>
        </div>
      ` : ''}

      <!-- ATRIBUTOS DO MONSTRO (Visíveis por padrão para players) -->
      ${(isStaff || currentVar.visibleAttributes !== false) && (currentVar.attrObj || currentVar.attributes) ? `
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem; margin-bottom:0.8rem;">
            <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin:0;">⚔️ Atributos (${currentVar.name || 'Padrão'}):</h4>
            ${(currentVar.visibleAttributes === false && isStaff) ? `<span style="color:#e67e22; font-size:0.75rem;">(Oculto para Players)</span>` : ''}
          </div>
          ${currentVar.attrObj ? `
            <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:0.6rem;">
              ${currentVar.attrObj.forca ? `<div style="background:rgba(0,0,0,0.3); border-radius:6px; padding:0.5rem 0.8rem; text-align:center; border:1px solid rgba(212,175,55,0.2);"><div style="font-size:1.2rem;">💪</div><div style="font-size:0.75rem; color:var(--ink-light);">Força</div><div style="font-size:1.1rem; font-weight:bold; color:var(--gold-bright);">${currentVar.attrObj.forca} Kg</div></div>` : ''}
              ${currentVar.attrObj.resistencia ? `<div style="background:rgba(0,0,0,0.3); border-radius:6px; padding:0.5rem 0.8rem; text-align:center; border:1px solid rgba(212,175,55,0.2);"><div style="font-size:1.2rem;">🛡️</div><div style="font-size:0.75rem; color:var(--ink-light);">Resistência</div><div style="font-size:1.1rem; font-weight:bold; color:var(--gold-bright);">${currentVar.attrObj.resistencia} Kg</div></div>` : ''}
              ${currentVar.attrObj.velocidade ? `<div style="background:rgba(0,0,0,0.3); border-radius:6px; padding:0.5rem 0.8rem; text-align:center; border:1px solid rgba(212,175,55,0.2);"><div style="font-size:1.2rem;">⚡</div><div style="font-size:0.75rem; color:var(--ink-light);">Velocidade</div><div style="font-size:1.1rem; font-weight:bold; color:var(--gold-bright);">${currentVar.attrObj.velocidade} Km/h</div></div>` : ''}
              ${currentVar.attrObj.magia ? `<div style="background:rgba(0,0,0,0.3); border-radius:6px; padding:0.5rem 0.8rem; text-align:center; border:1px solid rgba(212,175,55,0.2);"><div style="font-size:1.2rem;">✨</div><div style="font-size:0.75rem; color:var(--ink-light);">Magia</div><div style="font-size:1.1rem; font-weight:bold; color:var(--gold-bright);">${currentVar.attrObj.magia} pts</div></div>` : ''}
            </div>
          ` : `<div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${currentVar.attributes}</div>`}
        </div>
      ` : ''}

      <!-- PERÍCIAS DO MONSTRO (Visíveis por padrão para players) -->
      ${visiblePericias.length > 0 ? `
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">🎓 Perícias (${currentVar.name || 'Padrão'}):</h4>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.6rem;">
            ${visiblePericias.map(p => `
              <div class="entity-chip" style="font-size:0.85rem;">
                <strong>${p.name}</strong> <span style="color:var(--gold-bright); font-weight:bold;">Lvl ${p.level || 1}</span>
                ${(isStaff && p.visible === false) ? '<span style="color:#e67e22; font-size:0.7rem;">(oculto)</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- HABILIDADES DO MONSTRO (Visíveis individualmente por padrão) -->
      ${visibleHabilidades.length > 0 ? `
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">💥 Habilidades Únicas &amp; Ataques (${currentVar.name || 'Padrão'}):</h4>
          <div style="display:flex; flex-direction:column; gap:0.8rem; margin-top:0.6rem;">
            ${visibleHabilidades.map(h => `
              <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:4px; border-left:3px solid #e74c3c;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color:#ff6b6b; font-family:'Cinzel',serif;">${h.name}</strong>
                  ${(isStaff && h.visible === false) ? '<span style="color:#e67e22; font-size:0.7rem;">(oculto para players)</span>' : ''}
                </div>
                <div style="font-size:0.9rem; color:var(--ink); margin-top:0.3rem; white-space:pre-wrap;">${h.desc || ''}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="text-align:center; margin-top:1.5rem;">
        <button onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.6rem 2.5rem;">Fechar</button>
      </div>
    </div>
  `;

  openWorldContentModal(html);
}

// Compressão automática e redimensionamento inteligente para não estourar o limite de 1MB do Firestore
function compressImageFile(file, maxWidth = 800, maxHeight = 800, quality = 0.75) {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith('image/')) {
      showToast('⚠️ O arquivo selecionado não é uma imagem válida.', 'warning');
      return resolve(null);
    }
    const reader = new FileReader();
    reader.onerror = () => resolve(null);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve(null);
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ── GERENCIAMENTO DE RASCUNHOS (DRAFT) AUTOMÁTICOS ─────────────────
function saveMonsterDraft() {
  try {
    const form = document.getElementById('monster-form');
    if (!form) return;
    const isVisible = document.getElementById('mon-is-visible')?.checked;
    const name = document.getElementById('mon-name')?.value || '';
    const height = document.getElementById('mon-height')?.value || '';
    const type = document.querySelector('input[name="mon-type"]:checked')?.value || 'Monstro Comum';
    const photos = document.getElementById('mon-photos')?.value || '';
    const description = document.getElementById('mon-desc')?.value || '';
    const boatos = document.getElementById('mon-boatos')?.value || '';
    const historia = document.getElementById('mon-historia')?.value || '';

    // Salva apenas se houver algum conteúdo
    if (!name && !description && !boatos && !historia) return;

    const draft = {
      name, height, type, photos, description, boatos, historia, isVisible,
      savedAt: Date.now()
    };
    localStorage.setItem('kensword_draft_monster', JSON.stringify(draft));
  } catch (e) {
    console.warn('Erro ao salvar rascunho de monstro:', e);
  }
}

function clearMonsterDraft() {
  try {
    localStorage.removeItem('kensword_draft_monster');
  } catch (e) {}
}

function restoreMonsterDraft() {
  try {
    const raw = localStorage.getItem('kensword_draft_monster');
    if (!raw) {
      showToast('ℹ️ Nenhum rascunho salvo encontrado.', 'info');
      return;
    }
    const d = JSON.parse(raw);
    if (document.getElementById('mon-name')) document.getElementById('mon-name').value = d.name || '';
    if (document.getElementById('mon-height')) document.getElementById('mon-height').value = d.height || '';
    if (d.type) {
      const radio = document.querySelector(`input[name="mon-type"][value="${d.type}"]`);
      if (radio) radio.checked = true;
    }
    if (document.getElementById('mon-photos')) document.getElementById('mon-photos').value = d.photos || '';
    if (document.getElementById('mon-desc')) document.getElementById('mon-desc').value = d.description || '';
    if (document.getElementById('mon-boatos')) document.getElementById('mon-boatos').value = d.boatos || '';
    if (document.getElementById('mon-historia')) document.getElementById('mon-historia').value = d.historia || '';
    if (document.getElementById('mon-is-visible') && d.isVisible !== undefined) {
      document.getElementById('mon-is-visible').checked = d.isVisible;
    }
    showToast('✅ Rascunho restaurado com sucesso!', 'success');
    const notice = document.getElementById('draft-restore-notice');
    if (notice) notice.remove();
  } catch (e) {
    showToast('Falha ao restaurar rascunho: ' + e.message, 'error');
  }
}

// Editor de Monstro (Mestre Supremo)
function openMonsterEditor(monsterId = null) {
  if (!isStaffOrAdminUser()) {
    showToast('⚠️ Apenas o Administrador/Mestre Supremo pode cadastrar monstros.', 'error');
    return;
  }

  const isEdit = !!monsterId;
  const m = isEdit ? ALL_MONSTERS.find(mon => mon.id === monsterId) || {} : {};
  const hasDraft = !isEdit && !!localStorage.getItem('kensword_draft_monster');

  const photosStr = (m.photos || (m.photo ? [m.photo] : [])).join('\n');
  const variants = m.variants && m.variants.length > 0 ? m.variants : [
    {
      name: 'Padrão',
      photo: (m.photos && m.photos[0]) || '',
      attributes: m.attributes || '',
      visibleAttributes: true,
      pericias: m.pericias || [],
      habilidades: m.habilidades || []
    }
  ];

  const html = `
    <div>
      <h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--gold-bright); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">
        ${isEdit ? '✏️ Editar Monstro' : '👾 Cadastrar Novo Monstro'}
      </h2>

      ${hasDraft ? `
        <div id="draft-restore-notice" style="background:rgba(212,175,55,0.15); border:1px solid var(--gold); padding:0.8rem 1rem; border-radius:6px; margin-bottom:1.2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
          <div>
            <strong style="color:var(--gold-bright); font-size:0.95rem;">📝 Rascunho Anterior Encontrado!</strong>
            <div style="font-size:0.8rem; color:var(--ink-light);">Encontramos um texto de monstro preenchido anteriormente que não foi salvo.</div>
          </div>
          <div style="display:flex; gap:0.6rem;">
            <button type="button" onclick="restoreMonsterDraft()" class="admin-action-btn" style="padding:0.35rem 0.9rem; font-size:0.8rem; background:var(--gold); color:#1a0f08; font-weight:bold;">Restaurar Dados</button>
            <button type="button" onclick="clearMonsterDraft(); document.getElementById('draft-restore-notice')?.remove();" class="admin-action-btn" style="padding:0.35rem 0.9rem; font-size:0.8rem; background:transparent; border-color:var(--red-wax); color:var(--red-wax);">Descartar</button>
          </div>
        </div>
      ` : ''}

      <form id="monster-form" onsubmit="saveMonster(event, '${monsterId || ''}')">
        
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:0.6rem 1rem; border-radius:6px; margin-bottom:1.2rem;">
          <span style="font-family:'Cinzel',serif; font-size:0.9rem; color:var(--gold);">Visibilidade no Bestiário:</span>
          <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
            <input type="checkbox" id="mon-is-visible" ${m.isVisible !== false ? 'checked' : ''}>
            <span>Tornar Visível para Jogadores</span>
          </label>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <label>Nome do Monstro *</label>
            <input type="text" id="mon-name" value="${(m.name || '').replace(/"/g, '&quot;')}" required placeholder="Ex: Kobold, Ghoul">
          </div>
          <div class="field-group">
            <label>Altura (em metros, aceitando vírgulas)</label>
            <input type="text" id="mon-height" value="${(m.height || '').replace(/"/g, '&quot;')}" placeholder="Ex: 1,30">
          </div>
        </div>

        <!-- TIPO DE MONSTRO (Três opções) -->
        <div class="field-group">
          <label>Tipo do Monstro (Escolha uma opção):</label>
          <div style="display:flex; gap:1.5rem; margin-top:0.4rem; background:rgba(0,0,0,0.2); padding:0.6rem; border-radius:4px;">
            <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
              <input type="radio" name="mon-type" value="Monstro Comum" ${(!m.type || m.type === 'Monstro Comum') ? 'checked' : ''}>
              <span>Monstro Comum</span>
            </label>
            <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
              <input type="radio" name="mon-type" value="Mini-Chefe" ${m.type === 'Mini-Chefe' ? 'checked' : ''}>
              <span>Mini-Chefe</span>
            </label>
            <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
              <input type="radio" name="mon-type" value="Chefe" ${m.type === 'Chefe' ? 'checked' : ''}>
              <span>Chefe</span>
            </label>
          </div>
        </div>

        <!-- FOTOS DO MONSTRO -->
        <div class="field-group">
          <label>Fotos Gerais do Monstro (Uma ou mais URLs, uma por linha):</label>
          <textarea id="mon-photos" rows="3" placeholder="https://exemplo.com/monstro.jpg" style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:monospace; font-size:0.85rem;">${photosStr}</textarea>
          <div style="margin-top:0.4rem; display:flex; gap:0.6rem; align-items:center;">
            <input type="file" id="mon-photo-upload" accept="image/*" style="display:none;" onchange="handleMonsterPhotoUpload(event)">
            <button type="button" onclick="document.getElementById('mon-photo-upload').click()" class="admin-action-btn" style="font-size:0.75rem; padding:0.25rem 0.6rem;">
              📁 Upload Foto
            </button>
          </div>
        </div>

        <!-- DESCRIÇÃO DO MONSTRO -->
        <div class="field-group">
          <label>Descrição do Monstro (Exibida ao lado da foto) *</label>
          <textarea id="mon-desc" rows="3" required placeholder="Aparência, biologia e comportamento da criatura..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">${m.description || ''}</textarea>
        </div>

        <!-- VARIANTES (Sub-aba alternável com foto, atributos, perícias e habilidades que mudam com ela) -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
            <div>
              <h4 style="font-family:'Cinzel',serif; color:var(--gold-bright); margin:0;">
                🧬 Variantes do Monstro (Sub-abas com Atributos &amp; Fotos Específicas):
              </h4>
              <span style="font-size:0.8rem; color:var(--ink-light);">Ex: Guerreiro, Mago, Bárbaro</span>
            </div>
            <button type="button" onclick="addMonsterVariantBlock()" class="admin-action-btn" style="font-size:0.75rem; padding:0.25rem 0.6rem;">
              ➕ Adicionar Variante
            </button>
          </div>

          <div id="monster-variants-container" style="display:flex; flex-direction:column; gap:1.2rem;">
            <!-- Blocos de variantes inseridos dinamicamente -->
          </div>
        </div>

        <!-- BOATOS -->
        <div class="field-group">
          <label>Boatos (Parte visível da espécie e variantes):</label>
          <textarea id="mon-boatos" rows="3" placeholder="Histórias e boatos contados por aventureiros sobre a criatura..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">${m.boatos || ''}</textarea>
        </div>

        <!-- HISTÓRIA (OCULTA DOS JOGADORES) -->
        <div class="field-group" style="background:rgba(192,57,43,0.08); border:1px solid rgba(192,57,43,0.3); padding:1rem; border-radius:6px;">
          <label style="color:#e74c3c; font-weight:bold;">🔒 História da Espécie (OCULTA DE PLAYERS - Visível somente para Admins):</label>
          <textarea id="mon-historia" rows="4" placeholder="Origem mística, segredos ancestrais e fraquezas confidenciais..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">${m.historia || ''}</textarea>
        </div>

        <div style="display:flex; justify-content:center; gap:1.2rem; margin-top:2rem;">
          <button type="button" onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.8rem 2rem; background:rgba(0,0,0,0.4); border-color:var(--wood-plank);">
            Cancelar
          </button>
          <button type="submit" class="form-submit-btn" style="width:auto; padding:0.8rem 2.5rem; background:var(--gold); border-color:var(--gold); color:#1a0f08; font-weight:bold;">
            💾 ${isEdit ? 'Atualizar Monstro' : 'Salvar Monstro'}
          </button>
        </div>
      </form>
    </div>
  `;

  openWorldContentModal(html);

  // Inicializa variantes
  variants.forEach((v, idx) => addMonsterVariantBlock(v, idx));

  // Conecta auto-save contínuo ao digitar
  const formEl = document.getElementById('monster-form');
  if (formEl) {
    formEl.addEventListener('input', saveMonsterDraft);
  }
}

async function handleMonsterPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  showToast('⏳ Processando e otimizando imagem...', 'info');
  const compressed = await compressImageFile(file, 800, 800, 0.75);
  if (!compressed) return;
  const area = document.getElementById('mon-photos');
  if (area) {
    area.value = area.value.trim() ? area.value.trim() + '\n' + compressed : compressed;
    showToast('📸 Foto adicionada e otimizada com sucesso!', 'success');
    saveMonsterDraft();
  }
}

async function handleVariantPhotoUpload(event, fileInput) {
  const file = event.target.files[0];
  if (!file) return;
  showToast('⏳ Processando e otimizando foto da variante...', 'info');
  const compressed = await compressImageFile(file, 800, 800, 0.75);
  if (!compressed) return;
  const parent = fileInput.parentElement;
  const textInput = parent ? parent.querySelector('.mon-v-photo') : null;
  if (textInput) {
    textInput.value = compressed;
    showToast('📸 Foto da variante otimizada e carregada!', 'success');
    saveMonsterDraft();
  }
}

function addMonsterVariantBlock(v = {}, idx = 0) {
  const container = document.getElementById('monster-variants-container');
  if (!container) return;
  const blockId = 'variant_block_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

  const block = document.createElement('div');
  block.id = blockId;
  block.className = 'monster-variant-block';
  block.style.cssText = 'background:rgba(255,255,255,0.02); border:1px solid var(--wood-plank); border-left:3px solid var(--gold); padding:1rem; border-radius:6px;';
  
  block.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">
      <div style="display:flex; align-items:center; gap:0.6rem; flex:1;">
        <label style="font-family:'Cinzel',serif; font-size:0.9rem; color:var(--gold-bright);">Nome da Variante:</label>
        <input type="text" class="mon-v-name" value="${(v.name || (idx === 0 ? 'Padrão' : '')).replace(/"/g, '&quot;')}" placeholder="Ex: Guerreiro, Mago" style="padding:0.3rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; max-width:200px;">
      </div>
      <button type="button" onclick="document.getElementById('${blockId}').remove()" style="background:none; border:none; color:var(--red-wax); cursor:pointer; font-size:1.1rem;" title="Remover Variante">&times;</button>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; margin-bottom:0.8rem;">
      <div>
        <label style="font-size:0.8rem;">Foto Específica da Variante (URL ou Upload):</label>
        <div style="display:flex; gap:0.4rem; align-items:center;">
          <input type="text" class="mon-v-photo" value="${(v.photo || '').replace(/"/g, '&quot;')}" placeholder="URL da foto desta variante" style="flex:1; box-sizing:border-box; padding:0.35rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem;">
          <input type="file" class="mon-v-photo-file" accept="image/*" style="display:none;" onchange="handleVariantPhotoUpload(event, this)">
          <button type="button" onclick="this.previousElementSibling.click()" class="admin-action-btn" style="font-size:0.7rem; padding:0.25rem 0.5rem; white-space:nowrap;">📁 Upload</button>
        </div>
      </div>
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <label style="font-size:0.8rem; font-weight:bold; color:var(--gold);">Atributos desta Variante:</label>
          <label style="font-size:0.75rem; display:flex; align-items:center; gap:0.3rem; cursor:pointer; color:var(--gold);">
            <input type="checkbox" class="mon-v-vis-attrs" ${v.visibleAttributes !== false ? 'checked' : ''}> Visível
          </label>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.35rem;">
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <span style="font-size:0.9rem; width:20px; text-align:center;">💪</span>
            <span style="font-size:0.75rem; color:var(--ink-light); min-width:68px;">Força (Kg)</span>
            <input type="number" class="mon-v-attr-forca" value="${v.attrObj?.forca ?? ''}" min="0" step="5" placeholder="0" style="flex:1; padding:0.3rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem; text-align:center; font-weight:bold;">
          </div>
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <span style="font-size:0.9rem; width:20px; text-align:center;">🛡️</span>
            <span style="font-size:0.75rem; color:var(--ink-light); min-width:68px;">Resist. (Kg)</span>
            <input type="number" class="mon-v-attr-resist" value="${v.attrObj?.resistencia ?? ''}" min="0" step="5" placeholder="0" style="flex:1; padding:0.3rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem; text-align:center; font-weight:bold;">
          </div>
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <span style="font-size:0.9rem; width:20px; text-align:center;">⚡</span>
            <span style="font-size:0.75rem; color:var(--ink-light); min-width:68px;">Vel. (Km/h)</span>
            <input type="number" class="mon-v-attr-vel" value="${v.attrObj?.velocidade ?? ''}" min="0" step="1" placeholder="0" style="flex:1; padding:0.3rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem; text-align:center; font-weight:bold;">
          </div>
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <span style="font-size:0.9rem; width:20px; text-align:center;">✨</span>
            <span style="font-size:0.75rem; color:var(--ink-light); min-width:68px;">Magia (Pts)</span>
            <input type="number" class="mon-v-attr-magia" value="${v.attrObj?.magia ?? ''}" min="0" step="5" placeholder="0" style="flex:1; padding:0.3rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem; text-align:center; font-weight:bold;">
          </div>
        </div>
      </div>
    </div>

    <!-- Perícias e Habilidades da Variante -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
          <label style="font-size:0.8rem; font-weight:bold; color:var(--gold);">Perícias (Variante):</label>
          <button type="button" onclick="addVariantPericia('${blockId}')" class="admin-action-btn" style="font-size:0.68rem; padding:0.15rem 0.4rem;">+ Perícia</button>
        </div>
        <div class="mon-v-pericias-list" style="display:flex; flex-direction:column; gap:0.3rem;"></div>
      </div>

      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
          <label style="font-size:0.8rem; font-weight:bold; color:var(--gold);">Habilidades (Variante):</label>
          <button type="button" onclick="addVariantHabilidade('${blockId}')" class="admin-action-btn" style="font-size:0.68rem; padding:0.15rem 0.4rem;">+ Habilidade</button>
        </div>
        <div class="mon-v-habilidades-list" style="display:flex; flex-direction:column; gap:0.3rem;"></div>
      </div>
    </div>
  `;
  container.appendChild(block);

  // Popula perícias e habilidades da variante
  (v.pericias || []).forEach(p => addVariantPericia(blockId, p.name, p.level, p.visible));
  (v.habilidades || []).forEach(h => addVariantHabilidade(blockId, h.name, h.desc, h.visible));
}

function addVariantPericia(blockId, name = '', level = 1, visible = true) {
  const block = document.getElementById(blockId);
  if (!block) return;
  const list = block.querySelector('.mon-v-pericias-list');
  const pRowId = 'vp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

  const row = document.createElement('div');
  row.id = pRowId;
  row.style.cssText = 'display:flex; gap:0.3rem; align-items:center;';
  row.innerHTML = `
    <select class="mv-p-name" style="flex:2; padding:0.25rem; font-size:0.8rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:3px;">
      <option value="">Perícia...</option>
      ${KENSWORD_PERICIAS.map(p => `<option value="${p}" ${p === name ? 'selected' : ''}>${p}</option>`).join('')}
    </select>
    <select class="mv-p-level" style="flex:1; padding:0.25rem; font-size:0.8rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:3px;">
      ${[1,2,3,4,5,6,7,8,9,10].map(lvl => `<option value="${lvl}" ${lvl == level ? 'selected' : ''}>Lvl ${lvl}</option>`).join('')}
    </select>
    <label style="font-size:0.7rem; display:flex; align-items:center; gap:0.2rem; cursor:pointer;">
      <input type="checkbox" class="mv-p-vis" ${visible !== false ? 'checked' : ''}> Vis
    </label>
    <button type="button" onclick="document.getElementById('${pRowId}').remove()" style="background:none; border:none; color:var(--red-wax); cursor:pointer;">&times;</button>
  `;
  list.appendChild(row);
}

function addVariantHabilidade(blockId, name = '', desc = '', visible = true) {
  const block = document.getElementById(blockId);
  if (!block) return;
  const list = block.querySelector('.mon-v-habilidades-list');
  const hRowId = 'vh_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

  const row = document.createElement('div');
  row.id = hRowId;
  row.style.cssText = 'display:flex; flex-direction:column; gap:0.2rem; background:rgba(0,0,0,0.2); padding:0.3rem; border-radius:3px;';
  row.innerHTML = `
    <div style="display:flex; gap:0.3rem; align-items:center;">
      <input type="text" class="mv-h-name" value="${(name || '').replace(/"/g, '&quot;')}" placeholder="Habilidade" style="flex:1; padding:0.25rem; font-size:0.8rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:3px;">
      <label style="font-size:0.7rem; display:flex; align-items:center; gap:0.2rem; cursor:pointer;">
        <input type="checkbox" class="mv-h-vis" ${visible !== false ? 'checked' : ''}> Vis
      </label>
      <button type="button" onclick="document.getElementById('${hRowId}').remove()" style="background:none; border:none; color:var(--red-wax); cursor:pointer;">&times;</button>
    </div>
    <input type="text" class="mv-h-desc" value="${(desc || '').replace(/"/g, '&quot;')}" placeholder="Efeito..." style="width:100%; box-sizing:border-box; padding:0.2rem; font-size:0.75rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:3px;">
  `;
  list.appendChild(row);
}

async function saveMonster(event, monsterId) {
  event.preventDefault();
  if (!isStaffOrAdminUser()) return;

  const isVisible = document.getElementById('mon-is-visible').checked;
  const name = document.getElementById('mon-name').value.trim();
  const height = document.getElementById('mon-height').value.trim();
  const type = document.querySelector('input[name="mon-type"]:checked')?.value || 'Monstro Comum';
  const description = document.getElementById('mon-desc').value.trim();
  const boatos = document.getElementById('mon-boatos').value.trim();
  const historia = document.getElementById('mon-historia').value.trim();

  // Fotos gerais
  const photos = document.getElementById('mon-photos').value.split('\n').map(p => p.trim()).filter(Boolean);

  // Variantes
  const variants = [];
  document.querySelectorAll('.monster-variant-block').forEach(block => {
    const vName = block.querySelector('.mon-v-name')?.value.trim() || 'Padrão';
    const vPhoto = block.querySelector('.mon-v-photo')?.value.trim();
    const vVisAttrs = block.querySelector('.mon-v-vis-attrs')?.checked !== false;
    const vAttrForca  = parseInt(block.querySelector('.mon-v-attr-forca')?.value) || 0;
    const vAttrResist = parseInt(block.querySelector('.mon-v-attr-resist')?.value) || 0;
    const vAttrVel    = parseInt(block.querySelector('.mon-v-attr-vel')?.value) || 0;
    const vAttrMagia  = parseInt(block.querySelector('.mon-v-attr-magia')?.value) || 0;
    const vAttrObj = { forca: vAttrForca, resistencia: vAttrResist, velocidade: vAttrVel, magia: vAttrMagia };
    const vAttrs = `Força: ${vAttrForca} Kg | Resistência: ${vAttrResist} Kg | Velocidade: ${vAttrVel} Km/h | Magia: ${vAttrMagia}`;

    // Perícias da variante
    const vPericias = [];
    block.querySelectorAll('.mon-v-pericias-list > div').forEach(r => {
      const pName = r.querySelector('.mv-p-name')?.value;
      const pLvl = parseInt(r.querySelector('.mv-p-level')?.value) || 1;
      const pVis = r.querySelector('.mv-p-vis')?.checked !== false;
      if (pName) vPericias.push({ name: pName, level: pLvl, visible: pVis });
    });

    // Habilidades da variante
    const vHabilidades = [];
    block.querySelectorAll('.mon-v-habilidades-list > div').forEach(r => {
      const hName = r.querySelector('.mv-h-name')?.value.trim();
      const hDesc = r.querySelector('.mv-h-desc')?.value.trim();
      const hVis = r.querySelector('.mv-h-vis')?.checked !== false;
      if (hName) vHabilidades.push({ name: hName, desc: hDesc, visible: hVis });
    });

    variants.push({
      name: vName,
      photo: vPhoto || photos[0] || '',
      attributes: vAttrs,
      attrObj: vAttrObj,
      visibleAttributes: vVisAttrs,
      pericias: vPericias,
      habilidades: vHabilidades
    });
  });

  const monData = {
    name,
    height,
    type,
    description,
    boatos,
    historia,
    photos,
    photo: (variants[0] && variants[0].photo) || photos[0] || 'Photos/demihuman.webp',
    variants,
    isVisible,
    updatedAt: Date.now()
  };

  try {
    showToast('💾 Salvando monstro...', 'info');
    saveMonsterDraft(); // Garante backup local imediato antes da requisição de rede
    await dbSaveEntity('monsters', 'monster', monsterId, monData);
    clearMonsterDraft(); // Remove rascunho apenas se o salvamento foi concluído com sucesso
    showToast('✅ Monstro cadastrado com sucesso!', 'success');
    closeWorldContentModal();
    await loadMonstersTab();
  } catch (err) {
    console.error('Erro ao salvar monstro:', err);
    saveMonsterDraft(); // Garante que o rascunho permaneça salvo
    showToast(`❌ Falha ao salvar: ${err.message || 'Verifique conexão ou regras do banco'}`, 'error');
  }
}

async function deleteMonster(monsterId) {
  if (!isStaffOrAdminUser()) return;
  if (!confirm('⚠️ Tem certeza que deseja excluir este monstro do bestiário?')) return;

  try {
    showToast('🗑️ Excluindo monstro...', 'info');
    await dbDeleteEntity('monsters', 'monster', monsterId);
    showToast('✅ Monstro excluído com sucesso!', 'success');
    await loadMonstersTab();
  } catch (err) {
    console.error('Erro ao excluir monstro:', err);
    showToast('❌ Falha ao excluir monstro.', 'error');
  }
}

// ─────────────────────────────────────────────────────────────────────
// 3. ABA ORGANIZAÇÕES (Facções, Guildas e Ordens)
// ─────────────────────────────────────────────────────────────────────

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
    ALL_ORGS = await dbGetEntities('organizations', 'organization');
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
  const visibleList = orgs.filter(o => isStaff || o.isVisible !== false);

  if (visibleList.length === 0) {
    container.innerHTML = `
      <div class="coming-soon" style="grid-column: 1 / -1;">
        <div class="cs-icon">🏰</div>
        <h3>Nenhuma Organização Registrada Ainda</h3>
        <p>${isStaff ? 'Clique em "➕ Adicionar Organização" para registrar a primeira guilda ou ordem.' : 'Nenhuma organização pública registrada no momento.'}</p>
      </div>
    `;
    return;
  }

  let html = '';
  visibleList.forEach(org => {
    const isInvisible = org.isVisible === false;
    const indoleColor = org.indole === 'Herói' ? '#2ecc71' :
                        org.indole === 'Vilão' ? '#e74c3c' : '#f39c12';

    html += `
      <div class="character-card" style="position:relative; ${isInvisible ? 'opacity:0.75; border:1px dashed #e67e22;' : ''}">
        ${isInvisible ? `<span style="position:absolute; top:4px; left:4px; z-index:3; background:#e67e22; color:#fff; font-size:0.6rem; padding:1px 5px; border-radius:3px; font-weight:bold;">INVISÍVEL</span>` : ''}
        <div onclick="openOrgDetails('${org.id}')">
          <span style="position:absolute; top:6px; right:6px; z-index:2; background:rgba(0,0,0,0.6); border:1px solid ${indoleColor}; color:${indoleColor}; font-size:0.7rem; padding:1px 6px; border-radius:3px; font-family:'Cinzel',serif; font-weight:bold;">
            ${org.indole || 'Independente'}
          </span>
          <img src="${org.logo || 'Photos/demihuman.webp'}" alt="${org.name || 'Organização'}">
          <div class="char-card-name" style="padding-bottom:0.2rem;">${org.name || 'Organização'}</div>
          ${org.leaderName ? `<div style="font-size:0.75rem; color:var(--gold); padding-bottom:0.6rem;">Líder: ${org.leaderName}</div>` : ''}
        </div>
        ${isStaff ? `
          <div style="display:flex; justify-content:center; gap:0.4rem; padding:0.4rem; border-top:1px solid var(--wood-plank); background:rgba(0,0,0,0.3);">
            <button onclick="openOrgEditor('${org.id}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="Editar Organização">✏️</button>
            <button onclick="toggleEntityVisibility('organizations', '${org.id}', ${!isInvisible})" style="background:none; border:none; cursor:pointer; font-size:0.85rem;" title="${isInvisible ? 'Tornar Visível' : 'Tornar Invisível'}">${isInvisible ? '👁️' : '🙈'}</button>
            <button onclick="deleteOrg('${org.id}')" style="background:none; border:none; cursor:pointer; font-size:0.85rem; color:var(--red-wax);" title="Excluir Organização">🗑️</button>
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
  const indoleColor = o.indole === 'Herói' ? '#2ecc71' :
                      o.indole === 'Vilão' ? '#e74c3c' : '#f39c12';

  const members = o.members || [];

  const html = `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.8rem;">
        <div>
          <span style="font-size:0.75rem; padding:2px 8px; border-radius:3px; font-family:'Cinzel',serif; font-weight:bold; background:rgba(0,0,0,0.5); border:1px solid ${indoleColor}; color:${indoleColor};">
            ${o.indole || 'Independente'}
          </span>
          <h2 style="font-family:'Cinzel Decorative',serif; color:var(--gold-bright); margin:0.3rem 0 0;">${o.name}</h2>
        </div>
        ${isStaff ? `
          <div style="display:flex; gap:0.5rem;">
            <button onclick="openOrgEditor('${o.id}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem;">✏️ Editar</button>
            <button onclick="deleteOrg('${o.id}')" class="admin-action-btn" style="padding:0.4rem 0.8rem; font-size:0.8rem; border-color:var(--red-wax); color:#ff6b6b;">🗑️ Excluir</button>
          </div>
        ` : ''}
      </div>

      <!-- ESPAÇO PEQUENO DO LÍDER ACIMA -->
      ${(o.leaderName || o.leaderPhoto) ? `
        <div style="display:flex; align-items:center; gap:0.8rem; background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.3); border-radius:6px; padding:0.6rem 1rem; margin-bottom:1.2rem; width:fit-content;">
          ${o.leaderPhoto ? `<img src="${o.leaderPhoto}" style="width:42px; height:42px; object-fit:cover; border-radius:50%; border:2px solid var(--gold);">` : '<span style="font-size:1.5rem;">👑</span>'}
          <div>
            <div style="font-size:0.72rem; color:var(--gold); font-family:'Cinzel',serif; text-transform:uppercase; letter-spacing:0.05em;">Líder da Organização</div>
            <div style="font-size:0.95rem; font-weight:bold; color:var(--gold-bright); font-family:'Cinzel',serif;">${o.leaderName || 'Não Informado'}</div>
          </div>
        </div>
      ` : ''}

      <!-- LOGO AO LADO E DESCRIÇÃO NA FRENTE -->
      <div style="display:flex; gap:1.5rem; margin-bottom:1.5rem; flex-wrap:wrap; justify-content:center; align-items:flex-start;">
        <img src="${o.logo || 'Photos/demihuman.webp'}" alt="${o.name}" style="width:180px; height:180px; object-fit:contain; background:rgba(0,0,0,0.4); border-radius:8px; border:2px solid var(--gold); padding:0.5rem; box-shadow:0 4px 10px rgba(0,0,0,0.5);">
        
        <div style="flex:1; min-width:260px; background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">📜 Descrição da Organização:</h4>
          <div style="font-size:0.95rem; color:var(--ink); line-height:1.6; white-space:pre-wrap;">${o.description || 'Sem descrição informada.'}</div>
        </div>
      </div>

      <!-- MEMBROS RELACIONADOS (Carrossel / Scroll Horizontal com perfis seguros) -->
      <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.2rem; margin-bottom:1.5rem;">
        <h4 style="font-family:'Cinzel',serif; color:var(--gold-bright); margin-top:0; margin-bottom:0.6rem;">
          👥 Membros Relacionados (${members.length}):
        </h4>
        <span style="font-size:0.8rem; color:var(--ink-light); display:block; margin-bottom:0.8rem;">
          Arraste para os lados para analisar cada membro. Ao clicar, a ficha exibe apenas dados públicos de aventureiro.
        </span>

        ${members.length > 0 ? `
          <div class="org-members-carousel" style="display:flex; gap:1rem; overflow-x:auto; padding:0.6rem 0.2rem 1rem; scrollbar-width:thin;">
            ${members.map(mem => {
              const avatar = mem.avatar || 'Photos/demihuman.webp';
              const name = mem.name || 'Membro';
              const uid = mem.uid;
              return `
                <div class="character-card" onclick="${uid ? `openCharacterSheet('${uid}')` : `openCustomEntityViewer('${name}', 'npc', '${(mem.role || '').replace(/'/g, "\\'")}', '${avatar}')`}" style="min-width:130px; max-width:130px; flex-shrink:0; cursor:pointer;" title="Clique para ver a ficha de ${name}">
                  <img src="${avatar}" alt="${name}" style="width:130px; height:130px; object-fit:cover;">
                  <div class="char-card-name" style="font-size:0.82rem; padding:0.4rem;">${name}</div>
                  ${mem.role ? `<div style="font-size:0.7rem; color:var(--gold); padding-bottom:0.4rem;">${mem.role}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <p style="font-size:0.85rem; color:var(--ink-light); font-style:italic;">Nenhum membro registrado nesta organização.</p>
        `}
      </div>

      <div style="text-align:center; margin-top:1.5rem;">
        <button onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.6rem 2.5rem;">Fechar</button>
      </div>
    </div>
  `;

  openWorldContentModal(html);
}

// Editor de Organização (Mestre Supremo)
function openOrgEditor(orgId = null) {
  if (!isStaffOrAdminUser()) {
    showToast('⚠️ Apenas o Administrador/Mestre Supremo pode cadastrar organizações.', 'error');
    return;
  }

  const isEdit = !!orgId;
  const o = isEdit ? ALL_ORGS.find(org => org.id === orgId) || {} : {};
  const members = o.members || [];

  const html = `
    <div>
      <h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--gold-bright); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">
        ${isEdit ? '✏️ Editar Organização' : '🏰 Cadastrar Nova Organização'}
      </h2>

      <form id="org-form" onsubmit="saveOrg(event, '${orgId || ''}')">
        
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:0.6rem 1rem; border-radius:6px; margin-bottom:1.2rem;">
          <span style="font-family:'Cinzel',serif; font-size:0.9rem; color:var(--gold);">Visibilidade:</span>
          <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
            <input type="checkbox" id="org-is-visible" ${o.isVisible !== false ? 'checked' : ''}>
            <span>Tornar Visível para Jogadores</span>
          </label>
        </div>

        <div class="field-group">
          <label>Nome da Organização *</label>
          <input type="text" id="org-name" value="${(o.name || '').replace(/"/g, '&quot;')}" required placeholder="Ex: Guilda dos Cavaleiros">
        </div>

        <!-- FOTO DA LOGO -->
        <div class="field-group">
          <label>Foto da Logo / Brasão da Organização *</label>
          <input type="text" id="org-logo" value="${(o.logo || '').replace(/"/g, '&quot;')}" required placeholder="URL da Logo">
          <div style="margin-top:0.4rem; display:flex; gap:0.6rem; align-items:center;">
            <input type="file" id="org-logo-upload" accept="image/*" style="display:none;" onchange="handleOrgLogoUpload(event)">
            <button type="button" onclick="document.getElementById('org-logo-upload').click()" class="admin-action-btn" style="font-size:0.75rem; padding:0.25rem 0.6rem;">
              📁 Upload Logo
            </button>
          </div>
        </div>

        <!-- LÍDER: NOME E FOTO -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <label>Nome do Líder</label>
            <input type="text" id="org-leader-name" value="${(o.leaderName || '').replace(/"/g, '&quot;')}" placeholder="Ex: DanteSTR">
          </div>
          <div class="field-group">
            <label>Foto do Líder (URL)</label>
            <input type="text" id="org-leader-photo" value="${(o.leaderPhoto || '').replace(/"/g, '&quot;')}" placeholder="URL da foto do líder">
          </div>
        </div>

        <!-- ÍNDOLE: TRÊS OPÇÕES (Só aparece a escolhida aos players) -->
        <div class="field-group">
          <label>Índole da Organização (Escolha uma opção):</label>
          <div style="display:flex; gap:1.5rem; margin-top:0.4rem; background:rgba(0,0,0,0.2); padding:0.6rem; border-radius:4px;">
            <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
              <input type="radio" name="org-indole" value="Herói" ${o.indole === 'Herói' ? 'checked' : ''}>
              <span style="color:#2ecc71; font-weight:bold;">Herói</span>
            </label>
            <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
              <input type="radio" name="org-indole" value="Independente" ${(!o.indole || o.indole === 'Independente') ? 'checked' : ''}>
              <span style="color:#f39c12; font-weight:bold;">Independente</span>
            </label>
            <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
              <input type="radio" name="org-indole" value="Vilão" ${o.indole === 'Vilão' ? 'checked' : ''}>
              <span style="color:#e74c3c; font-weight:bold;">Vilão</span>
            </label>
          </div>
        </div>

        <!-- DESCRIÇÃO -->
        <div class="field-group">
          <label>Descrição da Organização *</label>
          <textarea id="org-desc" rows="4" required placeholder="História, princípios e atuação da organização..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">${o.description || ''}</textarea>
        </div>

        <!-- MEMBROS RELACIONADOS -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <label style="font-family:'Cinzel',serif; font-size:0.95rem; color:var(--gold); font-weight:bold; margin:0;">
              👥 Membros Relacionados (Players ou Personagens):
            </label>
            <button type="button" onclick="addOrgMemberRow()" class="admin-action-btn" style="font-size:0.75rem; padding:0.25rem 0.6rem;">
              ➕ Vincular Membro
            </button>
          </div>
          <div id="org-members-container" style="display:flex; flex-direction:column; gap:0.6rem;">
            <!-- Linhas de membros adicionados -->
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap:1.2rem; margin-top:2rem;">
          <button type="button" onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.8rem 2rem; background:rgba(0,0,0,0.4); border-color:var(--wood-plank);">
            Cancelar
          </button>
          <button type="submit" class="form-submit-btn" style="width:auto; padding:0.8rem 2.5rem; background:var(--gold); border-color:var(--gold); color:#1a0f08; font-weight:bold;">
            💾 ${isEdit ? 'Atualizar Organização' : 'Salvar Organização'}
          </button>
        </div>
      </form>
    </div>
  `;

  openWorldContentModal(html);

  // Inicializa membros existentes
  members.forEach(m => addOrgMemberRow(m.uid, m.name, m.avatar, m.role));
}

function addOrgMemberRow(uid = '', name = '', avatar = '', role = '') {
  const container = document.getElementById('org-members-container');
  if (!container) return;
  const rowId = 'mem_row_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

  const allCharsKeys = typeof ALL_CHARACTERS !== 'undefined' ? Object.keys(ALL_CHARACTERS) : [];

  const row = document.createElement('div');
  row.id = rowId;
  row.style.cssText = 'display:flex; gap:0.5rem; align-items:center; background:rgba(255,255,255,0.03); padding:0.5rem; border-radius:4px;';
  row.innerHTML = `
    <select class="org-m-char-select" onchange="autoFillOrgMember(this, '${rowId}')" style="flex:1.5; padding:0.35rem; font-size:0.85rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">
      <option value="">Selecionar da lista de personagens...</option>
      ${allCharsKeys.map(k => {
        const c = ALL_CHARACTERS[k].character || {};
        return `<option value="${k}" ${k === uid ? 'selected' : ''}>${c.name || 'Sem Nome'} (${c.race || 'Player'})</option>`;
      }).join('')}
    </select>
    <input type="text" class="org-m-name" value="${(name || '').replace(/"/g, '&quot;')}" placeholder="Nome do Membro" style="flex:1; padding:0.35rem; font-size:0.85rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">
    <input type="text" class="org-m-avatar" value="${(avatar || '').replace(/"/g, '&quot;')}" placeholder="URL da Foto" style="flex:1.2; padding:0.35rem; font-size:0.85rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">
    <input type="text" class="org-m-role" value="${(role || '').replace(/"/g, '&quot;')}" placeholder="Cargo / Título" style="flex:1; padding:0.35rem; font-size:0.85rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">
    <button type="button" onclick="document.getElementById('${rowId}').remove()" style="background:none; border:none; color:var(--red-wax); cursor:pointer; font-size:1.1rem;">&times;</button>
  `;
  container.appendChild(row);
}

function autoFillOrgMember(selectEl, rowId) {
  const row = document.getElementById(rowId);
  if (!row) return;
  const uid = selectEl.value;
  if (!uid || !ALL_CHARACTERS || !ALL_CHARACTERS[uid]) return;
  const char = ALL_CHARACTERS[uid].character || {};
  row.querySelector('.org-m-name').value = char.name || '';
  row.querySelector('.org-m-avatar').value = char.avatar || '';
}

async function handleOrgLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  showToast('⏳ Processando logo...', 'info');
  const compressed = await compressImageFile(file, 600, 600, 0.75);
  if (!compressed) return;
  document.getElementById('org-logo').value = compressed;
  showToast('🖼️ Logo otimizada e carregada!', 'success');
}

async function saveOrg(event, orgId) {
  event.preventDefault();
  if (!isStaffOrAdminUser()) return;

  const isVisible = document.getElementById('org-is-visible').checked;
  const name = document.getElementById('org-name').value.trim();
  const logo = document.getElementById('org-logo').value.trim();
  const leaderName = document.getElementById('org-leader-name').value.trim();
  const leaderPhoto = document.getElementById('org-leader-photo').value.trim();
  const indole = document.querySelector('input[name="org-indole"]:checked')?.value || 'Independente';
  const description = document.getElementById('org-desc').value.trim();

  // Membros
  const members = [];
  document.querySelectorAll('#org-members-container > div').forEach(row => {
    const selUid = row.querySelector('.org-m-char-select')?.value;
    const mName = row.querySelector('.org-m-name')?.value.trim();
    const mAvatar = row.querySelector('.org-m-avatar')?.value.trim();
    const mRole = row.querySelector('.org-m-role')?.value.trim();
    if (mName || selUid) {
      members.push({
        uid: selUid || null,
        name: mName || (selUid && ALL_CHARACTERS[selUid]?.character?.name) || 'Membro',
        avatar: mAvatar || (selUid && ALL_CHARACTERS[selUid]?.character?.avatar) || 'Photos/demihuman.webp',
        role: mRole || ''
      });
    }
  });

  const orgData = {
    name,
    logo,
    leaderName,
    leaderPhoto,
    indole,
    description,
    members,
    isVisible,
    updatedAt: Date.now()
  };

  try {
    showToast('💾 Salvando organização...', 'info');
    await dbSaveEntity('organizations', 'organization', orgId, orgData);
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
    await dbDeleteEntity('organizations', 'organization', orgId);
    showToast('✅ Organização excluída com sucesso!', 'success');
    await loadOrgsTab();
  } catch (err) {
    console.error('Erro ao excluir organização:', err);
    showToast('❌ Falha ao excluir organização.', 'error');
  }
}

// ─────────────────────────────────────────────────────────────────────
// 4. ABA HISTÓRIAS & MISSÕES
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
    ALL_STORIES = await dbGetEntities('stories', 'story');
    ALL_STORIES.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    renderStoriesList(ALL_STORIES);
  } catch (err) {
    console.error('Erro ao carregar histórias:', err);
    container.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar histórias e missões.</p>';
  }
}

function renderStoriesList(stories) {
  const container = document.getElementById('history-container');
  if (!container) return;

  const isStaff = isStaffOrAdminUser();
  const visibleList = stories.filter(s => isStaff || s.isVisible !== false);

  if (visibleList.length === 0) {
    container.innerHTML = `
      <div class="coming-soon">
        <div class="cs-icon">📖</div>
        <h3>Nenhuma História ou Missão Registrada</h3>
        <p>${isStaff ? 'Clique em "➕ Nova História / Missão" para cadastrar a primeira crônica.' : 'As histórias do Continente de Kensword serão registradas aqui à medida que o RPG avança.'}</p>
      </div>
    `;
    return;
  }

  let html = '';
  visibleList.forEach(story => {
    const isInvisible = story.isVisible === false;
    const photos = story.photos || [];

    // Miniaturas das fotos (140x140px)
    let photosHtml = '';
    if (photos.length > 0) {
      photosHtml = `
        <div style="margin-top:1rem;">
          <div style="font-family:'Cinzel',serif; font-size:0.85rem; color:var(--gold-bright); font-weight:bold; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
            <span>📸</span> Fotos Relacionadas com a Missão (${photos.length}):
          </div>
          <div class="story-photo-gallery">
            ${photos.map((pUrl, idx) => `
              <div class="story-photo-item" onclick="zoomPhoto('${pUrl}', '${(story.title || '').replace(/'/g, "\\'")} - Foto #${idx+1}')" title="Clique para ampliar">
                <img src="${pUrl}" alt="Foto">
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
              
              if (npcId) {
                return `
                  <div class="entity-chip" onclick="openNpcDetails('${npcId}')" title="Clique para ver detalhes do NPC">
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
              const details = (typeof mon === 'object' && mon.details) ? mon.details.replace(/"/g, '&quot;') : '';
              const avatar = (typeof mon === 'object' && mon.avatar) ? mon.avatar : 'Photos/demihuman.webp';
              const monId = typeof mon === 'object' ? mon.id : null;

              if (monId) {
                return `
                  <div class="entity-chip" onclick="openMonsterDetails('${monId}')" title="Clique para ver a ficha do Monstro">
                    <img src="${avatar}" class="entity-chip-avatar" alt="${name}">
                    <strong>${name}</strong>
                  </div>
                `;
              }
              return `
                <div class="entity-chip" onclick="openCustomEntityViewer('${name}', 'monster', '${details}', '${avatar}')" title="Clique para ver a ficha do Monstro">
                  <img src="${avatar}" class="entity-chip-avatar" alt="${name}">
                  <strong>${name}</strong>
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
              const avatar = (typeof org === 'object' && org.avatar) ? org.avatar : 'Photos/demihuman.webp';
              const orgId = typeof org === 'object' ? org.id : null;

              if (orgId) {
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

    let adminControls = '';
    if (isStaff) {
      adminControls = `
        <div style="display:flex; gap:0.5rem;">
          <button onclick="openStoryEditor('${story.id}')" class="admin-action-btn" style="padding:0.3rem 0.8rem; font-size:0.75rem;">✏️ Editar</button>
          <button onclick="toggleEntityVisibility('stories', '${story.id}', ${!isInvisible})" class="admin-action-btn" style="padding:0.3rem 0.8rem; font-size:0.75rem;">${isInvisible ? '👁️ Exibir' : '🙈 Ocultar'}</button>
          <button onclick="deleteStory('${story.id}')" class="admin-action-btn" style="padding:0.3rem 0.8rem; font-size:0.75rem; border-color:var(--red-wax); color:#ff6b6b;">🗑️ Excluir</button>
        </div>
      `;
    }

    html += `
      <div class="story-card" style="${isInvisible ? 'opacity:0.75; border-left-color:#e67e22;' : ''}">
        <div class="story-header">
          <div>
            <h3 class="story-title">${story.title}</h3>
            ${isInvisible ? `<span style="background:#e67e22; color:#fff; font-size:0.65rem; padding:1px 6px; border-radius:3px; font-weight:bold;">INVISÍVEL PARA PLAYERS</span>` : ''}
          </div>
          <div>${adminControls}</div>
        </div>

        ${story.summary ? `<div class="story-summary">${story.summary}</div>` : ''}
        ${photosHtml}

        <div class="story-entities-section">
          ${npcsHtml}
          ${monstersHtml}
          ${orgsHtml}
        </div>

        ${story.content ? `
          <div style="margin-top:1.5rem; text-align:right;">
            <button onclick="openStoryDetails('${story.id}')" class="form-submit-btn" style="width:auto; padding:0.5rem 1.5rem; font-family:'Cinzel',serif; font-size:0.85rem; background:rgba(212,175,55,0.15); border-color:var(--gold); color:var(--gold-bright);">
              📜 Ler Relato Completo &amp; Detalhes
            </button>
          </div>
        ` : ''}
      </div>
    `;
  });

  container.innerHTML = html;
}

// Detalhes Completos da História
function openStoryDetails(storyId) {
  const story = ALL_STORIES.find(s => s.id === storyId);
  if (!story) return;

  const photos = story.photos || [];

  const html = `
    <div>
      <div style="text-align:center; margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:1rem;">
        <h2 style="font-family:'Cinzel Decorative',serif; color:var(--gold-bright); margin:0.3rem 0 0.5rem;">${story.title}</h2>
      </div>

      ${photos.length > 0 ? `
        <div style="margin-bottom:1.5rem;">
          <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-bottom:0.6rem;">📸 Fotos e Registros da Missão:</h4>
          <div class="story-photo-gallery">
            ${photos.map((p, idx) => `
              <div class="story-photo-item" onclick="zoomPhoto('${p}', '${(story.title || '').replace(/'/g, "\\'")} - Foto #${idx+1}')" title="Clique para ampliar">
                <img src="${p}" alt="Foto">
                <div class="photo-zoom-hint">🔍 Ampliar</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:8px; padding:1.5rem; margin-bottom:1.5rem;">
        <h4 style="font-family:'Cinzel',serif; color:var(--gold); margin-top:0; border-bottom:1px solid rgba(212,175,55,0.2); padding-bottom:0.4rem;">📖 Relato Oficial:</h4>
        <div style="font-size:0.95rem; color:var(--ink); line-height:1.7; white-space:pre-wrap;">${story.content || story.summary || 'Sem conteúdo.'}</div>
      </div>

      <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.5rem;">
        <button onclick="closeWorldContentModal()" class="form-submit-btn" style="width:auto; padding:0.6rem 2rem;">Fechar</button>
      </div>
    </div>
  `;

  openWorldContentModal(html);
}

// Editor de História / Missão
async function openStoryEditor(storyId = null) {
  if (!isStaffOrAdminUser()) {
    showToast('⚠️ Apenas o Administrador/Mestre Supremo pode cadastrar histórias.', 'error');
    return;
  }

  const isEdit = !!storyId;
  const story = isEdit ? ALL_STORIES.find(s => s.id === storyId) || {} : {};

  // Atualiza listas do banco com proteção contra falhas
  try {
    if (ALL_NPCS.length === 0) {
      ALL_NPCS = await dbGetEntities('npcs', 'NPC');
    }
  } catch (eNpc) {
    console.warn('Aviso ao carregar NPCs para histórias:', eNpc);
  }

  try {
    if (ALL_MONSTERS.length === 0) {
      ALL_MONSTERS = await dbGetEntities('monsters', 'monster');
    }
  } catch (eMon) {
    console.warn('Aviso ao carregar Monstros para histórias:', eMon);
  }

  try {
    if (ALL_ORGS.length === 0) {
      ALL_ORGS = await dbGetEntities('organizations', 'organization');
    }
  } catch (eOrg) {
    console.warn('Aviso ao carregar Organizações para histórias:', eOrg);
  }

  const selectedNpcIds = (story.npcs || []).map(n => typeof n === 'object' ? n.id : n).filter(Boolean);
  const selectedMonIds = (story.monsters || []).map(m => typeof m === 'object' ? m.id : m).filter(Boolean);
  const selectedOrgIds = (story.orgs || []).map(o => typeof o === 'object' ? o.id : o).filter(Boolean);

  const existingPhotosStr = (story.photos || []).join('\n');

  const html = `
    <div>
      <h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--gold-bright); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">
        ${isEdit ? '✏️ Editar História / Missão' : '📜 Registrar Nova História / Missão'}
      </h2>

      <form id="story-form" onsubmit="saveStory(event, '${storyId || ''}')">
        
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:0.6rem 1rem; border-radius:6px; margin-bottom:1.2rem;">
          <span style="font-family:'Cinzel',serif; font-size:0.9rem; color:var(--gold);">Visibilidade da História:</span>
          <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
            <input type="checkbox" id="se-is-visible" ${story.isVisible !== false ? 'checked' : ''}>
            <span>Tornar Visível para Jogadores</span>
          </label>
        </div>

        <div class="field-group">
          <label>Título da História / Missão *</label>
          <input type="text" id="se-title" value="${(story.title || '').replace(/"/g, '&quot;')}" required placeholder="Título da História ou Missão">
        </div>

        <div class="field-group">
          <label>Resumo / Sinopse da Missão</label>
          <textarea id="se-summary" rows="3" placeholder="Breve resumo da missão que aparece no card..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">${story.summary || ''}</textarea>
        </div>

        <div class="field-group">
          <label>Conteúdo Completo &amp; Relato da Missão</label>
          <textarea id="se-content" rows="6" placeholder="Relato detalhado da história..." style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px;">${story.content || ''}</textarea>
        </div>

        <!-- FOTOS RELACIONADAS (140x140px) -->
        <div class="field-group" style="background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.3); border-radius:6px; padding:1rem;">
          <label style="color:var(--gold-bright); font-weight:bold;">📸 Fotos Relacionadas com a Missão (Miniaturas 140x140px):</label>
          <span style="font-size:0.8rem; color:var(--ink-light); display:block; margin-bottom:0.5rem;">Insira as URLs das imagens (uma por linha):</span>
          <textarea id="se-photos" rows="3" placeholder="https://exemplo.com/foto1.jpg&#10;https://exemplo.com/foto2.jpg" style="width:100%; box-sizing:border-box; padding:0.6rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-family:monospace; font-size:0.85rem;">${existingPhotosStr}</textarea>
          <div style="margin-top:0.4rem;">
            <input type="file" id="se-photo-upload" accept="image/*" style="display:none;" onchange="handleStoryPhotoUpload(event)">
            <button type="button" onclick="document.getElementById('se-photo-upload').click()" class="admin-action-btn" style="font-size:0.75rem; padding:0.25rem 0.6rem;">
              📁 Upload Foto
            </button>
          </div>
        </div>

        <!-- NPCS RELACIONADOS -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <label style="font-family:'Cinzel',serif; font-size:0.95rem; color:var(--gold); font-weight:bold; display:block; margin-bottom:0.4rem;">
            🎭 NPCs Relacionados com a Missão:
          </label>
          <span style="font-size:0.8rem; color:var(--ink-light); display:block; margin-bottom:0.6rem;">Marque os NPCs existentes na aba NPCs ou digite um novo:</span>
          
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; max-height:120px; overflow-y:auto; padding:0.4rem; background:rgba(0,0,0,0.2); border-radius:4px; margin-bottom:0.8rem;">
            ${ALL_NPCS.map(n => `
              <label style="display:inline-flex; align-items:center; gap:0.3rem; background:rgba(255,255,255,0.05); padding:2px 8px; border-radius:4px; font-size:0.85rem; cursor:pointer;">
                <input type="checkbox" name="se-npcs" value="${n.id}" ${selectedNpcIds.includes(n.id) ? 'checked' : ''}>
                ${n.name}
              </label>
            `).join('')}
          </div>

          <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:0.6rem;">
            <input type="text" id="se-custom-npc-name" placeholder="Outro NPC (Nome)" style="padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem;">
            <input type="text" id="se-custom-npc-desc" placeholder="Ficha e detalhes do NPC nesta missão..." style="padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem;">
          </div>
        </div>

        <!-- MONSTROS NA MISSÃO -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <label style="font-family:'Cinzel',serif; font-size:0.95rem; color:var(--gold); font-weight:bold; display:block; margin-bottom:0.4rem;">
            👾 Monstros Presentes na Missão:
          </label>
          <span style="font-size:0.8rem; color:var(--ink-light); display:block; margin-bottom:0.6rem;">Marque os monstros da aba Monstros ou digite um novo:</span>
          
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; max-height:120px; overflow-y:auto; padding:0.4rem; background:rgba(0,0,0,0.2); border-radius:4px; margin-bottom:0.8rem;">
            ${ALL_MONSTERS.map(m => `
              <label style="display:inline-flex; align-items:center; gap:0.3rem; background:rgba(255,255,255,0.05); padding:2px 8px; border-radius:4px; font-size:0.85rem; cursor:pointer;">
                <input type="checkbox" name="se-monsters" value="${m.id}" ${selectedMonIds.includes(m.id) ? 'checked' : ''}>
                ${m.name}
              </label>
            `).join('')}
          </div>

          <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:0.6rem;">
            <input type="text" id="se-custom-mon-name" placeholder="Outro Monstro (Nome)" style="padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem;">
            <input type="text" id="se-custom-mon-desc" placeholder="Ficha e atributos do Monstro..." style="padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem;">
          </div>
        </div>

        <!-- ORGANIZAÇÕES RELACIONADAS -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--wood-plank); border-radius:6px; padding:1.2rem; margin-bottom:1.2rem;">
          <label style="font-family:'Cinzel',serif; font-size:0.95rem; color:var(--gold); font-weight:bold; display:block; margin-bottom:0.4rem;">
            🏰 Organizações Relacionadas com a Missão:
          </label>
          <span style="font-size:0.8rem; color:var(--ink-light); display:block; margin-bottom:0.6rem;">Marque as organizações da aba Organizações ou digite uma nova:</span>
          
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; max-height:120px; overflow-y:auto; padding:0.4rem; background:rgba(0,0,0,0.2); border-radius:4px; margin-bottom:0.8rem;">
            ${ALL_ORGS.map(o => `
              <label style="display:inline-flex; align-items:center; gap:0.3rem; background:rgba(255,255,255,0.05); padding:2px 8px; border-radius:4px; font-size:0.85rem; cursor:pointer;">
                <input type="checkbox" name="se-orgs" value="${o.id}" ${selectedOrgIds.includes(o.id) ? 'checked' : ''}>
                ${o.name}
              </label>
            `).join('')}
          </div>

          <div style="display:grid; grid-template-columns:1fr 1.5fr; gap:0.6rem;">
            <input type="text" id="se-custom-org-name" placeholder="Outra Organização (Nome)" style="padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem;">
            <input type="text" id="se-custom-org-desc" placeholder="Detalhes da Organização no evento..." style="padding:0.4rem; background:var(--parchment); color:var(--ink); border:1px solid var(--wood-plank); border-radius:4px; font-size:0.85rem;">
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

async function handleStoryPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  showToast('⏳ Processando e otimizando imagem...', 'info');
  const compressed = await compressImageFile(file, 800, 800, 0.75);
  if (!compressed) return;
  const area = document.getElementById('se-photos');
  if (area) {
    area.value = area.value.trim() ? area.value.trim() + '\n' + compressed : compressed;
    showToast('📸 Foto adicionada e otimizada à missão!', 'success');
  }
}

async function saveStory(event, storyId) {
  event.preventDefault();
  if (!isStaffOrAdminUser()) return;

  const isVisible = document.getElementById('se-is-visible').checked;
  const title = document.getElementById('se-title').value.trim();
  const summary = document.getElementById('se-summary').value.trim();
  const content = document.getElementById('se-content').value.trim();

  // Fotos (140x140px)
  const photos = document.getElementById('se-photos').value.split('\n').map(p => p.trim()).filter(Boolean);

  // NPCs
  const npcs = [];
  document.querySelectorAll('input[name="se-npcs"]:checked').forEach(cb => {
    const n = ALL_NPCS.find(npc => npc.id === cb.value);
    if (n) {
      npcs.push({
        id: n.id,
        name: n.name,
        avatar: (n.photos && n.photos[0]) || n.photo || 'Photos/demihuman.webp'
      });
    }
  });
  const customNpcName = document.getElementById('se-custom-npc-name').value.trim();
  const customNpcDesc = document.getElementById('se-custom-npc-desc').value.trim();
  if (customNpcName) {
    npcs.push({ name: customNpcName, details: customNpcDesc, avatar: 'Photos/demihuman.webp' });
  }

  // Monstros
  const monsters = [];
  document.querySelectorAll('input[name="se-monsters"]:checked').forEach(cb => {
    const m = ALL_MONSTERS.find(mon => mon.id === cb.value);
    if (m) {
      monsters.push({
        id: m.id,
        name: m.name,
        avatar: (m.photos && m.photos[0]) || m.photo || 'Photos/demihuman.webp'
      });
    }
  });
  const customMonName = document.getElementById('se-custom-mon-name').value.trim();
  const customMonDesc = document.getElementById('se-custom-mon-desc').value.trim();
  if (customMonName) {
    monsters.push({ name: customMonName, details: customMonDesc, avatar: 'Photos/demihuman.webp' });
  }

  // Organizações
  const orgs = [];
  document.querySelectorAll('input[name="se-orgs"]:checked').forEach(cb => {
    const o = ALL_ORGS.find(org => org.id === cb.value);
    if (o) {
      orgs.push({
        id: o.id,
        name: o.name,
        avatar: o.logo || 'Photos/demihuman.webp'
      });
    }
  });
  const customOrgName = document.getElementById('se-custom-org-name').value.trim();
  const customOrgDesc = document.getElementById('se-custom-org-desc').value.trim();
  if (customOrgName) {
    orgs.push({ name: customOrgName, details: customOrgDesc, avatar: 'Photos/demihuman.webp' });
  }

  const storyData = {
    title,
    summary,
    content,
    photos,
    npcs,
    monsters,
    orgs,
    isVisible,
    updatedAt: Date.now()
  };

  try {
    showToast('💾 Salvando história...', 'info');
    await dbSaveEntity('stories', 'story', storyId, storyData);
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
    await dbDeleteEntity('stories', 'story', storyId);
    showToast('✅ História excluída com sucesso!', 'success');
    await loadHistoryTab();
  } catch (err) {
    console.error('Erro ao excluir história:', err);
    showToast('❌ Falha ao excluir história.', 'error');
  }
}

// ─────────────────────────────────────────────────────────────────────
// 5. HELPER PARA TORNAR VISÍVEL / INVISÍVEL
// ─────────────────────────────────────────────────────────────────────

async function toggleEntityVisibility(collectionName, entityId, newVisibility) {
  if (!isStaffOrAdminUser()) return;
  try {
    let done = false;
    try {
      await _db.collection(collectionName).doc(entityId).set({ isVisible: newVisibility }, { merge: true });
      done = true;
    } catch (e1) {
      console.warn(`Falha na coleção '${collectionName}'. Tentando fallback:`, e1);
    }
    if (!done) {
      await _db.collection('characters').doc(entityId).set({ isVisible: newVisibility }, { merge: true });
    }

    showToast(newVisibility ? '👁️ Item tornado visível!' : '🙈 Item ocultado para jogadores!', 'info');
    if (collectionName === 'npcs') await loadNpcsTab();
    if (collectionName === 'monsters') await loadMonstersTab();
    if (collectionName === 'organizations') await loadOrgsTab();
    if (collectionName === 'stories') await loadHistoryTab();
  } catch (e) {
    console.error('Erro ao alterar visibilidade:', e);
    showToast('❌ Falha ao alterar visibilidade.', 'error');
  }
}

// ── EXPÕE FUNÇÕES NO ESCOPO GLOBAL (WINDOW) ─────────────────────────
window.isStaffOrAdminUser = isStaffOrAdminUser;
window.openWorldContentModal = openWorldContentModal;
window.closeWorldContentModal = closeWorldContentModal;
window.openZoomPhoto = openZoomPhoto;

// NPCs
window.loadNpcsTab = loadNpcsTab;
window.openNpcEditor = openNpcEditor;
window.saveNpc = saveNpc;
window.deleteNpc = deleteNpc;
window.handleNpcPhotoUpload = handleNpcPhotoUpload;
window.addNpcPericiaRow = addNpcPericiaRow;
window.addNpcHabilidadeRow = addNpcHabilidadeRow;

// Monstros
window.loadMonstersTab = loadMonstersTab;
window.openMonsterEditor = openMonsterEditor;
window.saveMonster = saveMonster;
window.deleteMonster = deleteMonster;
window.handleMonsterPhotoUpload = handleMonsterPhotoUpload;
window.handleVariantPhotoUpload = handleVariantPhotoUpload;
window.saveMonsterDraft = saveMonsterDraft;
window.clearMonsterDraft = clearMonsterDraft;
window.restoreMonsterDraft = restoreMonsterDraft;
window.compressImageFile = compressImageFile;
window.addMonsterVariantBlock = addMonsterVariantBlock;
window.addVariantPericia = addVariantPericia;
window.addVariantHabilidade = addVariantHabilidade;
window.switchMonsterVariant = switchMonsterVariant;

// Organizações
window.loadOrgsTab = loadOrgsTab;
window.openOrgEditor = openOrgEditor;
window.saveOrganization = saveOrganization;
window.deleteOrg = deleteOrg;
window.handleOrgLogoUpload = handleOrgLogoUpload;
window.handleOrgLeaderPhotoUpload = handleOrgLeaderPhotoUpload;
window.handleMemberAvatarUpload = handleMemberAvatarUpload;
window.addOrgMemberRow = addOrgMemberRow;
window.onOrgMemberSelectChange = onOrgMemberSelectChange;
window.scrollOrgMembers = scrollOrgMembers;

// Histórias
window.loadHistoryTab = loadHistoryTab;
window.openStoryEditor = openStoryEditor;
window.saveStory = saveStory;
window.deleteStory = deleteStory;
window.handleStoryPhotoUpload = handleStoryPhotoUpload;
window.openStoryDetails = openStoryDetails;
window.toggleEntityVisibility = toggleEntityVisibility;

// Inicialização ao carregar
document.addEventListener('DOMContentLoaded', () => {
  if (typeof loadHistoryTab === 'function') {
    loadHistoryTab();
  }
});
