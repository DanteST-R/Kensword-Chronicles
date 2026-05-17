// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE RAÇAS
// Descrição: Vampiro
// ================================================================

const kensword_vampire_description = {
  emoji: "🩸",
  name: "Vampiro",
  creator: "Venom e JP",
  description: "Vampiros são pessoas, monstros ou criaturas que caíram na tentação de outro vampiro, tornando essa raça uma exceção: sua reprodução se espalha como uma doença. Há 3 tipos. Sua sociedade é marcada pela ignorância — vampiros não têm afeição pela vida e seus relacionamentos são baseados em puro interesse e egoísmo excêntrico. Qualquer raça que se torne vampiro tem seu melhor traço invertido (bondade vira maldade, lealdade vira traição — quanto mais forte o traço, mais intensa a inversão). Traços raciais anteriores são mantidos, mas reduzidos em 50%.",
  abilities: [
    { name: "Dádiva de Mogh", desc: "Concede a capacidade de manipular e moldar o próprio sangue. A mordida torna-se um veneno paralisante de 1 turno e infeccioso. Vampiros possuem leve regeneração (cicatrizam cortes leves e ossos fraturados em 1 turno). Fraqueza ao sol. Estacas no coração causam morte (exceto Ghouls). Água benta revoga metade dos buffs. Vampiros Reais só podem entrar em residências com permissão." }
  ],
  subraces: [
    {
      name: "Vampiro Real",
      image: "Photos/Vampire.jpg",
      appearance: "Aparência pálida, pele fria, corpo belo e esbelto. Costumam viver uma vida eterna.",
      desc: "Nascidos de puro sangue ou da infecção de um virgem. São mais intelectuais e formidáveis, atuando disfarçados na sociedade como barões ou senhores de terra. Têm desprezo por praticamente tudo, inclusive por outros vampiros.",
      abilityName: "Benefício do Sangue",
      abilityDesc: "+15% em Força, Velocidade de Reação e Locomoção passivos. +10% em Resistências e +5% em poderes mágicos. Telecinese padrão inata (objetos até o tamanho de uma espada longa). Sentidos aprimorados com percepção quase perfeita em raio de 3m. Resiste 1 turno sob o sol."
    },
    {
      name: "Vampiro Impuro",
      image: "Photos/Impure_Vampire.jpg",
      appearance: "Aparência pálida ou acinzentada, corpo não tão atraente. Costumam viver uma vida eterna.",
      desc: "Nascidos de corpos não virgens ou maculados. Aparência menos esbelta que os Reais. Comportamento mais próximo ao animal — violentos, mas astutos. Podem ascender para Vampiro Real se receberem sangue de seu Lorde.",
      abilityName: "Junção a Nosferatu",
      abilityDesc: "Possuem metade dos benefícios dos Vampiros Reais. Sem super sentidos. Em compensação, se camuflam e se movem pelas sombras conectadas. Seu vírus se espalha pelo próprio sangue, criando lacaios com facilidade."
    },
    {
      name: "Ghoul da Noite",
      image: "Photos/Ghoul.jpg",
      appearance: "Aparência grotesca, Corpo zumbificado. Costumam viver uma vida eterna.",
      desc: "Cadáveres putrefatos ou pessoas extremamente flageladas que receberam a contaminação vampírica. Corpos reanimados e desengonçados que liberam um ar de morte e podridão. Quase totalmente desprovidos de inteligência, pensam como animais — em uma agonia eterna que a mente esqueceu de sentir.",
      abilityName: "Soldado da Morte",
      abilityDesc: "+20% em Velocidade e Força, -10% em Resistência. Infectam e transformam qualquer um que seja arranhado ou mordido em 20 minutos. Imortais: o corpo continua se movendo mesmo despedaçado. Única forma de exterminar: luz do sol ou vaporização. Tendem a sofrer mutações grotescas (gigantificação, membros em forma de lâmina, etc.)."
    }
  ]
};
