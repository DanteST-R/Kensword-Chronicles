// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Drakobold
// ================================================================

const kensword_drakobold_abilities = [
  {
    name: "Força das Escamas",
    category: "Drakobold",
    type: "Raça Drakobold (Monstro)",
    description: "Drakobolds nascem com uma Vocação (decidida pelo jogador), descoberta quando os pais apresentam o filho ao Drakobold Ancião. | Vocação Drake: +10% Força Física e Resistência, +10% em magias de reforço. | Vocação Dragon: alta chance de desenvolver asas na evolução, +10% em Magia e Velocidade, bônus em magias ofensivas. | Vocação Hydra: corpo mais robusto, +15% Resistência e Fortitude, +10% em magias defensivas e de cura.",
    details: "Desperta características dracônicas específicas baseadas na vocação ancestral.",
    scaling: "Fixo",
    effects: {
      vocationDrake: {
        attributesMultiplier: { strength: 1.10, resistance: 1.10 },
        reinforcementSpellsBonus: 0.10
      },
      vocationDragon: {
        attributesMultiplier: { magic: 1.10, speed: 1.10 },
        offensiveSpellsBonus: 0.10,
        hasWingsOnEvolution: true
      },
      vocationHydra: {
        attributesMultiplier: { resistance: 1.15 },
        healingSpellsBonus: 0.10
      }
    }
  }
];
