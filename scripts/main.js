import { backendURL } from "./url.js";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loader() {
  const overlayContainer = document.createElement('div');
  overlayContainer.className = 'loader-overlay';

  const submitButton = document.querySelector(".submit-button");
  if (!submitButton) return;

  const loaderHTML = `Sign In
    <div class="ui segment">
      <div class="ui active inverted dimmer">
        <div class="ui text loader" style="background-color: transparent; z-index:9500; color:black;">Loading...</div>
      </div>
    </div>
  `;

  document.body.appendChild(overlayContainer);
  submitButton.innerHTML = loaderHTML;
  submitButton.disabled = true; 
}

function resetLoader() {
  const submitButton = document.querySelector(".submit-button");
  
  const overlay = document.querySelector('.loader-overlay');
  overlay.remove();
  submitButton.innerHTML = "Sign In";
  submitButton.disabled = false;
}

function showWarning(color) {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.add("show");
  warningMessage.style.backgroundColor = color;
  if (color == "#ff7d7d") {
    warningMessage.style.color = "white";
  } else {
    warningMessage.style.color = "black;";
  }
  const warningMessageSpan = document.querySelector(".warning-message span");
  warningMessageSpan.style.backgroundColor = color;
}

function closeWarning() {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.remove("show");
}

function changeWarningMessage(warningMessage) {
  let placeholder = document.querySelector(".warning-message span");
  placeholder.innerHTML = warningMessage;
}

const modal = document.getElementById('forgotPasswordModal');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const closeBtn = document.getElementsByClassName('close')[0];
const forgotPasswordForm = document.getElementById('forgotPasswordForm');

forgotPasswordLink.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loader();

    const email = document.getElementById('resetEmail').value;

    try {
        const response = await fetch(backendURL + "user/forgotPassword/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            changeWarningMessage('Password reset email sent successfully. Please check your inbox!');
            showWarning("#99ff7d");
            modal.style.display = "none";
            forgotPasswordForm.reset();
            sleep(2000);
        } else {
          changeWarningMessage(data.message || 'Failed to send reset email. Please try again.');
          showWarning("#ff7d7d");
        }
    } catch (error) {
        console.error('Error:', error);
    } finally{
      resetLoader();
    }
});

document.addEventListener("DOMContentLoaded", () => {

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      loader();
      console.log("Form submitted");

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch(backendURL + "user/postSign/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("Response data:", data);

        if (data.status === "success") {
          sessionStorage.setItem("token", data.token);
          changeWarningMessage("Login Success, Redirecting...");
          showWarning("#99ff7d");
          await sleep(2000);
          window.location.href = "account-dashboard.html";
        } else {
          if (data.message?.includes("INVALID_LOGIN_CREDENTIALS")) {
            changeWarningMessage("Invalid E-mail or Password, Please Try Again");
            showWarning("#ff7d7d");
          }else if (data.message?.includes("EMAIL_NOT_VERIFIED")){
            changeWarningMessage("E-mail Not Verified, Please Check Your E-mail Inbox!");
            showWarning("#ff7d7d");
          }
            else {
            changeWarningMessage("An error occurred during login");
            showWarning("#ff7d7d");
          }
        }
      } catch (error) {
        console.error("Error details:", error);
      } finally{
        resetLoader();
      }
    });
  }
  const closeButton = document.querySelector("#close-btn");
    if (closeButton) {
      closeButton.addEventListener("click", closeWarning);
    }
});
