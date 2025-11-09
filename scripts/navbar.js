document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUser = localStorage.getItem("loggedInUser");

  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const profileLink = document.getElementById("profileLink");
  const navbarProfilePic = document.getElementById("navbarProfilePic");

  if (loggedInUser) {
    const user = users.find(u => u.username === loggedInUser);

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
  }
});
