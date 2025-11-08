// scripts/publications.js

// Static array for now — later you can fetch JSON or auto-generate it
const papers = [
  { title: "Paper 1: Quantum Synthesis", file: "../pdfs/Paper1.pdf" },
  { title: "Paper 2: Autonomous Flight", file: "../pdfs/Paper2.pdf" },
  { title: "Paper 3: AI Ethics Review", file: "../pdfs/Paper3.pdf" }
];

const container = document.getElementById('publications');
const searchBar = document.getElementById('searchBar');

function renderPapers(filter = "") {
  container.innerHTML = ""; // clear old
  const filtered = papers.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));

  if (filtered.length === 0) {
    container.innerHTML = "<p>No papers found.</p>";
    return;
  }

  filtered.forEach(paper => {
    const div = document.createElement('div');
    div.classList.add('paper-item');
    div.innerHTML = `<a href="${paper.file}" target="_blank">${paper.title}</a>`;
    container.appendChild(div);
  });
}

// Initial load
renderPapers();

// Live search
searchBar.addEventListener('input', e => {
  renderPapers(e.target.value);
});
