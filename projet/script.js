let container = document.getElementById("cardContainer");
let searchInput = document.getElementById("search");
let continentSelect = document.getElementById("continent");
let populationInput = document.getElementById("population");
let statsDiv = document.getElementById("stats");

let countriesData = [];

fetch("https://countries-api-hsak.onrender.com/api/countries")
  .then(response => response.json())
  .then(data => {
    countriesData = data;
    displayCountries(data);
    showStats(data);
  })
  .catch(error => console.error("Error:", error));

function displayCountries(countries) {
  container.innerHTML = '';

  countries.forEach(country => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2>${country.name}</h2>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Langue:</strong> ${country.language}</p>
      <p><strong>Continent:</strong> ${country.continent}</p>
      <img class="flag-img" src="${country.flag}" alt="Flag">
    `;
    card.addEventListener("click", () => {
      localStorage.setItem("selectedCountry", JSON.stringify(country));
      window.location.href = "country-details.html";
    });

    container.appendChild(card);
  });
}

function showStats(countries) {
  let stats = {};

  countries.forEach(country => {
    if (stats[country.continent]) {
      stats[country.continent] = stats[country.continent] + 1;
    } else {
      stats[country.continent] = 1;
    }
  });

  let html = '<h3>Pays par continent:</h3>';
  for (let continent in stats) {
    html += `<p>${continent}: <strong>${stats[continent]}</strong> pays</p>`;
  }
  statsDiv.innerHTML = html;
}

function filterCountries() {
  let search = searchInput.value.toLowerCase();
  let continent = continentSelect.value;
  let minPop = populationInput.value;

  let filtered = countriesData;

  filtered = filtered.filter(country => {
    return country.name.toLowerCase().includes(search) || 
           country.capital.toLowerCase().includes(search);
  });

  if (continent) {
    filtered = filtered.filter(country => country.continent === continent);
  }

  if (minPop) {
    filtered = filtered.filter(country => country.population >= minPop);
  }

  displayCountries(filtered);
}

searchInput.addEventListener("input", filterCountries);
continentSelect.addEventListener("change", filterCountries);
populationInput.addEventListener("input", filterCountries);