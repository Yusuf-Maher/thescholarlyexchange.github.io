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

    // Save logged-in user in localStorage (optional)
    localStorage.setItem("loggedInUser", username);

    // Redirect to a protected page or home
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    message.textContent = "Invalid username or password!";
    message.style.color = "red";
  }
});
