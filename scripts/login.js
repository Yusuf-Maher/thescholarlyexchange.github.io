// Load users from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const message = document.getElementById("loginMessage");

  // Check if user exists
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    message.textContent = "Login successful!";
    message.style.color = "green";

    // Save logged-in user in localStorage
    localStorage.setItem("loggedInUser", username);

    // Update navbar profile picture
    const navbarProfilePic = document.getElementById("navbarProfilePic");
    if (navbarProfilePic) {
      navbarProfilePic.src = user.pfp || "default-profile.png";
    }

    const loginLink = document.getElementById("loginLink");
    const registerLink = document.getElementById("registerLink");
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
  } else {
    message.textContent = "Invalid username or password!";
    message.style.color = "red";
  }
});
