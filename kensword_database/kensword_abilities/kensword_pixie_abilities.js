// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Pixie
// ================================================================

const kensword_pixie_abilities = [
  {
    name: "Caos Generalizado",
    category: "Pixie",
    type: "Raça Pixie",
    description: "Pixies podem manipular os sentidos de alvos em uma área de até 5 metros, regulando visão, audição e olfato com objetos táteis mas falhos. Enquanto presos na ilusão, os alvos recebem +15% de dano.",
    details: "Distorce a percepção em área e aumenta o dano de investidas táticas.",
    scaling: "Fixo",
    effects: {
      illusionRadiusMeters: 5,
      illusionDamageMultiplier: 1.15
    }
  }
];
