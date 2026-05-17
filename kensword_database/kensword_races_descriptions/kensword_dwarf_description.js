// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE RAÇAS
// Descrição: Anão
// ================================================================

const kensword_dwarf_description = {
  emoji: "⛏️",
  name: "Anão",
  creator: "Venom",
  image: "Photos/Dwarf.jpg",
  appearance: "Aparência normalmente humana, tende a ter entre 1,20 a 1,50 metros. Costumam viver 600 anos.",
  description: "Uma variação dos humanos que mede de 1,20 até 1,50 metro na fase adulta. Mais fraco em magia, mas portador da habilidade da lendária forja. Desenvolvida com muito treinamento, são capazes de criar armas durante o combate e forjar as melhores armaduras.",
  abilities: [
    { name: "Feito pela Montanha", desc: "Possuem capacidade nata de forja, conseguindo desde sempre forjar equipamentos de raridade mínima Raro. Sustentam seus corpos robustos com 75 pontos base de Resistência." }
  ],
  subraces: [
    {
      name: "Anão da Montanha",
      desc: "Mestres em construir equipamentos resistentes, bem preparados para a dura vida de trabalhar do amanhecer até o anoitecer, tirando proveito dos benefícios de seu artesanato.",
      abilityName: "Pelos Montes",
      abilityDesc: "Começa com nível 3 de perícia em Picareta e Mineração, e consegue adicionar +5 de atributo ao fazer uma armadura."
    },
    {
      name: "Anão da Caverna",
      desc: "Criaturas intrépidas e desajeitadas em constante labuta. Suas peles gastas e recobertas pela poeira do metal e gemas adquiriram, ao longo do tempo no subterrâneo, uma coloração brilhosa de diversas pedras. Embora desajeitados, são mestres em artesanatos complexos e delicados.",
      abilityName: "Caldeirão de Gemas",
      abilityDesc: "Começam com nível 3 em Picareta e Mineração, possuindo a capacidade de adicionar +5 atributos em adornos."
    }
  ]
};
