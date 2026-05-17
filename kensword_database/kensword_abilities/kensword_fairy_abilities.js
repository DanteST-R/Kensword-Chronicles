// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Fada
// ================================================================

const kensword_fairy_abilities = [
  {
    name: "Com Um Toque Gentil",
    category: "Fada",
    type: "Raça Fada",
    description: "Fadas são dotadas da capacidade de cuidar e gerir desde o nascimento, tornando-as naturalmente aptas a usar magias que curam até ferimentos médios em 2 turnos, consumindo apenas 100 de mana por ferimento sem gastar slots. Também podem projetar buffs mágicos em aliados, aumentando seus atributos em 10%.",
    details: "Poder de cura de suporte ecológico natural e buffs mágicos expressivos.",
    scaling: "Fixo",
    effects: {
      healTimeTurns: 2,
      healManaCost: 100,
      allyBuffPercent: 0.10
    }
  }
];
