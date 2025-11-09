document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUsername = localStorage.getItem("loggedInUser"); // username stored

  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const profileLink = document.getElementById("profileTab"); // fixed ID
  const navbarProfilePic = document.getElementById("navbarProfilePic");

  if (loggedInUsername) {
    const user = users.find(u => u.username === loggedInUsername);

    // Show the profile picture
    if (navbarProfilePic && user) {
      navbarProfilePic.src = user.pfp || "default-profile.png";
    }

    // Hide login/register links, show profile
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
    if (profileLink) profileLink.style.display = "inline-block";
  } else {
    // Not logged in → show login/register links
    if (loginLink) loginLink.style.display = "inline-block";
    if (registerLink) registerLink.style.display = "inline-block";
    if (profileLink) profileLink.style.display = "none";
    if (navbarProfilePic) navbarProfilePic.src = "default-profile.png";
  }
});
