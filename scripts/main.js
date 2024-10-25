import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA50buZYQIaMFqQRwhj-J-OqvLLvnM2b_s",
  authDomain: "uts-david-dewanto.firebaseapp.com",
  projectId: "uts-david-dewanto",
  storageBucket: "uts-david-dewanto.appspot.com",
  messagingSenderId: "1062084535351",
  appId: "1:1062084535351:web:f0f24d3b8c3b7ea2e84bb2",
  measurementId: "G-VDEJ575Y5C",
};

var userDemo;
const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", function () {
  const googleLoginBtn = document.getElementById("google-login-btn");
  googleLoginBtn.addEventListener("click", function () {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        window.location.href = "/account/account-dashboard.html";
        localStorage.setItem('username', user.displayName);  
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  });
});
