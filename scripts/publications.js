// scripts/publications.js

async function fetchArxivPapers(query, maxResults = 5) {
  const container = document.getElementById("arxiv-results");

  if (!query) {
    container.innerHTML = "";
    return;
  }

  const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=${maxResults}`;

  try {
    const response = await fetch(url);
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");
    const entries = xml.getElementsByTagName("entry");

    container.innerHTML = "";

    if (entries.length === 0) {
      container.innerHTML = "<p>No results found.</p>";
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

      // ✅ Highlight keywords in title and summary
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
  } catch (error) {
    console.error("Error fetching arXiv papers:", error);
    container.innerHTML = "<p>Error loading results.</p>";
  }
}

// ✅ Highlighting function
function highlightMatch(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

// --- Event Listener ---
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    fetchArxivPapers(query);
  });

  // Optional: default topic on page load
  fetchArxivPapers("dopamine");
});
