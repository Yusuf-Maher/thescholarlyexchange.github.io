let currentQuery = "";
let currentStart = 0;
const RESULTS_PER_PAGE = 5;
let isFetching = false; // prevent double fetches

// --- Fetch function ---
async function fetchArxivPapers(query, append = false) {
  const container = document.getElementById("arxiv-results");

  if (!query) {
    container.innerHTML = "";
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

      const highlightedTitle = highlightMatch(title, query);
      const highlightedSummary = highlightMatch(summary.slice(0, 250), query);

      container.innerHTML += `
        <div class="arxiv-card" style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
          <h3>${highlightedTitle}</h3>
          <p><strong>Authors:</strong> ${authors}</p>
          <p>${highlightedSummary}...</p>
          <a href="${pdfLink}" target="_blank">📄 View PDF</a> |
          <a href="${link}" target="_blank">🔗 View on arXiv</a>
        </div>
      `;
    }

    // Increment start for next page
    currentStart += RESULTS_PER_PAGE;
    isFetching = false;

  } catch (error) {
    console.error("Error fetching arXiv papers:", error);
    container.innerHTML = "<p>Error loading results.</p>";
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
  const container = document.getElementById("arxiv-results");

  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    if (query) fetchArxivPapers(query);
  });

  // Infinite scroll
  container.addEventListener("scroll", () => {
    if (isFetching) return;

    const scrollBottom = container.scrollTop + container.clientHeight;
    const scrollHeight = container.scrollHeight;

    // Trigger when scrolled to bottom
    if (scrollBottom >= scrollHeight - 50) {
      fetchArxivPapers(currentQuery, true); // append next results
    }
  });

  // Default load
  fetchArxivPapers("dopamine");
});


