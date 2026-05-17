// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Abissal
// ================================================================

const kensword_abyssal_abilities = [
  {
    name: "Despertar Abissal",
    category: "Abissal",
    type: "Raça Abissal (Monstro)",
    description: "Começa apenas com visão ultra-noturna. Com o treino, a aparência muda completamente, tornando-se mais primitiva e mortal, assumindo as características de uma sub-espécie Abissal. Sub-espécies: Peixe-Lanterna (escamas rígidas +20% Resistência; fêmeas: Fusão Abissal; machos: Parasita Abissal), Lula Abissal (tentáculos +20% Força, ganha elementos Sombras e Água), Lagarto da Fossa (pés ágeis +20% Velocidade, ganha habilidade Regenerativo).",
    details: "Mutações grotescas inspiradas em monstros abissais das profundezas do oceano.",
    scaling: "Fixo",
    effects: {
      innateNightVision: true,
      subSpeciesLanterna: {
        attributesMultiplier: { resistance: 1.20 }
      },
      subSpeciesLula: {
        attributesMultiplier: { strength: 1.20 },
        unlockedElements: ["Sombra", "Água"]
      },
      subSpeciesLagarto: {
        attributesMultiplier: { speed: 1.20 },
        regenerationEnabled: true
      }
    }
  }
];
