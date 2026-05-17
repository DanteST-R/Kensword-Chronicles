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
  if (typeof isCreatingNewCharacterFromProfile !== 'undefined' && isCreatingNewCharacterFromProfile && step === 0) {
    closeNewCharacterWizard();
    return;
  }

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



// ————————————————————————————————————————

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



function onElementChange() {
  const val = document.getElementById('reg-element').value;
  const prev = document.getElementById('element-preview');

  if (val && window.KENSWORD_ELEMENTS_DB && KENSWORD_ELEMENTS_DB[val]) {
    const el = KENSWORD_ELEMENTS_DB[val];
    document.getElementById('el-prev-title').textContent = `${el.emoji} ${el.name}`;
    document.getElementById('el-prev-traits').textContent = el.traits.join(' • ');
    
    let bonusText = '';
    if (el.modifiers) {
      bonusText = `<div style="margin-top:0.5rem; font-size:0.82rem; color:var(--gold); background:rgba(0,0,0,0.15); padding:4px 8px; border-radius:4px;">`;
      Object.keys(el.modifiers).forEach(key => {
        const val = el.modifiers[key];
        const displayVal = typeof val === 'number' ? (val > 1 ? `+${Math.round((val - 1)*100)}%` : `${val * 100}%`) : val;
        bonusText += `🔹 <strong>${key}:</strong> ${displayVal} &nbsp; `;
      });
      bonusText += `</div>`;
    }

    document.getElementById('el-prev-desc').innerHTML = `
      <p style="margin:0; font-size:0.88rem;">${el.description}</p>
      ${bonusText}
      <p style="margin:0.5rem 0 0 0; font-size:0.8rem; color:#ccc; font-style:italic;"><strong>Guia Profissional:</strong> ${el.professionalDetails || ''}</p>
    `;
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

    if (typeof isCreatingNewCharacterFromProfile !== 'undefined' && isCreatingNewCharacterFromProfile) {
      await handleCreateNewCharacter(data);
      setLoading(false);
      showToast('✅ Novo personagem criado com sucesso e enviado para aprovação!', 'success');
      closeNewCharacterWizard();
    } else {
      await registerCharacter(data);
      setLoading(false);
      showToast('âœ… Personagem inscrito na guilda!', 'success');
      setTimeout(() => hidePortal(), 1200);
    }

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

          // Carregar notificações do servidor
          if (typeof loadServerNotifications === 'function') {
            loadServerNotifications();
          }

          // Inicializar sub-abas do perfil
          if (typeof initProfileSubtabs === 'function') {
            initProfileSubtabs(charData.isAdmin || charData.isSubAdmin);
          }

          // Executar migração temporária de banco de dados
          if (typeof runDatabaseMigration === 'function') {
            runDatabaseMigration();
          }

          // ADMINISTRADOR OU SUB-ADMINISTRADOR: Aba Fichas Pendentes
          const tabPendingBtn = document.getElementById('tab-pending');
          if (charData.isAdmin || charData.isSubAdmin) {
            if (tabPendingBtn) tabPendingBtn.style.display = 'block';
            
            // Ouvir alterações em tempo real no banco de dados para os administradores/sub-administradores!
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

              // Certifique-se que o botão realmente aparece se tiver alguma ficha/habilidade pendente
              if (pendingChars.length > 0 || hasModifications || hasPendingAbilities) {
                if (tabPendingBtn) tabPendingBtn.style.display = 'block';
              }

              // Atualizar ponto de exclamação vermelho crescendo/diminuindo
              const alertDot = document.getElementById('pending-alert-dot');
              if (alertDot) {
                if (pendingChars.length > 0 || hasModifications || hasPendingAbilities) {
                  alertDot.style.display = 'inline-block';
                } else {
                  alertDot.style.display = 'none';
                }
              }

              // Se a aba de fichas pendentes estiver ativa na tela, atualiza seu conteúdo na hora!
              const activeTab = document.querySelector('.nav-tab.active');
              if (activeTab && activeTab.id === 'tab-pending') {
                renderPendingTabContent();
              }

              // Se a sub-aba de fichas pendentes do perfil estiver ativa ou se for carregada, atualiza também!
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

            // Carregar dados iniciais das fichas pendentes e verificar alertas
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

  let editButtonHtml = '<div style="display:flex; justify-content:flex-end; gap:0.8rem; margin-bottom:1rem; margin-top:-0.5rem; position:relative; z-index:10; flex-wrap:wrap;">';
  let hasActions = false;

  if (isStaff) {
    hasActions = true;
    editButtonHtml += `
      <button onclick="toggleEditSheet('${uid}')" class="form-submit-btn" style="background:var(--gold); border-color:var(--gold); color:#000; width:auto; padding:0.4rem 1.2rem; font-family:'Cinzel',serif; font-size:0.85rem; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2); border-radius:4px; margin-top:0;">
        ✏️ Editar Ficha
      </button>
    `;
  }

  if (currentUser && currentUser.uid === uid) {
    hasActions = true;
    editButtonHtml += `
      <button onclick="deleteCharacterSheet('${uid}')" class="form-submit-btn" style="background:var(--red-wax); border-color:var(--red-wax); color:#fff; width:auto; padding:0.4rem 1.2rem; font-family:'Cinzel',serif; font-size:0.85rem; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.2); border-radius:4px; margin-top:0;">
        ⚠️ Excluir Personagem
      </button>
    `;
  }

  editButtonHtml += '</div>';

  if (!hasActions) {
    editButtonHtml = '';
  }

  // Se for mestre revisando, Linhagem vira um campo editável
  let lineageHtml = '';
  if (isStaff && isPending) {
    const defaultVal = char.lineage && char.lineage.includes('a ser definido') ? '' : char.lineage || '';
    lineageHtml = `<input type="text" id="review-lineage" value="${defaultVal}" placeholder="Defina a Linhagem (Ex: Linhagem Imperial)" style="width:100%; max-width:280px; padding:0.4rem; font-family:sans-serif; border:1px solid var(--wood-plank); border-radius:4px; background:var(--parchment); color:var(--ink); box-shadow:inset 0 1px 3px rgba(0,0,0,0.2);">`;
  } else {
    lineageHtml = char.lineage || '—';
  }

  const stats = window.calculateEffectiveStats ? window.calculateEffectiveStats(char) : null;
  let attrsHtml = '';
  if (stats) {
    attrsHtml = `
      <div style="margin-bottom:1.5rem; padding:1.2rem; border:1px solid var(--wood-plank); border-radius:8px; background:var(--parchment-aged); box-shadow:0 3px 6px rgba(0,0,0,0.15);">
        <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-top:0; margin-bottom:1rem; color:var(--ink); display:flex; justify-content:space-between; align-items:center; font-size:1.1rem;">
          <span>⚔️ Status & Atributos Eficazes</span>
          <span style="font-size:0.75rem; color:var(--gold); font-family:sans-serif; text-transform:uppercase; letter-spacing:0.1em; background:rgba(0,0,0,0.05); padding:2px 8px; border-radius:10px;">Cálculo Ativo</span>
        </h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.2rem;">
          ${[
            { name: "Força", key: "strength", emoji: "💪", color: "hsl(10, 70%, 45%)" },
            { name: "Resistência", key: "resistance", emoji: "🛡️", color: "hsl(200, 70%, 40%)" },
            { name: "Velocidade", key: "speed", emoji: "⚡", color: "hsl(45, 90%, 45%)" },
            { name: "Magia", key: "magic", emoji: "✨", color: "hsl(280, 70%, 45%)" }
          ].map(stat => {
            const base = stats.base[stat.key];
            const final = stats.final[stat.key];
            const diff = final - base;
            const diffText = diff > 0 ? ` <span style="color:var(--green-moss); font-weight:bold;">(+${diff})</span>` : (diff < 0 ? ` <span style="color:var(--red-wax); font-weight:bold;">(${diff})</span>` : '');
            return `
              <div style="padding:0.6rem; border-radius:6px; background:rgba(0,0,0,0.02); border-left:4px solid ${stat.color};">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                  <span style="font-weight:bold; font-size:0.92rem; color:var(--ink);">${stat.emoji} ${stat.name}</span>
                  <span style="font-size:1.05rem; font-weight:bold; font-family:'Cinzel',serif; color:${stat.color};">${final}${diffText}</span>
                </div>
                <div style="font-size:0.75rem; color:#666;">Base: ${base}</div>
              </div>
            `;
          }).join('')}
        </div>
        ${stats.buffs.length > 0 ? `
          <div style="margin-top:1rem; padding-top:0.6rem; border-top:1px dashed var(--wood-plank); font-size:0.8rem; color:var(--ink);">
            <strong style="color:var(--gold);">Modificadores Ativos:</strong>
            <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.3rem;">
              ${stats.buffs.map(b => `<span style="background:rgba(201,147,58,0.1); border:1px solid rgba(201,147,58,0.25); padding:2px 6px; border-radius:4px; font-size:0.75rem;">🌟 ${b.name}: ${b.value} (${b.stat})</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  let html = editButtonHtml + `<h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--ink); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">${char.name}</h2>
    <div style="display:flex; gap:1.5rem; margin-bottom:1.5rem; flex-wrap:wrap; justify-content:center;">
      <img src="${char.avatar || 'Photos/demihuman.webp'}" style="width:180px; height:180px; object-fit:cover; border-radius:8px; border:2px solid var(--wood-plank); box-shadow:0 4px 6px rgba(0,0,0,0.3);">
      <div style="flex:1; min-width:200px; display:flex; flex-direction:column; justify-content:center;">
        <p style="margin-bottom:0.5rem;"><strong>Raça:</strong> ${char.race || 'N/A'}</p>
        <p style="margin-bottom:0.5rem;"><strong>Idade:</strong> ${char.age || 'N/A'} anos</p>
        <p style="margin-bottom:0.5rem;"><strong>Gênero:</strong> ${char.gender || 'N/A'}</p>
        <p style="margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;"><strong>Linhagem:</strong> ${lineageHtml}</p>
      </div>
    </div>
    
    ${attrsHtml}
    
    <div style="margin-bottom:1.5rem;">
      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-bottom:0.5rem;">Habilidades Raciais</h3>
      <ul style="padding-left:1.2rem;">${racialHtml || 'Nenhuma'}</ul>
      
      <!-- Consulta ao Banco de Dados de Habilidades Raciais -->
      ${(() => {
        const charRace = char.race || '';
        let dbKey = charRace;
        if (charRace === 'Alto Elfo') dbKey = 'Alto Elfo';
        else if (charRace === 'Elfo Negro' || charRace === 'Drow (Elfo Negro)') dbKey = 'Drow';
        else if (charRace === 'Elfo') dbKey = 'Elfo';
        else if (charRace === 'Demi-Humano') dbKey = 'Demi-Humano';
        else if (charRace === 'Anão') dbKey = 'Anão';
        else if (charRace === 'Demônio' || charRace === 'Succubus / Incubus') dbKey = 'Demônio';
        else if (charRace === 'Valquíria') dbKey = 'Valquíria';
        else if (charRace === 'Vampiro') dbKey = 'Vampiro';
        else if (charRace === 'Dracônico' || charRace === 'Dragonata' || charRace === 'Dragonete') dbKey = 'Dracônico';

        const dbAbilities = KENSWORD_ABILITIES_DB[dbKey] || [];
        if (dbAbilities.length === 0) return '';
        
        return `
          <div style="margin-top:0.8rem; padding:0.8rem; border:1px solid rgba(201,147,58,0.25); border-radius:6px; background:rgba(201,147,58,0.02); box-shadow:inset 0 0 10px rgba(0,0,0,0.05);">
            <h4 style="margin:0 0 0.5rem 0; font-family:'Cinzel',serif; color:var(--gold); font-size:0.85rem; font-weight:bold; letter-spacing:0.05em;">📚 Compêndio de Habilidades (${charRace}):</h4>
            <div style="display:flex; flex-direction:column; gap:0.5rem; max-height:200px; overflow-y:auto; padding-right:0.3rem;">
              ${dbAbilities.map(ab => `
                <div style="font-size:0.82rem; line-height:1.4; color:var(--ink); border-bottom:1px solid rgba(0,0,0,0.05); padding-bottom:0.4rem;">
                  <strong style="color:var(--gold);">【 ${ab.name} 】</strong> ${ab.description}
                  ${ab.details ? `<br><span style="color:#555; font-size:0.78rem; font-style:italic;">🔹 ${ab.details}</span>` : ''}
                  ${ab.scaling ? `<br><span style="color:var(--gold); font-size:0.78rem; font-weight:500;">📈 Escalonamento: ${ab.scaling}</span>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `;
      })()}
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
  
  // 1. Novas fichas pendentes (status === 'pending')
  const pendingChars = keys.filter(uid => ALL_CHARACTERS[uid].status === 'pending');
  
  // 2. Solicitações de alteração de fichas (hasPendingModifications === true)
  const modificationRequests = keys.filter(uid => ALL_CHARACTERS[uid].hasPendingModifications === true);

  // 3. Solicitações de habilidades pendentes (com status 'pending')
  const pendingAbilityRequests = keys.filter(uid => {
    const pList = ALL_CHARACTERS[uid].pendingAbilities || [];
    return pList.some(r => r.status === 'pending');
  });

  // Atualizar ponto de exclamação vermelho crescendo/diminuindo
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

  // Seção de novas fichas
  if (pendingChars.length > 0) {
    html += `
      <div style="width:100%; margin-bottom:2rem;">
        <h3 style="font-family:'Cinzel',serif; color:var(--red-wax); border-bottom:1px solid var(--wood-plank); padding-bottom:0.3rem; margin-bottom:1rem; font-size:1.2rem;">🆕 Novas Fichas Aguardando Avaliação</h3>
        <div class="characters-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1.5rem;">
    `;
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
    html += `
        </div>
      </div>
    `;
  }

  // Seção de solicitações de alteração de sub-admins
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
      const avatar = char.avatar || 'Photos/demihuman.webp';

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

  // Seção de solicitações de habilidades pendentes
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
      const avatar = char.avatar || 'Photos/demihuman.webp';

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
    
    // Obter dados do personagem para notificação
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

    // Adicionar log público do servidor (serverAlerts)
    let serverAlerts = charData.serverAlerts || [];
    serverAlerts.push({
      text: `O aventureiro ${charName} (Jogador: ${playerName}) foi aprovado na guilda pelo Administrador!`,
      timestamp: Date.now(),
      author: 'Sistema'
    });

    // Calcular habilidades iniciais de raça e sub-raça
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
      'character.uniqueAbility.nerfs': nerfs,
      'character.abilities.racial': racialAbilities,
      notifications: notifications,
      serverAlerts: serverAlerts
    });

    showToast('✅ Ficha aprovada com sucesso!', 'success');
    closeCharacterSheet();

    // Recarregar os dados das abas
    if (typeof loadCharactersTab === 'function') await loadCharactersTab();
    if (typeof loadPendingTab === 'function') await loadPendingTab();

    // Se a aba do perfil estiver ativa, atualiza
    if (typeof currentProfileSubtab !== 'undefined' && currentProfileSubtab) {
      loadProfileSubtabData(currentProfileSubtab);
    }
  } catch (err) {
    console.error('Erro ao aprovar ficha:', err);
    showToast('❌ Falha ao aprovar ficha.', 'error');
  }
}

let IS_EDITING_SHEET_UID = null;

function toggleEditSheet(uid) {
  if (IS_EDITING_SHEET_UID === uid) {
    IS_EDITING_SHEET_UID = null;
    openCharacterSheet(uid);
  } else {
    IS_EDITING_SHEET_UID = uid;
    openCharacterSheetInEditMode(uid);
  }
}

function openCharacterSheetInEditMode(uid) {
  const data = ALL_CHARACTERS[uid];
  if (!data) return;

  const char = data.character || {};
  const attrs = char.attributes || {};
  const unique = char.uniqueAbility || {};

  const currentUser = _auth ? _auth.currentUser : null;
  const currentUserData = currentUser ? ALL_CHARACTERS[currentUser.uid] : null;
  const isSubAdmin = currentUserData && currentUserData.isSubAdmin && !currentUserData.isAdmin;

  let html = `<h2 style="font-family:'Cinzel',serif; text-align:center; color:var(--ink); margin-bottom:1.5rem; border-bottom:1px solid var(--wood-plank); padding-bottom:0.5rem;">✏️ Editando Ficha: ${char.name || ''}</h2>`;

  if (isSubAdmin) {
    html += `
      <div style="background:rgba(212,175,55,0.15); color:var(--ink); border:1px solid var(--gold); padding:0.8rem; border-radius:6px; margin-bottom:1.5rem; font-size:0.9rem; text-align:center;">
        📢 <strong>Aviso de Sub-administrador:</strong> Suas alterações serão enviadas como uma solicitação para aprovação do <strong>Admin Supremo (DanteSTR)</strong> antes de serem aplicadas!
      </div>
    `;
  }

  html += `
    <div style="display:flex; flex-direction:column; gap:1.2rem;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="field-group">
          <label style="font-weight:bold; font-size:0.9rem;">Nome do Personagem</label>
          <input type="text" id="edit-char-name" value="${char.name || ''}" style="width:100%; border:1px solid var(--wood-plank); border-radius:4px; padding:0.4rem; background:var(--parchment); color:var(--ink);">
        </div>
        <div class="field-group">
          <label style="font-weight:bold; font-size:0.9rem;">Gênero</label>
          <input type="text" id="edit-char-gender" value="${char.gender || ''}" style="width:100%; border:1px solid var(--wood-plank); border-radius:4px; padding:0.4rem; background:var(--parchment); color:var(--ink);">
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="field-group">
          <label style="font-weight:bold; font-size:0.9rem;">Idade do Personagem</label>
          <input type="number" id="edit-char-age" value="${char.age || ''}" style="width:100%; border:1px solid var(--wood-plank); border-radius:4px; padding:0.4rem; background:var(--parchment); color:var(--ink);">
        </div>
        <div class="field-group">
          <label style="font-weight:bold; font-size:0.9rem;">Linhagem</label>
          <input type="text" id="edit-char-lineage" value="${char.lineage || ''}" style="width:100%; border:1px solid var(--wood-plank); border-radius:4px; padding:0.4rem; background:var(--parchment); color:var(--ink);">
        </div>
      </div>

      <div class="field-group">
        <label style="font-weight:bold; font-size:0.9rem;">Raça</label>
        <select id="edit-char-race" style="width:100%; border:1px solid var(--wood-plank); border-radius:4px; padding:0.4rem; background:var(--parchment); color:var(--ink); font-family:sans-serif;">
          <option value="Humano" ${char.race === 'Humano' ? 'selected' : ''}>Humano</option>
          <option value="Elfo" ${char.race === 'Elfo' ? 'selected' : ''}>Elfo</option>
          <option value="Elfo Negro" ${char.race === 'Elfo Negro' ? 'selected' : ''}>Elfo Negro</option>
          <option value="Demi-Humano" ${char.race === 'Demi-Humano' ? 'selected' : ''}>Demi-Humano</option>
          <option value="Anão" ${char.race === 'Anão' ? 'selected' : ''}>Anão</option>
          <option value="Gigante" ${char.race === 'Gigante' ? 'selected' : ''}>Gigante</option>
          <option value="Vampiro" ${char.race === 'Vampiro' ? 'selected' : ''}>Vampiro</option>
          <option value="Valquíria" ${char.race === 'Valquíria' ? 'selected' : ''}>Valquíria</option>
          <option value="Demônio" ${char.race === 'Demônio' ? 'selected' : ''}>Demônio</option>
          <option value="Dracônico" ${char.race === 'Dracônico' ? 'selected' : ''}>Dracônico</option>
        </select>
      </div>

      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-top:1rem; margin-bottom:0.5rem; color:var(--ink);">⚔️ Atributos</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span style="font-weight:bold; width:100px;">💪 Força:</span>
          <input type="number" id="edit-attr-strength" value="${attrs.strength || 0}" style="width:80px; padding:0.3rem; border:1px solid var(--wood-plank); background:var(--parchment); color:var(--ink);">
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span style="font-weight:bold; width:100px;">🛡️ Resistência:</span>
          <input type="number" id="edit-attr-resistance" value="${attrs.resistance || 0}" style="width:80px; padding:0.3rem; border:1px solid var(--wood-plank); background:var(--parchment); color:var(--ink);">
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span style="font-weight:bold; width:100px;">⚡ Velocidade:</span>
          <input type="number" id="edit-attr-speed" value="${attrs.speed || 0}" style="width:80px; padding:0.3rem; border:1px solid var(--wood-plank); background:var(--parchment); color:var(--ink);">
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span style="font-weight:bold; width:100px;">✨ Magia:</span>
          <input type="number" id="edit-attr-magic" value="${attrs.magic || 0}" style="width:80px; padding:0.3rem; border:1px solid var(--wood-plank); background:var(--parchment); color:var(--ink);">
        </div>
      </div>

      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-top:1rem; margin-bottom:0.5rem; color:var(--ink);">🌟 Habilidade Única / Aprendida</h3>
      
      <!-- CONSULTA DE HABILIDADES DO BANCO DE DADOS -->
      <div style="background:rgba(201,147,58,0.06); border:2px solid var(--gold); border-radius:6px; padding:1rem; margin-bottom:1rem; box-shadow:0 3px 6px rgba(0,0,0,0.15);">
        <h4 style="margin:0 0 0.5rem 0; font-family:'Cinzel',serif; color:var(--gold); display:flex; align-items:center; gap:0.5rem; cursor:pointer; font-size:0.95rem; user-select:none;" onclick="const container = document.getElementById('db-lookup-container'); container.style.display = container.style.display === 'none' ? 'block' : 'none'; if(container.style.display==='block') filterDbLookupAbilities();">
          📚 Consultar Banco de Dados de Habilidades <span style="font-size:0.75rem; font-weight:normal; color:#888;">(Clique para abrir/fechar)</span>
        </h4>
        <div id="db-lookup-container" style="display:none; margin-top:0.8rem;">
          <div class="field-group" style="margin-bottom:0.8rem;">
            <label style="font-size:0.8rem; font-weight:bold; color:var(--ink); margin-bottom:0.2rem;">Filtrar por Raça / Categoria:</label>
            <select id="db-lookup-category" onchange="filterDbLookupAbilities()" style="width:100%; border:1px solid var(--wood-plank); border-radius:4px; padding:0.3rem; background:var(--parchment); color:var(--ink); font-family:sans-serif; font-size:0.85rem;">
              <option value="all">— Todas as Categorias —</option>
              <option value="Simples">Simples</option>
              <option value="Humano">Humano</option>
              <option value="Elfo">Elfo (Geral)</option>
              <option value="Alto Elfo">Alto Elfo</option>
              <option value="Drow">Drow</option>
              <option value="Demi-Humano">Demi-Humano</option>
              <option value="Gigante">Gigante</option>
              <option value="Anão">Anão</option>
              <option value="Vampiro">Vampiro / Ghoul</option>
              <option value="Valquíria">Valquíria</option>
              <option value="Demônio">Demônio</option>
              <option value="Dracônico">Dracônico</option>
            </select>
          </div>
          <div id="db-lookup-results" style="max-height:220px; overflow-y:auto; border:1px solid var(--wood-plank); border-radius:4px; padding:0.5rem; background:rgba(0,0,0,0.05); display:flex; flex-direction:column; gap:0.6rem; margin-top:0.5rem;">
            <!-- Resultados serão populados dinamicamente via JS -->
          </div>
        </div>
      </div>

      <div class="field-group">
        <label style="font-weight:bold; font-size:0.9rem;">Título da Habilidade</label>
        <input type="text" id="edit-ua-title" value="${unique.title || ''}" style="width:100%; border:1px solid var(--wood-plank); padding:0.4rem; background:var(--parchment); color:var(--ink);">
      </div>
      <div class="field-group">
        <label style="font-weight:bold; font-size:0.9rem;">Descrição da Habilidade</label>
        <textarea id="edit-ua-desc" style="width:100%; height:80px; border:1px solid var(--wood-plank); padding:0.4rem; background:var(--parchment); color:var(--ink); font-family:sans-serif;">${unique.description || ''}</textarea>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="field-group">
          <label style="color:var(--green-moss); font-weight:bold; font-size:0.9rem;">🟢 Buffs (um por linha)</label>
          <textarea id="edit-ua-buffs" style="width:100%; height:80px; border:1px solid var(--wood-plank); padding:0.4rem; background:var(--parchment); color:var(--ink); font-family:sans-serif;">${(unique.buffs || []).join('\n')}</textarea>
        </div>
        <div class="field-group">
          <label style="color:var(--red-wax); font-weight:bold; font-size:0.9rem;">🔴 Nerfs (um por linha)</label>
          <textarea id="edit-ua-nerfs" style="width:100%; height:80px; border:1px solid var(--wood-plank); padding:0.4rem; background:var(--parchment); color:var(--ink); font-family:sans-serif;">${(unique.nerfs || []).join('\n')}</textarea>
        </div>
      </div>

      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-top:1rem; margin-bottom:0.5rem; color:var(--ink);">🧬 Classes & Magias</h3>
      <div class="field-group">
        <label style="font-weight:bold; font-size:0.9rem;">Classes (separadas por vírgula)</label>
        <input type="text" id="edit-char-classes" value="${(char.classes || []).join(', ')}" style="width:100%; border:1px solid var(--wood-plank); padding:0.4rem; background:var(--parchment); color:var(--ink);">
      </div>
      <div class="field-group">
        <label style="font-weight:bold; font-size:0.9rem;">Magias (separadas por vírgula)</label>
        <input type="text" id="edit-char-spells" value="${(char.spells || []).join(', ')}" style="width:100%; border:1px solid var(--wood-plank); padding:0.4rem; background:var(--parchment); color:var(--ink);">
      </div>

      <h3 style="font-family:'Cinzel',serif; border-bottom:1px solid var(--wood-plank); margin-top:1rem; margin-bottom:0.5rem; color:var(--ink);">📜 História do Personagem</h3>
      <div class="field-group">
        <textarea id="edit-char-story" style="width:100%; height:120px; border:1px solid var(--wood-plank); padding:0.4rem; background:var(--parchment); color:var(--ink); font-family:sans-serif;">${char.story || ''}</textarea>
      </div>

      <div style="margin-top:1.5rem; display:flex; gap:1rem; justify-content:center;">
        <button onclick="toggleEditSheet('${uid}')" class="form-submit-btn" style="background:var(--parchment-aged); color:var(--ink); border-color:var(--wood-plank); width:auto; padding:0.6rem 1.5rem; cursor:pointer;">Cancelar</button>
        <button onclick="saveCharacterSheetEdits('${uid}')" class="form-submit-btn" style="background:var(--red-wax); color:#fff; border-color:var(--red-wax); width:auto; padding:0.6rem 2rem; cursor:pointer;">
          ${isSubAdmin ? '📨 Solicitar Alterações' : '💾 Salvar Alterações'}
        </button>
      </div>
    </div>
  `;

  document.getElementById('char-sheet-body').innerHTML = html;
}

async function saveCharacterSheetEdits(uid) {
  const newName = document.getElementById('edit-char-name').value.trim();
  const newRace = document.getElementById('edit-char-race').value;
  const newAge = parseInt(document.getElementById('edit-char-age').value) || 0;
  const newGender = document.getElementById('edit-char-gender').value.trim();
  const newLineage = document.getElementById('edit-char-lineage').value.trim();
  const newUaTitle = document.getElementById('edit-ua-title').value.trim();
  const newUaDesc = document.getElementById('edit-ua-desc').value.trim();
  const newStrength = parseInt(document.getElementById('edit-attr-strength').value) || 0;
  const newResistance = parseInt(document.getElementById('edit-attr-resistance').value) || 0;
  const newSpeed = parseInt(document.getElementById('edit-attr-speed').value) || 0;
  const newMagic = parseInt(document.getElementById('edit-attr-magic').value) || 0;
  const newClasses = document.getElementById('edit-char-classes').value.split(',').map(c => c.trim()).filter(c => c !== '');
  const newSpells = document.getElementById('edit-char-spells').value.split(',').map(s => s.trim()).filter(s => s !== '');
  const newStory = document.getElementById('edit-char-story').value.trim();
  const newBuffs = document.getElementById('edit-ua-buffs').value.split('\n').map(b => b.trim()).filter(b => b !== '');
  const newNerfs = document.getElementById('edit-ua-nerfs').value.split('\n').map(n => n.trim()).filter(n => n !== '');

  const data = ALL_CHARACTERS[uid];
  const char = data.character || {};
  const origUa = char.uniqueAbility || {};
  const origAttrs = char.attributes || {};

  const currentUser = _auth ? _auth.currentUser : null;
  const currentUserData = currentUser ? ALL_CHARACTERS[currentUser.uid] : null;
  const isSubAdmin = currentUserData && currentUserData.isSubAdmin && !currentUserData.isAdmin;

  // Calcular diferenças
  let diffs = [];
  if (char.name !== newName) diffs.push(`Nome: "${char.name}" ➔ "${newName}"`);
  if (char.race !== newRace) diffs.push(`Raça: "${char.race}" ➔ "${newRace}"`);
  if (char.age !== newAge) diffs.push(`Idade: ${char.age} ➔ ${newAge}`);
  if (char.gender !== newGender) diffs.push(`Gênero: "${char.gender}" ➔ "${newGender}"`);
  if (char.lineage !== newLineage) diffs.push(`Linhagem: "${char.lineage}" ➔ "${newLineage}"`);
  if (origUa.title !== newUaTitle) diffs.push(`Habilidade Única (Título): "${origUa.title}" ➔ "${newUaTitle}"`);
  if (origUa.description !== newUaDesc) diffs.push(`Habilidade Única (Descrição) modificada`);
  if (origAttrs.strength !== newStrength) diffs.push(`Força: ${origAttrs.strength} ➔ ${newStrength}`);
  if (origAttrs.resistance !== newResistance) diffs.push(`Resistência: ${origAttrs.resistance} ➔ ${newResistance}`);
  if (origAttrs.speed !== newSpeed) diffs.push(`Velocidade: ${origAttrs.speed} ➔ ${newSpeed}`);
  if (origAttrs.magic !== newMagic) diffs.push(`Magia: ${origAttrs.magic} ➔ ${newMagic}`);
  if ((char.classes || []).join(', ') !== newClasses.join(', ')) diffs.push(`Classes: "${(char.classes || []).join(', ')}" ➔ "${newClasses.join(', ')}"`);
  if ((char.spells || []).join(', ') !== newSpells.join(', ')) diffs.push(`Magias: "${(char.spells || []).join(', ')}" ➔ "${newSpells.join(', ')}"`);
  if (char.story !== newStory) diffs.push(`História modificada`);
  if ((origUa.buffs || []).join('\n') !== newBuffs.join('\n')) diffs.push(`Buffs modificados`);
  if ((origUa.nerfs || []).join('\n') !== newNerfs.join('\n')) diffs.push(`Nerfs modificados`);

  if (diffs.length === 0) {
    showToast('⚠️ Nenhuma alteração foi detectada.', 'info');
    return;
  }

  const diffSummary = diffs.join('; ');

  try {
    if (isSubAdmin) {
      showToast('⚡ Enviando solicitação...', 'info');
      
      const modificationRequest = {
        proposedBy: currentUserData.player?.name || 'Sub-admin',
        proposedById: currentUser.uid,
        proposedChanges: {
          name: newName,
          race: newRace,
          age: newAge,
          gender: newGender,
          lineage: newLineage,
          uaTitle: newUaTitle,
          uaDesc: newUaDesc,
          strength: newStrength,
          resistance: newResistance,
          speed: newSpeed,
          magic: newMagic,
          classes: newClasses,
          spells: newSpells,
          story: newStory,
          buffs: newBuffs,
          nerfs: newNerfs
        },
        diffSummary: diffSummary,
        timestamp: new Date().toISOString()
      };

      await _db.collection('characters').doc(uid).update({
        hasPendingModifications: true,
        modificationRequest: modificationRequest
      });

      showToast('📨 Alterações enviadas para aprovação do Admin Supremo!', 'success');
    } else {
      showToast('⚡ Salvando alterações...', 'info');
      
      await _db.collection('characters').doc(uid).update({
        'character.name': newName,
        'character.race': newRace,
        'character.age': newAge,
        'character.gender': newGender,
        'character.lineage': newLineage,
        'character.uniqueAbility.title': newUaTitle,
        'character.uniqueAbility.description': newUaDesc,
        'character.attributes.strength': newStrength,
        'character.attributes.resistance': newResistance,
        'character.attributes.speed': newSpeed,
        'character.attributes.magic': newMagic,
        'character.classes': newClasses,
        'character.spells': newSpells,
        'character.story': newStory,
        'character.uniqueAbility.buffs': newBuffs,
        'character.uniqueAbility.nerfs': newNerfs
      });

      showToast(`✅ Ficha modificada e salva! (Modificado: ${diffSummary})`, 'success', 5000);
    }

    IS_EDITING_SHEET_UID = null;
    closeCharacterSheet();

    if (typeof loadCharactersTab === 'function') await loadCharactersTab();
    if (typeof loadPendingTab === 'function') await loadPendingTab();
  } catch (err) {
    console.error('Erro ao salvar edições:', err);
    showToast('❌ Falha ao salvar edições da ficha.', 'error');
  }
}

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
      <img src="${char.avatar || 'Photos/demihuman.webp'}" style="width:180px; height:180px; object-fit:cover; border-radius:8px; border:2px solid var(--wood-plank); box-shadow:0 4px 6px rgba(0,0,0,0.3);">
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

// ────────────────────────────────────────────────────────────────
// HABILIDADES COMPÊNDIO - LOOKUP DE BANCO DE DADOS
// ────────────────────────────────────────────────────────────────

function filterDbLookupAbilities() {
  const category = document.getElementById('db-lookup-category').value;
  const resultsContainer = document.getElementById('db-lookup-results');
  if (!resultsContainer) return;

  let abilities = [];
  if (category === 'all') {
    abilities = getAllKenswordAbilities();
  } else {
    abilities = KENSWORD_ABILITIES_DB[category] || [];
  }

  if (abilities.length === 0) {
    resultsContainer.innerHTML = '<div style="color:#777; font-style:italic; font-size:0.8rem; padding:0.5rem; text-align:center;">Nenhuma habilidade cadastrada nessa categoria.</div>';
    return;
  }

  resultsContainer.innerHTML = abilities.map((ab, idx) => {
    const escapedDesc = (ab.description || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const escapedName = (ab.name || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
    return `
      <div style="border-bottom:1px solid rgba(0,0,0,0.08); padding-bottom:0.5rem; font-size:0.82rem; color:var(--ink);">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.2rem; flex-wrap:wrap;">
          <strong style="color:var(--gold); font-size:0.85rem;">【 ${ab.name} 】</strong>
          <span style="font-size:0.72rem; background:rgba(201,147,58,0.1); color:var(--gold); padding:1px 5px; border-radius:3px; font-weight:500;">${ab.type || ab.category}</span>
        </div>
        <div style="line-height:1.4; color:var(--ink); margin-bottom:0.3rem;">${ab.description}</div>
        ${ab.details ? `<div style="font-size:0.78rem; color:#555; font-style:italic; margin-bottom:0.2rem;">🔹 ${ab.details}</div>` : ''}
        ${ab.scaling ? `<div style="font-size:0.78rem; color:var(--gold); font-weight:600; margin-bottom:0.4rem;">📈 Escalonamento: ${ab.scaling}</div>` : ''}
        <button onclick="copyDbAbilityToForm('${escapedName}', '${escapedDesc}')" class="form-submit-btn" style="background:var(--gold); border-color:var(--gold); color:#000; width:auto; padding:0.2rem 0.5rem; font-size:0.72rem; font-family:sans-serif; cursor:pointer; border-radius:3px; height:auto; margin-top:0.2rem; display:inline-block;">
          📋 Copiar Habilidade
        </button>
      </div>
    `;
  }).join('');
}

function copyDbAbilityToForm(name, desc) {
  const titleInput = document.getElementById('edit-ua-title');
  const descInput = document.getElementById('edit-ua-desc');
  if (titleInput) titleInput.value = name;
  if (descInput) descInput.value = desc.replace(/\\'/g, "'");
  showToast('📋 Habilidade copiada com sucesso!', 'success');
}

// ────────────────────────────────────────────────────────────────
// SISTEMA DE HABILIDADES PARA APRENDER & NOTIFICAÇÕES (DANTESTR)
// ────────────────────────────────────────────────────────────────

async function loadLearnAbilitiesTab() {
  const container = document.getElementById('learn-abilities-container');
  if (!container) return;

  if (!_auth || !_auth.currentUser) {
    container.innerHTML = `
      <div class="coming-soon">
        <div class="cs-icon">🔒</div>
        <h3>Portal Restrito</h3>
        <p>Você precisa estar logado com seu personagem para visualizar e solicitar novas habilidades.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '<div class="auth-loading active" style="margin:2rem auto;"><div class="auth-spinner"></div></div>';

  try {
    // Carregar personagens atualizados
    ALL_CHARACTERS = await getAllCharacters();
    const currentUser = _auth.currentUser;
    const charData = ALL_CHARACTERS[currentUser.uid];

    if (!charData || !charData.character || charData.status !== 'approved') {
      container.innerHTML = `
        <div class="coming-soon">
          <div class="cs-icon">⏳</div>
          <h3>Ficha Pendente ou Inexistente</h3>
          <p>Você precisa ter uma ficha de personagem criada e APROVADA pelos administradores para poder aprender novas habilidades.</p>
        </div>
      `;
      return;
    }

    const char = charData.character;
    const learned = [];

    // Obter habilidades já aprendidas
    if (char.abilities && char.abilities.racial) {
      if (Array.isArray(char.abilities.racial)) {
        learned.push(...char.abilities.racial);
      } else {
        learned.push(char.abilities.racial);
      }
    }
    if (char.uniqueAbility && char.uniqueAbility.title) {
      learned.push(char.uniqueAbility.title);
    }

    // Filtragem inteligente de categorias permitidas
    const allowedCategories = ["Simples"];
    if (char.race) allowedCategories.push(char.race);
    
    // Linhagem / Sub-raça
    if (char.lineage && char.lineage !== '—' && !char.lineage.includes('a ser definido')) {
      allowedCategories.push(char.lineage);
      // Mapear variações para buscar nos bancos corretos
      if (char.lineage.includes('Drow')) allowedCategories.push('Drow');
      if (char.lineage.includes('Alto Elfo')) allowedCategories.push('Alto Elfo');
      if (char.lineage.includes('Anão da Montanha')) allowedCategories.push('Anão da Montanha');
      if (char.lineage.includes('Anão da Caverna')) allowedCategories.push('Anão da Caverna');
      if (char.lineage.includes('Vampiro Real')) allowedCategories.push('Vampiro Real');
      if (char.lineage.includes('Vampiro Impuro')) allowedCategories.push('Vampiro Impuro');
      if (char.lineage.includes('Ghoul')) allowedCategories.push('Ghoul da Noite');
      if (char.lineage.includes('Demônio Natural')) allowedCategories.push('Demônio Natural');
      if (char.lineage.includes('Succubus')) allowedCategories.push('Succubus / Incubus');
      if (char.lineage.includes('Dragonato')) allowedCategories.push('Dragonato');
      if (char.lineage.includes('Dragonete')) allowedCategories.push('Dragonete');
      if (char.lineage.includes('Metamorfo Ferino')) allowedCategories.push('Metamorfo Ferino (Comum)');
      if (char.lineage.includes('Metamorfo Mítico')) allowedCategories.push('Metamorfo Mítico (Raro)');
      if (char.lineage.includes('Metamorfo Primordial')) allowedCategories.push('Metamorfo Primordial (Raro)');
      if (char.lineage.includes('Kitsune')) allowedCategories.push('Kitsune / Bakeneko / Tanuki');
      if (char.lineage.includes('Tengu')) allowedCategories.push('Tengu');
      if (char.lineage.includes('Kappa')) allowedCategories.push('Kappa');
      if (char.lineage.includes('Oni')) allowedCategories.push('Oni');
    }

    // Normalizador de texto para busca
    const hasAbility = (name) => {
      const normName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return learned.some(ab => ab.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normName));
    };

    // Desbloqueios por habilidade
    if (hasAbility("Alinhamento heroico") || hasAbility("Alinhamento heróico")) {
      allowedCategories.push("Valquíria");
    }
    if (hasAbility("Alinhamento maligno")) {
      allowedCategories.push("Demônio");
      allowedCategories.push("Demônio Natural");
      allowedCategories.push("Succubus / Incubus");
    }
    if (hasAbility("Sede por Evolução") || hasAbility("Sede por Evolucao")) {
      allowedCategories.push("Anão");
      allowedCategories.push("Anão da Montanha");
      allowedCategories.push("Anão da Caverna");
      allowedCategories.push("Elfo");
      allowedCategories.push("Alto Elfo");
      allowedCategories.push("Drow");
      allowedCategories.push("Demi-Humano");
      allowedCategories.push("Gigante");
    }

    // Coletar todas as habilidades disponíveis com base nas categorias permitidas
    let availableAbilities = [];
    if (window.KENSWORD_ABILITIES_DB) {
      Object.keys(KENSWORD_ABILITIES_DB).forEach(cat => {
        if (allowedCategories.includes(cat)) {
          const list = KENSWORD_ABILITIES_DB[cat] || [];
          list.forEach(ab => {
            // Evitar duplicados
            if (!availableAbilities.some(x => x.name === ab.name)) {
              availableAbilities.push(ab);
            }
          });
        }
      });
    }

    if (availableAbilities.length === 0) {
      container.innerHTML = `
        <p style="text-align:center; color:var(--wood-plank); font-style:italic;">Nenhuma habilidade elegível encontrada para sua raça/linhagem.</p>
      `;
      return;
    }

    // Listagem agrupada por Categoria/Origem
    let html = '';
    
    // Lista de solicitações ativas/pendentes
    const activeRequests = charData.pendingAbilities || [];

    html += `
      <div style="background:var(--parchment-aged); border:1px solid var(--gold); border-radius:8px; padding:1.2rem; margin-bottom:1.5rem; color:var(--ink);">
        <h3 style="font-family:'Cinzel',serif; margin-top:0; color:var(--gold); font-size:1.15rem;">📊 Resumo do Aventureiro</h3>
        <p style="margin:0 0 0.5rem;"><strong>Raça / Linhagem:</strong> ${char.race} ${char.lineage && char.lineage !== '—' ? `(${char.lineage})` : ''}</p>
        <p style="margin:0 0 0.5rem;"><strong>Habilidades Dominadas:</strong> ${learned.length > 0 ? learned.map(n => `<span style="display:inline-block; background:rgba(0,0,0,0.05); border:1px solid var(--wood-plank); padding:2px 8px; border-radius:4px; font-size:0.8rem; font-weight:bold; margin-right:0.4rem; margin-bottom:0.4rem; color:var(--ink);">${n}</span>`).join('') : '<span style="font-style:italic; color:#888;">Nenhuma</span>'}</p>
        <p style="margin:0;"><strong>Categorias Disponíveis para Estudo:</strong> ${allowedCategories.map(c => `<span style="font-size:0.75rem; background:rgba(201,147,58,0.15); color:var(--gold); padding:2px 6px; border-radius:3px; font-weight:bold; margin-right:0.4rem; display:inline-block;">${c}</span>`).join('')}</p>
      </div>
    `;

    // Filtros por Categoria para o jogador
    html += `
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.2rem; width:100%;">
    `;

    availableAbilities.forEach(ab => {
      const isAlreadyLearned = learned.some(n => n.toLowerCase().trim() === ab.name.toLowerCase().trim());
      const isPending = activeRequests.some(r => r.name.toLowerCase().trim() === ab.name.toLowerCase().trim() && r.status === 'pending');
      
      let buttonHtml = '';
      if (isAlreadyLearned) {
        buttonHtml = `<button class="form-submit-btn" style="background:#555; border-color:#555; color:#aaa; font-size:0.8rem; padding:0.4rem 1rem; width:auto; cursor:not-allowed;" disabled>✔️ Dominada</button>`;
      } else if (isPending) {
        buttonHtml = `<button class="form-submit-btn" style="background:rgba(212,175,55,0.2); border-color:var(--gold); color:var(--gold); font-size:0.8rem; padding:0.4rem 1rem; width:auto; cursor:not-allowed;" disabled>⏳ Aguardando Aprovação</button>`;
      } else {
        const escapedName = (ab.name || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const escapedType = (ab.type || ab.category || 'Simples').replace(/'/g, "\\'").replace(/"/g, '&quot;');
        buttonHtml = `<button onclick="requestAbility('${escapedName}', '${escapedType}')" class="form-submit-btn" style="background:var(--red-wax); border-color:var(--red-wax); color:#fff; font-size:0.8rem; padding:0.4rem 1rem; width:auto; cursor:pointer;">🛡️ Aprender Habilidade</button>`;
      }

      html += `
        <div class="race-card" style="margin:0; min-height:auto; display:flex; flex-direction:column; justify-content:space-between; border-color:${isAlreadyLearned ? 'var(--wood-plank)' : (isPending ? 'var(--gold)' : '#5c7bb0')}; opacity:${isAlreadyLearned ? 0.75 : 1};">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.4rem; flex-wrap:wrap; width:100%;">
              <strong style="color:var(--gold); font-size:0.95rem; font-family:'Cinzel',serif;">【 ${ab.name} 】</strong>
              <span style="font-size:0.68rem; background:rgba(201,147,58,0.15); color:var(--gold); padding:2px 6px; border-radius:3px; font-weight:bold; margin-left:auto;">${ab.category || ab.type || 'Simples'}</span>
            </div>
            <div style="font-size:0.85rem; color:var(--ink); line-height:1.4; margin-bottom:0.6rem;">${ab.description}</div>
            ${ab.details ? `<div style="font-size:0.8rem; color:#666; font-style:italic; margin-bottom:0.4rem; line-height:1.3;">🔹 ${ab.details}</div>` : ''}
            ${ab.scaling ? `<div style="font-size:0.8rem; color:var(--gold); font-weight:bold; margin-bottom:0.6rem;">📈 Escalonamento: ${ab.scaling}</div>` : ''}
          </div>
          <div style="text-align:right; border-top:1px solid rgba(0,0,0,0.06); padding-top:0.6rem; margin-top:0.6rem;">
            ${buttonHtml}
          </div>
        </div>
      `;
    });

    html += `
      </div>
    `;

    container.innerHTML = html;

  } catch (err) {
    console.error('Erro ao carregar aba de Habilidades:', err);
    container.innerHTML = '<p style="text-align:center; color:var(--red-wax);">Erro ao carregar informações de Habilidades.</p>';
  }
}

async function requestAbility(abilityName, abilityType) {
  if (!_auth || !_auth.currentUser) return;
  if (!confirm(`Deseja realmente solicitar o aprendizado da habilidade 【 ${abilityName} 】?`)) return;

  try {
    const user = _auth.currentUser;
    const charData = ALL_CHARACTERS[user.uid] || {};
    const pendingList = charData.pendingAbilities || [];

    // Adicionar novo pedido
    const newRequest = {
      name: abilityName,
      type: abilityType,
      status: 'pending',
      requestedAt: new Date().toISOString()
    };

    pendingList.push(newRequest);

    await _db.collection('characters').doc(user.uid).update({
      pendingAbilities: pendingList
    });

    showToast(`🛡️ Solicitação de 【 ${abilityName} 】 enviada com sucesso!`, 'success');
    loadLearnAbilitiesTab();

  } catch (err) {
    console.error('Erro ao solicitar habilidade:', err);
    showToast('Erro ao enviar solicitação da habilidade.', 'error');
  }
}

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

    // Localizar a requisição correspondente
    const reqIndex = pendingList.findIndex(r => r.name.toLowerCase().trim() === abilityName.toLowerCase().trim());
    if (reqIndex === -1) {
      showToast('Solicitação de habilidade não encontrada.', 'error');
      return;
    }

    const currentReq = pendingList[reqIndex];
    pendingList.splice(reqIndex, 1); // Remover da lista pendente

    let notifications = charData.notifications || [];
    let serverAlerts = charData.serverAlerts || [];

    if (approved) {
      // 1. Adicionar habilidade à ficha do jogador
      if (!learnedList.includes(abilityName)) {
        learnedList.push(abilityName);
      }

      // Atualizar o objeto character no banco
      if (!char.abilities) char.abilities = {};
      char.abilities.racial = learnedList;

      // 2. Fluxo de aprovação inteligente
      if (isSubAdmin) {
        // Aprovado por Sub-admin: Notifica no canal geral do servidor!
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
        // Aprovado por Admin: Passa direto!
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
      // Rejeitada: Envia notificação privada ao jogador
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

    // Recarregar os painéis
    if (typeof loadPendingTab === 'function') loadPendingTab();
    if (typeof loadLearnAbilitiesTab === 'function') loadLearnAbilitiesTab();
    if (typeof loadServerNotifications === 'function') loadServerNotifications();

  } catch (err) {
    console.error('Erro ao resolver habilidade:', err);
    showToast('Erro ao resolver solicitação de habilidade.', 'error');
  }
}

// 3. Carregar e Renderizar Caixa de Entrada / Mensagens do Servidor (Descentralizado)
// 3. Carregar e Renderizar Caixa de Entrada / Mensagens do Servidor (Descentralizado)
async function loadServerNotifications() {
  if (typeof currentProfileSubtab !== 'undefined' && currentProfileSubtab) {
    loadProfileSubtabData(currentProfileSubtab);
  } else {
    loadProfileSubtabData('noticias');
    loadProfileSubtabData('mensagens');
  }
}

// ────────────────────────────────────────────────────────────────
// EXCLUSÃO E CRIAÇÃO DE NOVO PERSONAGEM A PARTIR DO PERFIL
// ────────────────────────────────────────────────────────────────

let isCreatingNewCharacterFromProfile = false;

function openNewCharacterWizard() {
  const currentUser = _auth.currentUser;
  if (!currentUser) return;

  const charData = ALL_CHARACTERS[currentUser.uid] || {};
  const player = charData.player || {};

  isCreatingNewCharacterFromProfile = true;

  // 1. Limpar todos os campos do personagem no wizard
  document.getElementById('reg-char-name').value = '';
  document.getElementById('reg-char-age').value = '';
  document.getElementById('reg-char-avatar-base64').value = '';
  
  const imgPreview = document.getElementById('reg-char-avatar-preview');
  if (imgPreview) imgPreview.src = '';
  
  const fileInput = document.getElementById('reg-char-avatar');
  if (fileInput) fileInput.value = '';

  document.getElementById('reg-height').value = '';
  document.getElementById('reg-weight').value = '';
  document.getElementById('reg-story').value = '';
  
  document.getElementById('reg-ua-title').value = '';
  document.getElementById('reg-ua-desc').value = '';
  
  document.getElementById('reg-item1').value = '';
  document.getElementById('reg-item2').value = '';
  document.getElementById('reg-item3').value = '';

  // Resetar atributos
  if (typeof ATTRS !== 'undefined') {
    ATTRS.strength = 0;
    ATTRS.resistance = 0;
    ATTRS.speed = 0;
    ATTRS.magic = 0;
    if (typeof updateAttrPoints === 'function') updateAttrPoints();
  }

  // 2. Preencher dados ocultos do passo 0
  document.getElementById('reg-player-name').value = player.name || 'Jogador';
  document.getElementById('reg-player-age').value = player.age || 20;
  document.getElementById('reg-pass').value = 'DUMMY_PASSWORD_123';
  document.getElementById('reg-pass-confirm').value = 'DUMMY_PASSWORD_123';

  // Marcar as caixas de disponibilidade correspondentes
  const availList = player.availability || [];
  document.querySelectorAll('input[name="avail"]').forEach(cb => {
    cb.checked = availList.includes(cb.value);
  });

  // 3. Modificar o botão final para criar nova ficha do jogador ativo
  const submitBtn = document.getElementById('register-submit-btn');
  if (submitBtn) {
    submitBtn.textContent = '📜 Criar e Enviar Personagem para a Guilda';
  }

  // 4. Mostrar o formulário de registro, pulando o passo 0 e indo direto ao passo 1
  document.getElementById('auth-overlay').classList.remove('hidden');
  showAuthForm('register');
  
  // Ocultar navegação do Passo 0 na barra superior
  const stepDot0 = document.getElementById('step-dot-0');
  if (stepDot0) stepDot0.style.display = 'none';

  // Forçar ir direto para o passo 1
  document.getElementById('reg-step-0').style.display = 'none';
  document.getElementById('step-dot-0').classList.remove('active');
  document.getElementById('step-dot-0').classList.add('done');

  currentStep = 1;
  document.getElementById('reg-step-1').style.display = 'block';
  document.getElementById('step-dot-1').classList.remove('done');
  document.getElementById('step-dot-1').classList.add('active');
}

function closeNewCharacterWizard() {
  isCreatingNewCharacterFromProfile = false;
  document.getElementById('auth-overlay').classList.add('hidden');
  
  // Restaurar navegação normal
  const stepDot0 = document.getElementById('step-dot-0');
  if (stepDot0) stepDot0.style.display = 'inline-block';

  const submitBtn = document.getElementById('register-submit-btn');
  if (submitBtn) {
    submitBtn.textContent = '📜 Inscrever Personagem na Guilda';
  }
}

async function handleCreateNewCharacter(formData) {
  const currentUser = _auth.currentUser;
  if (!currentUser) throw new Error('Jogador não autenticado.');

  // Construir o novo documento parcial contendo o personagem
  const doc = _buildCharacterDocument(currentUser.uid, formData);

  // Obter dados existentes para não sobrepor permissões ou avatares do jogador
  const existingSnap = await _db.collection('characters').doc(currentUser.uid).get();
  const existingData = existingSnap.exists ? existingSnap.data() : {};

  const updatedDoc = {
    status: existingData.isAdmin ? 'approved' : 'pending',
    character: doc.character,
    pendingAbilities: [],
    hasPendingModifications: false,
    modificationRequest: null,
    serverAlerts: existingData.serverAlerts || [],
    notifications: existingData.notifications || []
  };

  await _db.collection('characters').doc(currentUser.uid).update(updatedDoc);
  
  // Recarregar sessões locais e a UI!
  ALL_CHARACTERS = await getAllCharacters();
  showTab('profile');
}

async function deleteCharacterSheet(uid) {
  if (!_auth || !_auth.currentUser) return;
  const user = _auth.currentUser;
  
  if (user.uid !== uid) {
    showToast('⚠️ Operação não permitida.', 'error');
    return;
  }

  if (!confirm("⚠️ ATENÇÃO: Tem certeza que deseja excluir permanentemente o seu personagem?\nIsso apagará todos os dados da sua ficha (História, Linhagem, Habilidades, Atributos, etc.).\nEsta ação NÃO pode ser desfeita! Suas informações de login e conta de jogador continuarão existindo normalmente.")) return;

  try {
    showToast('🔮 Excluindo personagem...', 'info');
    
    // Resetar campos de personagem mantendo a conta do jogador intacta
    await _db.collection('characters').doc(uid).update({
      character: firebase.firestore.FieldValue.delete(),
      status: firebase.firestore.FieldValue.delete(),
      pendingAbilities: firebase.firestore.FieldValue.delete(),
      hasPendingModifications: firebase.firestore.FieldValue.delete(),
      modificationRequest: firebase.firestore.FieldValue.delete()
    });

    closeCharacterSheet();
    showToast('🗑️ Personagem excluído com sucesso!', 'success');

    // Recarregar os dados locais
    ALL_CHARACTERS = await getAllCharacters();
    
    // Atualizar UI
    if (typeof loadLearnAbilitiesTab === 'function') loadLearnAbilitiesTab();
    if (typeof loadServerNotifications === 'function') loadServerNotifications();
    
    // Preencher a lista "Meus Personagens" (mostrando o botão de Criar Personagem)
    const myCharsContainer = document.getElementById('profile-my-characters');
    if (myCharsContainer) {
      myCharsContainer.innerHTML = `
        <div class="character-card" onclick="openNewCharacterWizard()" style="margin: 0 auto; max-width: 180px; display:flex; flex-direction:column; align-items:center; justify-content:center; border:2px dashed var(--gold); background:rgba(212,175,55,0.03); cursor:pointer; height:180px; box-shadow:none;">
          <span style="font-size:2.5rem; color:var(--gold);">➕</span>
          <div class="char-card-name" style="color:var(--gold); font-size:0.9rem; font-weight:bold; font-family:'Cinzel',serif; border-top:none; background:none; position:static; text-shadow:none; padding:0; margin-top:0.5rem;">Criar Personagem</div>
        </div>
      `;
    }

  } catch (err) {
    console.error('Erro ao excluir personagem:', err);
    showToast('Erro ao excluir personagem.', 'error');
  }
}

// ================================================================
// LÓGICA DE SUB-ABAS DO MEU PERFIL (ADMIN & PLAYER)
// ================================================================
let currentProfileSubtab = '';

function initProfileSubtabs(isStaff) {
  const nav = document.getElementById('profile-subtabs-nav');
  if (!nav) return;

  if (isStaff) {
    // Admin & Sub-admin: Fichas Pendentes, Notícias (Logs), Mensagens
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
    // Exibe o painel de criação de notícia apenas para mestres
    const newsCreator = document.getElementById('admin-news-creator');
    if (newsCreator) newsCreator.style.display = 'block';

    if (!currentProfileSubtab || (currentProfileSubtab === 'noticias' && !isStaff)) {
      showProfileSubtab('pending');
    } else {
      showProfileSubtab(currentProfileSubtab);
    }
  } else {
    // Player: Mensagens, Notícias
    nav.innerHTML = `
      <button class="profile-subtab-btn" id="subtab-btn-mensagens" onclick="showProfileSubtab('mensagens')">
        📬 Mensagens
      </button>
      <button class="profile-subtab-btn" id="subtab-btn-noticias" onclick="showProfileSubtab('noticias')">
        📢 Notícias
      </button>
    `;
    // Esconde o painel de criação de notícia para players
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

  // Toggle active class on buttons
  document.querySelectorAll('.profile-subtab-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('subtab-btn-' + tabName);
  if (activeBtn) activeBtn.classList.add('active');

  // Toggle display of content divs
  document.querySelectorAll('.profile-subtab-content').forEach(div => div.style.display = 'none');
  const activeDiv = document.getElementById('profile-subtab-' + tabName);
  if (activeDiv) activeDiv.style.display = 'block';

  // Load data for this tab
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

      // Update subtab alert dot
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
        const avatar = char.avatar || 'Photos/demihuman.webp';
        html += `
          <div class="character-card" onclick="openCharacterSheet('${uid}')" style="position:relative; max-width:130px; margin:0 auto;">
            <span style="position:absolute; top:4px; right:4px; background:var(--red-wax); color:#fff; font-family:'Cinzel',serif; font-size:0.55rem; padding:1px 4px; border-radius:2px; z-index:2;">NOVA</span>
            <img src="${avatar}" alt="${name}" style="width:100%; aspect-ratio:1/1; object-fit:cover;">
            <div class="char-card-name" style="padding:0.4rem; font-size:0.85rem;">${name}</div>
          </div>
        `;
      });

      modificationRequests.forEach(uid => {
        const charData = ALL_CHARACTERS[uid];
        const char = charData.character || {};
        const name = char.name || 'Sem Nome';
        const avatar = char.avatar || 'Photos/demihuman.webp';
        html += `
          <div class="character-card" onclick="openProposedChangesModal('${uid}')" style="position:relative; max-width:130px; margin:0 auto; border:2px dashed var(--gold);">
            <span style="position:absolute; top:4px; right:4px; background:var(--gold); color:#000; font-family:'Cinzel',serif; font-size:0.55rem; padding:1px 4px; border-radius:2px; z-index:2; font-weight:bold;">AJUSTE</span>
            <img src="${avatar}" alt="${name}" style="width:100%; aspect-ratio:1/1; object-fit:cover;">
            <div class="char-card-name" style="padding:0.4rem; font-size:0.85rem; color:var(--gold);">${name}</div>
          </div>
        `;
      });

      pendingAbilityRequests.forEach(uid => {
        const charData = ALL_CHARACTERS[uid];
        const char = charData.character || {};
        const name = char.name || 'Sem Nome';
        const avatar = char.avatar || 'Photos/demihuman.webp';
        const pendingList = charData.pendingAbilities || [];

        pendingList.forEach(req => {
          if (req.status !== 'pending') return;
          const escapedName = req.name.replace(/'/g, "\\'").replace(/"/g, '&quot;');
          html += `
            <div class="character-card" onclick="resolveAbilityRequestFromProfile('${uid}', '${escapedName}')" style="position:relative; max-width:130px; margin:0 auto; border:2px dashed #4a90e2;">
              <span style="position:absolute; top:4px; right:4px; background:#4a90e2; color:#fff; font-family:'Cinzel',serif; font-size:0.55rem; padding:1px 4px; border-radius:2px; z-index:2;">HABIL.</span>
              <img src="${avatar}" alt="${name}" style="width:100%; aspect-ratio:1/1; object-fit:cover;">
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
        // Admin / Sub-admin: Render logs do servidor (serverAlerts descentralizado)
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
        // Player: Render notícias publicadas pelo Admin na coleção 'news'
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
    
    // Obter nome do admin/mestre
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
    
    // Limpar campos
    if (titleInput) titleInput.value = '';
    if (contentInput) contentInput.value = '';
    
    // Fechar formulário
    toggleNewsForm();

    // Recarregar aba de notícias
    loadProfileSubtabData('noticias');
  } catch (err) {
    console.error('Erro ao publicar notícia:', err);
    showToast('❌ Falha ao publicar notícia.', 'error');
  }
}

async function runDatabaseMigration() {
  // Executa apenas uma vez por sessão/recarga do navegador
  if (window.hasRunKenswordMigration) return;
  window.hasRunKenswordMigration = true;

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

      // 1. Deletar a ficha e a conta de Akice por completo
      if (charName === 'akice' || playerName === 'akice') {
        const docRef = _db.collection('characters').doc(docId);
        batch.delete(docRef);
        deletedCount++;
        hasChanges = true;
        console.log(`[MIGRAÇÃO] Agendada exclusão da conta de Akice (ID: ${docId})`);
      }
      // 2. Excluir a ficha da personagem Alice preservando a sua conta de jogador
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

