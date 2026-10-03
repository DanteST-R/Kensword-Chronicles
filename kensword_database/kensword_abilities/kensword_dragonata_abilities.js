// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Dragonato
// ================================================================

const kensword_dragonata_abilities = [
  {
    name: "Sopro Dracônico + Bônus Passivo",
    category: "Dragonato",
    type: "Sub-Raça Dragonato",
    description: "Libera pela boca uma rajada concentrada do elemento base em cone ou linha (10m), causando +10% de dano elemental. Recarga de 2 turnos. Passivo: +20% de resistência e força física natural.",
    details: "Combinação devastadora de poder bruto corporal e rajada de sopro elemental.",
    scaling: "Fixo",
    effects: {
      attributesMultiplier: {
        strength: 1.20,
        resistance: 1.20
      },
      breathDamageMultiplier: 1.10,
      breathRangeMeters: 10,
      breathCooldownTurns: 2
    }
  }
];
