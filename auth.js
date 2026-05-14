import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Sua configuração do Firebase
const firebaseConfig = {
apiKey: "AIzaSyA_dfKpa7zNWkN4PANH0QTfqzj9j9Gujm0",
authDomain: "estante-publica.firebaseapp.com",
projectId: "estante-publica",
storageBucket: "estante-publica.firebasestorage.app",
messagingSenderId: "190769635660",
appId: "1:190769635660:web:1474f27911f45dbd17efe9"
};

// Inicializa o Firebase e a Autenticação
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// FUNÇÃO: Fazer Login com Google
export const loginGoogle = async () => {
try {
const result = await signInWithPopup(auth, provider);
console.log("Usuário logado:", result.user.displayName);
// Após logar, volta para a estante
window.location.href = "index.html";
} catch (error) {
console.error("Erro ao logar:", error.message);
alert("Erro ao fazer login: " + error.message);
}
};

// FUNÇÃO: Fazer Logout (Sair)
export const logout = async () => {
try {
await signOut(auth);
console.log("Usuário saiu.");
window.location.href = "index.html"; // Alterado para index para não prender o usuário no login
} catch (error) {
console.error("Erro ao sair:", error.message);
}
};

// MONITOR: Verifica quem está logado e controla o acesso
onAuthStateChanged(auth, (user) => {
const btnAdmin = document.getElementById('btn-admin'); // Botão "+ Adicionar" no index.html
const userEmail = "lumatheus.trabalho@gmail.com"; // SEU E-MAIL

if (user) {
console.log("Logado como: " + user.email);

// Se o e-mail logado for o seu, o botão de admin aparece
if (user.email === userEmail && btnAdmin) {
btnAdmin.style.display = "block";
} else if (btnAdmin) {
btnAdmin.style.display = "none";
}
} else {
// Se ninguém estiver logado, apenas garantimos que o admin não apareça
// mas NÃO redirecionamos para o login, permitindo a navegação livre.
console.log("Nenhum usuário logado (Modo Visitante).");
if (btnAdmin) btnAdmin.style.display = "none";

// Se o usuário tentar entrar na página admin.html sem estar logado:
if (window.location.pathname.includes("admin.html")) {
window.location.href = "login.html";
}
}
});

export { auth };