// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS GLOBAL
// Agregador de Habilidades, Raças e Elementos
// ================================================================

// 1. BANCO DE DADOS DE HABILIDADES GLOBAL (KENSWORD_ABILITIES_DB)
window.KENSWORD_ABILITIES_DB = {
  "Simples": (typeof kensword_simple_abilities !== 'undefined') ? kensword_simple_abilities : [],
  "Humano": (typeof kensword_human_abilities !== 'undefined') ? kensword_human_abilities : [],
  "Elfo": (typeof kensword_elf_abilities !== 'undefined') ? kensword_elf_abilities : [],
  "Alto Elfo": (typeof kensword_highelf_abilities !== 'undefined') ? kensword_highelf_abilities : [],
  "Drow": (typeof kensword_drow_abilities !== 'undefined') ? kensword_drow_abilities : [],
  "Demi-Humano": (typeof kensword_demihuman_abilities !== 'undefined') ? kensword_demihuman_abilities : [],
  "Gigante": (typeof kensword_giant_abilities !== 'undefined') ? kensword_giant_abilities : [],
  "Anão": (typeof kensword_dwarf_abilities !== 'undefined') ? kensword_dwarf_abilities : [],
  "Anão da Montanha": (typeof kensword_mountaindwarf_abilities !== 'undefined') ? kensword_mountaindwarf_abilities : [],
  "Anão da Caverna": (typeof kensword_cavedwarf_abilities !== 'undefined') ? kensword_cavedwarf_abilities : [],
  "Vampiro": (typeof kensword_vampire_abilities !== 'undefined') ? kensword_vampire_abilities : [],
  "Vampiro Real": (typeof kensword_royalvampire_abilities !== 'undefined') ? kensword_royalvampire_abilities : [],
  "Vampiro Impuro": (typeof kensword_impurevampire_abilities !== 'undefined') ? kensword_impurevampire_abilities : [],
  "Ghoul da Noite": (typeof kensword_ghoul_abilities !== 'undefined') ? kensword_ghoul_abilities : [],
  "Valquíria": (typeof kensword_valkyrie_abilities !== 'undefined') ? kensword_valkyrie_abilities : [],
  "Demônio": (typeof kensword_demon_abilities !== 'undefined') ? kensword_demon_abilities : [],
  "Demônio Natural": (typeof kensword_naturaldemon_abilities !== 'undefined') ? kensword_naturaldemon_abilities : [],
  "Succubus / Incubus": (typeof kensword_succubus_abilities !== 'undefined') ? kensword_succubus_abilities : [],
  "Dracônico": (typeof kensword_draconic_abilities !== 'undefined') ? kensword_draconic_abilities : [],
  "Dragonato": (typeof kensword_dragonata_abilities !== 'undefined') ? kensword_dragonata_abilities : [],
  "Dragonete": (typeof kensword_dragonete_abilities !== 'undefined') ? kensword_dragonete_abilities : [],
  "Fada": (typeof kensword_fairy_abilities !== 'undefined') ? kensword_fairy_abilities : [],
  "Pixie": (typeof kensword_pixie_abilities !== 'undefined') ? kensword_pixie_abilities : [],
  "Metamorfo": (typeof kensword_feralshapeshifter_abilities !== 'undefined') ? kensword_feralshapeshifter_abilities : [], 
  "Metamorfo Ferino (Comum)": (typeof kensword_feralshapeshifter_abilities !== 'undefined') ? kensword_feralshapeshifter_abilities : [],
  "Metamorfo Mítico (Raro)": (typeof kensword_mythicshapeshifter_abilities !== 'undefined') ? kensword_mythicshapeshifter_abilities : [],
  "Metamorfo Primordial (Raro)": (typeof kensword_primordialshapeshifter_abilities !== 'undefined') ? kensword_primordialshapeshifter_abilities : [],
  "Kobold": (typeof kensword_kobold_abilities !== 'undefined') ? kensword_kobold_abilities : [],
  "Drakobold": (typeof kensword_drakobold_abilities !== 'undefined') ? kensword_drakobold_abilities : [],
  "Kouris": (typeof kensword_kouris_abilities !== 'undefined') ? kensword_kouris_abilities : [],
  "Floraune": (typeof kensword_floraune_abilities !== 'undefined') ? kensword_floraune_abilities : [],
  "Espírito": (typeof kensword_spirit_abilities !== 'undefined') ? kensword_spirit_abilities : [],
  "Abissal": (typeof kensword_abyssal_abilities !== 'undefined') ? kensword_abyssal_abilities : [],
  "Yokai": (typeof kensword_kitsune_abilities !== 'undefined') ? kensword_kitsune_abilities : [], 
  "Kitsune / Bakeneko / Tanuki": (typeof kensword_kitsune_abilities !== 'undefined') ? kensword_kitsune_abilities : [],
  "Tengu": (typeof kensword_tengu_abilities !== 'undefined') ? kensword_tengu_abilities : [],
  "Kappa": (typeof kensword_kappa_abilities !== 'undefined') ? kensword_kappa_abilities : [],
  "Oni": (typeof kensword_oni_abilities !== 'undefined') ? kensword_oni_abilities : []
};

