const container = document.querySelector('.container');
const popup = document.querySelector('.popup');
const popupView = document.querySelector('.popup-view');
const requestsBody = document.getElementById('requests');

// Check if user is logged in BEFORE anything else
const loggedInUsername = localStorage.getItem("loggedInUser");
if (!loggedInUsername) {
  window.location.href = "login.html";
  // Stop execution
  throw new Error("Not logged in");
}

// Declare currentUser at module level so all functions can access it
let currentUser = null;

// Arrays to store form data
let titles = [];
let links = [];
let descriptions = [];
let usernames = [];

// Variable to store the index of request being viewed
let viewIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("loggedInUser");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  currentUser = users.find(u => u.username === username);
  
  if (currentUser) {
    console.log("Logged in as:", currentUser.username);
    window.currentUser = currentUser; // Also make it globally accessible
  } else {
    console.warn("No user logged in. Redirecting...");
    alert("User data not found. Please log in again.");
    window.location.href = "login.html";
    return;
  }
  
  // Load existing requests from localStorage
  loadRequests();
  
  // Display existing requests after user is loaded
  displayRequests();
});

function loadRequests() {
  const savedRequests = JSON.parse(localStorage.getItem("peerReviewRequests")) || [];
  
  // Populate arrays from saved requests
  titles = savedRequests.map(req => req.title);
  links = savedRequests.map(req => req.link);
  descriptions = savedRequests.map(req => req.description);
  usernames = savedRequests.map(req => req.username);
}

function saveRequests() {
  const requests = [];
  for (let i = 0; i < titles.length; i++) {
    requests.push({
      title: titles[i],
      link: links[i],
      description: descriptions[i],
      username: usernames[i]
    });
  }
  localStorage.setItem("peerReviewRequests", JSON.stringify(requests));
}

function toggleRev() {
  container.classList.toggle('active');
  popup.classList.toggle('active');
}

function toggleView() {
  container.classList.toggle('active');
  popupView.classList.toggle('active');
}

function addRequest(event) {
  event.preventDefault(); // Prevent form submission
  
  // Get form values
  const title = document.getElementById('paperTitle').value;
  const link = document.getElementById('paperLink').value;
  const description = document.getElementById('description').value;
  
  // Add to arrays
  titles.push(title);
  links.push(link);
  descriptions.push(description);
  
  // Use currentUser.username (the logged-in user who is creating the request)
  if (currentUser) {
    usernames.push(currentUser.username);
  } else {
    usernames.push('Unknown');
  }
  
  // Save to localStorage
  saveRequests();
  
  // Display updated table
  displayRequests();
  
  // Clear form and close popup
  document.getElementById('paperTitle').value = '';
  document.getElementById('paperLink').value = '';
  document.getElementById('description').value = '';
  toggleRev();
}

function displayRequests() {
  // Clear current table body
  requestsBody.innerHTML = '';
  
  // Check if there are requests
  if (titles.length === 0) {
    requestsBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No requests yet</td></tr>';
    return;
  }
  
  // Create table rows for each request
  for (let i = 0; i < titles.length; i++) {
    const tr = document.createElement('tr');
    
    // Check if this request belongs to the current user
    const isOwnRequest = currentUser && usernames[i] === currentUser.username;
    
    // Show "View" button only if it's NOT the user's own request
    // Show "Delete" button only if it IS the user's own request
    const viewButton = !isOwnRequest 
      ? `<button class="view-btn" onclick="showViewPopup(${i})">View</button>` 
      : '';
    
    const deleteButton = isOwnRequest 
      ? `<button class="delete-btn" onclick="deleteRequest(${i})">Delete</button>` 
      : '';
    
    tr.innerHTML = `
      <td>${usernames[i]}</td>
      <td>${titles[i]}</td>
      <td><a href="${links[i]}" target="_blank">${links[i]}</a></td>
      <td>
        ${viewButton}
        ${deleteButton}
      </td>
    `;
    requestsBody.appendChild(tr);
  }
}

function showViewPopup(index) {
  // Double-check permission: only allow viewing if it's not the user's own request
  if (currentUser && usernames[index] === currentUser.username) {
    alert("You cannot review your own paper.");
    return;
  }
  
  viewIndex = index;
  document.getElementById('viewDescription').textContent = descriptions[index];
  toggleView();
}

function acceptFromView() {
  if (viewIndex !== null) {
    // Double-check permission: only allow accepting if it's not the user's own request
    if (currentUser && usernames[viewIndex] === currentUser.username) {
      alert("You cannot review your own paper.");
      toggleView();
      return;
    }
    
    console.log(`${currentUser ? currentUser.username : 'User'} accepted request from ${usernames[viewIndex]}`);
    
    // Remove from all arrays
    titles.splice(viewIndex, 1);
    links.splice(viewIndex, 1);
    descriptions.splice(viewIndex, 1);
    usernames.splice(viewIndex, 1);
    
    // Save updated requests
    saveRequests();
    
    // Reset view index
    viewIndex = null;
    
    // Refresh display and close popup
    displayRequests();
    toggleView();
  }
}

function deleteRequest(index) {
  // Only allow deletion of own requests
  if (!currentUser || usernames[index] !== currentUser.username) {
    alert("You can only delete your own requests.");
    return;
  }
  
  // Remove from all arrays
  titles.splice(index, 1);
  links.splice(index, 1);
  descriptions.splice(index, 1);
  usernames.splice(index, 1);
  
  // Save updated requests
  saveRequests();
  
  // Refresh display
  displayRequests();
}
