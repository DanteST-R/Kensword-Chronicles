// ================================================================
// KENSWORD CHRONICLES — BANCO DE DADOS DE HABILIDADES
// Habilidades de Demi-Humanos
// ================================================================

const kensword_demihuman_abilities = [
  {
    name: "Sentidos Melhorados",
    category: "Demi-Humano",
    type: "Demi-humano",
    description: "Melhora os sentidos, aumentando 0,5 metros de alcance.",
    details: "",
    scaling: "Sobe 0,5 metros por level."
  },
  {
    name: "Calor da Batalha",
    category: "Demi-Humano",
    type: "Demi-humano",
    description: "Quando em combate, aumenta os sentidos em 1 metro e os atributos em 5%.",
    details: "",
    scaling: "Aumenta 1 metro por level, com limite de 10. Aumenta 1% por level, com limite de 15%."
  },
  {
    name: "Tranquilidade",
    category: "Demi-Humano",
    type: "Demi-humano",
    description: "[Passiva] Fora de combate, regenera 2% de HP por turno, ou 100% caso esteja fora de combate por 1 dia (24 horas). [Ativa] Em combate, ao ativar essa habilidade, o usuário se concentra e tranquiliza seu corpo, dissipando todos os efeitos negativos, com recarga de 5 turnos.",
    details: "",
    scaling: "Fixo"
  },
  {
    name: "Imitação da Espécie",
    category: "Demi-Humano",
    type: "Demi-humano",
    description: "Aprende as habilidades [Vontade de Viver] e [Inovação e Progresso], então desbloqueia as habilidades humanas para aprender.",
    details: "",
    scaling: "Fixo"
  },
  {
    name: "Transmutação de Pasto",
    category: "Demi-Humano",
    type: "Demi-humano Vaca",
    description: "Aumenta Resistência e Magia em 1%. Toda vegetação que a bovina come é processada no seu leite, gerando uma bebida nutritiva e curativa.",
    details: "",
    scaling: "Sobe 1% de Resistência e Magia por LvL, com limite de 20%."
  }
];
