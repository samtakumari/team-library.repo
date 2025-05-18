const bookQueries = {
    fiction: "fiction",
    nonfiction: "nonfiction",
    history: "history",
    comics: "comic",
    novel: "novel",
    horror: "horror",
    kids: "children books"
  };
  
  async function fetchBooks(query, sectionId) {
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=8`);
      const data = await res.json();
  
      const container = document.querySelector(`#${sectionId} .book-container`);
      container.innerHTML = "";
  
      data.items.forEach(book => {
        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors?.join(", ") || "Unknown Author";
        const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/100x150";
        const previewLink = book.volumeInfo.previewLink || "#";
  
        const card = document.createElement("a");
        card.className = "book-card";
        card.href = previewLink;
        card.target = "_blank";
        card.innerHTML = `
          <img src="${thumbnail}" alt="${title}">
          <h4>${title}</h4>
          <p>${authors}</p>
        `;
        container.appendChild(card);
      });
  
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
  
  window.onload = () => {
    for (let [id, query] of Object.entries(bookQueries)) {
      fetchBooks(query, id);
    }
  };
  