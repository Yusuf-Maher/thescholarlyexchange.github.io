let users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const message = document.getElementById("loginMessage");

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    message.textContent = "Login successful!";
    message.style.color = "green";

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    message.textContent = "Invalid username or password!";
    message.style.color = "red";
  }
});
