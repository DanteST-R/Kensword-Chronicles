// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Metamorfo Primordial
// ================================================================

const kensword_primordialshapeshifter_abilities = [
  {
    name: "Forma Primordial",
    category: "Metamorfo Primordial",
    type: "Sub-Raça Metamorfo Primordial",
    description: "Acesso a formas pré-históricas brutais e de grande porte. Exige alto controle instintivo.",
    details: "Capacidade de se metamorfosear em dinossauros, mamutes ou tigres-dentes-de-sabre.",
    scaling: "Fixo",
    effects: {
      primordialShapesAllowed: ["dinosaur", "mammoth", "sabertooth"],
      attributesMultiplierInForm: {
        strength: 1.30,
        resistance: 1.30,
        speed: 0.90
      }
    }
  }
];
