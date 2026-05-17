// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Anão da Montanha
// ================================================================

const kensword_mountaindwarf_abilities = [
  {
    name: "Pelos Montes",
    category: "Anão da Montanha",
    type: "Sub-Raça Anão da Montanha",
    description: "Começa com nível 3 de perícia em Picareta e Mineração, e consegue adicionar +5 de atributo ao fazer uma armadura.",
    details: "Mestres de forja focados em equipamentos defensivos robustos.",
    scaling: "Fixo",
    effects: {
      skillLevels: { mining: 3, pickaxe: 3 },
      armorCraftingBonus: 5
    }
  }
];
