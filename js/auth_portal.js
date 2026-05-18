// ================================================================
// KENSWORD CHRONICLES — Authentication & Staff Panel Module
// ================================================================

// ── Navegação entre Telas do Portal ────────────────────────────────
function showAuthForm(form) {
  const choice = document.getElementById('auth-choice');
  if (choice) choice.style.display = 'none';

  const login = document.getElementById('auth-login');
  if (login) login.classList.remove('active');

  const register = document.getElementById('auth-register');
  if (register) register.classList.remove('active');

  if (form === 'login' && login) login.classList.add('active');
  if (form === 'register' && register) register.classList.add('active');
}

function showAuthChoice() {
  const choice = document.getElementById('auth-choice');
  if (choice) choice.style.display = 'block';

  const login = document.getElementById('auth-login');
  if (login) login.classList.remove('active');

  const register = document.getElementById('auth-register');
  if (register) register.classList.remove('active');
}

// ── Controle do Overlay do Portal ──────────────────────────────────
function hidePortal() {
  const overlay = document.getElementById('auth-overlay');
  if (overlay) overlay.classList.add('hidden');
}

function showPortal() {
  const overlay = document.getElementById('auth-overlay');
  if (overlay) overlay.classList.remove('hidden');
  showAuthChoice();
}

function setLoading(on) {
  const loader = document.getElementById('auth-loading');
  if (loader) loader.classList.toggle('active', on);
}

// ── Password Show / Hide Utility ──────────────────────────────────
function togglePassword(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const btn = el.nextElementSibling;
  if (el.type === 'password') {
    el.type = 'text';
    if (btn) btn.textContent = '🙈';
  } else {
    el.type = 'password';
    if (btn) btn.textContent = '👁️';
  }
}

// ── Contador de Palavras para a História ─────────────────────────
function updateWordCount() {
  const textEl = document.getElementById('reg-story');
  if (!textEl) return;
  const text = textEl.value.trim();
  const words = text ? text.split(/\s+/).filter(w => w !== '').length : 0;
  const el = document.getElementById('word-counter');
  if (!el) return;
  el.textContent = words + ' palavra' + (words !== 1 ? 's' : '');
  el.className = 'word-counter' + (words === 0 ? '' : words < 100 ? ' warn' : ' ok');
}

