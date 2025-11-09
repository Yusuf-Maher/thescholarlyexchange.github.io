let users = JSON.parse(localStorage.getItem("users")) || [];

const fieldInput = document.getElementById("fieldInput");
const fieldList = document.getElementById("fieldList");
const passwordInput = document.getElementById("password");
const passwordMessage = document.getElementById("passwordMessage");
const registerForm = document.getElementById("registerForm");
const pfpInput = document.getElementById("pfp");
const pfpPreview = document.getElementById("pfpPreview");
const message = document.getElementById("message");

const defaultPfp = "default-profile.png";
pfpPreview.src = defaultPfp;

pfpInput.addEventListener("input", () => {
  pfpPreview.src = pfpInput.value || defaultPfp;
});

const fields = [
  "----Astrophysics----",
  "Astrophysics of Galaxies",
  "Cosmology and Nongalactic Astrophysics",
  "Earth and Planetary Astrophysics",
  "High Energy Astrophysical Phenomena",
  "Instrumentation and Methods for Astrophysics",
  "Solar and Stellar Astrophysics",

  "----Condensed Matter----",
  "Disordered Systems and Neural Networks",
  "Materials Science",
  "Mesoscale and Nanoscale Physics",
  "Strongly Correlated Electrons",
  "Superconductivity",

  "----Mathematics----",
  "Algebraic Geometry",
  "Algebraic Topology",
  "Analysis of PDEs",
  "Statistics Theory",
  "Symplectic Geometry",

  "----Computer Science----",
  "Artificial Intelligence",
  "Computation and Language",
  "Computational Complexity",
  "Symbolic Computation",
  "Systems and Control",
];

passwordInput.addEventListener("input", () => {
  passwordMessage.textContent =
    passwordInput.value.length < 8 ? "Password must be at least 8 characters!" : "";
});

fieldInput.addEventListener("focus", () => {
  renderFieldList(fields);
});

fieldInput.addEventListener("input", () => {
  const query = fieldInput.value.toLowerCase();
  const filtered = fields.filter(f => f.toLowerCase().includes(query));
  renderFieldList(filtered);
});

document.addEventListener("click", (e) => {
  if (!fieldInput.contains(e.target) && !fieldList.contains(e.target)) {
    fieldList.style.display = "none";
  }
});

function renderFieldList(list) {
  fieldList.innerHTML = "";
  list.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    if (f.startsWith("----")) {
      li.classList.add("divider");
      li.style.pointerEvents = "none";
      li.style.color = "gray";
      li.style.fontWeight = "bold";
    } else {
      li.addEventListener("click", () => {
        fieldInput.value = f;
        fieldList.style.display = "none";
      });
    }
    fieldList.appendChild(li);
  });
  fieldList.style.display = "block";
}

registerForm.addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = passwordInput.value.trim();
  const field = fieldInput.value.trim();
  const academicLink = document.getElementById("academicLink").value.trim();
  const workplace = document.getElementById("workplace").value.trim();
  const educationLevel = document.getElementById("educationLevel").value;
  const researcherId = document.getElementById("researcherId").value.trim();
  const email = document.getElementById("email").value.trim();
  const pfp = document.getElementById("pfp").value.trim() || defaultPfp;
  const bio = document.getElementById("bio").value.trim();

  if (password.length < 8) {
    message.textContent = "Password must be at least 8 characters!";
    message.style.color = "red";
    return;
  }

  if (users.find(u => u.username === username)) {
    message.textContent = "Username already taken!";
    message.style.color = "red";
    return;
  }

  const newUser = {
    username,
    password,
    field,
    academicLink,
    workplace,
    educationLevel,
    researcherId,
    email,
    pfp,
    bio
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Registration successful!";
  message.style.color = "green";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});
