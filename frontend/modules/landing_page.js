import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let res = await fetch(`${config["backendEndpoint"]}/cities`);
    let data = await res.json();
    return data;
  }
  catch {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
// function addCityToDOM(id, city, description, image) {

//   // TODO: MODULE_CITIES
//   // 1. Populate the City details and insert those details into the DOM

//   let card = document.createElement("div");
//   card.setAttribute("class", "col-sm-6 col-lg-3 mb4 hov");
//   card.setAttribute("style", "margin-top:3px;text-align:center");
//   let head = document.createElement("h3");
//   head.setAttribute("class", "tile-text");
//   head.setAttribute("style", "text-align:bottom");
//   head.innerHTML = `${city} <br> ${description}`;
//   let anchor = document.createElement("a");
//   anchor.href = `pages/adventures/?city=${id}`;
//   anchor.setAttribute("id", id);
//   let im = document.createElement("img");
//   im.setAttribute("src", image);
//   im.setAttribute("style", "height:100%; width:100%; border-radius:10px;")
//   anchor.appendChild(im);
//   card.appendChild(head);
//   card.appendChild(anchor);

//   /*document.getElementById(data).appendChild(picture);*/
//   let container = document.getElementById("data");
//   return container.appendChild(card);
//   /*document.body.appendChild(picture);*/
// }

function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // File: frontend/index.html
  // Content section
  let data = document.getElementById('data');
  let cityEl = document.createElement('div'); 
  cityEl.className = "col-12 col-sm-6 col-lg-3 mb-4";

  cityEl.innerHTML = `
      <a href="pages/adventures/?city=${id}" id="${id}">
        <div class="tile" id=${id}>
          <img src=${image} alt=${city}/>
          <div class="tile-text text-center">
            <h5>${city}</h5>
            <p>${description}</p>
          </div>
        </div>
      </a>`;

  return data.appendChild(cityEl);
}

export { init, fetchCities, addCityToDOM };
