// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Metamorfo Mítico
// ================================================================

const kensword_mythicshapeshifter_abilities = [
  {
    name: "Forma Mitológica",
    category: "Metamorfo Mítico",
    type: "Sub-Raça Metamorfo Mítico",
    description: "Acesso a formas de criaturas lendárias. Consome grande energia e exige alto nível de controle.",
    details: "Capacidade de se metamorfosear em criaturas lendárias como dragões, grifos ou fênix.",
    scaling: "Fixo",
    effects: {
      mythicShapesAllowed: ["dragon", "griffin", "phoenix"],
      transformationCostMultiplier: 1.50
    }
  }
];
