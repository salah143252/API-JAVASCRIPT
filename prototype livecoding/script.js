let container = document.getElementById('container');
let world = [];
function element(carte){
    container.innerHTML = "";
    carte.forEach((p)=>{
        let card = document.createElement('div');
        card.classList.add("card");
        let name = document.createElement('p');
        name.innerText = p.name;
        let capital = document.createElement('p');
        capital.innerText = "Capital:" + p.capital;
        let langue = document.createElement('p');
        langue.innerText = "Language:" + p.language;
        let flag = document.createElement('img');
        flag.src = p.flag;
        let continent = document.createElement('p');
        continent.innerText = "Continent:" +p.continent;

        card.appendChild(name);
        card.appendChild(capital);
        card.appendChild(langue);
        card.appendChild(flag);
        card.appendChild(continent);
        card.addEventListener("click", () => {
            window.location.href = "country-details.html?id=" + p.id;   
        });
        
        container.appendChild(card);
    })
};

fetch('https://countries-api-hsak.onrender.com/api/countries')
    .then(response => response.json())
    .then(pays=>{
        world = pays;
        element(world);
    });

let select = document.getElementById("select");
select.addEventListener("change", function(){
    if(select.value === "--"){
        element(world)
    }else{
        let cities = world.filter(p=>p.continent===select.value);
        element(cities);
    }
});