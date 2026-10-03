// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Anão da Caverna
// ================================================================

const kensword_cavedwarf_abilities = [
  {
    name: "Caldeirão de Gemas",
    category: "Anão da Caverna",
    type: "Sub-Raça Anão da Caverna",
    description: "Começam com nível 3 em Picareta e Mineração, possuindo a capacidade de adicionar +5 atributos em adornos.",
    details: "Mestres de forja focados em adornos, gemas e joias delicadas.",
    scaling: "Fixo",
    effects: {
      skillLevels: { mining: 3, pickaxe: 3 },
      accessoryCraftingBonus: 5
    }
  }
];
