import { backendURL } from "./url.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
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
          localStorage.setItem("token", data.token);
          window.location.href = "account-dashboard.html";
        } else {
          alert("Login failed: " + data.message);
        }
      } catch (error) {
        console.error("Error details:", error);
        alert("Error during login. Please check the console for details.");
      }
    });
  }
});

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
            alert('Password reset email sent successfully. Please check your inbox.');
            modal.style.display = "none";
            forgotPasswordForm.reset();
        } else {
            alert(data.message || 'Failed to send reset email. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});