// ================================================================
// KENSWORD CHRONICLES — Portal JS
// Lógica do formulário de login/registro (usa Firebase via auth.js)
// ================================================================

// ── Limites de raça para validação ──────────────────────────────
const RACE_LIMITS = {
  "Humano":       { minAge: 1, maxAge: 300,  minH: 100, maxH: 300 },
  "Alto Elfo":    { minAge: 1, maxAge: 1000, minH: 140, maxH: 220 },
  "Drow (Elfo Negro)": { minAge: 1, maxAge: 1200, minH: 140, maxH: 220 },
  "Demi-Humano":  { minAge: 1, maxAge: 400,  minH: 100, maxH: 250 },
  "Gigante":      { minAge: 1, maxAge: 700,  minH: 800, maxH: 1000 },
  "Anão":         { minAge: 1, maxAge: 600,  minH: 120, maxH: 150 },
  "Demônio":      { minAge: 1, maxAge: 1000, minH: 100, maxH: 300 },
  "Succubus / Incubus": { minAge: 1, maxAge: 800, minH: 140, maxH: 220 },
  "Valquíria":    { minAge: 1, maxAge: 99999,minH: 140, maxH: 230 },
  "Fada":         { minAge: 1, maxAge: 500,  minH: 30,  maxH: 50  },
  "Pixie":        { minAge: 1, maxAge: 500,  minH: 20,  maxH: 100 },
  "Metamorfo":    { minAge: 1, maxAge: 500,  minH: 100, maxH: 250 },
  "Draconiano":   { minAge: 1, maxAge: 800,  minH: 100, maxH: 400 },
  "Vampiro":      { minAge: 1, maxAge: 99999,minH: 140, maxH: 230 },
  "Kobold":       { minAge: 1, maxAge: 80,   minH: 70,  maxH: 150 },
  "Drakobold":    { minAge: 1, maxAge: 100,  minH: 80,  maxH: 160 },
  "Kouris":       { minAge: 1, maxAge: 20,   minH: 30,  maxH: 200 },
  "Floraune":     { minAge: 1, maxAge: 80,   minH: 140, maxH: 220 },
  "Espírito":     { minAge: 1, maxAge: 99999,minH: 1,   maxH: 300 },
  "Abissal":      { minAge: 1, maxAge: 500,  minH: 100, maxH: 400 },
  "Yokai":        { minAge: 1, maxAge: 99999,minH: 100, maxH: 250 },
};

// Mapa de raças para exibição (com sub-raças achatadas)
let RACE_OPTIONS = [];

function buildRaceOptions() {
  RACES_DATA.forEach(race => {
    if (race.subraces && race.subraces.length > 0) {
      race.subraces.forEach(sub => {
        RACE_OPTIONS.push({
          label: sub.name.replace(/^[^\w\s]*\s*/, ''), // Remove emoji prefixo
          value: sub.name,
          image: sub.image || race.image || '',
          appearance: sub.appearance || race.appearance || '',
          parentRace: race.name,
        });
      });
    } else {
      RACE_OPTIONS.push({
        label: race.name,
        value: race.name,
        image: race.image || '',
        appearance: race.appearance || '',
        parentRace: race.name,
      });
    }
  });

  const sel = document.getElementById('reg-char-race');
  RACE_OPTIONS.forEach(opt => {
    const el = document.createElement('option');
    el.value = opt.value;
    el.textContent = opt.label;
    sel.appendChild(el);
  });
}

// ── Navegação entre telas ────────────────────────────────────────
function showAuthForm(form) {
  document.getElementById('auth-choice').style.display = 'none';
  document.getElementById('auth-login').classList.remove('active');
  document.getElementById('auth-register').classList.remove('active');
  if (form === 'login') document.getElementById('auth-login').classList.add('active');
  if (form === 'register') document.getElementById('auth-register').classList.add('active');
}

