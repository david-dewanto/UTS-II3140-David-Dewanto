let activeModules = [1];
let availableModules = [1, 2, 3, 4];

function getUserName() {
  document.getElementById("user-id").innerHTML = localStorage.getItem("username");
}

function setActiveModules() {
  for (const element of activeModules) {
    let temp = document.querySelector(`#module-${element} a`);
    temp.classList.add("active-module");
    temp.setAttribute("href", `/account/exercise/module${element}.html`);
  }

  let nonActiveModules = availableModules.filter(i => !activeModules.includes(i));
  console.log(nonActiveModules);

  for (const element of nonActiveModules) {
    let temp = document.querySelector(`#module-${element} a`);
    temp.classList.add("restricted-module");
    temp.addEventListener("click", showWarning);
  }
}

function showWarning() {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.add("show");
}

function closeWarning() {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.remove("show");
  console.log("success");
}
document.addEventListener("DOMContentLoaded", () => {
  getUserName();
  setActiveModules();
  
  
});