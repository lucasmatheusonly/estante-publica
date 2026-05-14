const firebaseConfig = {
  apiKey: "AIzaSyA_dfKpa7zNWkN4PANH0QTfqzj9j9Gujm0",
  authDomain: "estante-publica.firebaseapp.com",
  projectId: "estante-publica",
  storageBucket: "estante-publica.firebasestorage.app",
  messagingSenderId: "190769635660",
  appId: "1:190769635660:web:1474f27911f45dbd17efe9",
  measurementId: "G-GZ9Y9FS9P8"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const btnGoogle = document.getElementById('btn-google-login');

if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // Login com sucesso!
                console.log("Usuário logado:", result.user.displayName);
                // Redireciona para a sua estante
                window.location.href = 'index.html'; 
            })
            .catch((error) => {
                console.error("Erro no login:", error.code, error.message);
                alert("Erro ao conectar com o Google.");
            });
    });
}