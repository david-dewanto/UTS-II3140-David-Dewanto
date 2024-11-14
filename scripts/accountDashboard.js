import { backendURL } from "./url.js";

let activeModules = [];
const availableModules = [1,2,3,4];
let username;

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

    username = sessionStorage.getItem("username")

    document.getElementById("user-id").innerHTML = username;
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

        for(let i = 0; i < data.progress.module; i++){
          activeModules.push(i+1);
          console.log(i+1);
        }

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

async function initialize(){
  getUserName();

  await getUserProgress();
  setActiveModules();
  
  const closeButton = document.querySelector('.close-warning');
  closeButton?.addEventListener('click', closeWarning);

  const logoutButton = document.querySelector('#logout-btn');
  logoutButton.addEventListener('click', handleLogout);
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const token = await checkAuth();
    if (!token) return;

    const content = document.getElementById('content');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    await initialize();

    content.classList.add('loaded');
    loadingOverlay.style.opacity = '0';
    loadingOverlay.style.transition = 'opacity 0.3s ease-out';
    
    setTimeout(() => {
      loadingOverlay.style.display = 'none';
      document.body.classList.remove('loading-active');
    }, 300);

  } catch (error) {
    console.error('Failed to initialize:', error);
  }
});