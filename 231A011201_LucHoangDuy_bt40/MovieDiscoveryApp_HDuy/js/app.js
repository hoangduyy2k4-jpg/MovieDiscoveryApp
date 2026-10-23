/* ===== Movie Discovery: dữ liệu và logic Bài 2 ===== */
"use strict";

const movies = [
  { id: 1, title: "Interstellar", year: 2014, genre: "Khoa học viễn tưởng", rating: 8.7, director: "Christopher Nolan", cast: "Matthew McConaughey, Anne Hathaway", description: "Một nhóm phi hành gia đi qua lỗ sâu để tìm kiếm tương lai cho nhân loại.", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id: 2, title: "Inception", year: 2010, genre: "Hành động", rating: 8.8, director: "Christopher Nolan", cast: "Leonardo DiCaprio, Joseph Gordon-Levitt", description: "Một chuyên gia xâm nhập giấc mơ thực hiện nhiệm vụ nguy hiểm.", poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" },
  { id: 3, title: "The Dark Knight", year: 2008, genre: "Hành động", rating: 9.0, director: "Christopher Nolan", cast: "Christian Bale, Heath Ledger", description: "Batman đối đầu với một kẻ phản diện gieo hỗn loạn cho Gotham.", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: 4, title: "Coco", year: 2017, genre: "Hoạt hình", rating: 8.4, director: "Lee Unkrich", cast: "Anthony Gonzalez, Gael García Bernal", description: "Cậu bé Miguel khám phá thế giới kỳ diệu của tổ tiên và âm nhạc.", poster: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgCXxW2VHa6.jpg" },
  { id: 5, title: "Inside Out", year: 2015, genre: "Hoạt hình", rating: 8.1, director: "Pete Docter", cast: "Amy Poehler, Phyllis Smith", description: "Những cảm xúc bên trong cô bé Riley học cách cùng nhau trưởng thành.", poster: "https://image.tmdb.org/t/p/w500/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg" },
  { id: 6, title: "The Martian", year: 2015, genre: "Khoa học viễn tưởng", rating: 8.0, director: "Ridley Scott", cast: "Matt Damon, Jessica Chastain", description: "Một phi hành gia tìm cách sống sót trên sao Hỏa và liên lạc với Trái Đất.", poster: "https://image.tmdb.org/t/p/w500/5aGhaIHYuQbqlHWv20qI0Y0yX7l.jpg" },
  { id: 7, title: "Parasite", year: 2019, genre: "Tâm lý", rating: 8.5, director: "Bong Joon-ho", cast: "Song Kang-ho, Lee Sun-kyun", description: "Hai gia đình thuộc những tầng lớp khác nhau bị cuốn vào một kế hoạch bất ngờ.", poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { id: 8, title: "Knives Out", year: 2019, genre: "Phiêu lưu", rating: 7.9, director: "Rian Johnson", cast: "Daniel Craig, Ana de Armas", description: "Một thám tử điều tra cái chết bí ẩn trong một gia đình giàu có.", poster: "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg" },
  { id: 9, title: "Dune", year: 2021, genre: "Khoa học viễn tưởng", rating: 8.0, director: "Denis Villeneuve", cast: "Timothée Chalamet, Zendaya", description: "Paul Atreides bước vào cuộc chiến định đoạt số phận hành tinh sa mạc Arrakis.", poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg" },
  { id: 10, title: "Spider-Man: Into the Spider-Verse", year: 2018, genre: "Hoạt hình", rating: 8.4, director: "Bob Persichetti", cast: "Shameik Moore, Jake Johnson", description: "Miles Morales khám phá sức mạnh và gặp những Spider-Man từ nhiều vũ trụ.", poster: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg" },
  { id: 11, title: "Mad Max: Fury Road", year: 2015, genre: "Hành động", rating: 8.1, director: "George Miller", cast: "Tom Hardy, Charlize Theron", description: "Cuộc chạy trốn nghẹt thở qua vùng đất hoang hậu tận thế.", poster: "https://image.tmdb.org/t/p/w500/8tZYtuWe are5QWOpY8W4V5M8h8DD.jpg" },
  { id: 12, title: "The Grand Budapest Hotel", year: 2014, genre: "Phiêu lưu", rating: 8.1, director: "Wes Anderson", cast: "Ralph Fiennes, Tony Revolori", description: "Người quản lý khách sạn và cậu nhân viên trẻ vướng vào một vụ án kỳ lạ.", poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg" }
];

const $ = (selector) => document.querySelector(selector);
const searchInput = $("#searchInput");
const genreFilters = $("#genreFilters");
const yearFilter = $("#yearFilter");
const sortFilter = $("#sortFilter");
const favoritesOnly = $("#favoritesOnly");
const resetBtn = $("#resetBtn");
const themeToggle = $("#themeToggle");
const movieGrid = $("#movieGrid");
const movieCount = $("#movieCount");
const emptyMessage = $("#emptyMessage");
const movieDialog = $("#movieDialog");
const movieDetails = $("#movieDetails");
const closeDialog = $("#closeDialog");

function loadStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}
function saveStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage có thể bị tắt */ }
}

let favoriteIds = loadStorage("movie-favorites", []);
if (!Array.isArray(favoriteIds)) favoriteIds = [];

function renderGenreFilters() {
  const previous = new Set(
    [...genreFilters.querySelectorAll('input:checked')].map(input => input.value)
  );
  const genres = [...new Set(movies.map(movie => movie.genre))]
    .sort((a, b) => a.localeCompare(b, "vi"));
  genreFilters.innerHTML = genres.map(genre => `
    <label class="genre-option">
      <input type="checkbox" value="${escapeHTML(genre)}" ${previous.has(genre) ? "checked" : ""}>
      <span>${escapeHTML(genre)}</span>
    </label>
  `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function renderMovies() {
  const keyword = searchInput.value.trim().toLocaleLowerCase("vi");
  const selectedGenres = [...genreFilters.querySelectorAll("input:checked")]
    .map(input => input.value);
  const selectedYear = Number(yearFilter.value);
  const selectedSort = sortFilter.value;

  let results = movies.filter(movie => {
    const matchesName = movie.title.toLocaleLowerCase("vi").includes(keyword);
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);
    const matchesYear = selectedYear === 0 || movie.year >= selectedYear;
    const matchesFavorite = !favoritesOnly.checked || favoriteIds.includes(movie.id);
    return matchesName && matchesGenre && matchesYear && matchesFavorite;
  });

  switch (selectedSort) {
    case "ratingDesc": results.sort((a, b) => b.rating - a.rating); break;
    case "ratingAsc": results.sort((a, b) => a.rating - b.rating); break;
    case "yearDesc": results.sort((a, b) => b.year - a.year); break;
    case "titleAsc": results.sort((a, b) => a.title.localeCompare(b.title, "vi")); break;
  }

  movieGrid.innerHTML = results.map(movie => `
    <article class="movie-card">
      <div class="poster-wrap">
        <img class="poster" src="${escapeHTML(movie.poster)}" alt="Poster phim ${escapeHTML(movie.title)}" loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/400x600/25213f/ffffff?text=Movie+Poster'">
        <button class="favorite-btn ${favoriteIds.includes(movie.id) ? "active" : ""}" type="button"
          data-favorite="${movie.id}" aria-label="${favoriteIds.includes(movie.id) ? "Bỏ yêu thích" : "Thêm yêu thích"}">
          ${favoriteIds.includes(movie.id) ? "♥" : "♡"}
        </button>
      </div>
      <div class="movie-info">
        <h3>${escapeHTML(movie.title)}</h3>
        <div class="movie-meta"><span>📅 ${movie.year}</span><span>⭐ ${movie.rating.toFixed(1)}/10</span></div>
        <span class="genre-tag">${escapeHTML(movie.genre)}</span>
        <button class="details-btn" type="button" data-details="${movie.id}">Xem chi tiết</button>
      </div>
    </article>
  `).join("");

  movieCount.textContent = `${results.length}/${movies.length} phim`;
  emptyMessage.hidden = results.length !== 0;
}

function toggleFavorite(id) {
  if (favoriteIds.includes(id)) {
    favoriteIds = favoriteIds.filter(item => item !== id);
  } else {
    favoriteIds.push(id);
  }
  saveStorage("movie-favorites", favoriteIds);
  renderMovies();
}

function openMovieDetails(id) {
  const movie = movies.find(item => item.id === id);
  if (!movie) return;
  movieDetails.innerHTML = `
    <img class="detail-poster" src="${escapeHTML(movie.poster)}" alt="Poster ${escapeHTML(movie.title)}"
      onerror="this.onerror=null;this.src='https://placehold.co/400x600/25213f/ffffff?text=Movie+Poster'">
    <div class="detail-text">
      <h2>${escapeHTML(movie.title)}</h2>
      <p><strong>Năm phát hành:</strong> ${movie.year}</p>
      <p><strong>Thể loại:</strong> ${escapeHTML(movie.genre)}</p>
      <p><strong>Đánh giá:</strong> ⭐ ${movie.rating.toFixed(1)}/10</p>
      <p><strong>Đạo diễn:</strong> ${escapeHTML(movie.director)}</p>
      <p><strong>Diễn viên:</strong> ${escapeHTML(movie.cast)}</p>
      <p>${escapeHTML(movie.description)}</p>
      <button class="details-btn" type="button" data-modal-favorite="${movie.id}">
        ${favoriteIds.includes(movie.id) ? "♥ Bỏ yêu thích" : "♡ Thêm yêu thích"}
      </button>
    </div>`;
  if (typeof movieDialog.showModal === "function") movieDialog.showModal();
  else alert(`${movie.title} (${movie.year})\n${movie.description}`);
}

function updateTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "☀️ Chế độ sáng" : "🌙 Chế độ tối";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}
updateTheme(loadStorage("movie-theme", "light") === "dark");

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  updateTheme(isDark);
  saveStorage("movie-theme", isDark ? "dark" : "light");
});

let searchTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(renderMovies, 400);
});
genreFilters.addEventListener("change", renderMovies);
yearFilter.addEventListener("change", renderMovies);
sortFilter.addEventListener("change", renderMovies);
favoritesOnly.addEventListener("change", renderMovies);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  genreFilters.querySelectorAll("input").forEach(input => input.checked = false);
  yearFilter.value = "0";
  sortFilter.value = "default";
  favoritesOnly.checked = false;
  renderMovies();
});

movieGrid.addEventListener("click", event => {
  const favoriteButton = event.target.closest("[data-favorite]");
  if (favoriteButton) {
    toggleFavorite(Number(favoriteButton.dataset.favorite));
    return;
  }
  const detailsButton = event.target.closest("[data-details]");
  if (detailsButton) openMovieDetails(Number(detailsButton.dataset.details));
});

movieDetails.addEventListener("click", event => {
  const button = event.target.closest("[data-modal-favorite]");
  if (!button) return;
  const id = Number(button.dataset.modalFavorite);
  toggleFavorite(id);
  openMovieDetails(id);
});

closeDialog.addEventListener("click", () => movieDialog.close());
movieDialog.addEventListener("click", event => {
  if (event.target === movieDialog) movieDialog.close();
});

renderGenreFilters();
renderMovies();