function showAuthChoice() {
  document.getElementById('auth-choice').style.display = 'block';
  document.getElementById('auth-login').classList.remove('active');
  document.getElementById('auth-register').classList.remove('active');
}

// ── Passos do registro ───────────────────────────────────────────
let currentStep = 0;

function goToStep(step) {
  if (step > currentStep && !validateStep(currentStep)) return;

  document.getElementById('reg-step-' + currentStep).style.display = 'none';
  document.getElementById('step-dot-' + currentStep).classList.remove('active');
  document.getElementById('step-dot-' + currentStep).classList.add('done');

  currentStep = step;
  document.getElementById('reg-step-' + step).style.display = 'block';
  document.getElementById('step-dot-' + step).classList.remove('done');
  document.getElementById('step-dot-' + step).classList.add('active');
  document.getElementById('auth-register').scrollTop = 0;
  document.getElementById('auth-overlay').scrollTop = 0;
}

// ── Validação por passo ──────────────────────────────────────────
function validateStep(step) {
  if (step === 0) return validateStep0();
  if (step === 1) return validateStep1();
  if (step === 2) return validateStep2();
  return true;
}

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

function validateStep0() {
  let ok = true;
  clearErr('err-player-name'); clearErr('err-player-age');
  clearErr('err-avail'); clearErr('err-pass'); clearErr('err-pass-confirm');

  const name = document.getElementById('reg-player-name').value.trim();
  if (!name) { showErr('err-player-name', 'Informe seu nome de jogador.'); ok = false; }
  else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name)) { showErr('err-player-name', 'Você não pode colocar caracteres especiais ou números!'); ok = false; }

  const age = parseInt(document.getElementById('reg-player-age').value);
  if (!age || age < 1 || age > 120) { showErr('err-player-age', 'Informe uma idade válida (1–120).'); ok = false; }

  const avail = [...document.querySelectorAll('input[name="avail"]:checked')];
  if (avail.length === 0) { showErr('err-avail', 'Você precisa colocar sua disponibilidade!'); ok = false; }

  const pass = document.getElementById('reg-pass').value;
  if (pass.length < 8) { showErr('err-pass', 'A senha deve ter no mínimo 8 caracteres.'); ok = false; }

  const confirm = document.getElementById('reg-pass-confirm').value;
  if (pass !== confirm) { showErr('err-pass-confirm', 'A senha não bate!'); ok = false; }

  return ok;
}

function validateStep1() {
  let ok = true;
  clearErr('err-char-name'); clearErr('err-char-age'); clearErr('err-char-race');
  clearErr('err-gender'); clearErr('err-height'); clearErr('err-weight'); clearErr('err-location');

  const charName = document.getElementById('reg-char-name').value.trim();
  if (!charName) { showErr('err-char-name', 'Informe o nome do personagem.'); ok = false; }
  else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(charName)) { showErr('err-char-name', 'Você não pode colocar caracteres especiais ou números!'); ok = false; }

  const race = document.getElementById('reg-char-race').value;
  if (!race) { showErr('err-char-race', 'Selecione uma raça.'); ok = false; }

  const charAge = parseInt(document.getElementById('reg-char-age').value);
  if (!charAge || charAge < 1) { showErr('err-char-age', 'Informe uma idade válida.'); ok = false; }
  else {
    const parentRace = getRaceLimit(race);
    if (parentRace && charAge > parentRace.maxAge) {
      showErr('err-char-age', `Esta raça vive no máximo ${parentRace.maxAge === 99999 ? 'uma vida eterna' : parentRace.maxAge + ' anos'}.`);
      ok = false;
    }
  }

  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) { showErr('err-gender', 'Selecione um gênero.'); ok = false; }

  const height = parseInt(document.getElementById('reg-height').value);
  if (!height || height < 1) { showErr('err-height', 'Informe a altura em centímetros.'); ok = false; }
  else {
    const lim = getRaceLimit(race);
    if (lim && (height < lim.minH || height > lim.maxH)) {
      showErr('err-height', `Para esta raça, a altura deve ser entre ${lim.minH} cm e ${lim.maxH} cm.`);
      ok = false;
    }
  }

  const weight = parseInt(document.getElementById('reg-weight').value);
  if (!weight || weight < 1) { showErr('err-weight', 'Informe o peso em quilos.'); ok = false; }

  const loc = document.getElementById('reg-location').value;
  if (!loc) { showErr('err-location', 'Selecione um local atual.'); ok = false; }

  return ok;
}

