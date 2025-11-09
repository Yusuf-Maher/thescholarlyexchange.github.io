document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (!username) {
    window.location.href = "login.html";
    return;
  }

  const currentUser = users.find(u => u.username === username);

  if (!currentUser) {
    alert("User data not found.");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("profilePic").src = currentUser.pfp || "default-profile.png";
  document.getElementById("usernameDisplay").textContent = currentUser.username;
  document.getElementById("fieldDisplay").textContent = currentUser.field || "Not specified";
  document.getElementById("workplaceDisplay").textContent = currentUser.workplace || "N/A";
  document.getElementById("educationDisplay").textContent = currentUser.educationLevel || "N/A";
  
  const link = document.getElementById("academicLinkDisplay");
  if (currentUser.academicLink) {
    link.href = currentUser.academicLink;
    link.textContent = "View Profile";
  } else {
    link.textContent = "No link provided";
    link.removeAttribute("href");
  }

  document.getElementById("bioDisplay").textContent = currentUser.bio || "No bio yet.";

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});
