// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS GLOBAL
// Agregador de Habilidades, Raças e Elementos
// ================================================================

// 1. BANCO DE DADOS DE HABILIDADES GLOBAL (KENSWORD_ABILITIES_DB)
window.KENSWORD_ABILITIES_DB = {
  "Simples": window.kensword_simple_abilities || [],
  "Humano": window.kensword_human_abilities || [],
  "Elfo": window.kensword_elf_abilities || [],
  "Alto Elfo": window.kensword_highelf_abilities || [],
  "Drow": window.kensword_drow_abilities || [],
  "Demi-Humano": window.kensword_demihuman_abilities || [],
  "Gigante": window.kensword_giant_abilities || [],
  "Anão": window.kensword_dwarf_abilities || [],
  "Anão da Montanha": window.kensword_mountaindwarf_abilities || [],
  "Anão da Caverna": window.kensword_cavedwarf_abilities || [],
  "Vampiro": window.kensword_vampire_abilities || [],
  "Vampiro Real": window.kensword_royalvampire_abilities || [],
  "Vampiro Impuro": window.kensword_impurevampire_abilities || [],
  "Ghoul da Noite": window.kensword_ghoul_abilities || [],
  "Valquíria": window.kensword_valkyrie_abilities || [],
  "Demônio": window.kensword_demon_abilities || [],
  "Demônio Natural": window.kensword_naturaldemon_abilities || [],
  "Succubus / Incubus": window.kensword_succubus_abilities || [],
  "Dracônico": window.kensword_draconic_abilities || [],
  "Dragonato": window.kensword_dragonata_abilities || [],
  "Dragonete": window.kensword_dragonete_abilities || [],
  "Fada": window.kensword_fairy_abilities || [],
  "Pixie": window.kensword_pixie_abilities || [],
  "Metamorfo": window.kensword_feralshapeshifter_abilities || [], // Fallback para Metamorfo Ferino
  "Metamorfo Ferino (Comum)": window.kensword_feralshapeshifter_abilities || [],
  "Metamorfo Mítico (Raro)": window.kensword_mythicshapeshifter_abilities || [],
  "Metamorfo Primordial (Raro)": window.kensword_primordialshapeshifter_abilities || [],
  "Kobold": window.kensword_kobold_abilities || [],
  "Drakobold": window.kensword_drakobold_abilities || [],
  "Kouris": window.kensword_kouris_abilities || [],
  "Floraune": window.kensword_floraune_abilities || [],
  "Espírito": window.kensword_spirit_abilities || [],
  "Abissal": window.kensword_abyssal_abilities || [],
  "Yokai": window.kensword_kitsune_abilities || [], // Fallback para Yokai Kitsune
  "Kitsune / Bakeneko / Tanuki": window.kensword_kitsune_abilities || [],
  "Tengu": window.kensword_tengu_abilities || [],
  "Kappa": window.kensword_kappa_abilities || [],
  "Oni": window.kensword_oni_abilities || []
};

// 2. BANCO DE DADOS DE DESCRIÇÕES DE RAÇAS (KENSWORD_RACES_DB)
window.KENSWORD_RACES_DB = {
  "Humano": window.kensword_human_description,
  "Elfo": window.kensword_elf_description,
  "Demi-Humano": window.kensword_demihuman_description,
  "Gigante": window.kensword_giant_description,
  "Anão": window.kensword_dwarf_description,
  "Demônio": window.kensword_demon_description,
  "Valquíria": window.kensword_valkyrie_description,
  "Fada": window.kensword_fairy_description,
  "Pixie": window.kensword_pixie_description,
  "Metamorfo": window.kensword_shapeshifter_description,
  "Draconiano": window.kensword_draconic_description,
  "Vampiro": window.kensword_vampire_description,
  "Kobold": window.kensword_kobold_description,
  "Drakobold": window.kensword_drakobold_description,
  "Kouris": window.kensword_kouris_description,
  "Floraune": window.kensword_floraune_description,
  "Espírito": window.kensword_spirit_description,
  "Abissal": window.kensword_abyssal_description,
  "Yokai": window.kensword_yokai_description
};

// Reconstruir o RACES_DATA dinamicamente com base nas descrições importadas
window.RACES_DATA = Object.values(window.KENSWORD_RACES_DB).filter(Boolean);

// 3. BANCO DE DADOS DE ELEMENTOS (KENSWORD_ELEMENTS_DB)
window.KENSWORD_ELEMENTS_DB = {
  "Fogo": window.kensword_fire_element,
  "Água": window.kensword_water_element,
  "Terra": window.kensword_earth_element,
  "Vento": window.kensword_wind_element,
  "Gelo": window.kensword_ice_element,
  "Planta": window.kensword_plant_element,
  "Mineral": window.kensword_mineral_element,
  "Relâmpago": window.kensword_lightning_element,
  "Luz": window.kensword_light_element,
  "Sombra": window.kensword_shadow_element,
  "Dimensional": window.kensword_dimensional_element,
  "Sagrado": window.kensword_sacred_element,
  "Trevas": window.kensword_darkness_element,
  "Chaos": window.kensword_chaos_element,
  "Khosmos": window.kensword_khosmos_element
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
