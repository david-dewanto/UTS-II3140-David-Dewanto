import { backendURL } from "./url.js";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loader() {
  const overlayContainer = document.createElement('div');
  overlayContainer.className = 'loader-overlay';

  const submitButton = document.querySelector(".submit-button");
  if (!submitButton) return;

  const loaderHTML = `Register
    <div class="ui segment">
      <div class="ui active inverted dimmer">
        <div class="ui text loader" style="position: fixed; background-color: transparent; z-index:9500; color:black;">Loading...</div>
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
  const warningMessageBtn = document.querySelector("#close-btn")
  warningMessage?.classList.add("show");
  warningMessage.style.backgroundColor = color;
  if (color == "#ff7d7d") {
    warningMessage.style.color = "white";
    warningMessageBtn.style.color = "white";
  } else {
    warningMessage.style.color = "black";
    warningMessageBtn.style.color = "black";
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

function createOrUpdateValidationMessage(parentElement, message, color, className) {
  let validationDiv = parentElement.querySelector('.' + className);
  if (!message) {
    if (validationDiv) {
      validationDiv.remove();
    }
    return;
  }

  if (!validationDiv) {
    validationDiv = document.createElement('div');
    validationDiv.className = className;
    parentElement.appendChild(validationDiv);
  }

  validationDiv.innerHTML = `
    <div style="color: ${color}; background-color:white !important; font-weight:600">
      ${message}
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const nimInput = document.getElementById("NIM");
  const usernameInput = document.getElementById("username");

  const checkNIM = (nim) => {
    const isValid = /^\d{8}$/.test(nim);
    createOrUpdateValidationMessage(
      nimInput.parentNode,
      !isValid && nim ? "Input valid NIM" : "",
      "#ff4444",
      'nim-validation'
    );
    return isValid;
  };

  const checkUsername = (username) => {
    const isValidFormat = /^[A-Za-z0-9_-]{1,8}$/.test(username);
    createOrUpdateValidationMessage(
      usernameInput.parentNode,
      !isValidFormat && username ? "Username must be 1-8 characters, using only letters, numbers, underscore (_) or hyphen (-)" : "",
      "#ff4444",
      'username-validation'
    );
    return isValidFormat;
  };

  if (nimInput) {
    nimInput.addEventListener("input", () => {
      checkNIM(nimInput.value);
    });
  }

  if (usernameInput) {
    usernameInput.addEventListener("input", () => {
      checkUsername(usernameInput.value);
    });
  }

  const checkPasswordStrength = (password) => {
    let strength = 0;
    let feedback = [];

    if (password.length >= 6) {
      strength += 1;
    } else {
      feedback.push("At least 6 characters");
    }

    if (/[A-Z]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("At least one uppercase letter");
    }

    if (/[0-9]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("At least one number");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1;
    } else {
      feedback.push("At least one special character");
    }

    return { strength, feedback };
  };

  const updatePasswordStrength = () => {
    const result = checkPasswordStrength(passwordInput.value);
    let strengthText = "";
    let strengthColor = "";

    switch (result.strength) {
      case 0:
        strengthText = "Very Weak";
        strengthColor = "#ff4444";
        break;
      case 1:
        strengthText = "Weak";
        strengthColor = "#ffa700";
        break;
      case 2:
        strengthText = "Fair";
        strengthColor = "#5f6368";
        break;
      case 3:
        strengthText = "Good";
        strengthColor = "#4ed44e";
        break;
      case 4:
        strengthText = "Strong";
        strengthColor = "#008f00";
        break;
    }

    const message = passwordInput.value ? `
      <div style="background-color:white">
        <div style="background-color:white !important">Strength: ${strengthText}</div>
        ${result.feedback.length > 0 
          ? `<div style="color: #666; background-color: white !important; font-size: 0.8em;">Required: ${result.feedback.join(", ")}</div>`
          : ""}
      </div>
    ` : "";

    createOrUpdateValidationMessage(
      passwordInput.parentNode,
      message,
      strengthColor,
      'password-strength-validation'
    );

    return result;
  };

  const updatePasswordMatch = () => {
    const message = confirmPasswordInput.value
      ? (passwordInput.value === confirmPasswordInput.value
          ? "All Good :) Password Match"
          : "Passwords do not match")
      : "";
    
    const color = passwordInput.value === confirmPasswordInput.value
      ? "#c7c5c5"
      : "#ff4444";

    createOrUpdateValidationMessage(
      confirmPasswordInput.parentNode,
      message,
      color,
      'password-match-validation'
    );
  };

  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
      updatePasswordStrength();
      if (confirmPasswordInput.value) {
        updatePasswordMatch();
      }
    });
  }

  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("input", updatePasswordMatch);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      loader();
      // console.log("Form submitted");

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const nim = document.getElementById("NIM").value;
      const username = document.getElementById("username").value;
      const fullname = document.getElementById("nama").value;

      if (password !== confirmPassword) {
        changeWarningMessage("Password Do Not Match!");
        showWarning("#ff7d7d");
        resetLoader();
        return;
      }

      if (password.length < 6) {
        changeWarningMessage("Password Must Have More than 6 Characters");
        showWarning("#ff7d7d");
        resetLoader();
        return;
      }

      const strengthResult = checkPasswordStrength(password);
      if (strengthResult.strength < 2) {
        changeWarningMessage("Password is Too Weak");
        showWarning("#ff7d7d");
        resetLoader();
        return;
      }

      try {
        const response = await fetch(backendURL + "user/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            nim: nim,
            username: username,
            fullname:fullname,
            timestamp: new Date().toISOString()
          }),
        });

        // console.log("Response status:", response.status);

        const data = await response.json();
        // console.log("Response data:", data);

        if (data.status === "success") {
          changeWarningMessage("Success! Verify your Email to Login, Redirecting...");
          showWarning("#99ff7d");
          await sleep(5000);
          window.location.href = "/account/login.html";
        } else {
          if (data.message?.includes("EMAIL_EXISTS")) {
            changeWarningMessage("You already have an Account, Please Login :)");
            showWarning("#ff7d7d");
          } else {
            changeWarningMessage(data.message || "An error occurred during login");
            showWarning("#ff7d7d");
          }
        }
      } catch (error) {
        // console.error("Error details:", error);
        changeWarningMessage("An error occurred during registration");
        showWarning("#ff7d7d");
      } finally {
        resetLoader();
      }
    });
  }

  const closeButton = document.querySelector("#close-btn");
  if (closeButton) {
    closeButton.addEventListener("click", closeWarning);
  }
});