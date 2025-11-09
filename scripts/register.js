let users = JSON.parse(localStorage.getItem("users")) || [];

const fieldInput = document.getElementById("fieldInput");
const fieldList = document.getElementById("fieldList");
const passwordInput = document.getElementById("password");
const passwordMessage = document.getElementById("passwordMessage");
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");
const pfpInput = document.getElementById("pfp");
const pfpPreview = document.getElementById("pfpPreview");

const defaultPfp = "default-profile.png";

pfpPreview.src = defaultPfp;

pfpInput.addEventListener("input", () => {
  pfpPreview.src = pfpInput.value || defaultPfp;
});

// Searchable list of fields
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

  "----General Relativity and Quantum Cosmology----",

  "General Relativity and Quantum Cosmology",

  "----High Energy Physics----",

  "High Energy Physics - Experiment",
  "High Energy Physics - Lattice",
  "High Energy Physics - Phenomenology",
  // Mathematical Physics
  "Mathematical Physics",

  "----Nonlinear Sciences----",

  "Adaptation and Self-Organizing Systems",
  "Cellular Automata and Lattice Gases",
  "Chaotic Dynamics",
  "Exactly Solvable and Integrable Systems",
  "Pattern Formation and Solitons",

  "----Nuclear Physics----",

  "Nuclear Experiment",
  "Nuclear Theory",

  "----Physics----",

  "Accelerator Physics",
  "Applied Physics",
  "Atmospheric and Oceanic Physics",
  //Quantum Physics
  "Quantum Physics",

  "----Mathematics---",

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

  "----Quantitative Biology----",

  "Biomolecules",
  "Cell Behavior",
  "Genomics",
  "Subcellular Processes",
  "Tissues and Organs",

  "----Quantitative Finance----",

  "Computational Finance",
  "Economics",
  "General Finance",
  "Statistical Finance",
  "Trading and Market Microstructure",

  "----Statistics----",

  "Applications",
  "Computation",
  "Machine Learning",
  "Methodology",
  "Other Statistics",
  "Statistics Theory",

  "----Electrical Engineering and Systems Science----",

  "Audio and Speech Processing",
  "Image and Video Processing",
  "Signal Processing",
  "Systems and Control",

  "----Economics----",

  "Econometrics",
  "General Economics",
  "Theoretical Economics"
];

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.length < 8) {
    passwordMessage.textContent = "Password must be at least 8 characters!";
  } else {
    passwordMessage.textContent = "";
  }
});

fieldInput.addEventListener("focus", () => {
  fieldList.innerHTML = "";
  
  fields.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;

    // Make section dividers non-clickable
    if (!f.startsWith("----") || !f.endsWith("----")) {
      li.addEventListener("click", () => {
        fieldInput.value = f;
        fieldList.style.display = "none";
      });
    } else {
      li.style.fontWeight = "bold"; 
      li.style.cursor = "default"; 
    }

    fieldList.appendChild(li);
  });

  fieldList.style.display = "block";
});

fieldInput.addEventListener("input", () => {
  const query = fieldInput.value.toLowerCase();
  fieldList.innerHTML = "";

  const filtered = fields.filter(f => f.toLowerCase().includes(query));

  if (filtered.length === 0) {
    fieldList.style.display = "none";
    return;
  }

  filtered.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;

    if (!f.startsWith("----") || !f.endsWith("----")) {
      li.addEventListener("click", () => {
        fieldInput.value = f;
        fieldList.style.display = "none";
      });
    } else {
      li.style.fontWeight = "bold";
      li.style.cursor = "default";
    }

    fieldList.appendChild(li);
  });

  fieldList.style.display = "block";
});


document.addEventListener("click", (e) => {
  if (!fieldInput.contains(e.target) && !fieldList.contains(e.target)) {
    fieldList.style.display = "none";
  }
});

registerForm.addEventListener("submit", e => {
  e.preventDefault();
  
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const field = fieldInput.value.trim();
  const academicLink = document.getElementById("academicLink").value.trim();
  const workplace = document.getElementById("workplace").value.trim();
  const educationLevel = document.getElementById("educationLevel").value;
  const researcherId = document.getElementById("researcherId").value.trim();
  const email = document.getElementById("email").value.trim();
  const pfp = document.getElementById("pfp").value.trim() || defaultPfp;
  const bio = document.getElementById("bio").value.trim();

  const message = document.getElementById("message");

  if (password.length < 8) {
    message.textContent = "Password must be at least 8 characters!";
    message.style.color = "red";
    return;
  }

  // Check if username already exists
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    message.textContent = "Username already taken!";
    message.style.color = "red";
    return;
  }

  // Save new user
  users.push({
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
  });

  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Registration successful!";
  message.style.color = "green";

  // Redirect to login page after 1 second
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
});
