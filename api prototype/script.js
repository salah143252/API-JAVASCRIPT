let container = document.getElementById("cardContainer");
let continentSelect = document.querySelector(".my-select");
let countriesData = [];

fetch("https://countries-api-hsak.onrender.com/api/countries")
  .then(response => response.json())
  .then(data => {
    countriesData = data;
    displayCountries(data);
  })
  .catch(error => console.error("Erreur lors du chargement des pays :", error));

function displayCountries(countries) {
  container.innerHTML = '';

  countries.forEach(country => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2>${country.name}</h2>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Language:</strong> ${country.language}</p>
      <p><strong>Continent:</strong> ${country.continent}</p>
      <img class="flag-img" src="${country.flag}" alt="Flag of ${country.name}">
    `;
    card.addEventListener("click", () => {
      localStorage.setItem("selectedCountry", JSON.stringify(country));
      window.location.href = "country-details.html";
    });

    container.appendChild(card);
  });
}

continentSelect.addEventListener("change", function() {
  const selectedContinent = this.value;

  if (selectedContinent === "continent") {
    displayCountries(countriesData);
  } else {
    const filtered = countriesData.filter(
      c => c.continent === selectedContinent
    );
    displayCountries(filtered);
  }
});

  

