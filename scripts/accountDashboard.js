import { backendURL } from "./url.js";

let activeModules = [];
const availableModules = [1, 2, 3, 4];
let username;
let userData;

async function checkAuth() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    window.location.href = "/account/login.html";
    return false;
  }
  return token;
}

function setActiveModules() {
  activeModules.forEach((element) => {
    const moduleLink = document.querySelector(`#module-${element} a`);
    moduleLink.classList.add("active-module");
    moduleLink.setAttribute("href", `/account/exercise/module${element}.html`);
  });

  const nonActiveModules = availableModules.filter(
    (i) => !activeModules.includes(i)
  );
  nonActiveModules.forEach((element) => {
    const moduleLink = document.querySelector(`#module-${element} a`);
    moduleLink.classList.add("restricted-module");
    moduleLink.addEventListener("click", showWarning);
  });
}

async function setUserData() {
  const token = await checkAuth();

  const email = document.querySelector(`#user-email`);
  const username = document.querySelector(`#user-username`);
  const nim = document.querySelector(`#user-nim`);
  const timestamp = document.querySelector(`#user-timestamp`);
  const usernameTitle = document.querySelector(`#user-id`);
  const fullname = document.querySelector(`#user-fullname`);

  const response = await fetch(backendURL + `user/getProgress/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
    }),
  });

  const data = await response.json();

  usernameTitle.innerHTML = userData.profile.username;
  email.innerHTML = userData.profile.email;
  fullname.innerHTML = userData.profile.fullname;
  username.innerHTML = userData.profile.username;
  nim.innerHTML = userData.profile.nim;
  timestamp.innerHTML = new Date(data.progress.timestamp).toLocaleString(
    "en-US",
    {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false    }
  ) + " WIB";
}

async function getUserProgress() {
  const token = await checkAuth();
  if (!token) return;

  try {
    const response = await fetch(backendURL + `user/getProgress/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
      }),
    });

    const data = await response.json();

    for (let i = 0; i < data.progress.module; i++) {
      activeModules.push(i + 1);
      console.log(i + 1);
    }

    if (data.status === "success") {
      console.log("User progress:", data.progress);
    }
    return data;
  } catch (error) {
    console.error("Error getting progress:", error);
    throw error;
  }
}

async function handleLogout() {
  sessionStorage.removeItem("token");
  window.location.href = "/";
}

function showWarning() {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.add("show");
}

function closeWarning() {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.remove("show");
}

async function initialize() {
  await getUserProgress();
  setActiveModules();

  const closeButton = document.querySelector(".close-warning");
  closeButton?.addEventListener("click", closeWarning);

  const logoutButton = document.querySelector("#logout-btn");
  logoutButton.addEventListener("click", handleLogout);
}

async function getUserData() {
  const token = await checkAuth();
  if (!token) return;

  try {
    const response = await fetch(backendURL + `user/getUserData/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString()
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = await checkAuth();
    if (!token) return;

    const content = document.getElementById("content");
    const loadingOverlay = document.getElementById("loading-overlay");
    await initialize();

    userData = await getUserData();

    await setUserData();

    content.classList.add("loaded");
    loadingOverlay.style.opacity = "0";
    loadingOverlay.style.transition = "opacity 0.3s ease-out";

    setTimeout(() => {
      loadingOverlay.style.display = "none";
      document.body.classList.remove("loading-active");
    }, 300);
  } catch (error) {
    console.error("Failed to initialize:", error);
    window.location.href = "/account/login.html";
  }
});
