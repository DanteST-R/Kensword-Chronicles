// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Kappa
// ================================================================

const kensword_kappa_abilities = [
  {
    name: "Kappa Maki",
    category: "Kappa",
    type: "Sub-Raça Yokai Kappa",
    description: "Excelente regeneração. Ferimentos pequenos se recuperam em 2 cenas. Membros amputados se recuperam após 1 descanso longo.",
    details: "Vitalidade anfíbia e regeneração acelerada sob a água.",
    scaling: "Fixo",
    effects: {
      lightHealScenes: 2,
      amputationRecoveryRest: "long",
      aquaticRegeneration: true
    }
  }
];
