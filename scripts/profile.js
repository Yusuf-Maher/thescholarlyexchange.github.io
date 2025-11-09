document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (!user) {
    // If not logged in, redirect to login page
    window.location.href = "login.html";
    return;
  }

  // Find the full user data from the list
  const currentUser = users.find(u => u.username === user.username);

  if (!currentUser) {
    alert("User data not found.");
    window.location.href = "login.html";
    return;
  }

  // Fill in the profile fields
  document.getElementById("profilePic").src = currentUser.pfp || "default-pfp.png";
  document.getElementById("usernameDisplay").textContent = currentUser.username;
  document.getElementById("fieldDisplay").textContent = currentUser.field || "Not specified";
  document.getElementById("workplaceDisplay").textContent = currentUser.workplace || "N/A";
  document.getElementById("educationDisplay").textContent = currentUser.education || "N/A";
  document.getElementById("researchDisplay").textContent = currentUser.researchAreas || "N/A";
  
  const link = document.getElementById("academicLinkDisplay");
  if (currentUser.academicLink) {
    link.href = currentUser.academicLink;
    link.textContent = "View Profile";
  } else {
    link.textContent = "No link provided";
    link.removeAttribute("href");
  }

  document.getElementById("bioDisplay").textContent = currentUser.bio || "No bio yet.";

  // Logout functionality
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});
