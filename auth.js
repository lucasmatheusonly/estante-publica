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
// Recarrega a página atual para atualizar os menus
window.location.href = "index.html";
} catch (error) {
console.error("Erro ao sair:", error.message);
}
};

// MONITOR: Verifica quem está logado e controla o acesso
onAuthStateChanged(auth, (user) => {
const btnAdmin = document.getElementById('admin-link'); // ID atualizado para bater com seu index
const userInfo = document.getElementById('user-info');
const userEmailAdmin = "lumatheus.trabalho@gmail.com";

if (user) {
console.log("Logado como: " + user.email);

// Se o e-mail logado for o seu, o botão de admin aparece
if (user.email === userEmailAdmin && btnAdmin) {
btnAdmin.style.display = "block";
}

// Atualiza a interface se os elementos existirem na página
if (userInfo) {
userInfo.innerHTML = `
<span style="color: white; font-size: 14px; margin-right: 10px;">Olá, ${user.displayName.split(' ')[0]}</span>
<a href="#" id="btn-logout-auth" style="color: #bc9585; font-size: 12px;">(Sair)</a>
`;

// Adiciona o evento de clique ao botão de sair
document.getElementById('btn-logout-auth')?.addEventListener('click', (e) => {
e.preventDefault();
logout();
});
}
} else {
console.log("Nenhum usuário logado (Modo Visitante).");
if (btnAdmin) btnAdmin.style.display = "none";
if (userInfo) userInfo.innerHTML = `<a href="login.html">Entrar</a>`;

// Bloqueia acesso direto à página de admin se não estiver logado
if (window.location.pathname.includes("admin.html")) {
window.location.href = "login.html";
}
}
});

export { auth };