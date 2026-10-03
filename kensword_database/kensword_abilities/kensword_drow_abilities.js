// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Drow (Elfo Negro)
// ================================================================

const kensword_drow_abilities = [
  {
    name: "Conexão Umbral",
    category: "Drow",
    type: "Drow",
    description: "Ao aprender essa habilidade, recebe 50 pontos em Magia, Agilidade e Resistência. Reduz a mana em 15%, em troca, todos os seus atributos (exceto Magia) recebem um reforço de 5% do atributo Magia como pontos, além de agora, todas as magias que forem usadas poderão ter essência de trevas, aumentando 5% de Perfuração [Mágica].",
    details: "",
    scaling: "Reduz 1% da Penalidade por level. Aumenta 1% do Buff com base no atributo Magia por level, com limite de 10%."
  },
  {
    name: "Elemento Caótico",
    category: "Drow",
    type: "Drow",
    description: "Aumenta 5% da Magia. O buff com base na magia para outros atributos (Conexão Umbral) aumenta em 5% [Fixo].",
    details: "",
    scaling: "Sobe 1% de magia por level."
  },
  {
    name: "Mana Cruel",
    category: "Drow",
    type: "Drow",
    description: "Ao aprender essa habilidade, recebe 100 pontos em Magia. [Passiva] A mana se torna mais próxima às trevas, aumentando em 10% a magia permanentemente. [Ativa] Pode liberar uma presença esmagadora de mana em toda a área ao redor de si, causando medo em criaturas mais fracas e dificultando a mobilidade. Reduz os atributos do oponente em 10% [Fixo].",
    details: "",
    scaling: "Fixo"
  }
];
