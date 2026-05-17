// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Kobold
// ================================================================

const kensword_kobold_abilities = [
  {
    name: "Sociedade das Patas",
    category: "Kobold",
    type: "Raça Kobold (Monstro)",
    description: "Kobolds trabalham melhor em grupos, principalmente de sua própria espécie. Individualmente, possuem sentidos aguçados e resistência elemental de 25%. Em grupo, cada um melhora um sentido específico (escolha fixa do jogador) e a resistência elemental sobe para 50%.",
    details: "Espírito cooperativo de bando lupino/felino.",
    scaling: "Fixo",
    effects: {
      elementalResistanceSolo: 0.25,
      elementalResistanceGroup: 0.50,
      perceptionBonus: true
    }
  }
];