function validateStep2() {
  let ok = true;
  // O usuário não pediu restrições estritas aqui, mas podemos adicionar se necessário
  return ok;
}

function togglePassword(id) {
  const el = document.getElementById(id);
  const btn = el.nextElementSibling;
  if (el.type === 'password') {
    el.type = 'text';
    btn.textContent = '🙈';
  } else {
    el.type = 'password';
    btn.textContent = '👁️';
  }
}

function getRaceLimit(raceName) {
  if (RACE_LIMITS[raceName]) return RACE_LIMITS[raceName];
  const opt = RACE_OPTIONS.find(o => o.value === raceName);
  if (opt && RACE_LIMITS[opt.parentRace]) return RACE_LIMITS[opt.parentRace];
  return null;
}

// ── Interações do formulário ──────────────────────────────────────
function onRaceChange() {
  const val = document.getElementById('reg-char-race').value;
  const opt = RACE_OPTIONS.find(o => o.value === val);
  const preview = document.getElementById('race-preview');
  if (opt) {
    document.getElementById('race-preview-img').src = opt.image || '';
    document.getElementById('race-preview-img').style.display = opt.image ? 'block' : 'none';
    document.getElementById('race-preview-name').textContent = opt.label;
    document.getElementById('race-preview-appearance').textContent = opt.appearance;
    preview.classList.add('active');

    const lim = getRaceLimit(val);
    if (lim) {
      const maxStr = lim.maxAge === 99999 ? 'eterna' : lim.maxAge + ' anos';
      document.getElementById('height-hint').textContent =
        `Altura: ${lim.minH}–${lim.maxH} cm | Expectativa de vida: ${maxStr}`;
    }
  } else {
    preview.classList.remove('active');
  }
}

const ELEMENTS_DESC_DATA = {
  "Fogo": { traits: "Calor • Poder de ataque • Destruição", desc: "Pode destruir, mas que também pode acabar fazendo o usuário se ferir." },
  "Água": { traits: "Flexibilidade • Suporte • Restauração", desc: "Possui alto potencial restaurador, podendo curar feridas. Golpes ferozes em mãos hábeis." },
  "Terra": { traits: "Resistente • Ótimo para ferreiros • Construtos", desc: "Cria muralhas inteiras ou grandes rochas para lançar em inimigos." },
  "Vento": { traits: "Moldável • Nobre • Ágil", desc: "Extremamente útil e nobre. Ventos fortes aniquilam, ventos serenos acalmam." },
  "Gelo": { traits: "Imponente • Nobre • Brutal", desc: "Poder congelante temerário, possuído principalmente pela Realeza de Korikiwa." },
  "Planta": { traits: "Sereno • Raro • Suporte", desc: "Traz paz e consolo, curando aliados. Pode criar árvores gigantescas e imponentes." },
  "Mineral": { traits: "Moldável • Raro • Ofensivo", desc: "Manipulação precisa dos minerais, de vidro a diamantes." },
  "Relâmpago": { traits: "Super ágil • Ofensivo • Nobre", desc: "Buscado por nobres, mas letal nas mãos de velocistas." },
  "Luz": { traits: "Ofensivo • Suporte", desc: "Fortes ataques ferventes, excelente suporte. Ilumina regiões escuras." },
  "Sombra": { traits: "Flexível • Majins", desc: "Prende inimigos, perfura oponentes ou permite viagens através das sombras." },
  "Dimensional": { traits: "Mobilidade • Utilidades", desc: "Usado para bolsas mágicas e portais de mobilidade." },
  "Sagrado": { traits: "Suporte • Anti mortos-vivos", desc: "Milagroso. Cura feridas e ilumina o caminho. Aprovado pela igreja." },
  "Trevas": { traits: "Corruptor • Cruel • Flexível", desc: "Maldade interminável: necromancia, corrupção e pactos." }
};

