
 
 // Function to get current date
  function updateYear() {
    document.getElementById("currentYear").textContent = new Date().getFullYear();
  }
  document.addEventListener("DOMContentLoaded", updateYear);
  
  // Floating icons
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 600);
  });
  
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    console.log("Client Time:", new Date());
    console.log("Parsed Date:", date);
    console.log("Seconds ago:", seconds);
    for (let [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) {
        return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
      }
    }
  
    return "just now";
  }
  
  // Load articles and append them to containers
  async function loadArticles(url, containerId, isPopular = false) {
    const container = document.getElementById(containerId);
    try {
      const finalUrl = url.includes('?')
  ? `${url}&category=${encodeURIComponent(containerId)}`
  : `${url}?category=${encodeURIComponent(containerId)}`;
      const response = await fetch(finalUrl);
      const articles = await response.json();
  
      articles.forEach(article => {
        const card = document.createElement("div");
        card.classList.add("card");
  
        // For popular, display in a list item with author
        if (isPopular) {
          const listItem = document.createElement("div");
          const articleItem = document.createElement("div");
          articleItem.classList.add("ourMostPopularItem");
          articleItem.innerHTML = `
            <a href="${article.contentlink}" class="author">${article.writer}</a><br>
            <a href="${article.contentlink}"  class="articleTitle">${article.title}</a>
          `;
          
          const hr = document.createElement("hr");
          hr.classList.add("thinHr");
          listItem.appendChild(articleItem);
          container.appendChild(listItem);
        } else {
          card.innerHTML = `
            <img src="${article.imagelink || article.image}" alt="${article.title}" class="card-image">
            <div class="card-info">
              <span class="category">${article.category}</span>
              <a href="${article.contentlink || article.link}" class="card-title">${article.title}</a>
              <p class="meta">${article.writer} • ${timeAgo(article.created_at)}</p>
            </div>
          `;
          container.appendChild(card);
        }
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadArticles('http://localhost:5000/api/posts', "campusNews");//assorted
    loadArticles("http://localhost:5000/api/posts", "trending");
    loadArticles("http://localhost:5000/api/posts", "education");
    loadArticles("http://localhost:5000/api/posts", "career");
    loadArticles("http://localhost:5000/api/posts", "technology");
    loadArticles("http://localhost:5000/api/posts", "entertainment");
    loadArticles("http://localhost:5000/api/posts", "elevation");
    loadArticles("http://localhost:5000/api/posts", "elevation", true);
    loadArticles('http://localhost:5000/api/posts', "popular", true);  // Load popular as unique
  });
  
  // Toggle search input visibility
  const toggle = document.getElementById('search-toggle');
  const input = document.getElementById('search-input');
  toggle.addEventListener('click', () => input.classList.toggle('show'));
  
  // Toggle menu visibility
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  menuToggle.addEventListener('click', () => menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex');
  
  // Hide menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !menu.contains(e.target)) {
      menu.style.display = 'none';
    }
  });

  const form = document.getElementById('newsletterForm');
  const msg = document.getElementById('newsletterMsg');

  form.addEventListener('submit', async (e) => {
    console.log("Newsletter loaded")
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();

    try {
      const res = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      msg.textContent = data.message;
      msg.style.color = res.ok ? "green" : "red";
      if (res.ok) form.reset();
    } catch (err) {
      msg.textContent = "Error subscribing";
      msg.style.color = "red";
    }
  });
  
  // Search through FAQ items
  const searchInput = document.getElementById('searchInput');
  const faqList = document.getElementById('faqList');
  const faqs = faqList.querySelectorAll('details');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    faqs.forEach(faq => {
      const summary = faq.querySelector('summary').innerText.toLowerCase();
      const content = faq.querySelector('p').innerText.toLowerCase();
      faq.style.display = summary.includes(query) || content.includes(query) ? "block" : "none";
    });
  });

