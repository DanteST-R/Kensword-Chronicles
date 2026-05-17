// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Floraune
// ================================================================

const kensword_floraune_abilities = [
  {
    name: "Plantae",
    category: "Floraune",
    type: "Raça Floraune (Monstro)",
    description: "Uma Floraune possui e controla o Elemento Planta de forma perfeita.",
    details: "Afinidade de 100% com o elemento vegetal de forma inata.",
    scaling: "Fixo",
    effects: {
      elementalAffinity: { plant: 1.0 }
    }
  },
  {
    name: "Proliferação da Espécie — Seiva",
    category: "Floraune",
    type: "Raça Floraune (Monstro)",
    description: "Habilidade relacionada à propagação da espécie por meio de sua seiva.",
    details: "Utiliza a seiva como catalisador biológico de cura ou reprodução vegetativa.",
    scaling: "Fixo",
    effects: {
      sapHealAmount: 200,
      sapInfectionChance: 0.10
    }
  }
];
