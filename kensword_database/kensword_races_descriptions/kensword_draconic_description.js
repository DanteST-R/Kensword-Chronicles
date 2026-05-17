// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE RAÇAS
// Descrição: Draconiano
// ================================================================

const kensword_draconic_description = {
  emoji: "🐉",
  name: "Draconiano",
  creator: "Dante, Takashi e JP",
  description: "Descendentes diretos dos antigos Dragões primordiais. Surgiram quando o poder dracônico se misturou à magia do mundo. Embora tenham desenvolvido cultura, linguagem e sociedades complexas, o sangue dos dragões ainda pulsa forte. Escamas resistentes, sentidos aguçados e uma ligação natural com os elementos são traços comuns. Apesar da aparência humanoide, sua fisiologia continua parcialmente dracônica: metabolismo forte, maior resistência física e afinidade natural com magia elemental.",
  abilities: [
    { name: "Escamas Adaptáveis", desc: "As escamas dracônicas carregam afinidade elemental. Ao criar o personagem, o jogador escolhe um elemento base (Fogo, Água, Terra, etc.). O Draconiano recebe 50% de resistência natural contra esse elemento." }
  ],
  subraces: [
    {
      name: "🐲 Dragonato",
      image: "Photos/Draconato.jpg",
      appearance: "Aparência bestial, pode ter até 4 metros e com detalhes do dragão que descende. Costuma viver 800 anos.",
      desc: "Os Draconianos mais próximos de seus ancestrais dragões. Corpos maiores, mais robustos e cobertos por escamas mais grossas. Possuem chifres, cauda desenvolvida e traços faciais mais bestiais. Muitos vivem em Rakuyo, em tribos guerreiras com tradições ligadas aos dragões. (Criador: Dante e Takashi)",
      abilityName: "Sopro Dracônico + Bônus Passivo",
      abilityDesc: "Libera pela boca uma rajada concentrada do elemento base em cone ou linha (10m), causando +10% de dano elemental. Recarga de 2 turnos. Passivo: +20% de resistência e força física natural."
    },
    {
      name: "🐲 Dragonete",
      image: "Photos/Dragonewt.jpg",
      appearance: "Aparência humana com detalhes dracônicos como asas, chifres ou caudas. Costuma viver 800 anos.",
      desc: "A evolução mais refinada dos Draconianos. Corpos mais próximos dos humanos, com escamas discretas e traços dracônicos sutis. Associados a magia, inteligência estratégica e controle refinado de energia elemental. Integram-se facilmente em sociedades humanoides. (Criador: Takashi e JP)",
      abilityName: "Fluxo Dracônico",
      abilityDesc: "Maior controle da energia elemental. Ao usar magias ou habilidades do elemento base: +20% de eficiência elemental (dano, duração ou efeito) e redução de 10% no custo de mana."
    }
  ]
};
