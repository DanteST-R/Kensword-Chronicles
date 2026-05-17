// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Vampiro Impuro
// ================================================================

const kensword_impurevampire_abilities = [
  {
    name: "Junção a Nosferatu",
    category: "Vampiro Impuro",
    type: "Sub-Raça Vampiro Impuro",
    description: "Possuem metade dos benefícios dos Vampiros Reais. Sem super sentidos. Em compensação, se camuflam e se movem pelas sombras conectadas. Seu vírus se espalha pelo próprio sangue, criando lacaios com facilidade.",
    details: "Mestres de infiltração umbral e disseminação rápida de servidão.",
    scaling: "Fixo",
    effects: {
      attributesMultiplier: {
        strength: 1.075,
        speed: 1.075,
        resistance: 1.05,
        magic: 1.025
      },
      stealthBonus: 0.15,
      shadowLocomotion: true
    }
  }
];
