
let users = JSON.parse(localStorage.getItem("users")) || [];

const passwordInput = document.getElementById("password");
const passwordMessage = document.getElementById("passwordMessage");

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.length < 8) {
    passwordMessage.textContent = "Password must be at least 8 characters!";
  } else {
    passwordMessage.textContent = "";
  }
});

document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const field = document.getElementById("field").value;
  const academicLink = document.getElementById("academicLink").value.trim();
  const researchAreas = document.getElementById("researchAreas").value.trim().split(",").map(s => s.trim());
  const workplace = document.getElementById("workplace").value.trim();
  const educationLevel = document.getElementById("educationLevel").value;
  const researcherId = document.getElementById("researcherId").value.trim();
  const email = document.getElementById("email").value.trim();
  const pfp = document.getElementById("pfp").value.trim();
  const bio = document.getElementById("bio").value.trim();

  const message = document.getElementById("message");

  if (password.length < 8) {
    message.textContent = "Password must be at least 8 characters!";
    message.style.color = "red";
    return;
  }

  // Check if username already exists
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    message.textContent = "Username already taken!";
    message.style.color = "red";
    return;
  }

  // Save new user
  users.push({
    username,
    password,
    role,
    field,
    academicLink,
    researchAreas,
    workplace,
    educationLevel,
    researcherId,
    email,
    pfp,
    bio
  });

  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Registration successful!";
  message.style.color = "green";

  // Redirect to login page after 1 second
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});
