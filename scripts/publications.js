// scripts/publications.js

async function fetchArxivPapers(query, maxResults = 5) {
  if (!query) {
    document.getElementById("arxiv-results").innerHTML = "";
    return;
  }

  const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=${maxResults}`;

  try {
    const response = await fetch(url);
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");
    const entries = xml.getElementsByTagName("entry");
    const container = document.getElementById("arxiv-results");

    // Clear old results
    container.innerHTML = "";

    if (entries.length === 0) {
      container.innerHTML = "<p>No results found.</p>";
      return;
    }

    // Render each entry
    for (let entry of entries) {
      const title = entry.getElementsByTagName("title")[0]?.textContent.trim() || "No title";
      const summary = entry.getElementsByTagName("summary")[0]?.textContent.trim() || "No summary";
      const link = entry.getElementsByTagName("id")[0]?.textContent.trim();
      const pdfLink = link?.replace("/abs/", "/pdf/") + ".pdf";
      const authors = Array.from(entry.getElementsByTagName("author"))
        .map(a => a.getElementsByTagName("name")[0]?.textContent)
        .join(", ");

      container.innerHTML += `
        <div class="arxiv-card" style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
          <h3>${title}</h3>
          <p><strong>Authors:</strong> ${authors}</p>
          <p>${summary.slice(0, 250)}...</p>
          <a href="${pdfLink}" target="_blank">📄 View PDF</a> |
          <a href="${link}" target="_blank">🔗 View on arXiv</a>
        </div>
      `;
    }
  } catch (error) {
    console.error("Error fetching arXiv papers:", error);
    document.getElementById("arxiv-results").innerHTML = "<p>Error loading results.</p>";
  }
}

// --- Event Listener ---
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    fetchArxivPapers(query);
  });

  // Optional: load default topic
  fetchArxivPapers("dopamine");
});
