// Load existing users from localStorage or start with an empty array
let users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent page reload

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Check if username already exists
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    message.textContent = "Username already taken!";
    message.style.color = "red";
    return;
  }

  // Add new user
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Registration successful!";
  message.style.color = "green";

  // Redirect to login page after 1 second
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});
