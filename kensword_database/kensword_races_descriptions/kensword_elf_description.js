// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE RAÇAS
// Descrição: Elfo (e suas Sub-raças)
// ================================================================

const kensword_elf_description = {
  emoji: "🧝",
  name: "Elfo",
  creator: "Dante",
  description: "Elfos são sábios, mas não por causa de sua genética, e sim por causa do seu esforço para aprender. O primeiro elfo, Larkin, foi quem estabeleceu o conceito dos elementos e criou a lei universal do Go.",
  abilities: [
    { name: "Um Com a Natureza", desc: "Enquanto próximo ao seu habitat natural (floresta, caverna, etc.), elfos ganham um bônus mágico de 25%, com mínimo de 15% caso fora de sua região natal." }
  ],
  subraces: [
    {
      name: "Alto Elfo",
      image: "Photos/Elf.jpg",
      appearance: "Pele clara, corpo esbelto, orelhas pontudas e Cabelos/Olhos normalmente claros, costumam viver 1.000 anos.",
      desc: "Os elfos mais comuns, esnobes e famosos pelos cabelos loiros e pele clara (em sua maioria, mas existem ruivos e outras cores). Uma sociedade sofisticada e orgulhosa, com forte relação com a natureza — florestas altas são seu habitat.",
      abilityName: "Olho por Olho",
      abilityDesc: "Aumenta a agilidade em 15%. Enquanto mirando, podem usar vinhas, árvores e outros tipos de vegetação de seu habitat para atacar ou construir estruturas simples."
    },
    {
      name: "Drow (Elfo Negro)",
      image: "Photos/Dark_Elf.jpg",
      appearance: "Pele escura, corpo esbelto, orelhas pontudas e Cabelos/Olhos normalmente escuros, costumam viver 1.200 anos.",
      desc: "Drows são elfos que nasceram com uma anomalia genética, sendo rejeitados pela população élfica. São conhecidos por controlarem o elemento Sombra.",
      abilityName: "Poder Umbral",
      abilityDesc: "Drows controlam sombras naturalmente. Em ambientes subterrâneos, sua manipulação umbral recebe +15% em magia. Fora desse ambiente, o bônus é de apenas 5%."
    }
  ]
};
