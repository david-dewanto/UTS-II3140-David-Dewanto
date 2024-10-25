import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA50buZYQIaMFqQRwhj-J-OqvLLvnM2b_s",
  authDomain: "uts-david-dewanto.firebaseapp.com",
  projectId: "uts-david-dewanto",
  storageBucket: "uts-david-dewanto.appspot.com",
  messagingSenderId: "1062084535351",
  appId: "1:1062084535351:web:f0f24d3b8c3b7ea2e84bb2",
  measurementId: "G-VDEJ575Y5C",
};

function handleLogout() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      localStorage.removeItem('username');
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

let activeModules = [1];
let availableModules = [1,2,3,4];

function getUserName(){
  document.getElementById("user-id").innerHTML = localStorage.getItem("username");
}

function setActiveModules(){
  for(const element of activeModules){
    let temp = document.querySelector(`#module-${element} a`);
    temp.classList.add("active-module");
    temp.setAttribute("href",`/account/exercise/module${element}.html`);
  }

  let nonActiveModules = availableModules.filter(i => !activeModules.includes(i));
  console.log(nonActiveModules);

  for (const element of nonActiveModules){
    let temp = document.querySelector(`#module-${element} a`);
    temp.classList.add("restricted-module");
    temp.addEventListener("click", showWarning);
  }
}

function showWarning(){
  let temp = document.querySelector(".warning-message");
  temp.classList.add("show");
}

function closeWarning(){
  let temp = document.querySelector(".warning-message");
  temp.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", () => {
  getUserName();
  setActiveModules();
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", handleLogout);
  const warningCloseBtn = document.getElementById("warning-close-btn");
  warningCloseBtn.addEventListener("click", closeWarning);
});
