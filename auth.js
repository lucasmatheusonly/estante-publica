import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Sua configuração do Firebase (Mantenha a mesma que você já usa)
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
        window.location.href = "login.html";
    } catch (error) {
        console.error("Erro ao sair:", error.message);
    }
};

// MONITOR: Verifica quem está logado e controla o acesso
onAuthStateChanged(auth, (user) => {
    const btnAdmin = document.getElementById('btn-admin'); // Botão "+ Adicionar" no index.html
    const userEmail = "seu-email@gmail.com"; // ESCREVA SEU E-MAIL AQUI

    if (user) {
        // Se houver alguém logado, podemos exibir o nome no console ou na tela
        console.log("Logado como: " + user.email);

        // TRAVA DE SEGURANÇA VISUAL:
        // Se o e-mail logado for o seu, o botão de admin aparece
        if (user.email === userEmail && btnAdmin) {
            btnAdmin.style.display = "block";
        } else if (btnAdmin) {
            btnAdmin.style.display = "none";
        }
    } else {
        // Se ninguém estiver logado e tentarem acessar páginas internas, redireciona
        console.log("Nenhum usuário logado.");
        if (btnAdmin) btnAdmin.style.display = "none";
        
        // Se você quiser que o site seja totalmente privado, 
        // descomente a linha abaixo para mandar pro login sempre:
        // if (!window.location.href.includes("login.html")) window.location.href = "login.html";
    }
});

export { auth };