// 2. BANCO DE DADOS DE DESCRIÇÕES DE RAÇAS (KENSWORD_RACES_DB)
window.KENSWORD_RACES_DB = {
  "Humano": (typeof kensword_human_description !== 'undefined') ? kensword_human_description : null,
  "Elfo": (typeof kensword_elf_description !== 'undefined') ? kensword_elf_description : null,
  "Demi-Humano": (typeof kensword_demihuman_description !== 'undefined') ? kensword_demihuman_description : null,
  "Gigante": (typeof kensword_giant_description !== 'undefined') ? kensword_giant_description : null,
  "Anão": (typeof kensword_dwarf_description !== 'undefined') ? kensword_dwarf_description : null,
  "Demônio": (typeof kensword_demon_description !== 'undefined') ? kensword_demon_description : null,
  "Valquíria": (typeof kensword_valkyrie_description !== 'undefined') ? kensword_valkyrie_description : null,
  "Fada": (typeof kensword_fairy_description !== 'undefined') ? kensword_fairy_description : null,
  "Pixie": (typeof kensword_pixie_description !== 'undefined') ? kensword_pixie_description : null,
  "Metamorfo": (typeof kensword_shapeshifter_description !== 'undefined') ? kensword_shapeshifter_description : null,
  "Draconiano": (typeof kensword_draconic_description !== 'undefined') ? kensword_draconic_description : null,
  "Vampiro": (typeof kensword_vampire_description !== 'undefined') ? kensword_vampire_description : null,
  "Kobold": (typeof kensword_kobold_description !== 'undefined') ? kensword_kobold_description : null,
  "Drakobold": (typeof kensword_drakobold_description !== 'undefined') ? kensword_drakobold_description : null,
  "Kouris": (typeof kensword_kouris_description !== 'undefined') ? kensword_kouris_description : null,
  "Floraune": (typeof kensword_floraune_description !== 'undefined') ? kensword_floraune_description : null,
  "Espírito": (typeof kensword_spirit_description !== 'undefined') ? kensword_spirit_description : null,
  "Abissal": (typeof kensword_abyssal_description !== 'undefined') ? kensword_abyssal_description : null,
  "Yokai": (typeof kensword_yokai_description !== 'undefined') ? kensword_yokai_description : null
};

// Reconstruir o RACES_DATA dinamicamente com base nas descrições importadas apenas se ele ainda não estiver definido ou estiver vazio
if (!window.RACES_DATA || window.RACES_DATA.length === 0) {
  window.RACES_DATA = Object.values(window.KENSWORD_RACES_DB).filter(Boolean);
}

// 3. BANCO DE DADOS DE ELEMENTOS (KENSWORD_ELEMENTS_DB)
window.KENSWORD_ELEMENTS_DB = {
  "Fogo": (typeof kensword_fire_element !== 'undefined') ? kensword_fire_element : null,
  "Água": (typeof kensword_water_element !== 'undefined') ? kensword_water_element : null,
  "Terra": (typeof kensword_earth_element !== 'undefined') ? kensword_earth_element : null,
  "Vento": (typeof kensword_wind_element !== 'undefined') ? kensword_wind_element : null,
  "Gelo": (typeof kensword_ice_element !== 'undefined') ? kensword_ice_element : null,
  "Planta": (typeof kensword_plant_element !== 'undefined') ? kensword_plant_element : null,
  "Mineral": (typeof kensword_mineral_element !== 'undefined') ? kensword_mineral_element : null,
  "Relâmpago": (typeof kensword_lightning_element !== 'undefined') ? kensword_lightning_element : null,
  "Luz": (typeof kensword_light_element !== 'undefined') ? kensword_light_element : null,
  "Sombra": (typeof kensword_shadow_element !== 'undefined') ? kensword_shadow_element : null,
  "Dimensional": (typeof kensword_dimensional_element !== 'undefined') ? kensword_dimensional_element : null,
  "Sagrado": (typeof kensword_sacred_element !== 'undefined') ? kensword_sacred_element : null,
  "Trevas": (typeof kensword_darkness_element !== 'undefined') ? kensword_darkness_element : null,
  "Chaos": (typeof kensword_chaos_element !== 'undefined') ? kensword_chaos_element : null,
  "Khosmos": (typeof kensword_khosmos_element !== 'undefined') ? kensword_khosmos_element : null
};

