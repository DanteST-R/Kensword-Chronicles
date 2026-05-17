// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE RAÇAS
// Descrição: Yokai
// ================================================================

const kensword_yokai_description = {
  emoji: "👺",
  name: "Yokai",
  creator: "JP",
  description: "Criaturas autodidatas e livres, não obedecem a ninguém por um forte senso de liberdade. São diversas: Tengus territoriais das montanhas, Kappas aquáticos, encantadoras Kitsunes, assustadoras Yuki-Onnas, fofos Tanukis, entre outros. São neutros — caóticos por natureza, mas nem malignos como demônios, nem benevolentes como Valquírias.",
  abilities: [
    { name: "Sobrenaturalidade", desc: "Todos os Yokais são imunes a influências mentais de controle. São classificados como seres neutros e não sofrem efeitos de alinhamento." }
  ],
  subraces: [
    {
      name: "Kitsune / Bakeneko / Tanuki",
      image: "Photos/Kitsune.jpg",
      appearance: "Kitsune: Aparência bela e esbelta. Bakeneko: Aparência betial felina e traiçoeira. Tanuki: Aparência bestial de guaxinim. Ambas costumam viver uma vida eterna.",
      desc: "Kitsune: raposas de 9 caudas, inteligentes e caóticas, raramente confiáveis mas muito variadas. Bakeneko: semelhantes às Kitsunes, porém gatos — acham que são donos do mundo. Tanuki: o mais fofo e tranquilo dos três, menos maldoso que uma Kitsune e menos convencido que um Bakeneko.",
      abilityName: "Transformismo",
      abilityDesc: "Kitsunes podem mudar sua forma para o que quiserem de forma imprevisível. Limite de 2m de largura/altura por nível."
    },
    {
      name: "Tengu",
      image: "Photos/Tengu.jpg",
      appearance: "Aparência de pele escura ou avermelhada, com asas negras e normalmente cabelos brancos. Costumam viver uma vida eterna.",
      desc: "Demônios-pássaro de nariz longo, guardiões de montanhas e florestas. Territoriais e às vezes vivem em bandos. Dizem que pessoas orgulhosas viram Tengus ao morrer. Podem pregar peças nos outros.",
      abilityName: "Guardião das Montanhas",
      abilityDesc: "Possuem asas funcionais que amplificam força e agilidade. +10% de buff passivo em Velocidade e Força."
    },
    {
      name: "Kappa",
      image: "Photos/Kappa.webp",
      appearance: "Aparência calva e horrenda de ser do rio com casco.",
      desc: "Crianças do rio: criaturas calvas e horrendas que vivem em grupos. Odeiam sair da água para caçar. Buscam sangue e entranhas de suas vítimas — fontes dizem que gostam do fígado humano. Curiosamente, têm lendas de ter ensinado os humanos a realizar amputações. Preferem pepinos e adoram sumô.",
      abilityName: "Kappa Maki",
      abilityDesc: "Excelente regeneração. Ferimentos pequenos se recuperam em 2 cenas. Membros amputados se recuperam após 1 descanso longo."
    },
    {
      name: "Oni",
      image: "Photos/Oni.jpg",
      appearance: "Aparência de pele que varia entre clara, escura, vermelha e azul normalmente, com chifres. Costumam viver uma vida eterna.",
      desc: "Representam tanto o Mal quanto a proteção e a punição divina. Complexos: alguns são mais humanos, outros mais bestiais. Normalmente vindos do pós-vida para buscar humanos para o inferno.",
      abilityName: "Primo de 3º Grau do Capeta",
      abilityDesc: "Conseguem transitar entre o pós-vida e o mundo comum. Não podem matar alguém sem motivo prévio — precisam de missão específica para agir."
    }
  ]
};
