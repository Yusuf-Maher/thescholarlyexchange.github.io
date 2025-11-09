
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
  "Other Condensed Matter",
  "Quantum Gases",
  "Soft Condensed Matter",
  "Statistical Mechanics",
  "Strongly Correlated Electrons",
  "Superconductivity",
  
  "----General Relativity and Quantum Cosmology----",
  "General Relativity and Quantum Cosmology",
  
  "----High Energy Physics----",
  "High Energy Physics - Experiment",
  "High Energy Physics - Lattice",
  "High Energy Physics - Phenomenology",
  "High Energy Physics - Theory",
  
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
  "Atomic and Molecular Clusters",
  "Atomic Physics",
  "Biological Physics",
  "Chemical Physics",
  "Classical Physics",
  "Computational Physics",
  "Data Analysis, Statistics and Probability",
  "Fluid Dynamics",
  "General Physics",
  "Geophysics",
  "History and Philosophy of Physics",
  "Instrumentation and Detectors",
  "Medical Physics",
  "Optics",
  "Physics and Society",
  "Physics Education",
  "Plasma Physics",
  "Popular Physics",
  "Space Physics",
  
  //Quantum Physics
  "Quantum Physics",
  
  "----Mathematics---",
  "Algebraic Geometry",
  "Algebraic Topology",
  "Analysis of PDEs",
  "Category Theory",
  "Classical Analysis and ODEs",
  "Combinatorics",
  "Commutative Algebra",
  "Complex Variables",
  "Differential Geometry",
  "Dynamical Systems",
  "Functional Analysis",
  "General Mathematics",
  "General Topology",
  "Geometric Topology",
  "Group Theory",
  "History and Overview",
  "Information Theory",
  "K-Theory and Homology",
  "Logic",
  "Mathematical Physics",
  "Metric Geometry",
  "Number Theory",
  "Numerical Analysis",
  "Operator Algebras",
  "Optimization and Control",
  "Probability",
  "Quantum Algebra",
  "Representation Theory",
  "Rings and Algebras",
  "Spectral Theory",
  "Statistics Theory",
  "Symplectic Geometry",
  
  "----Computer Science----",
  "Artificial Intelligence",
  "Computation and Language",
  "Computational Complexity",
  "Computational Engineering, Finance, and Science",
  "Computational Geometry",
  "Computer Science and Game Theory",
  "Computer Vision and Pattern Recognition",
  "Computers and Society",
  "Cryptography and Security",
  "Data Structures and Algorithms",
  "Databases",
  "Digital Libraries",
  "Discrete Mathematics",
  "Distributed, Parallel, and Cluster Computing",
  "Emerging Technologies",
  "Formal Languages and Automata Theory",
  "General Literature",
  "Graphics",
  "Hardware Architecture",
  "Human-Computer Interaction",
  "Information Retrieval",
  "Information Theory",
  "Logic in Computer Science",
  "Machine Learning",
  "Mathematical Software",
  "Multiagent Systems",
  "Multimedia",
  "Networking and Internet Architecture",
  "Neural and Evolutionary Computing",
  "Numerical Analysis",
  "Operating Systems",
  "Other Computer Science",
  "Performance",
  "Programming Languages",
  "Robotics",
  "Social and Information Networks",
  "Software Engineering",
  "Sound",
  "Symbolic Computation",
  "Systems and Control",
  
  "----Quantitative Biology----",
  "Biomolecules",
  "Cell Behavior",
  "Genomics",
  "Molecular Networks",
  "Neurons and Cognition",
  "Other Quantitative Biology",
  "Populations and Evolution",
  "Quantitative Methods",
  "Subcellular Processes",
  "Tissues and Organs",
  
  "----Quantitative Finance----",
  "Computational Finance",
  "Economics",
  "General Finance",
  "Mathematical Finance",
  "Portfolio Management",
  "Pricing of Securities",
  "Risk Management",
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
    li.addEventListener("click", () => {
      fieldInput.value = f;
      fieldList.style.display = "none";
    });
    fieldList.appendChild(li);
  });

  fieldList.style.display = "block";
});

// Filter as you type
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
    li.addEventListener("click", () => {
      fieldInput.value = f;
      fieldList.style.display = "none";
    });
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