// ── Toast Notifications ──────────────────────────────────────────
function showToast(msg, type = '', duration = 3500) {
  const t = document.getElementById('auth-toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'auth-toast show' + (type ? ' ' + type : '');
  setTimeout(() => {
    t.className = 'auth-toast';
  }, duration);
}

// ── Tradução de Erros do Firebase ──────────────────────────────────
function translateFirebaseError(code) {
  const map = {
    'auth/email-already-in-use': 'Este nome de jogador já está cadastrado.',
    'auth/invalid-email': 'Nome de jogador inválido.',
    'auth/weak-password': 'Senha muito fraca. Use ao menos 8 caracteres.',
    'auth/user-not-found': 'Jogador não encontrado. Verifique o nome.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/invalid-credential': 'Nome ou senha incorretos.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde e tente novamente.',
    'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
    'auth/configuration-not-found': 'Erro crítico: O login por e-mail/senha não está ativado no seu Firebase Console!',
  };
  return map[code] || 'Erro inesperado. Tente novamente.';
}

// ── Submissões de Login e Registro ─────────────────────────────────
async function handleRegister() {
  clearErr('err-register-general');
  if (!validateStep3()) return;

  const btn = document.getElementById('register-submit-btn');
  if (btn) btn.disabled = true;

  try {
    const data = collectFormData();
    setLoading(true);

    if (typeof isCreatingNewCharacterFromProfile !== 'undefined' && isCreatingNewCharacterFromProfile) {
      await handleCreateNewCharacter(data);
      setLoading(false);
      showToast('✅ Novo personagem criado com sucesso e enviado para aprovação!', 'success');
      closeNewCharacterWizard();
    } else {
      await registerCharacter(data);
      setLoading(false);
      showToast('✅ Personagem inscrito na guilda!', 'success');
      setTimeout(() => hidePortal(), 1200);
    }
  } catch (err) {
    setLoading(false);
    if (btn) btn.disabled = false;

    console.warn('⚠️ Erro no registro:', err.code || err.message);
    const msg = translateFirebaseError(err.code || err.message);
    showErr('err-register-general', '⚠️ ' + msg + (err.code ? ' [' + err.code + ']' : ''));
    showToast('Erro ao inscrever personagem.', 'error');
  }
}

async function handleLogin() {
  clearErr('login-general-err');
  const btn = document.getElementById('login-submit-btn');
  if (btn) btn.disabled = true;

  const name = document.getElementById('login-name').value.trim();
  const pass = document.getElementById('login-pass').value;

  if (!name) { showErr('login-name-err', 'Informe seu nome.'); if (btn) btn.disabled = false; return; }
  if (!pass)  { showErr('login-pass-err', 'Informe sua senha.'); if (btn) btn.disabled = false; return; }

  try {
    setLoading(true);
    await loginCharacter(name, pass);
    setLoading(false);
    showToast('✅ Bem-vindo de volta, aventureiro!', 'success');
    setTimeout(() => hidePortal(), 1200);
  } catch (err) {
    setLoading(false);
    if (btn) btn.disabled = false;

    console.warn('⚠️ Erro durante o login:', err);
    const msg = translateFirebaseError(err.code || err.message);
    showErr('login-general-err', '⚠️ ' + msg + (err.code ? ' [' + err.code + ']' : ''));
  }
}

async function handleLogout() {
  try {
    await logoutCharacter();
  } catch (e) {}
  showPortal();
}

// ── Inicialização do Portal e Escuta de Sessão ──────────────────────
let pendingUnsubscribe = null;

async function initPortal() {
  buildRaceOptions();

  try {
    onSessionChange(async (user, charData) => {
      if (pendingUnsubscribe) {
        pendingUnsubscribe();
        pendingUnsubscribe = null;
      }

      if (user) {
        hidePortal();
        const tabProfileBtn = document.getElementById('tab-profile');
        if (tabProfileBtn) tabProfileBtn.style.display = 'block';

        if (charData) {
          const isDante = (charData.player && charData.player.name && 
            (charData.player.name.trim().toLowerCase() === 'dantestr' || 
             charData.player.name.trim().toLowerCase() === 'dantest-r')) || 
            (user.email && user.email.toLowerCase().includes('dantestr'));
          
          if (isDante) {
            charData.isAdmin = true;
          }

          const char = charData.character || {};
          const player = charData.player || {};
          const name = player.name || char.name || 'Aventureiro';
          
          const playerAvatarUrl = player.avatar || char.avatar || 'kensword_database/kensword_photos/demihuman.webp';
          const charAvatarUrl = char.avatar || 'kensword_database/kensword_photos/demihuman.webp';

          const headerAvatar = document.getElementById('header-user-avatar');
          if (headerAvatar) headerAvatar.src = playerAvatarUrl;

          const profileAvatar = document.getElementById('profile-user-avatar');
          if (profileAvatar) profileAvatar.src = playerAvatarUrl;

          const profileName = document.getElementById('profile-user-name');
          if (profileName) profileName.textContent = name;

          const profileAge = document.getElementById('profile-user-age');
          if (profileAge) profileAge.textContent = player.age || char.age || '—';

          const profileAvail = document.getElementById('profile-user-avail');
          if (profileAvail) {
            const availList = player.availability || [];
            profileAvail.textContent = availList.length > 0 ? availList.join(', ') : '—';
          }

          const myCharsContainer = document.getElementById('profile-my-characters');
          if (myCharsContainer) {
            ALL_CHARACTERS[user.uid] = charData;
            
            if (!char || !char.name) {
              myCharsContainer.innerHTML = `
                <div class="character-card" onclick="openNewCharacterWizard()" style="margin: 0 auto; max-width: 180px; display:flex; flex-direction:column; align-items:center; justify-content:center; border:2px dashed var(--gold); background:rgba(212,175,55,0.03); cursor:pointer; height:180px; box-shadow:none;">
                  <span style="font-size:2.5rem; color:var(--gold);">➕</span>
                  <div class="char-card-name" style="color:var(--gold); font-size:0.9rem; font-weight:bold; font-family:'Cinzel',serif; border-top:none; background:none; position:static; text-shadow:none; padding:0; margin-top:0.5rem;">Criar Personagem</div>
                </div>
              `;
            } else {
              myCharsContainer.innerHTML = `
                <div class="character-card" onclick="openCharacterSheet('${user.uid}')" style="margin: 0 auto; max-width: 180px;">
                  <img src="${charAvatarUrl}" alt="${char.name || 'Personagem'}" id="profile-char-card-img">
                  <div class="char-card-name" id="profile-char-card-name">${char.name || 'Sem Nome'}</div>
                </div>
              `;
            }
          }

          if (typeof loadServerNotifications === 'function') {
            loadServerNotifications();
          }

          if (typeof initProfileSubtabs === 'function') {
            initProfileSubtabs(charData.isAdmin || charData.isSubAdmin);
          }

          if (charData && charData.isAdmin && typeof runDatabaseMigration === 'function') {
            runDatabaseMigration();
          }

          const tabPendingBtn = document.getElementById('tab-pending');
          if (charData.isAdmin || charData.isSubAdmin) {
            if (tabPendingBtn) tabPendingBtn.style.display = 'block';
            
            pendingUnsubscribe = _db.collection('characters').onSnapshot(snap => {
              const chars = {};
              snap.forEach(doc => chars[doc.id] = doc.data());
              ALL_CHARACTERS = chars;

              const keys = Object.keys(ALL_CHARACTERS);
              const pendingChars = keys.filter(uid => ALL_CHARACTERS[uid].status === 'pending');
              const hasModifications = keys.some(uid => ALL_CHARACTERS[uid].hasPendingModifications === true);
              const hasPendingAbilities = keys.some(uid => {
                const pList = ALL_CHARACTERS[uid].pendingAbilities || [];
                return pList.some(r => r.status === 'pending');
              });

              if (pendingChars.length > 0 || hasModifications || hasPendingAbilities) {
                if (tabPendingBtn) tabPendingBtn.style.display = 'block';
              }

              const alertDot = document.getElementById('pending-alert-dot');
              if (alertDot) {
                if (pendingChars.length > 0 || hasModifications || hasPendingAbilities) {
                  alertDot.style.display = 'inline-block';
                } else {
                  alertDot.style.display = 'none';
                }
              }

              const activeTab = document.querySelector('.nav-tab.active');
              if (activeTab && activeTab.id === 'tab-pending') {
                renderPendingTabContent();
              }

              if (typeof currentProfileSubtab !== 'undefined' && currentProfileSubtab === 'pending') {
                loadProfileSubtabData('pending');
              } else {
                const subtabAlert = document.getElementById('subtab-pending-alert');
                if (subtabAlert) {
                  if (pendingChars.length > 0 || hasModifications || hasPendingAbilities) {
                    subtabAlert.style.display = 'inline-block';
                  } else {
                    subtabAlert.style.display = 'none';
                  }
                }
              }
            }, err => {
              console.error('Erro no monitor de fichas pendentes:', err);
            });

            await loadPendingTab();
          } else {
            if (tabPendingBtn) tabPendingBtn.style.display = 'none';
          }
        }
      } else {
        showPortal();
        const tabProfileBtn = document.getElementById('tab-profile');
        if (tabProfileBtn) tabProfileBtn.style.display = 'none';
        
        const tabPendingBtn = document.getElementById('tab-pending');
        if (tabPendingBtn) tabPendingBtn.style.display = 'none';

        const activeTab = document.querySelector('.nav-tab.active');
        if (activeTab && (activeTab.id === 'tab-profile' || activeTab.id === 'tab-pending')) {
          showTab('history');
        }

        const headerAvatar = document.getElementById('header-user-avatar');
        if (headerAvatar) headerAvatar.src = 'kensword_database/kensword_photos/demihuman.webp';
      }
    });

  } catch (e) {
    console.warn('Firebase não configurado:', e);
    showPortal();
  }
}

document.addEventListener('DOMContentLoaded', initPortal);

// ── Painel Administrativo de Fichas Pendentes ───────────────────────
async function loadPendingTab() {
  const container = document.getElementById('pending-characters-grid');
  if (!container) return;
  container.innerHTML = '<div class="auth-loading active" style="margin:2rem auto;"><div class="auth-spinner"></div></div>';

  try {
    ALL_CHARACTERS = await getAllCharacters();
    renderPendingTabContent();
  } catch (err) {
    console.error('Erro ao carregar fichas pendentes:', err);
    container.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar fichas pendentes.</p>';
  }
}

function renderPendingTabContent() {
  const container = document.getElementById('pending-characters-grid');
  if (!container) return;

  const keys = Object.keys(ALL_CHARACTERS);
  const pendingChars = keys.filter(uid => ALL_CHARACTERS[uid].status === 'pending');
  const modificationRequests = keys.filter(uid => ALL_CHARACTERS[uid].hasPendingModifications === true);
  const pendingAbilityRequests = keys.filter(uid => {
    const pList = ALL_CHARACTERS[uid].pendingAbilities || [];
    return pList.some(r => r.status === 'pending');
  });

  const alertDot = document.getElementById('pending-alert-dot');
  if (alertDot) {
    if (pendingChars.length > 0 || modificationRequests.length > 0 || pendingAbilityRequests.length > 0) {
      alertDot.style.display = 'inline-block';
    } else {
      alertDot.style.display = 'none';
    }
  }

  if (pendingChars.length === 0 && modificationRequests.length === 0 && pendingAbilityRequests.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:var(--wood-plank); font-style:italic;">Não há nenhuma ficha ou habilidade pendente de avaliação no momento.</p>';
    return;
  }

  let html = '';

  if (pendingChars.length > 0) {
    html += `
      <div style="width:100%; margin-bottom:2rem;">
        <h3 style="font-family:'Cinzel',serif; color:var(--red-wax); border-bottom:1px solid var(--wood-plank); padding-bottom:0.3rem; margin-bottom:1rem; font-size:1.2rem;">🆕 Novas Fichas Aguardando Avaliação</h3>
        <div class="characters-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1.5rem;">
    `;
    pendingChars.forEach(uid => {
      const char = ALL_CHARACTERS[uid].character || {};
      const name = char.name || 'Sem Nome';
      const avatar = char.avatar || 'kensword_database/kensword_photos/demihuman.webp';
      html += `
        <div class="character-card" onclick="openCharacterSheet('${uid}')" style="position:relative;">
          <span style="position:absolute; top:8px; right:8px; background:var(--red-wax); color:#fff; font-family:'Cinzel',serif; font-size:0.65rem; padding:2px 8px; border-radius:2px; letter-spacing:0.1em; z-index:2;">PENDENTE</span>
          <img src="${avatar}" alt="${name}">
          <div class="char-card-name">${name}</div>
        </div>
      `;
    });
    html += `
        </div>
      </div>
    `;
  }

  if (modificationRequests.length > 0) {
    html += `
      <div style="width:100%; margin-top:1rem; margin-bottom:2rem;">
        <h3 style="font-family:'Cinzel',serif; color:var(--gold); border-bottom:1px solid var(--wood-plank); padding-bottom:0.3rem; margin-bottom:1rem; font-size:1.2rem;">⚙️ Solicitações de Modificação (Sub-admins)</h3>
        <div style="display:flex; flex-direction:column; gap:1.2rem; width:100%;">
    `;
    modificationRequests.forEach(uid => {
      const charData = ALL_CHARACTERS[uid];
      const char = charData.character || {};
      const req = charData.modificationRequest || {};
      const proposedBy = req.proposedBy || 'Sub-admin';
      const diffSummary = req.diffSummary || 'Modificações diversas';
      const name = char.name || 'Sem Nome';
      const avatar = char.avatar || 'kensword_database/kensword_photos/demihuman.webp';

      html += `
        <div class="parchment-panel" style="display:flex; align-items:center; gap:1.5rem; padding:1.2rem; border:1px dashed var(--gold); background:rgba(212,175,55,0.03); border-radius:8px; flex-wrap:wrap; box-shadow:0 4px 6px rgba(0,0,0,0.15);">
          <img src="${avatar}" style="width:65px; height:65px; object-fit:cover; border-radius:50%; border:2px solid var(--gold); box-shadow:0 2px 4px rgba(0,0,0,0.2);">
          <div style="flex:1; min-width:200px;">
            <h4 style="margin:0 0 0.3rem; font-family:'Cinzel',serif; color:var(--ink); font-size:1.1rem;">${name}</h4>
            <p style="margin:0 0 0.3rem; font-size:0.85rem; color:#555;"><strong>Solicitado por:</strong> <span style="color:var(--gold); font-weight:bold;">${proposedBy}</span></p>
            <p style="margin:0; font-size:0.9rem; color:var(--red-wax);"><strong>Alterações Propostas:</strong> <span style="font-style:italic;">${diffSummary}</span></p>
          </div>
          <div style="display:flex; gap:0.8rem;">
            <button onclick="openProposedChangesModal('${uid}')" class="form-submit-btn" style="background:var(--gold); color:#000; border-color:var(--gold); padding:0.5rem 1.2rem; font-size:0.85rem; width:auto; cursor:pointer; font-family:'Cinzel',serif;">🛡️ Avaliar Alterações</button>
          </div>
        </div>
      `;
    });
    html += `
        </div>
      </div>
    `;
  }

  if (pendingAbilityRequests.length > 0) {
    html += `
      <div style="width:100%; margin-top:1rem;">
        <h3 style="font-family:'Cinzel',serif; color:#4a90e2; border-bottom:1px solid var(--wood-plank); padding-bottom:0.3rem; margin-bottom:1rem; font-size:1.2rem;">🛡️ Solicitações de Habilidades Pendentes</h3>
        <div style="display:flex; flex-direction:column; gap:1.2rem; width:100%;">
    `;
    pendingAbilityRequests.forEach(uid => {
      const charData = ALL_CHARACTERS[uid];
      const char = charData.character || {};
      const pendingList = charData.pendingAbilities || [];
      const name = char.name || 'Sem Nome';
      const avatar = char.avatar || 'kensword_database/kensword_photos/demihuman.webp';

      pendingList.forEach((req, index) => {
        if (req.status !== 'pending') return;
        const escapedName = req.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        
        html += `
          <div class="parchment-panel" style="display:flex; align-items:center; gap:1.5rem; padding:1.2rem; border:1px dashed #4a90e2; background:rgba(74,144,226,0.03); border-radius:8px; flex-wrap:wrap; box-shadow:0 4px 6px rgba(0,0,0,0.15);">
            <img src="${avatar}" style="width:65px; height:65px; object-fit:cover; border-radius:50%; border:2px solid #4a90e2; box-shadow:0 2px 4px rgba(0,0,0,0.2);">
            <div style="flex:1; min-width:200px;">
              <h4 style="margin:0 0 0.3rem; font-family:'Cinzel',serif; color:var(--ink); font-size:1.1rem;">${name}</h4>
              <p style="margin:0 0 0.3rem; font-size:0.95rem; color:var(--gold);"><strong>Habilidade Solicitada:</strong> <span style="font-weight:bold;">【 ${req.name} 】</span></p>
              <p style="margin:0; font-size:0.85rem; color:#555;"><strong>Tipo:</strong> ${req.type || 'Habilidade'} &nbsp;•&nbsp; <strong>Data:</strong> ${new Date(req.requestedAt).toLocaleDateString('pt-BR')}</p>
            </div>
            <div style="display:flex; gap:0.8rem;">
              <button onclick="resolveAbilityRequest('${uid}', '${escapedName}', true)" class="form-submit-btn" style="background:#2ecc71; color:#fff; border-color:#2ecc71; padding:0.5rem 1.2rem; font-size:0.85rem; width:auto; cursor:pointer; font-family:'Cinzel',serif;">✔️ Aprovar</button>
              <button onclick="resolveAbilityRequest('${uid}', '${escapedName}', false)" class="form-submit-btn" style="background:#e74c3c; color:#fff; border-color:#e74c3c; padding:0.5rem 1.2rem; font-size:0.85rem; width:auto; cursor:pointer; font-family:'Cinzel',serif;">❌ Rejeitar</button>
            </div>
          </div>
        `;
      });
    });
    html += `
        </div>
      </div>
    `;
  }

  container.innerHTML = html;
}

// ── Aprovação de Novas Fichas pelo Mestre ─────────────────────────────
async function approveCharacterSheet(uid) {
  if (!confirm('Deseja realmente aprovar esta ficha de personagem e integrá-la à guilda?')) return;

  const lineageInput = document.getElementById('review-lineage');
  const lineage = lineageInput ? lineageInput.value.trim() : '—';

  // Buffs estruturados da tabela
  const buffs = typeof _collectBuffTableRows === 'function'
    ? _collectBuffTableRows('review-buffs-tbody') : [];

  for (const b of buffs) {
    if (b.pct > 50) {
      showToast(`⚠️ Buff de "${b.stat}" ultrapassa o limite de 50%!`, 'error');
      return;
    }
  }

  const extraElementSel = document.getElementById('review-extra-element');
  const extraElement = extraElementSel ? extraElementSel.value : '';

  const weakness = typeof _collectBuffTableRows === 'function'
    ? _collectBuffTableRows('review-weakness-tbody') : [];

  const weakDescInp = document.getElementById('review-weak-desc');
  const weaknessDesc = weakDescInp ? weakDescInp.value.trim() : '';

  try {
    showToast('⚡ Aprovando ficha...', 'info');
    
    const charData = ALL_CHARACTERS[uid] || {};
    const player = charData.player || {};
    const char = charData.character || {};
    const playerName = player.name || 'Jogador';
    const charName = char.name || 'Personagem';
    
    const notifications = charData.notifications || [];
    notifications.push({
      text: `${playerName}, seu personagem '${charName}' foi aprovado com sucesso, já pode jogar!`,
      timestamp: Date.now(),
      type: 'success'
    });

    let serverAlerts = charData.serverAlerts || [];
    serverAlerts.push({
      text: `O aventureiro ${charName} (Jogador: ${playerName}) foi aprovado na guilda pelo Administrador!`,
      timestamp: Date.now(),
      author: 'Sistema'
    });

    let raceName = char.race || '';
    let subraceName = null;
    if (raceName.includes('|')) {
      const parts = raceName.split('|');
      raceName = parts[0].trim();
      subraceName = parts[1].trim();
    }

    let racialAbilities = [];
    if (typeof RACES_DATA !== 'undefined') {
      const rData = RACES_DATA.find(r => r.name === raceName);
      if (rData) {
        if (rData.abilities) {
          rData.abilities.forEach(ab => {
            racialAbilities.push({
              name: ab.name,
              desc: ab.desc || ab.description || ''
            });
          });
        }
        if (subraceName && rData.subraces) {
          const sub = rData.subraces.find(s => s.name.includes(subraceName) || subraceName.includes(s.name));
          if (sub && sub.abilityName) {
            racialAbilities.push({
              name: sub.abilityName,
              desc: sub.abilityDesc || sub.desc || ''
            });
          }
        }
      }
    }

    await _db.collection('characters').doc(uid).update({
      status: 'approved',
      'character.lineage': lineage || '— (a ser definido pelo administrador)',
      'character.uniqueAbility.buffs': buffs,
      'character.uniqueAbility.weakness': weakness,
      'character.uniqueAbility.weaknessDesc': weaknessDesc,
      'character.uniqueAbility.extraElement': extraElement,
      'character.uniqueAbility.nerfs': [],
      'character.level': 1,
      'character.xp': 0,
      'character.extraPoints': 0,
      'character.abilities.racial': racialAbilities,
      notifications: notifications,
      serverAlerts: serverAlerts
    });

    showToast('✅ Ficha aprovada com sucesso!', 'success');
    closeCharacterSheet();

    if (typeof loadCharactersTab === 'function') await loadCharactersTab();
    if (typeof loadPendingTab === 'function') await loadPendingTab();

    if (typeof currentProfileSubtab !== 'undefined' && currentProfileSubtab) {
      loadProfileSubtabData(currentProfileSubtab);
    }
  } catch (err) {
    console.error('Erro ao aprovar ficha:', err);
    showToast('❌ Falha ao aprovar ficha.', 'error');
  }
}

// ── Modificações de Ficha Propostas (Sub-admins) ─────────────────────
function openProposedChangesModal(uid) {
  const data = ALL_CHARACTERS[uid];
  if (!data) return;

  const char = data.character || {};
  const req = data.modificationRequest || {};
  const changes = req.proposedChanges || {};

  const name = char.name || 'Sem Nome';
  const proposedBy = req.proposedBy || 'Sub-admin';
  const diffSummary = req.diffSummary || 'Modificações gerais';

  const uniqueHtml = changes.uaTitle ? `<strong>${changes.uaTitle}</strong><br>${changes.uaDesc}` : 'Nenhuma';
  const classHtml = (changes.classes || []).join(', ') || 'Nenhuma';
  const spellHtml = (changes.spells || []).join(', ') || 'Nenhuma';

  const buffsHtml = (changes.buffs || []).map(b => `<li style="color:var(--green-moss); font-weight:500; margin-bottom:0.3rem;">🟢 ${b}</li>`).join('') || '<li style="font-style:italic; color:#777;">Nenhum</li>';
  const nerfsHtml = (changes.nerfs || []).map(n => `<li style="color:var(--red-wax); font-weight:500; margin-bottom:0.3rem;">🔴 ${n}</li>`).join('') || '<li style="font-style:italic; color:#777;">Nenhum</li>';

  let html = `
    <div style="background:var(--gold); color:#000; padding:1rem; border-radius:8px; margin-bottom:1.5rem; text-align:center; font-family:'Cinzel',serif; box-shadow:0 4px 6px rgba(0,0,0,0.15);">
      <h3 style="margin:0;">⚠️ Revisando Alterações de Ficha</h3>
      <p style="font-size:0.9rem; margin:0.3rem 0 0;"><strong>Proposto por:</strong> ${proposedBy}</p>
      <p style="font-size:0.85rem; margin:0.2rem 0 0; font-style:italic;"><strong>Diferenças:</strong> ${diffSummary}</p>
    </div>

    <h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--ink); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">${changes.name || name}</h2>
    
    <div style="display:flex; gap:1.5rem; margin-bottom:1.5rem; flex-wrap:wrap; justify-content:center;">
      <img src="${char.avatar || 'kensword_database/kensword_photos/demihuman.webp'}" style="width:180px; height:180px; object-fit:cover; object-position:top; image-rendering:-webkit-optimize-contrast; filter:brightness(1.02) contrast(1.03) saturate(1.02); border-radius:8px; border:2px solid var(--wood-plank); box-shadow:0 4px 6px rgba(0,0,0,0.3);">
      <div style="flex:1; min-width:200px; display:flex; flex-direction:column; justify-content:center;">
        <p style="margin-bottom:0.5rem;"><strong>Raça Proposta:</strong> ${changes.race || char.race || 'N/A'}</p>
        <p style="margin-bottom:0.5rem;"><strong>Idade Proposta:</strong> ${changes.age || char.age || 'N/A'} anos</p>
        <p style="margin-bottom:0.5rem;"><strong>Gênero Proposta:</strong> ${changes.gender || char.gender || 'N/A'}</p>
        <p style="margin-bottom:0.5rem;"><strong>Linhagem Proposta:</strong> ${changes.lineage || char.lineage || '—'}</p>
      </div>
    </div>

    <div style="margin-bottom:1.2rem; background:rgba(0,0,0,0.02); padding:0.8rem; border-radius:6px; border:1px solid rgba(0,0,0,0.05);">
      <h4 style="margin:0 0 0.5rem; font-family:'Cinzel',serif; color:var(--ink);">⚔️ Atributos Propostos:</h4>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.95rem;">
        <span>💪 Força: <strong>${changes.strength || 0}</strong></span>
        <span>🛡️ Resistência: <strong>${changes.resistance || 0}</strong></span>
        <span>⚡ Velocidade: <strong>${changes.speed || 0}</strong></span>
        <span>✨ Magia: <strong>${changes.magic || 0}</strong></span>
      </div>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-bottom:0.5rem;">Habilidade Única</h3>
      <p>${uniqueHtml}</p>
      <div style="margin-top:1rem; display:grid; grid-template-columns:1fr 1fr; gap:1.2rem;">
        <div>
          <h4 style="margin:0 0 0.4rem; font-size:0.9rem; color:var(--green-moss); font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank);">Bônus (Buffs):</h4>
          <ul style="list-style:none; padding-left:0; margin:0;">${buffsHtml}</ul>
        </div>
        <div>
          <h4 style="margin:0 0 0.4rem; font-size:0.9rem; color:var(--red-wax); font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank);">Penalidades (Nerfs):</h4>
          <ul style="list-style:none; padding-left:0; margin:0;">${nerfsHtml}</ul>
        </div>
      </div>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-bottom:0.5rem;">Classes Propostas</h3>
      <p>${classHtml}</p>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-bottom:0.5rem;">Magias Propostas (3 Principais)</h3>
      <p>${spellHtml}</p>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-bottom:0.5rem;">História Proposta</h3>
      <p style="white-space:pre-wrap; line-height:1.6; font-size:0.95rem;">${changes.story || 'História não informada.'}</p>
    </div>

    <div style="margin-top:2rem; display:flex; gap:1.5rem; justify-content:center; padding-top:1.5rem; border-top:1px solid var(--wood-plank);">
      <button onclick="rejectModificationRequest('${uid}')" class="form-submit-btn" style="background:var(--red-wax); color:#fff; border-color:var(--red-wax); width:auto; padding:0.8rem 2rem; font-family:'Cinzel',serif; font-size:1rem; cursor:pointer;">
        ❌ Rejeitar Alterações
      </button>
      <button onclick="acceptModificationRequest('${uid}')" class="form-submit-btn" style="background:var(--green-moss); color:#fff; border-color:var(--green-moss); width:auto; padding:0.8rem 2rem; font-family:'Cinzel',serif; font-size:1rem; cursor:pointer;">
        ✅ Aceitar e Aplicar
      </button>
    </div>
  `;

  document.getElementById('char-sheet-body').innerHTML = html;
  document.getElementById('char-sheet-modal').style.display = 'flex';
}

async function acceptModificationRequest(uid) {
  const data = ALL_CHARACTERS[uid];
  if (!data) return;

  const req = data.modificationRequest;
  if (!req || !req.proposedChanges) return;
  const changes = req.proposedChanges;

  if (!confirm(`Deseja realmente aceitar e aplicar todas as alterações propostas por ${req.proposedBy}?`)) return;

  try {
    showToast('⚡ Aplicando alterações na ficha...', 'info');

    await _db.collection('characters').doc(uid).update({
      'character.name': changes.name,
      'character.race': changes.race,
      'character.age': changes.age,
      'character.gender': changes.gender,
      'character.lineage': changes.lineage,
      'character.uniqueAbility.title': changes.uaTitle,
      'character.uniqueAbility.description': changes.uaDesc,
      'character.attributes.strength': changes.strength,
      'character.attributes.resistance': changes.resistance,
      'character.attributes.speed': changes.speed,
      'character.attributes.magic': changes.magic,
      'character.classes': changes.classes,
      'character.spells': changes.spells,
      'character.story': changes.story,
      'character.uniqueAbility.buffs': changes.buffs,
      'character.uniqueAbility.nerfs': changes.nerfs,
      hasPendingModifications: firebase.firestore.FieldValue.delete(),
      modificationRequest: firebase.firestore.FieldValue.delete()
    });

    showToast('✅ Alterações aplicadas com sucesso!', 'success');
    closeCharacterSheet();

    if (typeof loadCharactersTab === 'function') await loadCharactersTab();
    if (typeof loadPendingTab === 'function') await loadPendingTab();
  } catch (err) {
    console.error('Erro ao aceitar alterações:', err);
    showToast('❌ Falha ao aplicar alterações.', 'error');
  }
}

async function rejectModificationRequest(uid) {
  const data = ALL_CHARACTERS[uid];
  if (!data) return;

  const req = data.modificationRequest;
  if (!req) return;

  if (!confirm(`Deseja realmente recusar e descartar as alterações propostas por ${req.proposedBy}?`)) return;

  try {
    showToast('⚡ Descartando alterações...', 'info');

    await _db.collection('characters').doc(uid).update({
      hasPendingModifications: firebase.firestore.FieldValue.delete(),
      modificationRequest: firebase.firestore.FieldValue.delete()
    });

    showToast('❌ Alterações descartadas e limpas.', 'success');
    closeCharacterSheet();

    if (typeof loadCharactersTab === 'function') await loadCharactersTab();
    if (typeof loadPendingTab === 'function') await loadPendingTab();
  } catch (err) {
    console.error('Erro ao descartar alterações:', err);
    showToast('❌ Falha ao descartar alterações.', 'error');
  }
}

// ── Resolução de Habilidades (Staff) ───────────────────────────────
async function resolveAbilityRequest(uid, abilityName, approved) {
  const action = approved ? 'aprovar' : 'rejeitar';
  if (!confirm(`Deseja realmente ${action} o aprendizado desta habilidade para este jogador?`)) return;

  try {
    const adminUser = _auth.currentUser;
    const adminData = ALL_CHARACTERS[adminUser.uid] || {};
    const isSubAdmin = adminData.isSubAdmin && !adminData.isAdmin;

    const charData = ALL_CHARACTERS[uid] || {};
    const char = charData.character || {};
    let pendingList = charData.pendingAbilities || [];
    let learnedList = char.abilities?.racial || [];

    if (typeof learnedList === 'string') {
      learnedList = [learnedList];
    }

    const reqIndex = pendingList.findIndex(r => r.name.toLowerCase().trim() === abilityName.toLowerCase().trim());
    if (reqIndex === -1) {
      showToast('Solicitação de habilidade não encontrada.', 'error');
      return;
    }

    pendingList.splice(reqIndex, 1);

    let notifications = charData.notifications || [];
    let serverAlerts = charData.serverAlerts || [];

    if (approved) {
      if (!learnedList.includes(abilityName)) {
        learnedList.push(abilityName);
      }

      if (!char.abilities) char.abilities = {};
      char.abilities.racial = learnedList;

      if (isSubAdmin) {
        const logMsg = `Ei, o Sub-administrador ${adminData.player?.name || 'Sub-admin'} aprovou uma nova habilidade (【 ${abilityName} 】) para ${char.name || 'um aventureiro'}!`;
        serverAlerts.push({
          text: logMsg,
          timestamp: Date.now(),
          author: adminData.player?.name || 'Sub-admin'
        });
        
        notifications.push({
          text: `Sua habilidade 【 ${abilityName} 】 foi APROVADA pelo Sub-administrador ${adminData.player?.name || 'Sub-admin'}!`,
          timestamp: Date.now(),
          type: 'success'
        });

        await _db.collection('characters').doc(uid).update({
          'character.abilities.racial': learnedList,
          pendingAbilities: pendingList,
          notifications: notifications,
          serverAlerts: serverAlerts
        });
      } else {
        notifications.push({
          text: `Sua habilidade 【 ${abilityName} 】 foi APROVADA pelo Administrador Supremo!`,
          timestamp: Date.now(),
          type: 'success'
        });

        await _db.collection('characters').doc(uid).update({
          'character.abilities.racial': learnedList,
          pendingAbilities: pendingList,
          notifications: notifications
        });
      }

      showToast(`Habilidade 【 ${abilityName} 】 aprovada com sucesso!`, 'success');
    } else {
      notifications.push({
        text: `Sua solicitação de habilidade 【 ${abilityName} 】 foi REJEITADA pelos administradores.`,
        timestamp: Date.now(),
        type: 'error'
      });

      await _db.collection('characters').doc(uid).update({
        pendingAbilities: pendingList,
        notifications: notifications
      });

      showToast(`Habilidade 【 ${abilityName} 】 rejeitada com sucesso!`, 'success');
    }

    if (typeof loadPendingTab === 'function') loadPendingTab();
    if (typeof loadLearnAbilitiesTab === 'function') loadLearnAbilitiesTab();
    if (typeof loadServerNotifications === 'function') loadServerNotifications();

  } catch (err) {
    console.error('Erro ao resolver habilidade:', err);
    showToast('Erro ao resolver solicitação de habilidade.', 'error');
  }
}

// ── Notificações e Comunicação Descentralizada ─────────────────────
async function loadServerNotifications() {
  if (typeof currentProfileSubtab !== 'undefined' && currentProfileSubtab) {
    loadProfileSubtabData(currentProfileSubtab);
  } else {
    loadProfileSubtabData('noticias');
    loadProfileSubtabData('mensagens');
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

// ── Publicador de Notícias (Mestres) ──────────────────────────────────
function toggleNewsForm() {
  const fields = document.getElementById('news-form-fields');
  if (fields) {
    fields.style.display = fields.style.display === 'none' ? 'flex' : 'none';
  }
}

async function publishNewsAnnouncement() {
  const titleInput = document.getElementById('news-title-input');
  const categoryInput = document.getElementById('news-category-input');
  const contentInput = document.getElementById('news-content-input');

  const title = titleInput ? titleInput.value.trim() : '';
  const category = categoryInput ? categoryInput.value : '';
  const content = contentInput ? contentInput.value.trim() : '';

  if (!title || !content) {
    showToast('⚠️ Preencha o título e o conteúdo da notícia!', 'error');
    return;
  }

  const currentUser = _auth.currentUser;
  if (!currentUser) return;

  try {
    showToast('⚡ Publicando notícia...', 'info');
    
    const charData = ALL_CHARACTERS[currentUser.uid] || {};
    const authorName = charData.player?.name || 'Mestre';

    await _db.collection('news').add({
      title,
      category,
      content,
      author: authorName,
      timestamp: Date.now()
    });

    showToast('✅ Notícia publicada com sucesso!', 'success');
    
    if (titleInput) titleInput.value = '';
    if (contentInput) contentInput.value = '';
    toggleNewsForm();

    loadProfileSubtabData('noticias');
  } catch (err) {
    console.error('Erro ao publicar notícia:', err);
    showToast('❌ Falha ao publicar notícia.', 'error');
  }
}

// ── Migração Inteligente de Banco de Dados (DanteSTR) ───────────────
async function runDatabaseMigration() {
  if (window.hasRunKenswordMigration) return;
  window.hasRunKenswordMigration = true;

  const currentUser = _auth ? _auth.currentUser : null;
  if (!currentUser) return;
  
  const currentUserData = ALL_CHARACTERS[currentUser.uid];
  if (!currentUserData || !currentUserData.isAdmin) {
    console.log('[MIGRAÇÃO] Usuário logado não possui privilégios de Admin Supremo. Migração ignorada.');
    return;
  }

  try {
    const snap = await _db.collection('characters').get();
    const batch = _db.batch();
    let hasChanges = false;
    let deletedCount = 0;
    let updatedCount = 0;
    let aliceResetCount = 0;
    const targetPendingNames = ['akira', 'mizuki', 'korikiwa', 'yurei', 'kuroha'];

    snap.forEach(doc => {
      const data = doc.data();
      const docId = doc.id;
      const charName = (data.character?.name || '').trim().toLowerCase();
      const playerName = (data.player?.name || '').trim().toLowerCase();

      // 1. Deletar a conta de Akice por completo
      if (charName === 'akice' || playerName === 'akice') {
        const docRef = _db.collection('characters').doc(docId);
        batch.delete(docRef);
        deletedCount++;
        hasChanges = true;
        console.log(`[MIGRAÇÃO] Agendada exclusão da conta de Akice (ID: ${docId})`);
      }
      // 2. Excluir a ficha de Alice preservando a sua conta de jogador
      else if (charName === 'alice' || playerName === 'alice') {
        const docRef = _db.collection('characters').doc(docId);
        batch.update(docRef, {
          character: firebase.firestore.FieldValue.delete(),
          status: firebase.firestore.FieldValue.delete(),
          pendingAbilities: firebase.firestore.FieldValue.delete(),
          hasPendingModifications: firebase.firestore.FieldValue.delete(),
          modificationRequest: firebase.firestore.FieldValue.delete()
        });
        aliceResetCount++;
        hasChanges = true;
        console.log(`[MIGRAÇÃO] Agendada exclusão da ficha de Alice preservando a conta (ID: ${docId})`);
      }
      // 3. Colocar Akira, Mizuki, Korikiwa, Yurei, Kuroha em pending
      else {
        const matchesTarget = targetPendingNames.some(name => charName.includes(name) || playerName.includes(name));
        if (matchesTarget && data.status !== 'pending') {
          const docRef = _db.collection('characters').doc(docId);
          batch.update(docRef, { status: 'pending' });
          updatedCount++;
          hasChanges = true;
          console.log(`[MIGRAÇÃO] Agendada atualização para pending de ${data.character?.name || data.player?.name} (ID: ${docId})`);
        }
      }
    });

    if (hasChanges) {
      await batch.commit();
      console.log(`[MIGRAÇÃO] Concluída com sucesso! ${deletedCount} excluídos, ${aliceResetCount} fichas de Alice resetadas, ${updatedCount} atualizados para pending.`);
      showToast(`✨ Banco de dados migrado! Fichas de Akira/Mizuki/etc atualizadas para 'pending', ficha de Alice resetada e Akice excluída.`, 'info');
    } else {
      console.log('[MIGRAÇÃO] Nenhuma alteração pendente no banco de dados.');
    }
  } catch (err) {
    console.error('[MIGRAÇÃO] Erro ao rodar migração de dados:', err);
  }
}
