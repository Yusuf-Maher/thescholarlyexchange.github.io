document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const profileLink = document.getElementById("profileTab");
  const navbarProfilePic = document.getElementById("navbarProfilePic");

if (navbarProfilePic && loggedInUser) {
  navbarProfilePic.src = loggedInUser.pfp || "default-profile.png";
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
