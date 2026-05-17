// ================================================================

// KENSWORD CHRONICLES â€” Portal JS

// LÃ³gica do formulÃ¡rio de login/registro (usa Firebase via auth.js)

// ================================================================



// â”€â”€ Limites de raÃ§a para validaÃ§Ã£o â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const RACE_LIMITS = {

  "Humano":       { minAge: 1, maxAge: 300,  minH: 100, maxH: 300 },

  "Alto Elfo":    { minAge: 1, maxAge: 1000, minH: 140, maxH: 220 },

  "Drow (Elfo Negro)": { minAge: 1, maxAge: 1200, minH: 140, maxH: 220 },

  "Demi-Humano":  { minAge: 1, maxAge: 400,  minH: 100, maxH: 250 },

  "Gigante":      { minAge: 1, maxAge: 700,  minH: 800, maxH: 1000 },

  "AnÃ£o":         { minAge: 1, maxAge: 600,  minH: 120, maxH: 150 },

  "DemÃ´nio":      { minAge: 1, maxAge: 1000, minH: 100, maxH: 300 },

  "Succubus / Incubus": { minAge: 1, maxAge: 800, minH: 140, maxH: 220 },

  "ValquÃ­ria":    { minAge: 1, maxAge: 99999,minH: 140, maxH: 230 },

  "Fada":         { minAge: 1, maxAge: 500,  minH: 30,  maxH: 50  },

  "Pixie":        { minAge: 1, maxAge: 500,  minH: 20,  maxH: 100 },

  "Metamorfo":    { minAge: 1, maxAge: 500,  minH: 100, maxH: 250 },

  "Draconiano":   { minAge: 1, maxAge: 800,  minH: 100, maxH: 400 },

  "Vampiro":      { minAge: 1, maxAge: 99999,minH: 140, maxH: 230 },

  "Kobold":       { minAge: 1, maxAge: 80,   minH: 70,  maxH: 150 },

  "Drakobold":    { minAge: 1, maxAge: 100,  minH: 80,  maxH: 160 },

  "Kouris":       { minAge: 1, maxAge: 20,   minH: 30,  maxH: 200 },

  "Floraune":     { minAge: 1, maxAge: 80,   minH: 140, maxH: 220 },

  "EspÃ­rito":     { minAge: 1, maxAge: 99999,minH: 1,   maxH: 300 },

  "Abissal":      { minAge: 1, maxAge: 500,  minH: 100, maxH: 400 },

  "Yokai":        { minAge: 1, maxAge: 99999,minH: 100, maxH: 250 },

};



// Mapa de raÃ§as para exibiÃ§Ã£o (com sub-raÃ§as achatadas)

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



// â”€â”€ NavegaÃ§Ã£o entre telas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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



// â”€â”€ Passos do registro â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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