function onElementChange() {
  const val = document.getElementById('reg-element').value;
  const prev = document.getElementById('element-preview');
  if (val && ELEMENTS_DESC_DATA[val]) {
    document.getElementById('el-prev-title').textContent = val;
    document.getElementById('el-prev-traits').textContent = ELEMENTS_DESC_DATA[val].traits;
    document.getElementById('el-prev-desc').textContent = ELEMENTS_DESC_DATA[val].desc;
    prev.style.display = 'block';
  } else {
    prev.style.display = 'none';
  }
}

function onHeightInput() {
  const val = parseInt(document.getElementById('reg-height').value);
  const el = document.getElementById('height-converted');
  if (val > 0) el.textContent = `→ ${(val / 100).toFixed(2).replace('.', ',')} metros`;
  else el.textContent = '';
}

function onWeightInput() {
  const val = parseInt(document.getElementById('reg-weight').value);
  const box = document.getElementById('weight-confirm');
  const txt = document.getElementById('weight-confirm-text');
  if (val > 0) {
    txt.textContent = `Você vai ter ${val} Quilos. Você tem certeza?`;
    box.classList.add('active');
  } else {
    box.classList.remove('active');
  }
}

// ── Atributos ─────────────────────────────────────────────────────
const ATTRS = { strength: 0, resistance: 0, speed: 0, magic: 0 };
const TOTAL_POINTS = 250;

function changeAttr(attr, delta) {
  const used = Object.values(ATTRS).reduce((a, b) => a + b, 0);
  const newVal = ATTRS[attr] + delta;
  if (newVal < 0) return;
  if (delta > 0 && used + delta > TOTAL_POINTS) return;
  ATTRS[attr] = newVal;
  document.getElementById('attr-' + attr).value = newVal;
  updateAttrDisplay();
}

function updateAttrDisplay() {
  const used = Object.values(ATTRS).reduce((a, b) => a + b, 0);
  const rem = TOTAL_POINTS - used;
  const el = document.getElementById('attr-remaining');
  el.textContent = rem + ' restantes';
  el.className = 'attr-points-remaining' + (rem === 0 ? ' full' : '');
}

// ── Contador de palavras ──────────────────────────────────────────
function updateWordCount() {
  const text = document.getElementById('reg-story').value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  const el = document.getElementById('word-counter');
  el.textContent = words + ' palavra' + (words !== 1 ? 's' : '');
  el.className = 'word-counter' + (words === 0 ? '' : words < 300 ? ' warn' : ' ok');
}

// ── Toast ─────────────────────────────────────────────────────────
function showToast(msg, type = '') {
  const t = document.getElementById('auth-toast');
  t.textContent = msg;
  t.className = 'auth-toast show' + (type ? ' ' + type : '');
  setTimeout(() => t.className = 'auth-toast', 3500);
}

