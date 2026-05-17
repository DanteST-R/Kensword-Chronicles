// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Tengu
// ================================================================

const kensword_tengu_abilities = [
  {
    name: "Guardião das Montanhas",
    category: "Tengu",
    type: "Sub-Raça Yokai Tengu",
    description: "Possuem asas funcionais que amplificam força e agilidade. +10% de buff passivo em Velocidade e Força.",
    details: "Asas negras de corvo que proporcionam voo ágil e força superior.",
    scaling: "Fixo",
    effects: {
      attributesMultiplier: {
        speed: 1.10,
        strength: 1.10
      },
      flightEnabled: true
    }
  }
];