// â”€â”€ ValidaÃ§Ã£o por passo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

  if (!age || age < 1 || age > 120) { showErr('err-player-age', 'Informe uma idade vÃ¡lida (1â€“120).'); ok = false; }



  const avail = [...document.querySelectorAll('input[name="avail"]:checked')];

  if (avail.length === 0) { showErr('err-avail', 'VocÃª precisa colocar sua disponibilidade!'); ok = false; }



  const pass = document.getElementById('reg-pass').value;

  if (pass.length < 8) { showErr('err-pass', 'A senha deve ter no mÃ­nimo 8 caracteres.'); ok = false; }



  const confirm = document.getElementById('reg-pass-confirm').value;

  if (pass !== confirm) { showErr('err-pass-confirm', 'A senha nÃ£o bate!'); ok = false; }



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

  if (!race) { showErr('err-char-race', 'Selecione uma raÃ§a.'); ok = false; }



  const charAge = parseInt(document.getElementById('reg-char-age').value);

  if (!charAge || charAge < 1) { showErr('err-char-age', 'Informe uma idade vÃ¡lida.'); ok = false; }

  else {

    const parentRace = getRaceLimit(race);

    if (parentRace && charAge > parentRace.maxAge) {

      showErr('err-char-age', `Esta raÃ§a vive no mÃ¡ximo ${parentRace.maxAge === 99999 ? 'uma vida eterna' : parentRace.maxAge + ' anos'}.`);

      ok = false;

    }

  }



  const gender = document.querySelector('input[name="gender"]:checked');

  if (!gender) { showErr('err-gender', 'Selecione um gÃªnero.'); ok = false; }



  const height = parseInt(document.getElementById('reg-height').value);

  if (!height || height < 1) { showErr('err-height', 'Informe a altura em centÃ­metros.'); ok = false; }

  else {

    const lim = getRaceLimit(race);

    if (lim && (height < lim.minH || height > lim.maxH)) {

      showErr('err-height', `Para esta raÃ§a, a altura deve ser entre ${lim.minH} cm e ${lim.maxH} cm.`);

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
  clearErr('err-ua-title'); clearErr('err-ua-desc');

  const title = document.getElementById('reg-ua-title').value.trim();
  if (!title) {
    showErr('err-ua-title', 'Informe o título da habilidade única.');
    ok = false;
  }

  const desc = document.getElementById('reg-ua-desc').value.trim();
  if (!desc) {
    showErr('err-ua-desc', 'Descreva sua habilidade única em detalhes.');
    ok = false;
  }

  return ok;
}

function validateStep3() {
  let ok = true;
  clearErr('err-attrs');
  clearErr('err-register-general');

  const element = document.getElementById('reg-element').value;
  if (!element) {
    showErr('err-register-general', '⚠️ Selecione um Elemento Inicial.');
    ok = false;
  }

  const used = Object.values(ATTRS).reduce((a, b) => a + b, 0);
  if (used !== TOTAL_POINTS) {
    showErr('err-attrs', `⚠️ Distribua todos os ${TOTAL_POINTS} pontos (faltam ${TOTAL_POINTS - used} pontos).`);
    ok = false;
  }

  const storyText = document.getElementById('reg-story').value.trim();
  const wordCount = storyText ? storyText.split(/\s+/).filter(w => w !== '').length : 0;
  if (wordCount < 100) {
    showErr('err-register-general', `⚠️ A história do seu personagem deve ter no mínimo 100 palavras! (Você escreveu ${wordCount} palavras).`);
    ok = false;
  }

  return ok;
}



function togglePassword(id) {

  const el = document.getElementById(id);

  const btn = el.nextElementSibling;

  if (el.type === 'password') {

    el.type = 'text';

    btn.textContent = 'ðŸ™ˆ';

  } else {

    el.type = 'password';

    btn.textContent = 'ðŸ‘ï¸';

  }

}



function getRaceLimit(raceName) {

  if (RACE_LIMITS[raceName]) return RACE_LIMITS[raceName];

  const opt = RACE_OPTIONS.find(o => o.value === raceName);

  if (opt && RACE_LIMITS[opt.parentRace]) return RACE_LIMITS[opt.parentRace];

  return null;

}



// â”€â”€ InteraÃ§Ãµes do formulÃ¡rio â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

        `Altura: ${lim.minH}â€“${lim.maxH} cm | Expectativa de vida: ${maxStr}`;

    }

  } else {

    preview.classList.remove('active');

  }

}



