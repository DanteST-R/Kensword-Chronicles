const RACES_DATA = [
  {
    emoji: "🙋",
    name: "Humano",
    creator: "Dante e Venom",
    image: "Photos/Human.jpg",
    appearance: "Aparência comum de humanos. Costumam viver 300 anos.",
    description: "Humanos são simples, mas são notados pela grande inteligência, que diferente das outras raças, não precisa evoluir para se tornar inteligente. O humano mais sábio que existiu foi o primeiro rei de Hogoku, Solomon. É dito que na era dele não houve guerras.",
    abilities: [
      { name: "Vontade de Viver", desc: "Humanos nascem com uma capacidade inata de desenvolver uma técnica denominada Punho do Espírito, que converte 25% de sua Velocidade em Magia. A aura mágica se manifesta nas mãos, braços e corpo, podendo aumentar sua durabilidade ou ataques mágicos." },
      { name: "Inovação e Progresso", desc: "Começa com Inteligência Nível 1. Magias ou Itens criados pelo humano recebem um bônus de 10% nos atributos base ou efeitos quando criados." }
    ],
    subraces: []
  },
  {
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
  },
  {
    emoji: "🐱",
    name: "Demi-Humano",
    creator: "Dante",
    image: "Photos/demihuman.webp",
    appearance: "Aparência varia do animal que descende, podendo ser desde cauda e orelhas a até mesmo pelos ou escamas no corpo caso seja um Demi-humano Bestial. Costumam viver 400 anos.",
    description: "São todo tipo de híbridos de humano com animal ou até monstro. Não são tão inteligentes quanto os humanos e suas características variam muito de espécie para espécie, mas são capazes de ser ótimos amigos.",
    abilities: [
      { name: "Primal", desc: "Os instintos dos híbridos são muito mais aguçados, e eles podem aumentar sua energia por um determinado tempo para lutar mais. Porém, como todo animal, estão sujeitos às mesmas desvantagens hormonais e temperamentais." },
      { name: "Habilidade de Espécie", desc: "Toda espécie de Demi-Humano tem acesso a uma habilidade exclusiva adicional." }
    ],
    subraces: []
  },
  {
    emoji: "🗿",
    name: "Gigante",
    creator: "Dante",
    image: "Photos/Giant.jpg",
    appearance: "Aparência normalmente humana e musculosa, tamanho tende a ser 8 a 10 Metros. Costumam viver 700 anos.",
    description: "Portando uma força descomunal, gigantes são seres enormes que medem de 8 a 10 metros em sua fase jovem. Mesmo sendo menos inteligentes que os humanos, são extremamente espertos em combate.",
    abilities: [
      { name: "Colosso", desc: "Para se adaptar ao seu corpo, gigantes desenvolveram força e resistência descomunais. Possuem um multiplicador de 50% nos pontos de Força e Resistência, mas a velocidade decai 15% inicialmente. Esse efeito se valida a cada 4 metros — de 50 para 100, 100 para 150, e assim por diante — assim como o debuff, que fica no máximo de 90%." }
    ],
    subraces: []
  },
  {
    emoji: "⛏️",
    name: "Anão",
    creator: "Venom",
    image: "Photos/Dwark.jpg",
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
  },
  {
    emoji: "♦️",
    name: "Demônio",
    creator: "Venom",
    image: "Photos/Demon.png",
    appearance: "Aparência normalmente ligada ao profano. Costumam viver 1.000 anos, aumenta conforme devora almas e pode acabar ficando imortal ao evoluir.",
    description: "Naturais do Império de Umbra, são criaturas variadas em aparência — podem ter muitas formas, geralmente associadas ao profano — conhecidas pela força física e mágica extremamente alta. Feitos para dominar, destroem seus inimigos com facilidade.",
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
  },
  {
    emoji: "🪽",
    name: "Valquíria",
    creator: "Dante",
    image: "Photos/Angel.jpg",
    appearance: "Aparência normalmente ligada ao sagrado. Costuma viver uma vida eterna.",
    description: "Valquírias são seres sagrados — mulheres e homens alados — que possuem os gloriosos elementos Luz e Sagrado. Esses guerreiros alados são leais à deusa Hikarium e fazem o que ela mandar sem questionar, tendo-a como fonte de inspiração e amor. Sua aparência é variada, sempre ligada ao sagrado.",
    abilities: [
      { name: "Julgamento", desc: "Além de controlarem os elementos Luz e Sagrado, as Valquírias exterminam monstros com muito mais facilidade graças à sua natureza divina, causando 50% a mais de dano em criaturas que contenham energia de Umbra." }
    ],
    subraces: []
  },
  {
    emoji: "🧚",
    name: "Fada",
    creator: "JP",
    image: "Photos/Fairy.jpg",
    appearance: "Asas translúcidas, tende a ter entre 30 a 50 centímetros. Costuma viver 500 anos.",
    description: "Espíritos da floresta comandados por suas superiores, as Dríades. São seres benéficos que cuidam das plantas, medindo até no máximo 30 centímetros.",
    abilities: [
      { name: "Com Um Toque Gentil", desc: "Fadas são dotadas da capacidade de cuidar e gerir desde o nascimento, tornando-as naturalmente aptas a usar magias que curam até ferimentos médios em 2 turnos, consumindo apenas 100 de mana por ferimento sem gastar slots. Também podem projetar buffs mágicos em aliados, aumentando seus atributos em 10%." }
    ],
    subraces: []
  },
  {
    emoji: "😈",
    name: "Pixie",
    creator: "Dante e JP",
    image: "Photos/Pixie.webp",
    appearance: "Não possui asas normalmente, tende a ter até 1 metro e aparência comumente ligada ao profano. Costuma viver 500 anos.",
    description: "São fadas que normalmente aparecem em lugares escuros. Gostam de aprontar e causar alvoroço, sendo muito travessas e possuindo o elemento Trevas. Pixies podem medir até 1 metro de altura.",
    abilities: [
      { name: "Caos Generalizado", desc: "Pixies podem manipular os sentidos de alvos em uma área de até 5 metros, regulando visão, audição e olfato com objetos táteis mas falhos. Enquanto presos na ilusão, os alvos recebem +15% de dano." }
    ],
    subraces: []
  },
  {
    emoji: "🐾",
    name: "Metamorfo",
    creator: "Dante e Takashi",
    image: "Photos/Metamorf.jpg",
    appearance: "Aparência varia da transformação atual e original, mantendo sutis traços animais.",
    description: "Raça rara e fascinante, conhecida por sua capacidade natural de assumir formas animais. Não copiam criaturas — despertam formas adormecidas em seu próprio sangue. Todo Metamorfo manifesta, ainda jovem, o seu Primeiro Despertar. Sua aparência original carrega traços sutis dessa criatura: olhos diferenciados, presas discretas, postura predatória ou marcas incomuns na pele. Sua transformação é completa e orgânica: ossos, músculos e sentidos se ajustam perfeitamente à nova forma. Por sua versatilidade e poder, são muito cobiçados, mas extremamente difíceis de capturar.",
    abilities: [
      { name: "Metamorfose", desc: "Metamorfos se transformam através de uma conexão natural com o fluxo da vida. Novas formas são desbloqueadas com treino, experiência e forte conexão com a espécie. Transformações mais poderosas exigem mais energia — quanto maior a criatura, maior o desgaste físico. Todas as sub-raças podem se transform em animais comuns." }
    ],
    subraces: [
      {
        name: "🐺 Metamorfo Ferino (Comum)",
        desc: "A linhagem mais estável e numerosa. Podem se transform em animais comuns, como lobos, águias, serpentes ou ursos. São versáteis, equilibrados e possuem ótimo controle sobre suas formas.",
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
  },
  {
    emoji: "🩸",
    name: "Vampiro",
    creator: "Venom e JP",
    description: "Vampiros são pessoas, monstros ou criaturas que caíram na tentação de outro vampiro, tornando essa raça uma exceção: sua reprodução se espalha como uma doença. Há 3 tipos. Sua sociedade é marcada pela ignorância — vampiros não têm afeição pela vida e seus relacionamentos são baseados em puro interesse e egoísmo excêntrico. Qualquer raça que se torne vampiro tem seu melhor traço invertido (bondade vira maldade, lealdade vira traição — quanto mais forte o traço, mais intensa a inversão). Traços raciais anteriores são mantidos, mas reduzidos em 50%.",
    abilities: [
      { name: "Dádiva de Mogh", desc: "Concede a capacidade de manipular e moldar o próprio sangue. A mordida torna-se um veneno paralisante de 1 turno e infeccioso. Vampiros possuem leve regeneração (cicatrizam cortes leves e ossos fraturados em 1 turno). Fraqueza ao sol. Estacas no coração causam morte (exceto Ghouls). Água benta revoga metade dos buffs. Vampiros Reais só podem entrar em residências com permissão." }
    ],
    subraces: [
      {
        name: "🧛 Vampiro Real",
        image: "Photos/Vampire.jpg",
        appearance: "Aparência pálida, pele fria, corpo belo e esbelto. Costumam viver uma vida eterna.",
        desc: "Nascidos de puro sangue ou da infecção de um virgem. São mais intelectuais e formidáveis, atuando disfarçados na sociedade como barões ou senhores de terra. Têm desprezo por praticamente tudo, inclusive por outros vampiros.",
        abilityName: "Benefício do Sangue",
        abilityDesc: "+15% em Força, Velocidade de Reação e Locomoção passivos. +10% em Resistências e +5% em poderes mágicos. Telecinese padrão inata (objetos até o tamanho de uma espada longa). Sentidos aprimorados com percepção quase perfeita em raio de 3m. Resiste 1 turno sob o sol."
      },
      {
        name: "🧟 Vampiro Impuro (Serviçal)",
        image: "Photos/Impure_Vampire.jpg",
        appearance: "Aparência pálida ou acinzentada, corpo não tão atraente. Costumam viver uma vida eterna.",
        desc: "Nascidos de corpos não virgens ou maculados. Aparência menos esbelta que os Reais. Comportamento mais próximo ao animal — violentos, mas astutos. Podem ascender para Vampiro Real se receberem sangue de seu Lorde.",
        abilityName: "Junção a Nosferatu",
        abilityDesc: "Possuem metade dos benefícios dos Vampiros Reais. Sem super sentidos. Em compensação, se camuflam e se movem pelas sombras conectadas. Seu vírus se espalha pelo próprio sangue, criando lacaios com facilidade."
      },
      {
        name: "💀 Ghoul da Noite",
        image: "Photos/Ghoul.jpg",
        appearance: "Aparência grotesca, Corpo zumbificado. Costumam viver uma vida eterna.",
        desc: "Cadáveres putrefatos ou pessoas extremamente flageladas que receberam a contaminação vampírica. Corpos reanimados e desengonçados que liberam um ar de morte e podridão. Quase totalmente desprovidos de inteligência, pensam como animais — em uma agonia eterna que a mente esqueceu de sentir.",
        abilityName: "Soldado da Morte",
        abilityDesc: "+20% em Velocidade e Força, -10% em Resistência. Infectam e transformam qualquer um que seja arranhado ou mordido em 20 minutos. Imortais: o corpo continua se movendo mesmo despedaçado. Única forma de exterminar: luz do sol ou vaporização. Tendem a sofrer mutações grotescas (gigantificação, membros em forma de lâmina, etc.)."
      }
    ]
  },
  {
    emoji: "🐯",
    name: "Kobold",
    creator: "Dante",
    isMonster: true,
    image: "Photos/Kobold.webp",
    appearance: "Aparência Bestial Lupina, Canina ou Felina, tamanho comum entre 70 cm a 1,50 metros. Costumam viver 80 anos mas aumenta ao evoluir.",
    description: "Os arqui-inimigos dos goblins, são seres semelhantes a canídeos e felinos bípedes, podendo chegar até dois metros de altura. Há relatos de que evoluem para uma forma de vida superior, onde seu tempo de vida máximo se estende exponencialmente.",
    abilities: [
      { name: "Sociedade das Patas", desc: "Kobolds trabalham melhor em grupos, principalmente de sua própria espécie. Individualmente, possuem sentidos aguçados e resistência elemental de 25%. Em grupo, cada um melhora um sentido específico (escolha fixa do jogador) e a resistência elemental sobe para 50%." }
    ],
    subraces: []
  },
  {
    emoji: "🐲",
    name: "Drakobold",
    creator: "Dante",
    isMonster: true,
    image: "Photos/Drakobold.jpg",
    appearance: "Aparência Bestial dracônica e reptiliana, tamanho comum entre 80 a 1,60 metros. Costumam viver 100 anos mas aumenta ao evoluir.",
    description: "Segundo os Kobolds, são seus primos rabugentos. O rank mais baixo dos dragões, misturando essência de Kobold com linhagem dracônica. Tornam-se adultos aos dez anos e são guerreiros natos que habitam cavernas. É dito que podem evoluir para níveis superiores.",
    abilities: [
      { name: "Força das Escamas", desc: "Drakobolds nascem com uma Vocação (decidida pelo jogador), descoberta quando os pais apresentam o filho ao Drakobold Ancião. | Vocação Drake: +10% Força Física e Resistência, +10% em magias de reforço. | Vocação Dragon: alta chance de desenvolver asas na evolução, +10% em Magia e Velocidade, bônus em magias ofensivas. | Vocação Hydra: corpo mais robusto, +15% Resistência e Fortitude, +10% em magias defensivas e de cura." }
    ],
    subraces: []
  },
  {
    emoji: "🌿",
    name: "Kouris",
    creator: "Dante",
    isMonster: true,
    image: "Photos/Kouris.jpg",
    appearance: "Aparência de planta monstruosa parasita ou bestial. Costuma viver 20 anos mas aumenta ao evoluir.",
    description: "Pequenas plantas diabretes, pragas com formas variadas. Diz-se que foram criados pelos elfos para atormentar os humanos. Possuem várias variações — as mais famosas são os parasitas e os animalescos. Dieta carnívora, aparência variada e costumam ser diurnos.",
    abilities: [
      { name: "Protean (também presente em Slimes)", desc: "Kouris e Slimes possuem alta adaptabilidade. Após derrotar um inimigo, pegam uma de suas melhores características (habilidade simples). Após aprender 5 habilidades simples, desbloqueiam um novo patamar — podem aprender magias. Após aprender 5 magias, podem aprender habilidades únicas (limite de 1 tipo por mês). Exemplo: Metatron é um tipo de habilidade única; variadas habilidades de Metatron podem ser aprendidas no mesmo mês." }
    ],
    subraces: []
  },
  {
    emoji: "🌸",
    name: "Floraune",
    creator: "Dante",
    isMonster: true,
    image: "Photos/Floraune.jpeg",
    appearance: "Aparência esbelta humanoide com detalhes de planta. cabelo tem cor da planta que descende. Costuma viver 80 anos mas pode aumentar ao evoluir.",
    description: "Mulheres-plantas originadas da Mãe Quinella. São muito belas, mas podem carregar grande brutalidade.",
    abilities: [
      { name: "Plantae", desc: "Uma Floraune possui e controla o Elemento Planta de forma perfeita." },
      { name: "Proliferação da Espécie — Seiva", desc: "Habilidade relacionada à propagação da espécie por meio de sua seiva." }
    ],
    subraces: []
  },
  {
    emoji: "👻",
    name: "Espírito",
    creator: "JP",
    image: "Photos/Spirit.webp",
    appearance: "Forma espiritual variada, desde espectros a corpos idênticos aos de suas vidas passadas.",
    description: "Espíritos possuem diversas formas: seres compostos por mana, almas viventes de eras passadas, de outros mundos, emoções negativas ou espíritos da natureza. Sua velocidade de crescimento depende de sua origem. Espíritos nascidos da alma de pessoas normalmente têm um corpo semelhante à idade que tinham em vida.",
    abilities: [
      { name: "Espiritual", desc: "Espíritos já nascem manipulando um elemento. A manipulação tem a mesma distância e potência de uma cinese normal Nível 1, e a cada nível melhora como se fosse uma habilidade de manipulação de elemento." }
    ],
    subraces: []
  },
  {
    emoji: "🦑",
    name: "Abissal",
    creator: "Dante",
    isMonster: true,
    image: "Photos/Abyssal.jpeg",
    appearance: "Aparência bestial monstruosa de criaturas das profundezas. Costumam viver 500 anos.",
    description: "Seres abissais, primitivos e raramente vistos na superfície. Apesar de viverem na escuridão, desenvolveram uma visão extremamente mortal que enxerga a longas distâncias e no escuro — inclusive na escuridão absoluta.",
    abilities: [
      { name: "Despertar Abissal", desc: "Começa apenas com visão ultra-noturna. Com o treino, a aparência muda completamente, tornando-se mais primitiva e mortal, assumindo as características de uma sub-espécie Abissal. Sub-espécies: Peixe-Lanterna (escamas rígidas +20% Resistência; fêmeas: Fusão Abissal; machos: Parasita Abissal), Lula Abissal (tentáculos +20% Força, ganha elementos Sombras e Água), Lagarto da Fossa (pés ágeis +20% Velocidade, ganha habilidade Regenerativo)." }
    ],
    subraces: []
  },
  {
    emoji: "👺",
    name: "Yokai",
    creator: "JP",
    description: "Criaturas autodidatas e livres, não obedecem a ninguém por um forte senso de liberdade. São diversas: Tengus territoriais das montanhas, Kappas aquáticos, encantadoras Kitsunes, assustadoras Yuki-Onnas, fofos Tanukis, entre outros. São neutros — caóticos por natureza, mas nem malignos como demônios, nem benevolentes como Valquírias.",
    abilities: [
      { name: "Sobrenaturalidade", desc: "Todos os Yokais são imunes a influências mentais de controle. São classificados como seres neutros e não sofrem efeitos de alinhamento." }
    ],
    subraces: [
      {
        name: "🦊 Kitsune / 😼 Bakeneko / 🦝 Tanuki",
        image: "Photos/Kitsune.jpg",
        appearance: "Kitsune: Aparência bela e esbelta. Bakeneko: Aparência betial felina e traiçoeira. Tanuki: Aparência bestial de guaxinim. Ambas costumam viver uma vida eterna.",
        desc: "Kitsune: raposas de 9 caudas, inteligentes e caóticas, raramente confiáveis mas muito variadas. Bakeneko: semelhantes às Kitsunes, porém gatos — acham que são donos do mundo. Tanuki: o mais fofo e tranquilo dos três, menos maldoso que uma Kitsune e menos convencido que um Bakeneko.",
        abilityName: "Transformismo",
        abilityDesc: "Kitsunes podem mudar sua forma para o que quiserem de forma imprevisível. Limite de 2m de largura/altura por nível."
      },
      {
        name: "👺 Tengu",
        image: "Photos/Tengu.jpg",
        appearance: "Aparência de pele escura ou avermelhada, com asas negras e normalmente cabelos brancos. Costumam viver uma vida eterna.",
        desc: "Demônios-pássaro de nariz longo, guardiões de montanhas e florestas. Territoriais e às vezes vivem em bandos. Dizem que pessoas orgulhosas viram Tengus ao morrer. Podem pregar peças nos outros.",
        abilityName: "Guardião das Montanhas",
        abilityDesc: "Possuem asas funcionais que amplificam força e agilidade. +10% de buff passivo em Velocidade e Força."
      },
      {
        name: "🐢 Kappa",
        image: "Photos/Kappa.webp",
        appearance: "Aparência calva e horrenda de ser do rio com casco.",
        desc: "Crianças do rio: criaturas calvas e horrendas que vivem em grupos. Odeiam sair da água para caçar. Buscam sangue e entranhas de suas vítimas — fontes dizem que gostam do fígado humano. Curiosamente, têm lendas de ter ensinado os humanos a realizar amputações. Preferem pepinos e adoram sumô.",
        abilityName: "Kappa Maki",
        abilityDesc: "Excelente regeneração. Ferimentos pequenos se recuperam em 2 cenas. Membros amputados se recuperam após 1 descanso longo."
      },
      {
        name: "👹 Oni",
        image: "Photos/Oni.jpg",
        appearance: "Aparência de pele que varia entre clara, escura, vermelha e azul normalmente, com chifres. Costumam viver uma vida eterna.",
        desc: "Representam tanto o Mal quanto a proteção e a punição divina. Complexos: alguns são mais humanos, outros mais bestiais. Normalmente vindos do pós-vida para buscar humanos para o inferno.",
        abilityName: "Primo de 3º Grau do Capeta",
        abilityDesc: "Conseguem transitar entre o pós-vida e o mundo comum. Não podem matar alguém sem motivo prévio — precisam de missão específica para agir."
      }
    ]
  }
];
