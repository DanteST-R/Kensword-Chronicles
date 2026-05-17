// ================================================================
// KENSWORD CHRONICLES — UI Effects & Navigation Module
// ================================================================

// ── Toasts (Mensagens Flutuantes) ──────────────────────────────────
function showToast(msg, type = '') {
  const t = document.getElementById('auth-toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'auth-toast show' + (type ? ' ' + type : '');
  setTimeout(() => t.className = 'auth-toast', 3500);
}

// ── Controle de Overlay de Loading ─────────────────────────────────
function setLoading(on) {
  const loader = document.getElementById('auth-loading');
  if (loader) loader.classList.toggle('active', on);
}

// ── Mensagens de Erro por Campo ────────────────────────────────────
function showErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.add('active');
}

function clearErr(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = '';
  el.classList.remove('active');
}

// ── Senhas ────────────────────────────────────────────────────────
function togglePassword(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const btn = el.nextElementSibling;
  if (el.type === 'password') {
    el.type = 'text';
    btn.textContent = '🙈';
  } else {
    el.type = 'password';
    btn.textContent = '👁️';
  }
}

// ── Contador de Palavras (História) ───────────────────────────────
function updateWordCount() {
  const text = document.getElementById('reg-story').value.trim();
  const words = text ? text.split(/\s+/).filter(w => w !== '').length : 0;
  const el = document.getElementById('word-counter');
  if (!el) return;
  el.textContent = words + ' palavra' + (words !== 1 ? 's' : '');
  el.className = 'word-counter' + (words === 0 ? '' : words < 100 ? ' warn' : ' ok');
}

// ================================================================
// LÓGICA DE SUB-ABAS DO PERFIL DO JOGADOR
// ================================================================
let currentProfileSubtab = '';

function initProfileSubtabs(isStaff) {
  const nav = document.getElementById('profile-subtabs-nav');
  if (!nav) return;

  if (isStaff) {
    // Staff: Fichas Pendentes, Logs do Servidor, Mensagens
    nav.innerHTML = `
      <button class="profile-subtab-btn" id="subtab-btn-pending" onclick="showProfileSubtab('pending')">
        📋 Fichas Pendentes <span id="subtab-pending-alert" class="pending-alert" style="display:none; margin-left:4px; font-size:0.9rem;">!</span>
      </button>
      <button class="profile-subtab-btn" id="subtab-btn-noticias" onclick="showProfileSubtab('noticias')">
        🛡️ Logs do Servidor
      </button>
      <button class="profile-subtab-btn" id="subtab-btn-mensagens" onclick="showProfileSubtab('mensagens')">
        📬 Mensagens
      </button>
    `;
    const newsCreator = document.getElementById('admin-news-creator');
    if (newsCreator) newsCreator.style.display = 'block';

    if (!currentProfileSubtab || (currentProfileSubtab === 'noticias' && !isStaff)) {
      showProfileSubtab('pending');
    } else {
      showProfileSubtab(currentProfileSubtab);
    }
  } else {
    // Jogador Comum: Mensagens, Comunicações da Guilda
    nav.innerHTML = `
      <button class="profile-subtab-btn" id="subtab-btn-mensagens" onclick="showProfileSubtab('mensagens')">
        📬 Mensagens
      </button>
      <button class="profile-subtab-btn" id="subtab-btn-noticias" onclick="showProfileSubtab('noticias')">
        📢 Notícias
      </button>
    `;
    const newsCreator = document.getElementById('admin-news-creator');
    if (newsCreator) newsCreator.style.display = 'none';

    if (!currentProfileSubtab || currentProfileSubtab === 'pending') {
      showProfileSubtab('mensagens');
    } else {
      showProfileSubtab(currentProfileSubtab);
    }
  }
}

