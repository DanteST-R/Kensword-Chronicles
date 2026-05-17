// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Gigantes
// ================================================================

const kensword_giant_abilities = [
  {
    name: "Corpo Duro",
    category: "Gigante",
    type: "Gigante",
    description: "O gigante tem 10% de sua Resistência aplicada no atributo Força.",
    details: "",
    scaling: "Fixo"
  },
  {
    name: "Corpo Forte",
    category: "Gigante",
    type: "Gigante",
    description: "Aumenta a força, resistência e velocidade em 10% [Fixo] e recebe um leve fator de cura.",
    details: "Fator de Cura:\n- Ferimentos fatais: 1 semana in-game\n- Ferimentos profundos: 10 Turnos\n- Ferimentos medianos: 6 Turnos\n- Ferimentos leves: 2 Turnos\n- Ferimentos Superficiais: 1 Turno",
    scaling: "Aumenta 1 turno de duração por level, até no máximo 5. Aumenta 1% de Resistência, até no máximo 10%."
  },
  {
    name: "Pele Fortificada",
    category: "Gigante",
    type: "Gigante",
    description: "Torna a pele mais fortificada, sendo capaz de aguentar ataques de perfuração. Reduz Perfuração contra si em 5%.",
    details: "",
    scaling: "Fixo"
  }
];
