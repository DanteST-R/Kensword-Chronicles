const RACES_DATA = [
  {
    emoji: "🙋🏻",
    name: "Humano",
    creator: "Dante e Venom",
    image: "kensword_database/kensword_photos/Human.jpg",
    appearance: "Aparência comum de humanos. Costumam viver 300 anos.",
    description: "Humanos são simples, mas são notados pela grande inteligência, que diferente das outras raças, não precisa evoluir para se tornar inteligente. O humano mais sábio que existiu foi o primeiro rei de Hogoku, Solomon. É dito que na era dele não houve guerras.",
    abilities: [
      { name: "Vontade De Viver", desc: "Humanos nascem com uma capacidade inata de desenvolver uma técnica denominada como Punho do Espírito, onde lhe converte 25% de sua Velocidade em Magia, a aura mágica se manifesta nas mãos braços e corpo, podendo também dessa mesma forma aumentar sua durabilidade ou ataques mágicos." },
      { name: "Inovação e Progresso", desc: "Começa com Inteligência Lvl 1. Magias ou Itens criados pelo humano recebem um bônus de 10% nos atributos bases ou efeitos quando criados." }
    ],
    subraces: []
  },
  {
    emoji: "🧝🏻‍♂️",
    name: "Elfo",
    creator: "Dante",
    description: "Elfos são sábios, mas não é por causa de sua genética, e sim por causa do seu esforço para aprender. O primeiro elfo, Larkin, foi quem estabeleceu o conceito dos elementos e criou a lei universal do Go.",
    abilities: [
      { name: "Um Com a Natureza", desc: "Enquanto próximo ao local de sua natureza como uma floresta, caverna, ou coisa do tipo, seu habitat natural, elfos ganham um bônus mágico de 25% que chega a um mínimo de 15% caso fora de sua região habitat." }
    ],
    subraces: [
      {
        name: "Alto elfo",
        image: "kensword_database/kensword_photos/Elf.jpg",
        appearance: "Pele clara, corpo esbelto, orelhas pontudas e Cabelos/Olhos normalmente claros, costumam viver 1.000 anos.",
        desc: "São os elfos mais comuns, esnobes, famosos loiros branquelos dos mundos de fantasia (em sua maioria, mas existem claro, ruivos e com outras cores de cabelo) uma sociedade sofisticada e orgulhosa em plenitude de seus afazeres e sua relação com a natureza sendo locais com floresta alta seu habitat.",
        abilityName: "Olho por Olho",
        abilityDesc: "Altos elfos tem uma habilidade que aumenta sua agilidade em 15% e enquanto mirando podem usar vinhas ou árvores e outros tipo de vegetação do seu habitat para atacar ou formar outras coisas como casas pequenas. Ele tem acesso ao Elemento Planta como extra de início."
      },
      {
        name: "Drow",
        image: "kensword_database/kensword_photos/Dark_Elf.jpg",
        appearance: "Pele escura, corpo esbelto, orelhas pontudas e Cabelos/Olhos normalmente escuros, costumam viver 1.200 anos.",
        desc: "Drow ou elfos negros são elfos que nasceram com uma anomalia genética, sendo rejeitados pela população élfica. Eles são conhecidos por conseguirem controlar o elemento sombra.",
        abilityName: "Poder Umbral",
        abilityDesc: "Drows são capazes de controlar sombras naturalmente. Além disso, ao estarem em um lugar subterrâneo, sua manipulação umbral oferece um aumento de 15% em sua magia, fora desse ambiente só recebe 5%."
      }
    ]
  },
  {
    emoji: "🐱",
    name: "Demi-Humano",
    creator: "Dante",
    image: "kensword_database/kensword_photos/demihuman.webp",
    appearance: "Aparência varia do animal que descende, podendo ser desde cauda e orelhas a até mesmo pelos ou escamas no corpo caso seja um Demi-humano Bestial. Costumam viver 400 anos.",
    description: "São todo tipo de híbridos de humano com animal ou até monstro. Eles não são tão inteligentes como os humanos e suas características variam muito de espécie pra espécie, mas eles são capazes de ser ótimos amigos.",
    abilities: [
      { name: "Primal", desc: "Os instintos dos híbridos são muito mais aguçados, e eles podem aumentar sua energia por um determinado tempo pra lutar mais um pouco. Porém, como todo animal, ele está sujeito às mesmas desvantagens hormonais e temperamentais (Como na lua cheia)." },
      { name: "Habilidade de Espécie", desc: "Toda espécie de Demi-humano tem acesso a uma habilidade exclusiva adicional." }
    ],
    subraces: []
  },
  {
    emoji: "🗿",
    name: "Gigante",
    creator: "Dante",
    image: "kensword_database/kensword_photos/Giant.jpg",
    appearance: "Aparência normalmente humana e musculosa, tamanho tende a ser 8 a 10 Metros. Costumam viver 700 anos.",
    description: "Portando uma força descomunal, gigantes são seres enormes que medem de 8 a 10 metros em sua fase jovem. Mesmo sendo menos inteligentes que os humanos, eles são extremamente espertos em combate.",
    abilities: [
      { name: "Colosso", desc: "Para se adaptar ao seu corpo, gigantes desenvolveram uma força e resistência descomunal. Eles possuem um multiplicador de 50% somente nos Pontos de força e resistência, mas a velocidade decai em 15% inicialmente (esse efeito valida-se de 4 em 4 m aumentando em mais uma cota [ou seja de 50 pra 100, 100 pra 150, etc assim como o Debuff que fica no máximo de 50%])." }
    ],
    subraces: []
  },
  {
    emoji: "⛏️",
    name: "Anão",
    creator: "Venom",
    image: "kensword_database/kensword_photos/Dwarf.jpg",
    appearance: "Aparência normalmente humana, tende a ter entre 1,20 a 1,50 metros. Costumam viver 600 anos.",
    description: "Uma variação dos humanos que mede de 1,20 até 1,50 na fase adulta, mais fraca no quesito magia, mas portando a habilidade da lendária forja. Desenvolvida com muito treinamento, eles são capazes de criar armas durante o combate e também conseguem forjar as melhores armaduras.",
    abilities: [
      { name: "Feito pela Montanha", desc: "Anões tem uma capacidade nata de forja onde conseguem desde sempre forjar equipamentos no mínimo da raridade Raro, e sustentam seus corpos robustos com 75 pontos base de resistência." }
    ],
    subraces: [
      {
        name: "Anão da Montanha",
        desc: "Anões da montanha são mestres em construir seus equipamentos resistentes e bem preparados para a dura vida de trabalhar do momento em que o primeiro brilho de sol aparecer no céu, até que a luz seja extinguida na escuridão da noite, proporcionando seus benefícios próprios em seu artesanato.",
        abilityName: "Pelos Montes",
        abilityDesc: "Anões da montanha começam com nível 3 de perícia em Mineração e conseguem por 5% mais atributos ao fazer uma armadura."
      },
      {
        name: "Anão da Caverna",
        desc: "Anões da caverna são criaturas intrépidas e desajeitadas em sua jornada constante na vida, sua peles gastas e recoberto pela poeira do metal e gemas fez com que ao longo do tempo no subterrâneo, seus corpos tomassem a coloração brilhosa de diversas pedras, embora desajeitados são mestres em artesanatos complexos e delicados, inspirados no que precisam fazer para deixar seu trabalho mais leve e sutil.",
        abilityName: "Caldeirão De Gemas",
        abilityDesc: "Anões da Caverna começam com Lvl 3 em Mineração, possuem a capacidade de colocar 5% mais atributos em adornos e runas."
      }
    ]
  },
  {
    emoji: "♦️",
    name: "Demônio",
    creator: "Venom",
    image: "kensword_database/kensword_photos/Demon.png",
    appearance: "Aparência normalmente ligada ao profano. Costumam viver 1.000 anos, aumenta conforme devora almas e pode acabar ficando imortal ao evoluir.",
    description: "Naturais do império de Umbra, são criaturas variadas em aparência, mas conhecidas pela sua força física e mágica extremamente alta. Feitos para dominar, eles destroem seus inimigos facilmente.",
    abilities: [
      { name: "Corrupção", desc: "Além de saberem manipular o elemento Sombra naturalmente, demônios tem uma facilidade em danificar e perturbar o natural com essa energia. Para desbloquear elemento Trevas caso não tenha, precisa de Perícia Magia Lvl 5 para desbloquear o elemento." }
    ],
    subraces: [
      {
        name: "Demônio Natural",
        desc: "A forma original e pura da linhagem demoníaca de Umbra, carregando o poder primordial do abismo.",
        abilityName: "Caos",
        abilityDesc: "Demônios naturais conseguem usar Magias de Trevas, que se equipara à luz causando 30% a mais de dano a criaturas naturalmente Não Sagradas."
      },
      {
        name: "Succubus / Incubus",
        image: "kensword_database/kensword_photos/Succubus.jpg",
        appearance: "Aparência bela e atraente, ainda que ligada ao profano. Costumam viver 800 anos, aumenta conforme drena a energia de outros seres.",
        desc: "Diferente de outros Umbrais Succubus/Incubus tem uma tendência maior ao amor pela vida do que demônios normais, já que se alimentam disso, seus comportamentos variam de cada um, alguns simplesmente fazem de tudo pra se alimentar drenando vitalidade, outros são tímidos e se apegam a um parceiro pra vida toda, sendo bem variavel.",
        abilityName: "Encargo de Luxúria",
        abilityDesc: "Succubus tem uma tendência forte pela sedução, fazendo seus corpos liberarem feromônios constantemente para induzir o prazer a suas presas permitindo uma facilidade de 20% em seduzir algum alvo, além de que após se alimentar Succubus absorvem parcialmente 5% do atributo magia do parceiro."
      }
    ]
  },
  {
    emoji: "🪽",
    name: "Valquíria",
    creator: "Dante",
    image: "kensword_database/kensword_photos/Angel.jpg",
    appearance: "Aparência normalmente ligada ao sagrado. Costuma viver uma vida eterna.",
    description: "Valquírias são seres sagrados, mulheres aladas que possuem o glorioso elemento Luz e também o Sagrado. Essas guerreiras aladas são leais à Hikarium e fazem o que ela mandar sem questionar, tendo a deusa como fonte de inspiração e amor.",
    abilities: [
      { name: "Julgamento", desc: "Além de poderem controlar os elementos Luz e Sagrado, as valquírias podem exterminar os monstros com muito mais facilidade pela sua natureza divina, dando 30% a mais de dano em criaturas que contenham energia de Umbra." }
    ],
    subraces: []
  },
  {
    emoji: "🧚🏻‍♀️",
    name: "Fada",
    creator: "JP",
    image: "kensword_database/kensword_photos/Fairy.jpg",
    appearance: "Asas translúcidas, tende a ter até 1 metro. Costuma viver 500 anos.",
    description: "Espíritos da floresta que são comandados pelas suas superiores, as dríades. Elas são seres benéficos que cuidam das plantas, medindo até no máximo 1 metro.",
    abilities: [
      { name: "Com Um Toque Gentil", desc: "Fadas são dotadas desde seu nascimento da capacidade de cuidar e gerir, o que as torna naturalmente aptas a usar magias de cura, aumentando a eficiência de todas elas ao reduzir os requisitos de cura em 1 turno." }
    ],
    subraces: []
  },
  {
    emoji: "😈",
    name: "Pixie",
    creator: "Dante e JP",
    image: "kensword_database/kensword_photos/Pixie.webp",
    appearance: "Não possui asas normalmente, tende a ter até 1 metro e aparência comumente ligada ao profano. Costuma viver 500 anos.",
    description: "São fadas que normalmente aparecem em lugares escuros, elas gostam de aprontar e causar alvoroço, sendo muito travessas e possuindo elemento trevas. Pixies podem medir até 1 metro de altura.",
    abilities: [
      { name: "Caos Generalizado", desc: "Pixies podem manipular a noção dos sentidos daqueles em uma área até em 5m de distância das pequeninas, podendo regular suas vistas, audição e olfato com objetos que até mesmo são tateis mas falhos, mas enquanto presos na ilusão das pixies os alvos recebem +15% de dano." }
    ],
    subraces: []
  },
  {
    emoji: "🐾",
    name: "Metamorfo",
    creator: "Dante e Takashi",
    image: "kensword_database/kensword_photos/Metamorf.jpg",
    appearance: "Aparência varia da transformação atual e original, mantendo sutis traços animais.",
    description: "Os Metamorfos são uma raça rara e fascinante, conhecida por sua capacidade natural de assumir formas animais. Diferente de simples imitadores, eles não copiam criaturas, eles despertam formas adormecidas em seu próprio sangue.\n\nTodo Metamorfo manifesta, ainda jovem, o seu Primeiro Despertar, a primeira forma animal que conseguiu assumir. Desde então, sua aparência original costuma carregar traços sutis dessa criatura: olhos diferenciados, presas discretas, postura predatória ou marcas incomuns na pele.\n\nSua transformação é completa e orgânica: ossos, músculos e sentidos se ajustam perfeitamente à nova forma. Não é magia ilusória, é mudança real.\n\nPor causa de sua versatilidade e poder, são muito cobiçados, mas extremamente difíceis de capturar.",
    abilities: [
      { name: "Metamorfose", desc: "Metamorfos conseguem se transformar através de uma conexão natural com o fluxo da vida. Novas formas são desbloqueadas com treino, experiência e forte conexão com a espécie. Transformações mais poderosas exigem mais energia. Quanto maior a criatura, maior o desgaste físico." }
    ],
    subraces: [
      {
        name: "🐺 Metamorfo Ferino (Comum)",
        desc: "A linhagem mais estável e numerosa. Podem se transformar em animais comuns, como lobos, águias, serpentes ou ursos. São versáteis, equilibrados e possuem ótimo controle sobre suas formas.",
        abilityName: "Transformação Ferina",
        abilityDesc: "Acesso completo a formas de animais comuns com controle apurado e menor custo de energia."
      },
      {
        name: "🐉 Metamorfo Mítico (Raro)",
        desc: "Carregam em seu sangue ecos de criaturas lendárias. Além dos animais comuns, podem assumir formas mitológicas como dragões, grifos ou fênix. Essas transformações são mais difíceis de manter e consomem grande energia.",
        abilityName: "Forma Mitológica",
        abilityDesc: "Acesso a formas de criaturas lendárias. Consome grande energia e exige alto nível de controle."
      },
      {
        name: "🦖 Metamorfo Primordial (Raro)",
        desc: "Têm conexão com eras antigas. Podem se transformar em criaturas pré-históricas como dinossauros, mamutes ou tigres-dentes-de-sabre. Suas formas são maiores, mais brutais e exigem forte controle instintivo.",
        abilityName: "Forma Primordial",
        abilityDesc: "Acesso a formas pré-históricas brutais e de grande porte. Exige alto controle instintivo."
      }
    ]
  },
  {
    emoji: "🐉",
    name: "Draconiano",
    creator: "Dante, Takashi e JP",
    description: "Descendentes diretos dos antigos Dragões primordiais, os Draconianos são uma raça que surgiu quando o poder dracônico se misturou à magia do mundo, moldando criaturas capazes de assumir formas mais próximas das humanas.\n\nEmbora tenham desenvolvido cultura, linguagem e sociedades complexas, o sangue dos dragões ainda pulsa forte em seus corpos. Escamas resistentes, sentidos aguçados e uma ligação natural com os elementos são traços comuns entre todos os Draconianos.\n\nApesar de sua aparência humanoide, sua fisiologia continua parcialmente dracônica: possuem metabolismo forte, maior resistência física e afinidade natural com magia elemental.",
    abilities: [
      { name: "Escamas Adaptáveis", desc: "As escamas dracônicas do Draconiano carregam afinidade elemental. Ao criar o personagem, o jogador deve escolher um elemento base (Fogo, Água, Terra, etc.). O Draconiano recebe 30% de resistência natural contra esse elemento." }
    ],
    subraces: [
      {
        name: "Dragonatas 🐲",
        image: "kensword_database/kensword_photos/Draconato.jpg",
        appearance: "Aparência bestial, pode ter até 4 metros e com detalhes do dragão que descende. Costuma viver 800 anos.",
        desc: "Os Dragonatas são os Draconianos mais próximos de seus ancestrais dragões. Seus corpos são maiores, mais robustos e cobertos por escamas mais grossas. Possuem chifres, cauda desenvolvida e traços faciais mais bestiais, lembrando verdadeiros híbridos entre humano e dragão. Muitos Dragonatas vivem na região de Rakuyo, onde tribos e clãs guerreiros mantêm tradições antigas ligadas aos dragões. São conhecidos por sua força física, resistência e temperamento intenso.",
        abilityName: "Sopro Dracônico + Bônus Passivo",
        abilityDesc: "O Dragonata é capaz de liberar pela boca uma rajada concentrada de seu elemento base. O sopro pode assumir forma de cone ou linha em um alcance de 10 metros, causando +30% de dano elemental aos inimigos à frente. Após o uso, tempo de recarga de 2 turnos. Bônus Passivo: Dragonatas possuem +20% de resistência e força física natural devido à densidade de suas escamas e corpo robusto."
      },
      {
        name: "Dragonetes 🐲",
        image: "kensword_database/kensword_photos/Dragonewt.jpg",
        appearance: "Aparência humana com detalhes dracônicos como asas, chifres ou caudas. Costuma viver 800 anos.",
        desc: "Dragonetes representam a evolução mais refinada dos Draconianos. Seus corpos são mais próximos dos humanos, com escamas mais discretas espalhadas pelo corpo e traços dracônicos mais sutis. Apesar da aparência mais elegante e menos monstruosa, continuam possuindo sangue dracônico poderoso. Dragonetes são frequentemente associados a magia, inteligência estratégica e controle mais refinado de energia elemental. Muitos se integram facilmente em sociedades humanoides, atuando como magos, estudiosos ou líderes.",
        abilityName: "Fluxo Dracônico",
        abilityDesc: "Dragonetes possuem maior controle da energia elemental em seus corpos. Quando utilizam magias ou habilidades do elemento base, recebem: +20% de eficiência elemental (dano, duração ou efeito) e redução de 10% no custo de mana dessas habilidades."
      }
    ]
  },
  {
    emoji: "🩸",
    name: "Vampiro",
    creator: "Venom e JP",
    description: "Vampiros são pessoas, monstros ou outra criatura que tenha caído na tentação ou lábia de algum outro vampiro, o que torna essa raça uma exceção das demais já que sua reprodução ou e própria ou se espalha como uma doença havendo até 3 tipos de vampiros e listamos aqui suas habilidades e tipos, além de que sua sociedade é feita com certa ignorância, vampiros não tem afeição pela vida e seus relacionamentos são baseados em puro interesse e egoísmo excêntrico, e qualquer raça que se transforme em vampiro, tem seu melhor traço invertido (como bondade virando maldade, Lealdade virando traição e assim por diante, quanto mais forte esse traço, mais forte a inversão), e são pouquissimos os vampiros que tem bons traços de personalidade.\n\n{obs: Vampiros tem seus traços raciais anteriores, mas reduzidos em 50%}",
    abilities: [
      { name: "Dádiva Do Sangue", desc: "Dá a vampiros a capacidade de manipular e moldar o próprio sangue, além de que torna sua mordida um veneno paralisante de um turno e infeccioso, que transforma vítimas virgens em vampiros reais, e em demais variações, suas contrapartes. Possuem uma leve regeneração, conseguindo cicatrizar cortes leves e ossos fraturados em alguns segundos (1 turno). Tem fraqueza ao sol, morrendo se pegos por completo pela luz, mas vampiros reais ou superiores conseguem resistir por um ou mais turnos sendo cobertos pelo sol. Exceto pelos Ghouls e variantes, vampiros tomam e possivelmente morrem com estacas no coração devidamente colocadas, recebem debuff de 1/2 dos seus buffs revogados caso sejam cobertos por algo ou energia sagrada e vampiros reais só podem entrar na casa de alguém com permissão." }
    ],
    subraces: [
      {
        name: "Vampiro Real",
        image: "kensword_database/kensword_photos/Vampire.jpg",
        appearance: "Aparência pálida, pele fria, corpo belo e esbelto. Costumam viver uma vida eterna.",
        desc: "Vampiros nascidos puro sangue ou vindo da infecção de um virgem, vampiros dessa casta são mais intelectuais e formidáveis, costumam atuar na sociedade de forma disfarçada como barões ou senhores de terra e principalmente, tem um desprezo por praticamente tudo, até por seus próprios companheiros de espécie, que são consideradas ameaças a sua estatura.",
        abilityName: "Benefício Do Sangue",
        abilityDesc: "Vampiros reais possuem uma força, velocidade de reação e de locomoção, passivamente maior em 15%, e passivamente +10% em suas resistências e +5% em seus poderes mágicos, possuem inatamente uma telecinese padrão que controla objetos de tamanhos similares a uma espada longa (não um espadão do guts) e seu sangue pode transformar impuros em vampiros reais. Além de terem sentidos naturalmente aprimorados e que podem ser melhorados com o tempo, tendo uma noção quase perfeita do cenário a sua volta em um raio de 3m. Resiste a 1 turno sob o sol."
      },
      {
        name: "Vampiro Impuro",
        image: "kensword_database/kensword_photos/Impure_Vampire.jpg",
        appearance: "Aparência pálida ou acinzentada, corpo não tão atraente. Costumam viver uma vida eterna.",
        desc: "Vampiros que nasceram de corpos não virgens, ou maculados e afligidos, seu corpo não tem uma aparência esbelta e bela como seus superiores, e não são tão atraentes, mas possuem ainda inteligência, e seu comportamento mais próximo ao animal torna essas criaturas bem violentas mas astutas.",
        abilityName: "Junção A Nosferatu",
        abilityDesc: "Impuros não são tão fortes quanto vampiros reais, possuindo apenas metade dos benefícios que os reais possuem, além de não terem super sentidos, mas em contra partida possuem a capacidade de se camuflar nas sombras entrando nelas, e seu vírus vampiro se espalha até pelo próprio sangue, criando lacaios de forma mais prática e rápida. Possuem a capacidade de se mexer pelas sombras que estão conectadas entre si. Podem ascender para vampiros reais se for-lhes concedido sangue de seu Lorde/vampiro que o transformou."
      },
      {
        name: "Ghoul da Noite",
        image: "kensword_database/kensword_photos/Ghoul.jpg",
        appearance: "Aparência grotesca, Corpo zumbificado. Costumam viver uma vida eterna.",
        desc: "Ghouls da noite são cadáveres putrefatos ou pessoas deficientes e extremamente flagelados que receberam a contaminação dos Vampiros, seus corpos reanimados e arcaicamente desengonçados, liberam um ar e cheiro de morte e podridão por onde passam, além de serem quase totalmente desprovidos de inteligência, pensando como animais, o que e horrível de se pensar que seu corpo estará em uma agonia eterna em que não se pode escapar a um ponto em que sua mente se esqueceu de sofrer por isso, mas em contra partida, são mais letais que seus antecessores, ainda mais em número.",
        abilityName: "Soldado da Morte",
        abilityDesc: "Ghouls tem 20% a mais em velocidade e força, e tem -10% de resistência. Diferentemente de vampiros normais, ghouls são teoricamente imortais, seu corpo não para de se mexer mesmo despedaçado e estraçalhado, podendo se mexer mesmo se cada dedo e parte de seu corpo for separada, agindo como criaturas independentes, sendo a única forma de exterminar um Ghoul de verdade a luz do sol, energia sagrada ou vaporização de seu corpo. Ghouls tem uma tendência a mutações, podendo ser desde gigantificação, a braços em formatos de serra ou lâmina, deformação extrema e coisas bem grotescas."
      }
    ]
  },
  {
    emoji: "🐯",
    name: "Kobold",
    creator: "Dante",
    isMonster: true,
    image: "kensword_database/kensword_photos/Kobold.webp",
    appearance: "Aparência Bestial Lupina, Canina ou Felina, tamanho comum entre 70 cm a 1,50 metros. Costumam viver 80 anos mas aumenta ao evoluir.",
    description: "Os arqui-inimigos dos goblins, são seres semelhantes a canídeos e felinos bípedes, podendo chegar até dois metros de altura. Há relatos que eles evoluem para uma forma de vida superior, onde seu tempo de vida máximo se estende exponencialmente.",
    abilities: [
      { name: "Sociedade das Patas", desc: "Kobolds trabalham melhor em grupos, principalmente de sua espécie. Individualmente, eles possuem seus sentidos aguçados e uma resistência elemental de 25%, em grupo, eles se tornam mais fortes, cada um tem uma melhora em um sentido específico (escolha do player, é fixo), e a resistência sobe para 50%." },
      { name: "Proliferação da Espécie", desc: "Essa raça consegue se proliferar através de contato com a saliva ou sangue, desde que tenha a intenção." }
    ],
    subraces: []
  },
  {
    emoji: "🐲",
    name: "Drakobold",
    creator: "Dante",
    isMonster: true,
    image: "kensword_database/kensword_photos/Drakobold.jpg",
    appearance: "Aparência Bestial dracônica e reptiliana, tamanho comum entre 80 a 1,60 metros. Costumam viver 100 anos mas aumenta ao evoluir.",
    description: "Segundo os kobolds, são os seus primos rabugentos. Drakobolds são o rank mais baixo dos dragões, criaturas que parecem misturar a essência de um kobold com a linhagem dracônica. Eles se tornam adultos quando atingem dez anos, e são guerreiros natos que habitam as cavernas. É dito que podem evoluir para níveis superiores.",
    abilities: [
      { name: "Força das Escamas", desc: "Drakobolds são fortes por natureza, nascendo com uma vocação (decidida pelo player). Essa vocação é descoberta quando os pais apresentam os seus filhos para o Drakobold Ancião.\n• Vocação Drake: possuidores dessa vocação são guerreiros natos no físico, recebendo +10% de força física e resistência, além de possuírem um bônus de 10% em magias de reforço.\n• Vocação Dragon: Possuidores dessa Vocação tem uma alta chance de desenvolverem asas na evolução, além de obterem mais 10% nos atributos de magia e velocidade, além disso, possuem um bônus em magias ofensivas.\n• Vocação Hydra: Possuidores da Vocação Hydra tem grandes chances de serem mais robustos. Eles recebem mais 15% nas resistências e fortitude, além de terem um bônus de 10% em magias defensivas e de cura." },
      { name: "Proliferação da Espécie", desc: "Essa raça consegue se proliferar através de contato com a saliva ou sangue, desde que tenha a intenção." }
    ],
    subraces: []
  },
  {
    emoji: "👻",
    name: "Espírito",
    creator: "JP",
    image: "kensword_database/kensword_photos/Spirit.webp",
    appearance: "Forma espiritual variada, desde espectros a corpos idênticos aos de suas vidas passadas.",
    description: "Espíritos possuem diversas formas: seres compostos por mana, almas viventes de eras passadas, de outros mundos, emoções negativas ou espíritos da natureza. Sua velocidade de crescimento depende de sua origem. Espíritos nascidos da alma de pessoas normalmente têm um corpo semelhante à idade que tinham em vida.",
    abilities: [
      { name: "Espiritual", desc: "Espíritos já nascem manipulando um elemento. A manipulação tem a mesma distância e potência de uma cinese normal Nível 1, e a cada nível melhora como se fosse uma habilidade de manipulação de elemento." }
    ],
    subraces: []
  }
];
