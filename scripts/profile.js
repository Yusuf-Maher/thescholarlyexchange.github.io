document.addEventListener("DOMContentLoaded", () => {
  // Get the logged-in username (string)
  const loggedInUsername = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (!loggedInUsername) {
    // If not logged in, redirect to login page
    window.location.href = "login.html";
    return;
  }

  // Find the full user data
  const currentUser = users.find(u => u.username === loggedInUsername);

  if (!currentUser) {
    alert("User data not found.");
    window.location.href = "login.html";
    return;
  }

  const navbarProfilePic = document.getElementById("navbarProfilePic");
if (navbarProfilePic) {
  navbarProfilePic.src = currentUser.pfp || "default-profile.png";
}
  
  // Fill in the profile fields
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

  // Logout functionality
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});
