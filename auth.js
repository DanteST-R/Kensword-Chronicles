// ================================================================
// KENSWORD CHRONICLES — Auth Module (Global / No-module)
// Usa Firebase SDK compat (firebase.auth(), firebase.firestore())
// ================================================================

function _nameToEmail(playerName) {
  let safeName = playerName
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9]/g, '.') // non-alphanumeric to dot
    .replace(/\.+/g, '.') // multiple dots to single dot
    .replace(/^\.|\.$/g, ''); // trim dots at start/end
  
  if (!safeName) safeName = 'jogador'; // Evita e-mail vazio se o nome for só caracteres especiais
  return safeName + '@kensword.rpg';
}

// ── Registro ─────────────────────────────────────────────────────
async function registerCharacter(formData) {
  const email    = _nameToEmail(formData.playerName);
  const password = formData.password;
  const cred = await _auth.createUserWithEmailAndPassword(email, password);
  const uid  = cred.user.uid;
  const doc  = _buildCharacterDocument(uid, formData);
  await _db.collection('characters').doc(uid).set(doc);
  return { uid, characterData: doc };
}

// ── Login ─────────────────────────────────────────────────────────
async function loginCharacter(playerName, password) {
  const email = _nameToEmail(playerName);
  const cred  = await _auth.signInWithEmailAndPassword(email, password);
  const uid   = cred.user.uid;
  const snap  = await _db.collection('characters').doc(uid).get();
  if (!snap.exists) throw new Error('Personagem não encontrado.');
  return { uid, characterData: snap.data() };
}

// ── Logout ────────────────────────────────────────────────────────
async function logoutCharacter() {
  await _auth.signOut();
}

// ── Sessão ────────────────────────────────────────────────────────
function onSessionChange(callback) {
  return _auth.onAuthStateChanged(async (user) => {
    if (user) {
      const snap = await _db.collection('characters').doc(user.uid).get();
      callback(user, snap.exists ? snap.data() : null);
    } else {
      callback(null, null);
    }
  });
}

// ── Personagens Globais ───────────────────────────────────────────
async function getAllCharacters() {
  const snap = await _db.collection('characters').get();
  const chars = {};
  snap.forEach(doc => chars[doc.id] = doc.data());
  return chars;
}

// ── Montar documento ──────────────────────────────────────────────
function _buildCharacterDocument(uid, f) {
  let raceName = f.charRace || '';
  let subraceName = null;
  if (raceName.includes('|')) {
    const parts = raceName.split('|');
    raceName = parts[0];
    subraceName = parts[1];
  }

  let racialAbilities = [];
  if (typeof RACE_DATA !== 'undefined' && RACE_DATA[raceName]) {
    const rData = RACE_DATA[raceName];
    if (rData.abilities) {
      rData.abilities.forEach(ab => racialAbilities.push({ name: ab.name, desc: ab.desc || ab.description || '' }));
    }
    if (subraceName && rData.subraces) {
      const sub = rData.subraces.find(s => s.name === subraceName);
      if (sub && sub.abilityName) {
        racialAbilities.push({ name: sub.abilityName, desc: sub.abilityDesc || sub.desc || '' });
      }
    }
  }

  let isAdmin = f.playerName === 'DanteSTR';
  return {
    uid,
    createdAt: new Date().toISOString(),
    status: isAdmin ? 'approved' : 'pending',
    type: 'character',
    isAdmin: isAdmin,
    isSubAdmin: false,
    player: {
      name: f.playerName,
      age: parseInt(f.playerAge),
      availability: f.availability,
      avatar: f.charAvatar || '', // Foto do Perfil do Jogador (inicialmente igual à do personagem)
    },
    character: {
      name: f.charName,
      age: parseInt(f.charAge),
      race: f.charRace,
      gender: f.charGender,
      height: parseInt(f.charHeight),
      weight: parseInt(f.charWeight),
      location: f.charLocation,
      avatar: f.charAvatar || '', // Base64 da imagem
      story: f.charStory || '',
      lineage: '— (a ser definido pelo administrador)',
      uniqueAbility: {
        title: f.uniqueAbilityTitle || '',
        description: f.uniqueAbilityDesc || '',
        buffs: f.uniqueAbilityBuffs ? [f.uniqueAbilityBuffs] : [],
        nerfs: f.uniqueAbilityNerfs ? [f.uniqueAbilityNerfs] : [],
      },
      items: [ f.item1 || '', f.item2 || '', f.item3 || '' ],
      abilities: { racial: racialAbilities, learned: [], simple: [] },
      elements: {
        elemental: f.elementInitial ? [f.elementInitial] : [],
        arcane: [],
        mystic: [],
      },
      spells: [],
      classes: [],
      proficiencies: [],
      level: 1,
      xp: 0,
      xpToNext: 1000,
      attributes: {
        strength:   parseInt(f.attrStrength)   || 0,
        resistance: parseInt(f.attrResistance) || 0,
        speed:      parseInt(f.attrSpeed)      || 0,
        magic:      parseInt(f.attrMagic)      || 0,
      },
    },
  };
}
