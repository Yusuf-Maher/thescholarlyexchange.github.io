let currentQuery = "";
let currentStart = 0;
const RESULTS_PER_PAGE = 5;
let isFetching = false;

const container = document.getElementById("arxiv-results");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// --- Create sort dropdown dynamically ---
const sortContainer = document.createElement("div");
sortContainer.style.margin = "10px 0";
sortContainer.innerHTML = `
  Sort by:
  <select id="sortSelect">
    <option value="date-desc">Date ↓</option>
    <option value="date-asc">Date ↑</option>
    <option value="author-asc">Author A-Z</option>
    <option value="author-desc">Author Z-A</option>
  </select>
`;
container.parentNode.insertBefore(sortContainer, container);

const sortSelect = document.getElementById("sortSelect");

// --- Fetch function ---
async function fetchArxivPapers(query, append = false) {
  if (!query) {
    container.innerHTML = "";
    loadMoreBtn.style.display = "none";
    return;
  }

  // Reset if new query
  if (!append || query !== currentQuery) {
    currentStart = 0;
    container.innerHTML = "";
  }

  currentQuery = query;
  isFetching = true;

  const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=${currentStart}&max_results=${RESULTS_PER_PAGE}`;

  try {
    const response = await fetch(url);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");
    const entries = xml.getElementsByTagName("entry");

    if (entries.length === 0 && currentStart === 0) {
      container.innerHTML = "<p>No results found.</p>";
      loadMoreBtn.style.display = "none";
      isFetching = false;
      return;
    }

    for (let entry of entries) {
      const title = entry.getElementsByTagName("title")[0]?.textContent.trim() || "No title";
      const summary = entry.getElementsByTagName("summary")[0]?.textContent.trim() || "No summary";
      const link = entry.getElementsByTagName("id")[0]?.textContent.trim();
      const pdfLink = link?.replace("/abs/", "/pdf/") + ".pdf";
      const authors = Array.from(entry.getElementsByTagName("author"))
        .map(a => a.getElementsByTagName("name")[0]?.textContent)
        .join(", ");
      const published = entry.getElementsByTagName("published")[0]?.textContent || "";

      const highlightedTitle = highlightMatch(title, query);
      const highlightedSummary = highlightMatch(summary.slice(0, 250), query);

      const card = document.createElement("div");
      card.className = "arxiv-card";
      card.dataset.authors = authors;
      card.dataset.date = published;
      card.style.border = "1px solid #ccc";
      card.style.padding = "10px";
      card.style.marginBottom = "10px";

      card.innerHTML = `
        <div class="card-header" style="cursor:pointer;">
          <h3>${highlightedTitle}</h3>
          <p><strong>Authors:</strong> ${authors}</p>
          <button class="expand-btn">▼</button>
        </div>
        <div class="card-body" style="display:none;">
          <p>${highlightedSummary}...</p>
          <a href="${pdfLink}" target="_blank">📄 View PDF</a> |
          <a href="${link}" target="_blank">🔗 View on arXiv</a>
          <button class="collapse-btn">Close</button>
        </div>
      `;

      container.appendChild(card);

      const expandBtn = card.querySelector(".expand-btn");
      const collapseBtn = card.querySelector(".collapse-btn");
      const cardBody = card.querySelector(".card-body");

      expandBtn.addEventListener("click", () => {
        cardBody.style.display = "block";
        expandBtn.style.display = "none";
      });

      collapseBtn.addEventListener("click", () => {
        cardBody.style.display = "none";
        expandBtn.style.display = "inline-block";
      });
    }

    loadMoreBtn.style.display = entries.length === RESULTS_PER_PAGE ? "block" : "none";
    currentStart += RESULTS_PER_PAGE;
    isFetching = false;

  } catch (error) {
    console.error("Error fetching arXiv papers:", error);
    container.innerHTML = "<p>Error loading results.</p>";
    loadMoreBtn.style.display = "none";
    isFetching = false;
  }
}

// --- Highlight function ---
function highlightMatch(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

// --- Event listeners ---
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    if (query) fetchArxivPapers(query);
  });

  loadMoreBtn.addEventListener("click", () => {
    if (!isFetching) fetchArxivPapers(currentQuery, true);
  });

  sortSelect.addEventListener("change", () => {
    const sortType = sortSelect.value;
    let cards = Array.from(container.querySelectorAll(".arxiv-card"));

    cards.sort((a, b) => {
      if (sortType.startsWith("date")) {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);
        return sortType === "date-desc" ? dateB - dateA : dateA - dateB;
      } else if (sortType.startsWith("author")) {
        const authorA = a.dataset.authors.toLowerCase();
        const authorB = b.dataset.authors.toLowerCase();
        return sortType === "author-asc" ? authorA.localeCompare(authorB) : authorB.localeCompare(authorA);
      }
    });

    container.innerHTML = "";
    cards.forEach(c => container.appendChild(c));
  });

  // Default topic
  fetchArxivPapers("dopamine");
});

});