const ELEMENTS_DESC_DATA = {

  "Fogo": { traits: "Calor â€¢ Poder de ataque â€¢ DestruiÃ§Ã£o", desc: "Pode destruir, mas que tambÃ©m pode acabar fazendo o usuÃ¡rio se ferir." },

  "Ãgua": { traits: "Flexibilidade â€¢ Suporte â€¢ RestauraÃ§Ã£o", desc: "Possui alto potencial restaurador, podendo curar feridas. Golpes ferozes em mÃ£os hÃ¡beis." },

  "Terra": { traits: "Resistente â€¢ Ã“timo para ferreiros â€¢ Construtos", desc: "Cria muralhas inteiras ou grandes rochas para lanÃ§ar em inimigos." },

  "Vento": { traits: "MoldÃ¡vel â€¢ Nobre â€¢ Ãgil", desc: "Extremamente Ãºtil e nobre. Ventos fortes aniquilam, ventos serenos acalmam." },

  "Gelo": { traits: "Imponente â€¢ Nobre â€¢ Brutal", desc: "Poder congelante temerÃ¡rio, possuÃ­do principalmente pela Realeza de Korikiwa." },

  "Planta": { traits: "Sereno â€¢ Raro â€¢ Suporte", desc: "Traz paz e consolo, curando aliados. Pode criar Ã¡rvores gigantescas e imponentes." },

  "Mineral": { traits: "MoldÃ¡vel â€¢ Raro â€¢ Ofensivo", desc: "ManipulaÃ§Ã£o precisa dos minerais, de vidro a diamantes." },

  "RelÃ¢mpago": { traits: "Super Ã¡gil â€¢ Ofensivo â€¢ Nobre", desc: "Buscado por nobres, mas letal nas mÃ£os de velocistas." },

  "Luz": { traits: "Ofensivo â€¢ Suporte", desc: "Fortes ataques ferventes, excelente suporte. Ilumina regiÃµes escuras." },

  "Sombra": { traits: "FlexÃ­vel â€¢ Majins", desc: "Prende inimigos, perfura oponentes ou permite viagens atravÃ©s das sombras." },

  "Dimensional": { traits: "Mobilidade â€¢ Utilidades", desc: "Usado para bolsas mÃ¡gicas e portais de mobilidade." },

  "Sagrado": { traits: "Suporte â€¢ Anti mortos-vivos", desc: "Milagroso. Cura feridas e ilumina o caminho. Aprovado pela igreja." },

  "Trevas": { traits: "Corruptor â€¢ Cruel â€¢ FlexÃ­vel", desc: "Maldade interminÃ¡vel: necromancia, corrupÃ§Ã£o e pactos." }

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

  if (val > 0) el.textContent = `â†’ ${(val / 100).toFixed(2).replace('.', ',')} metros`;

  else el.textContent = '';

}



function onAvatarSelected(event) {

  const file = event.target.files[0];

  if (!file) return;



  const reader = new FileReader();

  reader.onload = function(e) {

    const img = new Image();

    img.onload = function() {

      // Redimensionar para no mÃ¡ximo 400x400

      const canvas = document.createElement('canvas');

      const MAX_SIZE = 400;

      let width = img.width;

      let height = img.height;



      if (width > height) {

        if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }

      } else {

        if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }

      }



      canvas.width = width;

      canvas.height = height;

      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0, width, height);

      

      const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // CompressÃ£o leve

      document.getElementById('reg-char-avatar-base64').value = dataUrl;

      

      const preview = document.getElementById('avatar-preview');

      preview.src = dataUrl;

      preview.style.display = 'block';

      document.getElementById('avatar-placeholder-text').style.display = 'none';

    };

    img.src = e.target.result;

  };

  reader.readAsDataURL(file);

}



function onWeightInput() {

  const val = parseInt(document.getElementById('reg-weight').value);

  const box = document.getElementById('weight-confirm');

  const txt = document.getElementById('weight-confirm-text');

  if (val > 0) {

    txt.textContent = `VocÃª vai ter ${val} Quilos. VocÃª tem certeza?`;

    box.classList.add('active');

  } else {

    box.classList.remove('active');

  }

}



// â”€â”€ Atributos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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



// â”€â”€ Contador de palavras â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function updateWordCount() {
  const text = document.getElementById('reg-story').value.trim();
  const words = text ? text.split(/\s+/).filter(w => w !== '').length : 0;
  const el = document.getElementById('word-counter');
  el.textContent = words + ' palavra' + (words !== 1 ? 's' : '');
  el.className = 'word-counter' + (words === 0 ? '' : words < 100 ? ' warn' : ' ok');
}



// â”€â”€ Toast â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function showToast(msg, type = '') {

  const t = document.getElementById('auth-toast');

  t.textContent = msg;

  t.className = 'auth-toast show' + (type ? ' ' + type : '');

  setTimeout(() => t.className = 'auth-toast', 3500);

}



