// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE RAÇAS
// Descrição: Demônio
// ================================================================

const kensword_demon_description = {
  emoji: "♦️",
  name: "Demônio",
  creator: "Venom",
  image: "Photos/Demon.png",
  appearance: "Aparência normalmente ligada ao profano. Costumam viver 1.000 anos, aumenta conforme devora almas e pode acabar ficando imortal ao evoluir.",
  description: "Naturais do Império de Umbra, são criaturas variadas in aparência — podem ter muitas formas, geralmente associadas ao profano — conhecidas pela força física e mágica extremamente alta. Feitos para dominar, destroem seus inimigos com facilidade.",
  abilities: [
    { name: "Corrupção", desc: "Além de manipularem o elemento Sombra naturalmente, demônios têm facilidade em danificar e perturbar o natural com essa energia. Para desbloquear o elemento Trevas, é necessário Perícia em Magia Nível 5 e aptidão 100% com Sombras." }
  ],
  subraces: [
    {
      name: "Demônio Natural",
      desc: "A forma mais pura e poderosa da linhagem demoníaca. Criaturas de poder pleno, nascidas na essência das trevas.",
      abilityName: "Caos",
      abilityDesc: "Demônios Naturais conseguem usar Magias de Trevas, que se equiparam à Luz, causando 50% a mais de dano a criaturas naturalmente Não Sagradas."
    },
    {
      name: "Succubus / Incubus",
      image: "Photos/Succubus.jpg",
      appearance: "Aparência bela e atraente, ainda que ligada ao profano. Costumam viver 800 anos, aumenta conforme drena a energia de outros seres.",
      desc: "Com aparências mais belas e atraentes, ainda ligadas ao profano. Diferente de outros demônios, têm uma tendência maior ao amor pela vida, já que se alimentam dele. Seus comportamentos variam muito: alguns drenam vitalidade de qualquer presa, outros se apegam a um parceiro para a vida toda.",
      abilityName: "Encargo de Luxúria",
      abilityDesc: "Seus corpos liberam feromônios constantemente, induzindo prazer às presas e concedendo 20% de facilidade ao seduzir um alvo. Após se alimentar, absorvem parcialmente 5% do atributo Magia do parceiro."
    }
  ]
};
