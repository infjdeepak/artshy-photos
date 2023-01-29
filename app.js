//variables

const auth = "jgbeE8esBSOtZR8HcGh9yckrzJUKa1GSrfnUeol0pxTbnNXKZ7Rrn32x";
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const gallary = document.querySelector(".gallary");
const moreBtn = document.querySelector(".more-btn");
let searchQuery;
let currentSearch;
let fetchLink;
let page = 1;

//events
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  currentSearch = searchQuery;
});
searchBtn.addEventListener("click", (e) => {
  searchPhotos(e);
});
moreBtn.addEventListener("click", loadMore);

//function for fetch Api
async function fetchApi(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await response.json();
  return data;
}

//function for random photos
async function curatedPhotos() {
  const data = await fetchApi(
    "https://api.pexels.com/v1/curated?page=1&per_page=14"
  );
  creatingPhotos(data);
}

//function for search photos
async function searchPhotos(e) {
  e.preventDefault();
  clear();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search/?page=1&per_page=14&query=${searchQuery}`
  );
  creatingPhotos(data);
}

//function for load more photos
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search/?page=${page}&per_page=14&query=${currentSearch}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?page=${page}&per_page=14`;
  }
  const data = await fetchApi(fetchLink);
  creatingPhotos(data);
}

//function for appending photos to document
async function creatingPhotos(data) {
  data.photos.forEach((photo) => {
    const photoDiv = document.createElement("div");
    photoDiv.classList.add("gallary-img");
    photoDiv.innerHTML = `
  <div class="img-info">
  <span>${photo.photographer}</span>
  <a href="${photo.src.original}" target="_blank">Download</a>
  </div>
  <img src="${photo.src.large}">
  `;
    gallary.appendChild(photoDiv);
  });
}

//function for clearing inputs, currentphotos and other stuff
function clear() {
  gallary.innerHTML = "";
  searchInput.value = "";
  page = 1;
}

//calling random photos
curatedPhotos();