// â”€â”€ Coleta dados do formulÃ¡rio â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function collectFormData() {

  return {

    playerName: document.getElementById('reg-player-name').value.trim(),

    playerAge: document.getElementById('reg-player-age').value,

    availability: [...document.querySelectorAll('input[name="avail"]:checked')].map(i => i.value),

    password: document.getElementById('reg-pass').value,

    charName: document.getElementById('reg-char-name').value.trim(),

    charAge: document.getElementById('reg-char-age').value,

    charAvatar: document.getElementById('reg-char-avatar-base64').value,

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



// â”€â”€ AÃ§Ãµes de Login e Registro â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

async function handleRegister() {
  clearErr('err-register-general');

  if (!validateStep3()) return;

  const btn = document.getElementById('register-submit-btn');
  btn.disabled = true;

  try {

    const data = collectFormData();

    setLoading(true);

    await registerCharacter(data);

    setLoading(false);

    showToast('âœ… Personagem inscrito na guilda!', 'success');

    setTimeout(() => hidePortal(), 1200);

  } catch (err) {

    setLoading(false);

    btn.disabled = false;

    console.warn('âš ï¸ O erro 400 (Bad Request) que aparece no console acima Ã© normal. O Firebase usa isso para avisar que o registro foi recusado (ex: o nome jÃ¡ existe). Motivo real:', err.code || err.message);

    const msg = translateFirebaseError(err.code || err.message);

    showErr('err-register-general', 'âš  ' + msg + (err.code ? ' [' + err.code + ']' : ''));

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

    showToast('âœ… Bem-vindo de volta, aventureiro!', 'success');

    setTimeout(() => hidePortal(), 1200);

  } catch (err) {

    setLoading(false);

    btn.disabled = false;

    console.warn('âš ï¸ Erro durante o login:', err);

    const msg = translateFirebaseError(err.code || err.message);

    showErr('login-general-err', 'âš  ' + msg + (err.code ? ' [' + err.code + ']' : ''));

  }

}



async function handleLogout() {

  try { await logoutCharacter(); } catch (e) {}

  showPortal();

}



// â”€â”€ Controle do overlay â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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



// â”€â”€ TraduÃ§Ã£o de erros Firebase â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function translateFirebaseError(code) {

  const map = {

    'auth/email-already-in-use': 'Este nome de jogador jÃ¡ estÃ¡ cadastrado.',

    'auth/invalid-email': 'Nome de jogador invÃ¡lido.',

    'auth/weak-password': 'Senha muito fraca. Use ao menos 8 caracteres.',

    'auth/user-not-found': 'Jogador nÃ£o encontrado. Verifique o nome.',

    'auth/wrong-password': 'Senha incorreta.',

    'auth/invalid-credential': 'Nome ou senha incorretos.',

    'auth/too-many-requests': 'Muitas tentativas. Aguarde e tente novamente.',

    'auth/network-request-failed': 'Erro de conexÃ£o. Verifique sua internet.',

    'auth/configuration-not-found': 'Erro crÃ­tico: O login por e-mail/senha nÃ£o estÃ¡ ativado no seu Firebase Console!',

  };

  return map[code] || 'Erro inesperado. Tente novamente.';

}



// â”€â”€ InicializaÃ§Ã£o â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