function showProfileSubtab(tabName) {
  currentProfileSubtab = tabName;

  document.querySelectorAll('.profile-subtab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('subtab-btn-' + tabName);
  if (activeBtn) activeBtn.classList.add('active');

  document.querySelectorAll('.profile-subtab-content').forEach(div => div.style.display = 'none');
  const activeDiv = document.getElementById('profile-subtab-' + tabName);
  if (activeDiv) activeDiv.style.display = 'block';

  loadProfileSubtabData(tabName);
}

async function loadProfileSubtabData(tabName) {
  const currentUser = _auth.currentUser;
  if (!currentUser) return;

  if (tabName === 'pending') {
    const container = document.getElementById('profile-pending-fichas-container');
    if (!container) return;

    container.innerHTML = '<div class="auth-loading active" style="margin:2rem auto;"><div class="auth-spinner"></div></div>';

    try {
      ALL_CHARACTERS = await getAllCharacters();
      const keys = Object.keys(ALL_CHARACTERS);
      const pendingChars = keys.filter(uid => ALL_CHARACTERS[uid].status === 'pending');
      const modificationRequests = keys.filter(uid => ALL_CHARACTERS[uid].hasPendingModifications === true);
      const pendingAbilityRequests = keys.filter(uid => {
        const pList = ALL_CHARACTERS[uid].pendingAbilities || [];
        return pList.some(r => r.status === 'pending');
      });

      const subtabAlert = document.getElementById('subtab-pending-alert');
      if (subtabAlert) {
        if (pendingChars.length > 0 || modificationRequests.length > 0 || pendingAbilityRequests.length > 0) {
          subtabAlert.style.display = 'inline-block';
        } else {
          subtabAlert.style.display = 'none';
        }
      }

      if (pendingChars.length === 0 && modificationRequests.length === 0 && pendingAbilityRequests.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:var(--wood-plank); font-style:italic; grid-column: 1 / -1; margin: 1rem 0;">Não há nenhuma ficha ou habilidade pendente no momento.</p>';
        return;
      }

      let html = '';
      
      pendingChars.forEach(uid => {
        const char = ALL_CHARACTERS[uid].character || {};
        const name = char.name || 'Sem Nome';
        const avatar = char.avatar || 'kensword_database/kensword_photos/demihuman.webp';
        html += `
          <div class="character-card" onclick="openCharacterSheet('${uid}')" style="position:relative; max-width:130px; margin:0 auto;">
            <span style="position:absolute; top:4px; right:4px; background:var(--red-wax); color:#fff; font-family:'Cinzel',serif; font-size:0.55rem; padding:1px 4px; border-radius:2px; z-index:2;">NOVA</span>
            <img src="${avatar}" alt="${name}" style="width:100%; aspect-ratio:1/1; object-fit:cover; object-position:top; image-rendering:-webkit-optimize-contrast; filter:brightness(1.02) contrast(1.03) saturate(1.02);">
            <div class="char-card-name" style="padding:0.4rem; font-size:0.85rem;">${name}</div>
          </div>
        `;
      });

      modificationRequests.forEach(uid => {
        const charData = ALL_CHARACTERS[uid];
        const char = charData.character || {};
        const name = char.name || 'Sem Nome';
        const avatar = char.avatar || 'kensword_database/kensword_photos/demihuman.webp';
        html += `
          <div class="character-card" onclick="openProposedChangesModal('${uid}')" style="position:relative; max-width:130px; margin:0 auto; border:2px dashed var(--gold);">
            <span style="position:absolute; top:4px; right:4px; background:var(--gold); color:#000; font-family:'Cinzel',serif; font-size:0.55rem; padding:1px 4px; border-radius:2px; z-index:2; font-weight:bold;">AJUSTE</span>
            <img src="${avatar}" alt="${name}" style="width:100%; aspect-ratio:1/1; object-fit:cover; object-position:top; image-rendering:-webkit-optimize-contrast; filter:brightness(1.02) contrast(1.03) saturate(1.02);">
            <div class="char-card-name" style="padding:0.4rem; font-size:0.85rem; color:var(--gold);">${name}</div>
          </div>
        `;
      });

      pendingAbilityRequests.forEach(uid => {
        const charData = ALL_CHARACTERS[uid];
        const char = charData.character || {};
        const name = char.name || 'Sem Nome';
        const avatar = char.avatar || 'kensword_database/kensword_photos/demihuman.webp';
        const pendingList = charData.pendingAbilities || [];

        pendingList.forEach(req => {
          if (req.status !== 'pending') return;
          const escapedName = req.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');
          html += `
            <div class="character-card" onclick="resolveAbilityRequestFromProfile('${uid}', '${escapedName}')" style="position:relative; max-width:130px; margin:0 auto; border:2px dashed #4a90e2;">
              <span style="position:absolute; top:4px; right:4px; background:#4a90e2; color:#fff; font-family:'Cinzel',serif; font-size:0.55rem; padding:1px 4px; border-radius:2px; z-index:2;">HABIL.</span>
              <img src="${avatar}" alt="${name}" style="width:100%; aspect-ratio:1/1; object-fit:cover; object-position:top; image-rendering:-webkit-optimize-contrast; filter:brightness(1.02) contrast(1.03) saturate(1.02);">
              <div class="char-card-name" style="padding:0.4rem; font-size:0.85rem; color:#4a90e2;">${name}</div>
            </div>
          `;
        });
      });

      container.innerHTML = html;
    } catch (err) {
      console.error('Erro ao renderizar sub-aba pendente:', err);
      container.innerHTML = '<p style="text-align:center; color:var(--red-wax); grid-column:1/-1;">Erro ao carregar dados.</p>';
    }

  } else if (tabName === 'noticias') {
    const listContainer = document.getElementById('profile-noticias-list');
    if (!listContainer) return;

    listContainer.innerHTML = '<div class="auth-loading active" style="margin:1rem auto;"><div class="auth-spinner"></div></div>';

    try {
      const allChars = await getAllCharacters();
      const currentUserData = allChars[currentUser.uid] || {};
      const isStaff = currentUserData.isAdmin || currentUserData.isSubAdmin;

      if (isStaff) {
        // Staff: Logs do Servidor
        const alerts = [];
        Object.values(allChars).forEach(charData => {
          const list = charData.serverAlerts || [];
          list.forEach(alert => {
            alerts.push({
              text: alert.text,
              timestamp: alert.timestamp || Date.now(),
              author: alert.author || 'Membro'
            });
          });
        });

        alerts.sort((a, b) => b.timestamp - a.timestamp);

        if (alerts.length === 0) {
          listContainer.innerHTML = '<p style="font-style:italic; font-size:0.9rem; color:#666; text-align:center; margin:1rem 0;">Nenhum log de atividade no servidor registrado.</p>';
          return;
        }

        listContainer.innerHTML = alerts.map(a => {
          return `
            <div style="background:rgba(212,175,55,0.04); padding:0.6rem; border-radius:4px; font-size:0.85rem; color:var(--ink); border-left:4px solid var(--gold); display:flex; gap:0.5rem; align-items:center; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <span>🛡️</span>
              <div style="flex:1;">
                <div style="line-height:1.4; font-weight:500;">${a.text}</div>
                <div style="font-size:0.7rem; color:#666; margin-top:0.2rem;">${new Date(a.timestamp).toLocaleString('pt-BR')}</div>
              </div>
            </div>
          `;
        }).join('');
      } else {
        // Player: Notícias e Comunicados Oficiais
        const newsSnap = await _db.collection('news').get();
        const newsList = [];
        newsSnap.forEach(doc => {
          newsList.push(doc.data());
        });

        newsList.sort((a, b) => b.timestamp - a.timestamp);

        if (newsList.length === 0) {
          listContainer.innerHTML = '<p style="font-style:italic; font-size:0.9rem; color:#666; text-align:center; margin:1rem 0;">Nenhum comunicado da Guilda no momento.</p>';
          return;
        }

        listContainer.innerHTML = newsList.map(n => {
          let badgeColor = 'var(--gold)';
          let badgeText = n.category || 'Notícia';
          if (n.category === 'Novas Missões') badgeColor = 'var(--red-wax)';
          else if (n.category === 'Atualizações') badgeColor = 'var(--blue-magic)';

          return `
            <div style="background:var(--parchment); padding:1rem; border-radius:6px; border:1px solid var(--wood-plank); box-shadow:0 2px 5px rgba(0,0,0,0.1); margin-bottom:0.5rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; flex-wrap:wrap; gap:0.5rem;">
                <span style="background:${badgeColor}; color:#fff; font-family:'Cinzel',serif; font-size:0.7rem; padding:2px 8px; border-radius:3px; font-weight:bold; text-transform:uppercase;">${badgeText}</span>
                <span style="font-size:0.75rem; color:#666;">${new Date(n.timestamp).toLocaleString('pt-BR')}</span>
              </div>
              <h4 style="font-family:'Cinzel',serif; margin:0 0 0.5rem 0; color:var(--ink); font-size:1.1rem; border-bottom:1px dashed var(--wood-plank); padding-bottom:0.2rem;">${n.title}</h4>
              <p style="font-size:0.92rem; line-height:1.5; color:var(--ink-light); white-space:pre-wrap; margin:0;">${n.content}</p>
              <div style="text-align:right; font-size:0.75rem; color:#777; margin-top:0.5rem; font-style:italic;">Publicado por: ${n.author || 'Admin Supremo'}</div>
            </div>
          `;
        }).join('');
      }
    } catch (err) {
      console.error('Erro ao carregar Notícias/Logs:', err);
      listContainer.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar dados.</p>';
    }

  } else if (tabName === 'mensagens') {
    const listContainer = document.getElementById('profile-mensagens-list');
    if (!listContainer) return;

    listContainer.innerHTML = '<div class="auth-loading active" style="margin:1rem auto;"><div class="auth-spinner"></div></div>';

    try {
      const snap = await _db.collection('characters').doc(currentUser.uid).get();
      const data = snap.exists ? snap.data() : {};
      const notifications = data.notifications || [];

      notifications.sort((a, b) => b.timestamp - a.timestamp);

      if (notifications.length === 0) {
        listContainer.innerHTML = '<p style="font-style:italic; font-size:0.9rem; color:#666; text-align:center; margin:1rem 0;">Caixa de entrada vazia.</p>';
        return;
      }

      listContainer.innerHTML = notifications.map(m => {
        let icon = '✉️';
        let borderStyle = 'border-left: 4px solid #4a90e2;';
        let bg = 'rgba(74,144,226,0.04)';
        
        if (m.type === 'success' || m.text.includes('aprovado') || m.text.includes('APROVADA')) {
          icon = '✔️';
          borderStyle = 'border-left: 4px solid var(--green-moss);';
          bg = 'rgba(46,204,113,0.04)';
        } else if (m.type === 'error' || m.text.includes('rejeitado') || m.text.includes('REJEITADA')) {
          icon = '❌';
          borderStyle = 'border-left: 4px solid var(--red-wax);';
          bg = 'rgba(231,76,60,0.04)';
        }

        return `
          <div style="background:${bg}; padding:0.6rem; border-radius:4px; font-size:0.85rem; color:var(--ink); ${borderStyle} display:flex; gap:0.5rem; align-items:center; margin-bottom:0.2rem; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <span>${icon}</span>
            <div style="flex:1;">
              <div style="line-height:1.4;">${m.text}</div>
              <div style="font-size:0.7rem; color:#666; margin-top:0.2rem;">${new Date(m.timestamp).toLocaleString('pt-BR')}</div>
            </div>
          </div>
        `;
      }).join('');
    } catch (err) {
      console.error('Erro ao carregar mensagens:', err);
      listContainer.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar mensagens.</p>';
    }
  }
}

function resolveAbilityRequestFromProfile(uid, abilityName) {
  if (confirm(`Deseja aprovar a habilidade 【 ${abilityName} 】 para este personagem? (Clique Cancelar para REJEITAR)`)) {
    resolveAbilityRequest(uid, abilityName, true);
  } else {
    if (confirm(`Deseja realmente REJEITAR a habilidade 【 ${abilityName} 】?`)) {
      resolveAbilityRequest(uid, abilityName, false);
    }
  }
}

function toggleNewsForm() {
  const fields = document.getElementById('news-form-fields');
  if (fields) {
    fields.style.display = fields.style.display === 'none' ? 'flex' : 'none';
  }
}
