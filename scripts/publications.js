let currentQuery = "";
let currentStart = 0;
const RESULTS_PER_PAGE = 5;
let isFetching = false;
let allPapers = []; // store all loaded papers

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("arxiv-results");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const searchBar = document.getElementById("searchBar");
  const sortSelect = document.getElementById("sortSelect");

  // --- Fetch function ---
  async function fetchArxivPapers(query, append = false) {
    if (!query) {
      container.innerHTML = "";
      loadMoreBtn.style.display = "none";
      allPapers = [];
      return;
    }

    // Reset if new query
    if (!append || query !== currentQuery) {
      currentStart = 0;
      container.innerHTML = "";
      allPapers = [];
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
        const paper = {
          title: entry.getElementsByTagName("title")[0]?.textContent.trim() || "No title",
          summary: entry.getElementsByTagName("summary")[0]?.textContent.trim() || "No summary",
          link: entry.getElementsByTagName("id")[0]?.textContent.trim(),
          pdfLink: entry.getElementsByTagName("id")[0]?.textContent.trim().replace("/abs/", "/pdf/") + ".pdf",
          authors: Array.from(entry.getElementsByTagName("author"))
            .map(a => a.getElementsByTagName("name")[0]?.textContent)
            .join(", "),
          published: entry.getElementsByTagName("published")[0]?.textContent || "1900-01-01"
        };
        allPapers.push(paper);
      }

      currentStart += RESULTS_PER_PAGE;
      isFetching = false;

      renderPapers(); // render sorted papers

      // Show/hide Load More button
      loadMoreBtn.style.display = entries.length === RESULTS_PER_PAGE ? "block" : "none";
    } catch (error) {
      console.error("Error fetching arXiv papers:", error);
      container.innerHTML = "<p>Error loading results.</p>";
      loadMoreBtn.style.display = "none";
      isFetching = false;
    }
  }

  // --- Render function ---
  function renderPapers() {
  const query = currentQuery;
  let papersToRender = [...allPapers];

  const sortValue = sortSelect.value;
  if (sortValue === "newest") {
    papersToRender.sort((a, b) => new Date(b.published) - new Date(a.published));
  } else if (sortValue === "oldest") {
    papersToRender.sort((a, b) => new Date(a.published) - new Date(b.published));
  }

  container.innerHTML = "";
  for (let paper of papersToRender) {
    const highlightedTitle = highlightMatch(paper.title, query);
    const highlightedSummary = highlightMatch(paper.summary.slice(0, 250), query);

    container.innerHTML += `
      <div class="arxiv-card" style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
        <h3>${highlightedTitle}</h3>
        <p><strong>Authors:</strong> ${paper.authors}</p>
        <p>${highlightedSummary}...</p>
        <a href="${paper.pdfLink}" target="_blank">📄 View PDF</a> |
        <a href="${paper.link}" target="_blank">🔗 View on arXiv</a>
      </div>
    `;
  }
}

  // --- Highlight function ---
  function highlightMatch(text, keyword) {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }

  // --- Event listeners ---
  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    if (query) fetchArxivPapers(query);
  });

  loadMoreBtn.addEventListener("click", () => {
    if (!isFetching) fetchArxivPapers(currentQuery, true);
  });

  sortSelect.addEventListener("change", () => {
    renderPapers();
  });

  // Optional: default load
  fetchArxivPapers("dopamine");
});


