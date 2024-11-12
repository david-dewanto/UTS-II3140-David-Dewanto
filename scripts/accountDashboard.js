import { backendURL } from "./url.js";

const activeModules = [1];
const availableModules = [1, 2, 3, 4];

async function checkAuth() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        window.location.href = '/account/login.html';
        return false;
    }
    return token;
}

function setActiveModules() {
  activeModules.forEach(element => {
    const moduleLink = document.querySelector(`#module-${element} a`);
    moduleLink.classList.add("active-module");
    moduleLink.setAttribute("href", `/account/exercise/module${element}.html`);
  });

  const nonActiveModules = availableModules.filter(i => !activeModules.includes(i));
  nonActiveModules.forEach(element => {
    const moduleLink = document.querySelector(`#module-${element} a`);
    moduleLink.classList.add("restricted-module");
    moduleLink.addEventListener("click", showWarning);
  });
}

async function getUserName() {
    const token = await checkAuth();
    if (!token) return;
    
    document.getElementById("user-id").innerHTML = "test";
}

function checkLogin(){
  if (sessionStorage.getItem("token")){
    window.location.href = "account-dashboard.html";
  }
}

async function getUserProgress() {
    const token = await checkAuth();
    if (!token) return;
    
    try {
        const response = await fetch(backendURL + `user/getProgress/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                timestamp: new Date().toISOString()
            })
        });
        
        const data = await response.json();
        if (data.status === 'success') {
            console.log('User progress:', data.progress);
        }
        return data;
    } catch (error) {
        console.error('Error getting progress:', error);
        throw error;
    }
}

async function handleLogout() {
  sessionStorage.removeItem('token');
  window.location.href = '/';
}

function showWarning() {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.add("show");
}

function closeWarning() {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", async () => {
  const token = await checkAuth();
    if (!token) return;
    
    await getUserName();
    setActiveModules();
    
    const closeButton = document.querySelector('.close-warning');
    closeButton?.addEventListener('click', closeWarning);

    const logoutButton = document.querySelector('#logout-btn');
    logoutButton.addEventListener('click', handleLogout);

    await getUserProgress();
});