// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Humanos
// ================================================================

const kensword_human_abilities = [
  {
    name: "Indomável",
    category: "Humano",
    type: "Humano",
    description: "Efeitos de manipulação mental contra o usuário dessa habilidade são enfraquecidas em 5% [Limite 50%].",
    details: "",
    scaling: "Sobe 2,5% por level."
  },
  {
    name: "Próximo Passo",
    category: "Humano",
    type: "Humano",
    description: "Recebe um acréscimo de 50 pontos em todos os atributos ao adquirir a habilidade. Se torna 5% mais resistente a efeitos de manipulação mental, além de ter um acréscimo de 5% dos atributos Magia e Resistência.",
    details: "",
    scaling: "Sobe 1% das porcentagens por level, até no máximo 15%."
  },
  {
    name: "Berserker",
    category: "Humano",
    type: "Humano",
    description: "Quando o HP do humano está abaixo de 50%, ganha regeneração de vida de 2% de HP por turno, +10% em todos os atributos e aumenta a Resistência em mais 5%. Dura por 2 turnos.",
    details: "",
    scaling: "Aumenta 1 turno de duração por level, até no máximo 5. Aumenta 1% de Resistência, até no máximo 10%."
  },
  {
    name: "Sede por Evolução",
    category: "Humano",
    type: "Humano",
    description: "O humano pode aprender habilidades de Anões, elfos, demi-humanos e gigantes.",
    details: "Detalhe importante: Habilidades que são como a Transmutação de Pasto, feitas para \"Demi-humano Vaca\", não podem ser aprendidas. O mestre decidirá se uma habilidade pode ou não ser aprendida.",
    scaling: "Fixo"
  }
];
