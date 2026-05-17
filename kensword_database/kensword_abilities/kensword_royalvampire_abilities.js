// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Vampiro Real
// ================================================================

const kensword_royalvampire_abilities = [
  {
    name: "Benefício do Sangue",
    category: "Vampiro Real",
    type: "Sub-Raça Vampiro Real",
    description: "+15% em Força, Velocidade de Reação e Locomoção passivos. +10% em Resistências e +5% em poderes mágicos. Telecinese padrão inata (objetos até o tamanho de uma espada longa). Sentidos aprimorados com percepção quase perfeita em raio de 3m. Resiste 1 turno sob o sol.",
    details: "Concede os atributos supremos dos soberanos da noite.",
    scaling: "Fixo",
    effects: {
      attributesMultiplier: {
        strength: 1.15,
        speed: 1.15,
        resistance: 1.10,
        magic: 1.05
      },
      telekinesisLimitKg: 15,
      sensoryRangeMeters: 3,
      sunlightToleranceTurns: 1
    }
  }
];
