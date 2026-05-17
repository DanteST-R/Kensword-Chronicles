// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Ghoul da Noite
// ================================================================

const kensword_ghoul_abilities = [
  {
    name: "Soldado da Morte",
    category: "Ghoul da Noite",
    type: "Sub-Raça Ghoul da Noite",
    description: "+20% em Velocidade e Força, -10% em Resistência. Infectam e transformam qualquer um que seja arranhado ou mordido em 20 minutos. Imortais: o corpo continua se movendo mesmo despedaçado. Única forma de exterminar: luz do sol ou vaporização. Tendem a sofrer mutações grotescas (gigantificação, membros em forma de lâmina, etc.).",
    details: "Máquinas biológicas implacáveis de reanimação agressiva.",
    scaling: "Fixo",
    effects: {
      attributesMultiplier: {
        speed: 1.20,
        strength: 1.20,
        resistance: 0.90
      },
      infectionDurationMinutes: 20,
      undeadImmunity: true
    }
  }
];
