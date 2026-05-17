// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Demônios e Succubus
// ================================================================

const kensword_demon_abilities = [
  {
    name: "Mugen",
    category: "Demônio",
    type: "Demônio e Succubus",
    description: "Um armazém conectado à alma do portador, com um estoque capaz de armazenar qualquer coisa que possa ser preenchida por mana de sombras. Possui três variações principais: Mugen Majin, Mugen Grave e Sophia.",
    details: "Variações:\n- Mugen Majin: Estoque de 5m² (sobe 1m² por Lvl). Pode expelir magias absorvidas com propriedade de Trevas/Fogo.\n- Mugen Grave: Armazena até 5 corpos (sobe 3 por Lvl) e 1 ser vivo (sobe 1 a cada 2 levels).\n- Sophia: Biblioteca das trevas compartilhada. Permite estudo e encontro seguro fora de combate. Recarga de 3 turnos fora de combate para usar.",
    scaling: "Melhorada com o Level."
  },
  {
    name: "Feralis",
    category: "Demônio",
    type: "Demônio e Succubus",
    description: "Convoca um equipamento, normalmente uma arma, negra, baseada na sua alma. Ela tem o atributo de trevas + um elemento adicional que o portador tenha, cada arma é única. Enquanto equipado, Feralis oferece 7% em todos os atributos.",
    details: "Ao causar dano com Feralis equipada, ativa [Maldição Umbral] (Recarga de 3 turnos): Restaura 50% do dano causado como pontos de vida próprios e aplica Sangramento (1,5% da vida da vítima) por 2 turnos.",
    scaling: "Melhora a porcentagem dos atributos em 1% por level."
  },
  {
    name: "Necromancia",
    category: "Demônio",
    type: "Demônio Natural",
    description: "[Passiva] Permite ao demônio ter um controle parcial de almas sem corpo. [Ativa] Quando um ou mais seres vivos ou mágicos morrem, usando essa habilidade, é possível absorver seu corpo e/ou alma no Mugen [Grave].",
    details: "",
    scaling: "Fixo"
  },
  {
    name: "Transmutação",
    category: "Demônio",
    type: "Demônio Natural",
    description: "Ao aprender essa habilidade, ganha 100 pontos de Magia. Agora, pode gerar monstros e converter materiais caso tenha os requisitos (elementos e materiais).",
    details: "",
    scaling: "Fixo"
  },
  {
    name: "Transformação",
    category: "Demônio",
    type: "Demônio e Succubus",
    description: "Ao aprender essa habilidade, recebe 50 pontos de Magia e Agilidade. O usuário agora pode criar magias que transformem seus alvos. A fraqueza dessa magia é se o alvo imbuir o corpo em magia, cauterizando os efeitos.",
    details: "",
    scaling: "Fixo"
  },
  {
    name: "Possessão",
    category: "Demônio",
    type: "Demônio e Succubus",
    description: "Ao aprender essa habilidade, agora seus pontos passam a estar conectados com sua alma. Pode criar magias para habitar outros corpos que sejam mais fracos em resistência mágica.",
    details: "",
    scaling: "Fixo"
  },
  {
    name: "Fusão de Corpos",
    category: "Demônio",
    type: "Demônio e Succubus",
    description: "Ao aprender essa habilidade, aprende uma manipulação limitada de massa orgânica, podendo manter os aspectos naturais do seu corpo. [Ativa] Tendo dois corpos que foram dominados/possuídos (pode ser o do demônio e mais um), o usuário pode fundir os dois, adquirindo 2 habilidades escolhidas do inimigo e 5% de seus atributos totais para distribuir.",
    details: "A partir do momento que fizer isso, se visto, seu status de [Akuma] será público.",
    scaling: "Fixo"
  },
  {
    name: "Corrupção Eminente",
    category: "Demônio",
    type: "Demônio e Succubus",
    description: "Ao adquirir essa habilidade, ganha 100 pontos em Magia e Agilidade. [Passiva] Ganha regeneração corporal de 1.5% do HP quando estiver em lugares escuros. [Ativa] Ao injetar uma parcela de sua magia em alguém, gera uma [Corrupção] no alvo, o tornando em um semi-demônio. Não funciona em demônios.",
    details: "Requisitos: Transformação, Possessão e Elemento Trevas.",
    scaling: "Fixo"
  }
];
