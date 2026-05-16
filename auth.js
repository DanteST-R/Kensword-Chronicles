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

// ── Montar documento ──────────────────────────────────────────────
function _buildCharacterDocument(uid, f) {
  return {
    uid,
    createdAt: new Date().toISOString(),
    player: {
      name: f.playerName,
      age: parseInt(f.playerAge),
      availability: f.availability,
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
      abilities: { racial: [], learned: [], simple: [] },
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
