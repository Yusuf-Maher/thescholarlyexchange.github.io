const container = document.querySelector('.container');
const popup = document.querySelector('.popup');
const popupView = document.querySelector('.popup-view');
const requestsBody = document.getElementById('requests');

// Arrays to store form data
let titles = [];
let links = [];
let descriptions = [];
let usernames = [];

// Variable to store the index of request being viewed
let viewIndex = null;

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
  usernames.push('blank'); // Add blank username
  
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
    tr.innerHTML = `
      <td>${usernames[i]}</td>
      <td>${titles[i]}</td>
      <td><a href="${links[i]}" target="_blank">${links[i]}</a></td>
      <td>
        <button class="view-btn" onclick="showViewPopup(${i})">View</button>
        <button class="delete-btn" onclick="deleteRequest(${i})">Delete</button>
      </td>
    `;
    requestsBody.appendChild(tr);
  }
}

function showViewPopup(index) {
  viewIndex = index;
  document.getElementById('viewDescription').textContent = descriptions[index];
  toggleView();
}

function acceptFromView() {
  if (viewIndex !== null) {
    // Remove from all arrays
    titles.splice(viewIndex, 1);
    links.splice(viewIndex, 1);
    descriptions.splice(viewIndex, 1);
    usernames.splice(viewIndex, 1);
    
    // Reset view index
    viewIndex = null;
    
    // Refresh display and close popup
    displayRequests();
    toggleView();
  }
}

function deleteRequest(index) {
  // Remove from all arrays
  titles.splice(index, 1);
  links.splice(index, 1);
  descriptions.splice(index, 1);
  usernames.splice(index, 1);
  
  // Refresh display
  displayRequests();
}

// Call this on page load to show existing requests
displayRequests();