// ── Coleta dados do formulário ────────────────────────────────────
function collectFormData() {
  return {
    playerName: document.getElementById('reg-player-name').value.trim(),
    playerAge: document.getElementById('reg-player-age').value,
    availability: [...document.querySelectorAll('input[name="avail"]:checked')].map(i => i.value),
    password: document.getElementById('reg-pass').value,
    charName: document.getElementById('reg-char-name').value.trim(),
    charAge: document.getElementById('reg-char-age').value,
    charRace: document.getElementById('reg-char-race').value,
    charGender: document.querySelector('input[name="gender"]:checked')?.value || '',
    charHeight: document.getElementById('reg-height').value,
    charWeight: document.getElementById('reg-weight').value,
    charLocation: document.getElementById('reg-location').value,
    item1: document.getElementById('reg-item1').value,
    item2: document.getElementById('reg-item2').value,
    item3: document.getElementById('reg-item3').value,
    uniqueAbilityTitle: document.getElementById('reg-ua-title').value,
    uniqueAbilityDesc: document.getElementById('reg-ua-desc').value,
    uniqueAbilityBuffs: document.getElementById('reg-ua-buffs') ? document.getElementById('reg-ua-buffs').value : '',
    uniqueAbilityNerfs: document.getElementById('reg-ua-nerfs') ? document.getElementById('reg-ua-nerfs').value : '',
    elementInitial: document.getElementById('reg-element').value,
    attrStrength: ATTRS.strength,
    attrResistance: ATTRS.resistance,
    attrSpeed: ATTRS.speed,
    attrMagic: ATTRS.magic,
    charStory: document.getElementById('reg-story').value,
  };
}

// ── Ações de Login e Registro ─────────────────────────────────────
async function handleRegister() {
  clearErr('err-register-general');
  const btn = document.getElementById('register-submit-btn');
  btn.disabled = true;
  try {
    const data = collectFormData();
    setLoading(true);
    await registerCharacter(data);
    setLoading(false);
    showToast('✅ Personagem inscrito na guilda!', 'success');
    setTimeout(() => hidePortal(), 1200);
  } catch (err) {
    setLoading(false);
    btn.disabled = false;
    console.warn('⚠️ O erro 400 (Bad Request) que aparece no console acima é normal. O Firebase usa isso para avisar que o registro foi recusado (ex: o nome já existe). Motivo real:', err.code || err.message);
    const msg = translateFirebaseError(err.code || err.message);
    showErr('err-register-general', '⚠ ' + msg + (err.code ? ' [' + err.code + ']' : ''));
    showToast('Erro ao inscrever personagem.', 'error');
  }
}

async function handleLogin() {
  clearErr('login-general-err');
  const btn = document.getElementById('login-submit-btn');
  btn.disabled = true;
  const name = document.getElementById('login-name').value.trim();
  const pass = document.getElementById('login-pass').value;
  if (!name) { showErr('login-name-err', 'Informe seu nome.'); btn.disabled = false; return; }
  if (!pass)  { showErr('login-pass-err', 'Informe sua senha.'); btn.disabled = false; return; }
  try {
    setLoading(true);
    await loginCharacter(name, pass);
    setLoading(false);
    showToast('✅ Bem-vindo de volta, aventureiro!', 'success');
    setTimeout(() => hidePortal(), 1200);
  } catch (err) {
    setLoading(false);
    btn.disabled = false;
    const msg = translateFirebaseError(err.code || err.message);
    showErr('login-general-err', '⚠ ' + msg);
  }
}

async function handleLogout() {
  try { await logoutCharacter(); } catch (e) {}
  showPortal();
}

// ── Controle do overlay ───────────────────────────────────────────
function hidePortal() {
  document.getElementById('auth-overlay').classList.add('hidden');
}
function showPortal() {
  document.getElementById('auth-overlay').classList.remove('hidden');
  showAuthChoice();
}
function setLoading(on) {
  document.getElementById('auth-loading').classList.toggle('active', on);
}

// ── Tradução de erros Firebase ────────────────────────────────────
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

// ── Inicialização ─────────────────────────────────────────────────
async function initPortal() {
  buildRaceOptions();
  try {
    onSessionChange((user) => {
      if (user) hidePortal();
      else showPortal();
    });
  } catch (e) {
    console.warn('Firebase não configurado:', e);
    showPortal();
  }
}

document.addEventListener('DOMContentLoaded', initPortal);