async function initPortal() {

  buildRaceOptions();

  try {

    onSessionChange(async (user, charData) => {
      if (user) {
        hidePortal();
        // Mostrar o botão "Meu Perfil" no menu de navegação
        const tabProfileBtn = document.getElementById('tab-profile');
        if (tabProfileBtn) tabProfileBtn.style.display = 'block';

        if (charData) {
          const char = charData.character || {};
          const player = charData.player || {};
          const name = player.name || char.name || 'Aventureiro';
          
          // SEPARAR FOTOS: player.avatar para o perfil do jogador, char.avatar para o personagem
          const playerAvatarUrl = player.avatar || char.avatar || 'Photos/demihuman.webp';
          const charAvatarUrl = char.avatar || 'Photos/demihuman.webp';

          // Atualizar o avatar pequeno no canto superior esquerdo (com a foto do PLAYER)
          const headerAvatar = document.getElementById('header-user-avatar');
          if (headerAvatar) headerAvatar.src = playerAvatarUrl;

          // Atualizar os campos visíveis no menu do perfil (com a foto do PLAYER)
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

          // Preencher a lista "Meus Personagens" (usando a foto do PERSONAGEM)
          const myCharsContainer = document.getElementById('profile-my-characters');
          if (myCharsContainer) {
            // Guardamos localmente para que o clique para abrir a ficha funcione
            ALL_CHARACTERS[user.uid] = charData;
            
            myCharsContainer.innerHTML = `
              <div class="character-card" onclick="openCharacterSheet('${user.uid}')" style="margin: 0 auto; max-width: 180px;">
                <img src="${charAvatarUrl}" alt="${char.name || 'Personagem'}" id="profile-char-card-img">
                <div class="char-card-name" id="profile-char-card-name">${char.name || 'Sem Nome'}</div>
              </div>
            `;
          }

          // ADMINISTRADOR OU SUB-ADMINISTRADOR: Aba Fichas Pendentes
          const tabPendingBtn = document.getElementById('tab-pending');
          if (charData.isAdmin || charData.isSubAdmin) {
            if (tabPendingBtn) tabPendingBtn.style.display = 'block';
            // Carregar fichas pendentes e verificar alertas
            await loadPendingTab();
          } else {
            if (tabPendingBtn) tabPendingBtn.style.display = 'none';
          }
        }
      } else {
        showPortal();
        // Ocultar abas restritas
        const tabProfileBtn = document.getElementById('tab-profile');
        if (tabProfileBtn) tabProfileBtn.style.display = 'none';
        
        const tabPendingBtn = document.getElementById('tab-pending');
        if (tabPendingBtn) tabPendingBtn.style.display = 'none';

        // Redirecionar se estiver em abas do jogador logado
        const activeTab = document.querySelector('.nav-tab.active');
        if (activeTab && (activeTab.id === 'tab-profile' || activeTab.id === 'tab-pending')) {
          showTab('history');
        }

        // Resetar imagem do header para o padrão
        const headerAvatar = document.getElementById('header-user-avatar');
        if (headerAvatar) headerAvatar.src = 'Photos/demihuman.webp';
      }
    });

  } catch (e) {

    console.warn('Firebase nÃ£o configurado:', e);

    showPortal();

  }

}



document.addEventListener('DOMContentLoaded', initPortal);



let ALL_CHARACTERS = {};



async function loadCharactersTab() {

  const container = document.getElementById('characters-grid');

  container.innerHTML = '<div class="auth-loading active" style="margin:2rem auto;"><div class="auth-spinner"></div></div>';

  try {

    ALL_CHARACTERS = await getAllCharacters();

    let html = '';

    const keys = Object.keys(ALL_CHARACTERS);

    if (keys.length === 0) {

      container.innerHTML = '<p style="text-align:center; color:var(--wood-plank); font-style:italic;">Nenhum personagem registrado ainda.</p>';

      return;

    }

    keys.forEach(uid => {
      const char = ALL_CHARACTERS[uid].character || {};
      const name = char.name || 'Desconhecido';

      const avatar = char.avatar || 'Photos/demihuman.webp';

      html += `<div class="character-card" onclick="openCharacterSheet('${uid}')">

        <img src="${avatar}" alt="${name}">

        <div class="char-card-name">${name}</div>

      </div>`;

    });

    container.innerHTML = html;

  } catch (err) {

    console.warn(err);

    container.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar personagens.</p>';

  }

}



