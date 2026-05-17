// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Kouris
// ================================================================

const kensword_kouris_abilities = [
  {
    name: "Protean (também presente em Slimes)",
    category: "Kouris",
    type: "Raça Kouris (Monstro)",
    description: "Kouris e Slimes possuem alta adaptabilidade. Após derrotar um inimigo, pegam uma de suas melhores características (habilidade simples). Após aprender 5 habilidades simples, desbloqueiam um novo patamar — podem aprender magias. Após aprender 5 magias, podem aprender habilidades únicas (limite de 1 tipo por mês).",
    details: "Mimetismo evolutivo parasitário de habilidades de adversários.",
    scaling: "Fixo",
    effects: {
      mimicryEnabled: true,
      simpleAbilitiesCap: 5,
      spellsCap: 5,
      uniqueAbilityCapPerMonth: 1
    }
  }
];
