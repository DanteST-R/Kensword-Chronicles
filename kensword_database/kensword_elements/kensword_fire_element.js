// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE ELEMENTOS
// Elemento: Fogo
// ================================================================

const kensword_fire_element = {
  name: "Fogo",
  emoji: "🔥",
  category: "Básicos",
  traits: ["Calor", "Poder de ataque", "Destruição"],
  description: "Elemento que pode destruir, mas que também pode acabar fazendo o usuário se ferir. Seguindo uma lógica física, a magia tem limite baseado no grau.",
  modifiers: {
    attackPower: 1.15,
    riskFactor: 0.05
  },
  professionalDetails: "Ataques de Fogo possuem o atributo [Queimação] (causa 1.5% do dano inicial por turno durante 2 turnos). Se o usuário estiver sem mana, o fogo consome seu próprio vigor."
};