function openCharacterSheet(uid) {
  const data = ALL_CHARACTERS[uid];
  if (!data) return;

  const char = data.character || {};
  const racialHtml = (char.abilities?.racial || []).map(r => `<li style="margin-bottom:0.5rem;"><strong>${r.name}:</strong> ${r.desc}</li>`).join('');
  const uniqueHtml = char.uniqueAbility?.title ? `<strong>${char.uniqueAbility.title}</strong><br>${char.uniqueAbility.description}` : 'Nenhuma';
  const classHtml = (char.classes || []).join(', ') || 'Nenhuma';
  const spellHtml = (char.spells || []).join(', ') || 'Nenhuma';

  // Verificar se o usuário atual é admin/sub-admin e se a ficha está pendente
  const currentUser = _auth ? _auth.currentUser : null;
  const currentUserData = currentUser ? ALL_CHARACTERS[currentUser.uid] : null;
  const isStaff = currentUserData && (currentUserData.isAdmin || currentUserData.isSubAdmin);
  const isPending = data.status === 'pending';

  // Se for mestre revisando, Linhagem vira um campo editável
  let lineageHtml = '';
  if (isStaff && isPending) {
    const defaultVal = char.lineage && char.lineage.includes('a ser definido') ? '' : char.lineage || '';
    lineageHtml = `<input type="text" id="review-lineage" value="${defaultVal}" placeholder="Defina a Linhagem (Ex: Linhagem Imperial)" style="width:100%; max-width:280px; padding:0.4rem; font-family:sans-serif; border:1px solid var(--wood-plank); border-radius:4px; background:var(--parchment); color:var(--ink); box-shadow:inset 0 1px 3px rgba(0,0,0,0.2);">`;
  } else {
    lineageHtml = char.lineage || '—';
  }

  let html = `<h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--ink); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">${char.name}</h2>
    <div style="display:flex; gap:1.5rem; margin-bottom:1.5rem; flex-wrap:wrap; justify-content:center;">
      <img src="${char.avatar || 'Photos/demihuman.webp'}" style="width:180px; height:180px; object-fit:cover; border-radius:8px; border:2px solid var(--wood-plank); box-shadow:0 4px 6px rgba(0,0,0,0.3);">
      <div style="flex:1; min-width:200px; display:flex; flex-direction:column; justify-content:center;">
        <p style="margin-bottom:0.5rem;"><strong>Raça:</strong> ${char.race || 'N/A'}</p>
        <p style="margin-bottom:0.5rem;"><strong>Idade:</strong> ${char.age || 'N/A'} anos</p>
        <p style="margin-bottom:0.5rem;"><strong>Gênero:</strong> ${char.gender || 'N/A'}</p>
        <p style="margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;"><strong>Linhagem:</strong> ${lineageHtml}</p>
      </div>
    </div>
    <div style="margin-bottom:1.5rem;">
      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-bottom:0.5rem;">Habilidades Raciais</h3>
      <ul style="padding-left:1.2rem;">${racialHtml || 'Nenhuma'}</ul>
    </div>
    <div style="margin-bottom:1.5rem;">
      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-bottom:0.5rem;">Habilidade Única</h3>
      <p>${uniqueHtml}</p>
  `;

  // Se for mestre revisando, adicionamos a área de texto de Buffs e Nerfs
  if (isStaff && isPending) {
    const currentBuffs = (char.uniqueAbility?.buffs || []).join('\n');
    const currentNerfs = (char.uniqueAbility?.nerfs || []).join('\n');
    html += `
      <div style="margin-top:1rem; padding:1.2rem; border:1px dashed var(--red-wax); border-radius:8px; background:rgba(139,0,0,0.05);">
        <h4 style="margin-top:0; font-family:'Cinzel',serif; color:var(--red-wax); border-bottom:1px dashed var(--wood-plank); padding-bottom:0.3rem;">🛡️ Moderação do Mestre: Buffs e Nerfs</h4>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.2rem; flex-wrap:wrap;">
          <div>
            <label style="display:block; font-weight:bold; color:var(--green-moss); font-size:0.85rem; margin-bottom:0.3rem;">🟢 Buffs (um por linha):</label>
            <textarea id="review-buffs" style="width:100%; height:90px; padding:0.4rem; font-family:sans-serif; border:1px solid var(--wood-plank); border-radius:4px; background:var(--parchment); color:var(--ink); box-shadow:inset 0 1px 3px rgba(0,0,0,0.2);" placeholder="Ex: +10% dano de fogo">${currentBuffs}</textarea>
          </div>
          <div>
            <label style="display:block; font-weight:bold; color:var(--red-wax); font-size:0.85rem; margin-bottom:0.3rem;">🔴 Nerfs (um por linha):</label>
            <textarea id="review-nerfs" style="width:100%; height:90px; padding:0.4rem; font-family:sans-serif; border:1px solid var(--wood-plank); border-radius:4px; background:var(--parchment); color:var(--ink); box-shadow:inset 0 1px 3px rgba(0,0,0,0.2);" placeholder="Ex: Custo de mana duplicado">${currentNerfs}</textarea>
          </div>
        </div>
      </div>
    `;
  } else {
    // Exibição pública normal dos Buffs e Nerfs
    const buffsHtml = (char.uniqueAbility?.buffs || []).map(b => `<li style="color:var(--green-moss); font-weight:500; margin-bottom:0.3rem;">🟢 ${b}</li>`).join('') || '<li style="font-style:italic; color:#777;">Nenhum</li>';
    const nerfsHtml = (char.uniqueAbility?.nerfs || []).map(n => `<li style="color:var(--red-wax); font-weight:500; margin-bottom:0.3rem;">🔴 ${n}</li>`).join('') || '<li style="font-style:italic; color:#777;">Nenhum</li>';
    html += `
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
    `;
  }

  html += `
    </div>
    <div style="margin-bottom:1.5rem;">
      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-bottom:0.5rem;">Classes</h3>
      <p>${classHtml}</p>
    </div>
    <div style="margin-bottom:1.5rem;">
      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-bottom:0.5rem;">Magias (3 Principais)</h3>
      <p>${spellHtml}</p>
    </div>
    <div style="margin-bottom:1.5rem;">
      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-bottom:0.5rem;">História</h3>
      <p style="white-space:pre-wrap; line-height:1.6; font-size:0.95rem;">${char.story || 'História não informada.'}</p>
    </div>`;

  let approveButtonHtml = '';
  if (isStaff && isPending) {
    approveButtonHtml = `
      <div style="margin-top:2rem; text-align:center; padding-top:1.5rem; border-top:1px solid var(--wood-plank);">
        <button onclick="approveCharacterSheet('${uid}')" class="form-submit-btn" style="background:var(--red-wax); color:#fff; border-color:var(--red-wax); width:auto; padding:0.8rem 2.5rem; font-family:'Cinzel',serif; font-size:1.15rem; box-shadow:0 4px 10px rgba(0,0,0,0.4); cursor:pointer; letter-spacing:0.05em; transition:all 0.2s;">
          🛡️ Aprovar Ficha e Aplicar Modificações
        </button>
      </div>
    `;
  }

  document.getElementById('char-sheet-body').innerHTML = html + approveButtonHtml;
  document.getElementById('char-sheet-modal').style.display = 'flex';
}



