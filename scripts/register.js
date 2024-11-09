import { backendURL } from "./url.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const passwordStrengthDiv = document.querySelector(".password-strength");
  const passwordMatchDiv = document.querySelector(".password-match");

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

    return {
      strength: strength,
      feedback: feedback,
    };
  };

  const checkPasswordMatch = () => {
    if (!passwordMatchDiv || !confirmPasswordInput.value) {
      if (passwordMatchDiv) {
        passwordMatchDiv.innerHTML = "";
      }
      return;
    }

    if (passwordInput.value === confirmPasswordInput.value) {
      passwordMatchDiv.innerHTML = `
        <div style="color: #00f700; margin-top: 5px; background-color:white; font-weight:600">
          Passwords Match
        </div>
      `;
    } else {
      passwordMatchDiv.innerHTML = `
        <div style="color: #ff4444; margin-top: 5px; background-color:white;font-weight:600">
          Passwords do not match
        </div>
      `;
    }
  };

  if (passwordInput) {
    passwordInput.addEventListener("input", () => {
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
          strengthColor = "#00f700";
          break;
      }

      if (passwordStrengthDiv) {
        passwordStrengthDiv.innerHTML = `
          <div style="margin-top: 5px; background-color:white">
            <div style="color: ${strengthColor};background-color:white; font-weight:600">Strength: ${strengthText}</div>
            ${
              result.feedback.length > 0
                ? `<div style="color: #666; font-size: 0.8em; margin-top: 5px; background-color:white; font-weight:600">
                Required: ${result.feedback.join(", ")}
              </div>`
                : ""
            }
          </div>
        `;
      }

      checkPasswordMatch();
    });
  }

  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener("input", checkPasswordMatch);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Form submitted");

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }

      const strengthResult = checkPasswordStrength(password);
      if (strengthResult.strength < 2) {
        alert(
          "Password is too weak!\n" +
            "Required: " +
            strengthResult.feedback.join(", ")
        );
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
          }),
        });

        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("Response data:", data);

        if (data.status === "success") {
          alert("Registration successful! Please login.");
          window.location.href = "/account/login.html";
        } else {
          alert("Registration failed: " + data.message);
        }
      } catch (error) {
        console.error("Error details:", error);
        alert(
          "Error during registration. Please check the console for details."
        );
      }
    });
  }
});
