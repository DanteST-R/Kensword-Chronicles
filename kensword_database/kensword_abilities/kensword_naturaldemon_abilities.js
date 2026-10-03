// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Demônio Natural
// ================================================================

const kensword_naturaldemon_abilities = [
  {
    name: "Caos",
    category: "Demônio Natural",
    type: "Sub-Raça Demônio Natural",
    description: "Demônios Naturais conseguem usar Magias de Trevas, que se equiparam à Luz, causando 50% a mais de dano a criaturas naturalmente Não Sagradas.",
    details: "Amplifica o dano elemental de Trevas contra alvos profanos.",
    scaling: "Fixo",
    effects: {
      spellDamageBonusNonSacred: 0.50,
      darknessAffinity: true
    }
  }
];