// 4. MÉTODOS DE BUSCA E UTILITÁRIOS GLOBAIS
window.getAllKenswordAbilities = function() {
  let list = [];
  Object.keys(window.KENSWORD_ABILITIES_DB).forEach(cat => {
    window.KENSWORD_ABILITIES_DB[cat].forEach(ab => {
      list.push({ ...ab, dbCategory: cat });
    });
  });
  return list;
};

window.findKenswordAbility = function(name) {
  if (!name) return null;
  const all = window.getAllKenswordAbilities();
  const searchName = name.trim().toLowerCase();
  return all.find(ab => ab.name.toLowerCase() === searchName || searchName.includes(ab.name.toLowerCase())) || null;
};

// 5. SISTEMA QUANTITATIVO: CALCULAR EFEITOS DE HABILIDADES
window.calculateEffectiveStats = function(char) {
  if (!char) return null;
  
  // Clonar atributos base para cálculos
  let baseStats = {
    strength: parseInt(char.attributes?.strength) || 0,
    resistance: parseInt(char.attributes?.resistance) || 0,
    speed: parseInt(char.attributes?.speed) || 0,
    magic: parseInt(char.attributes?.magic) || 0
  };

  let flatBonus = { strength: 0, resistance: 0, speed: 0, magic: 0 };
  let multiplierBonus = { strength: 1.0, resistance: 1.0, speed: 1.0, magic: 1.0 };
  let appliedBuffs = [];

  // Coletar todas as habilidades que o personagem possui
  let listAbilities = [];
  if (char.abilities?.racial) {
    if (Array.isArray(char.abilities.racial)) {
      listAbilities.push(...char.abilities.racial);
    } else {
      listAbilities.push(char.abilities.racial);
    }
  }
  if (char.uniqueAbility?.title) {
    listAbilities.push(char.uniqueAbility.title);
  }

  // Verificar bônus da raça/sub-raça padrão
  // Anão padrão ganha 75 pontos de Resistência passivamente de "Feito pela Montanha"
  if (char.race === 'Anão') {
    flatBonus.resistance += 75;
    appliedBuffs.push({ name: "Feito pela Montanha (Passivo)", stat: "Resistência", value: "+75" });
  }
  
  // Gigante ganha colosso (+50% força e resistência, -15% velocidade)
  if (char.race === 'Gigante') {
    multiplierBonus.strength *= 1.50;
    multiplierBonus.resistance *= 1.50;
    multiplierBonus.speed *= 0.85;
    appliedBuffs.push({ name: "Colosso (Passivo)", stat: "Força/Resistência/Velocidade", value: "+50%/-15%" });
  }

  // Procurar correspondências no Banco de Dados
  listAbilities.forEach(abName => {
    const matched = window.findKenswordAbility(abName);
    if (matched && matched.effects) {
      const eff = matched.effects;
      
      // Aplicar Bônus Flat
      if (eff.attributesBonus) {
        Object.keys(eff.attributesBonus).forEach(st => {
          if (flatBonus[st] !== undefined) {
            flatBonus[st] += eff.attributesBonus[st];
            appliedBuffs.push({ name: matched.name, stat: st, value: `+${eff.attributesBonus[st]}` });
          }
        });
      }
      
      // Aplicar Multiplicadores
      if (eff.attributesMultiplier) {
        Object.keys(eff.attributesMultiplier).forEach(st => {
          if (multiplierBonus[st] !== undefined) {
            multiplierBonus[st] *= eff.attributesMultiplier[st];
            const pct = Math.round((eff.attributesMultiplier[st] - 1.0) * 100);
            if (pct !== 0) {
              appliedBuffs.push({ name: matched.name, stat: st, value: `${pct > 0 ? '+' : ''}${pct}%` });
            }
          }
        });
      }
    }
  });

  // Calcular valores finais
  let finalStats = {
    strength: Math.round((baseStats.strength + flatBonus.strength) * multiplierBonus.strength),
    resistance: Math.round((baseStats.resistance + flatBonus.resistance) * multiplierBonus.resistance),
    speed: Math.round((baseStats.speed + flatBonus.speed) * multiplierBonus.speed),
    magic: Math.round((baseStats.magic + flatBonus.magic) * multiplierBonus.magic)
  };

  return {
    base: baseStats,
    final: finalStats,
    buffs: appliedBuffs
  };
};