function closeCharacterSheet() {

  document.getElementById('char-sheet-modal').style.display = 'none';

}


async function loadNpcsTab() {
  const container = document.getElementById('npcs-grid');
  if(!container) return;
  container.innerHTML = '<div class="auth-loading active" style="margin:2rem auto;"><div class="auth-spinner"></div></div>';
  try {
    ALL_CHARACTERS = await getAllCharacters();
    let html = '';
    const keys = Object.keys(ALL_CHARACTERS);
    let npcCount = 0;
    keys.forEach(uid => {
      const doc = ALL_CHARACTERS[uid];
      if (doc.type !== 'NPC') return;
      npcCount++;
      const char = doc.character || {};
      const name = char.name || 'Desconhecido';
      const avatar = char.avatar || 'Photos/demihuman.webp';
      html += `<div class="character-card" onclick="openCharacterSheet('${uid}')">
        <img src="${avatar}" alt="${name}">
        <div class="char-card-name">${name}</div>
      </div>`;
    });
    if (npcCount === 0) {
      container.innerHTML = '<p style="text-align:center; color:var(--wood-plank); font-style:italic;">Nenhum NPC registrado ainda.</p>';
      return;
    }
    container.innerHTML = html;
  } catch (err) {
    console.warn(err);
    container.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar NPCs.</p>';
  }
}

function goToProfileTab() {
  if (_auth && _auth.currentUser) {
    showTab('profile');
  } else {
    showToast('🗝️ Faça login para ver seu perfil!', 'error');
  }
}

function triggerAvatarUpdate() {
  const input = document.getElementById('profile-avatar-input');
  if (input) input.click();
}

