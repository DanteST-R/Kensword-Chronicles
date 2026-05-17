// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Metamorfo Ferino
// ================================================================

const kensword_feralshapeshifter_abilities = [
  {
    name: "Transformação Ferina",
    category: "Metamorfo Ferino",
    type: "Sub-Raça Metamorfo Ferino",
    description: "Acesso completo a formas de animais comuns com controle apurado e menor custo de energia.",
    details: "Permite se transformar em lobos, águias, serpentes ou ursos com consumo otimizado.",
    scaling: "Fixo",
    effects: {
      animalShapesAllowed: ["wolf", "eagle", "serpent", "bear"],
      transformationCostReduction: 0.25
    }
  }
];
