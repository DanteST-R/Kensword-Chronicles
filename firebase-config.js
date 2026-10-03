// ================================================================
// KENSWORD CHRONICLES — Firebase Config (Global / No-module)
// Carregado como script normal via CDN do Firebase
// ================================================================

// Importa via CDN como script compat (sem módulos ES)
// Os scripts compat são carregados no index.html antes deste arquivo
// e expõem firebase.* globalmente.

const firebaseConfig = {
  apiKey: "AIzaSyBtX6bs0YOl3zeEh_dwvVMRzNct9vjpW28",
  authDomain: "kensword-chronicles.firebaseapp.com",
  projectId: "kensword-chronicles",
  storageBucket: "kensword-chronicles.firebasestorage.app",
  messagingSenderId: "902579670599",
  appId: "1:902579670599:web:708f4b9bd5c737359d6b62",
  measurementId: "G-E2ZNCMR4Q9"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const _auth = firebase.auth();
const _db   = firebase.firestore();