async function updateProfileAvatar(event) {
  const file = event.target.files[0];
  if (!file) return;

  const user = _auth.currentUser;
  if (!user) {
    showToast('⚠️ Você precisa estar logado para editar.', 'error');
    return;
  }

  showToast('🔮 Processando imagem...', 'info');

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = async function() {
      // Redimensionar para no máximo 400x400
      const canvas = document.createElement('canvas');
      const MAX_SIZE = 400;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);

      try {
        // Atualizar no Firestore (salvando separadamente no perfil do player)
        await _db.collection('characters').doc(user.uid).update({
          'player.avatar': dataUrl
        });

        // Atualizar elementos da UI do jogador imediatamente
        const profileAvatar = document.getElementById('profile-user-avatar');
        if (profileAvatar) profileAvatar.src = dataUrl;

        const headerAvatar = document.getElementById('header-user-avatar');
        if (headerAvatar) headerAvatar.src = dataUrl;

        // Atualizar cache local ALL_CHARACTERS
        if (ALL_CHARACTERS && ALL_CHARACTERS[user.uid]) {
          if (!ALL_CHARACTERS[user.uid].player) ALL_CHARACTERS[user.uid].player = {};
          ALL_CHARACTERS[user.uid].player.avatar = dataUrl;
        }

        showToast('✅ Foto de perfil do jogador atualizada!', 'success');
      } catch (err) {
        console.error('Erro ao atualizar avatar:', err);
        showToast('❌ Falha ao salvar imagem no servidor.', 'error');
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

async function loadPendingTab() {
  const container = document.getElementById('pending-characters-grid');
  if (!container) return;
  container.innerHTML = '<div class="auth-loading active" style="margin:2rem auto;"><div class="auth-spinner"></div></div>';

  try {
    ALL_CHARACTERS = await getAllCharacters();
    const keys = Object.keys(ALL_CHARACTERS);
    
    // Filtrar fichas com status 'pending'
    const pendingChars = keys.filter(uid => ALL_CHARACTERS[uid].status === 'pending');
    
    // Atualizar ponto de exclamação vermelho crescendo/diminuindo
    const alertDot = document.getElementById('pending-alert-dot');
    if (alertDot) {
      if (pendingChars.length > 0) {
        alertDot.style.display = 'inline-block';
      } else {
        alertDot.style.display = 'none';
      }
    }

    if (pendingChars.length === 0) {
      container.innerHTML = '<p style="text-align:center; color:var(--wood-plank); font-style:italic;">Não há nenhuma ficha pendente de avaliação no momento.</p>';
      return;
    }

    let html = '';
    pendingChars.forEach(uid => {
      const char = ALL_CHARACTERS[uid].character || {};
      const name = char.name || 'Sem Nome';
      const avatar = char.avatar || 'Photos/demihuman.webp';

      html += `
        <div class="character-card" onclick="openCharacterSheet('${uid}')" style="position:relative;">
          <span style="position:absolute; top:8px; right:8px; background:var(--red-wax); color:#fff; font-family:'Cinzel',serif; font-size:0.65rem; padding:2px 8px; border-radius:2px; letter-spacing:0.1em; z-index:2;">PENDENTE</span>
          <img src="${avatar}" alt="${name}">
          <div class="char-card-name">${name}</div>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    console.error('Erro ao carregar fichas pendentes:', err);
    container.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar fichas pendentes.</p>';
  }
}

async function approveCharacterSheet(uid) {
  if (!confirm('Deseja realmente aprovar esta ficha de personagem e integrá-la à guilda?')) return;

  const lineageInput = document.getElementById('review-lineage');
  const lineage = lineageInput ? lineageInput.value.trim() : '—';
  
  const buffsText = document.getElementById('review-buffs') ? document.getElementById('review-buffs').value : '';
  const nerfsText = document.getElementById('review-nerfs') ? document.getElementById('review-nerfs').value : '';

  const buffs = buffsText.split('\n').map(b => b.trim()).filter(b => b !== '');
  const nerfs = nerfsText.split('\n').map(n => n.trim()).filter(n => n !== '');

  try {
    showToast('⚡ Aprovando ficha...', 'info');
    await _db.collection('characters').doc(uid).update({
      status: 'approved',
      'character.lineage': lineage || '— (a ser definido pelo administrador)',
      'character.uniqueAbility.buffs': buffs,
      'character.uniqueAbility.nerfs': nerfs
    });

    showToast('✅ Ficha aprovada com sucesso!', 'success');
    closeCharacterSheet();

    // Recarregar os dados das abas
    if (typeof loadCharactersTab === 'function') await loadCharactersTab();
    if (typeof loadPendingTab === 'function') await loadPendingTab();
  } catch (err) {
    console.error('Erro ao aprovar ficha:', err);
    showToast('❌ Falha ao aprovar ficha.', 'error');
  }
}
