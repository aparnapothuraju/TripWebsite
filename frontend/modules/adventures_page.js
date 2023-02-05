
import config from "../conf/index.js";
const backendEndpoint = config["backendEndpoint"];

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    // let data = await fetch('https://qtrip-dynamic.herokuapp.com/adventures?' + new URLSearchParams({
    //   city: city
    // }));
    let res = await fetch(`${config["backendEndpoint"]}/adventures?city=${city}`)
    let data = await res.json();
    return data;
  }
  catch {
    return null;
  }


}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for (let i = 0; i < adventures.length; i++) {
    addAdventure(adventures[i].id, adventures[i].image, adventures[i].name, adventures[i].duration, adventures[i].costPerHead);
  }
}

function addAdventure(id, image, name, duration, cost) {
  let anchor = document.createElement("a");
  anchor.setAttribute("id", id);
  anchor.href = `detail/?adventure=${id}`;
  let card = document.createElement("div");
  card.setAttribute("class", "col-sm-6 col-lg-3 mb4 hov activity-card  ");
  card.setAttribute("style", "width:18rem; margin:8px; padding:0px");
  let im = document.createElement("img");
  im.setAttribute("class", "activity-card img");
  im.setAttribute("src", image);
  im.setAttribute("style", "height:100%; width:100%; border-radius:10px;")
  let cont = document.createElement("div");
  cont.setAttribute("class", "card-body");
  cont.setAttribute("style", "float:left");
  cont.innerHTML = `<p>${name}  ${cost}</p>`;
  anchor.appendChild(im);
  card.appendChild(anchor);
  card.appendChild(cont);




  /*document.getElementById(data).appendChild(picture);*/
  let container = document.getElementById("data");
  container.appendChild(card);
}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  //console.log(list);

  //console.log(typeof lo
  let output = [];
  for (let i = 0; i < list.length; i++) {

    if (list[i].duration >= low && list[i].duration <= high) {

      output.push(list[i]);
    }
  }
  return output;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  if (categoryList.length == 0)
    return list;
  let output = [];

  //console.log(list.length);
  for (let i = 0; i < categoryList.length; i++) {

    let category = categoryList[i];
    for (let j = 0; j < list.length; j++) {
      if (list[j].category == category) {
        output.push(list[j]);
      }
    }
  }
  //console.log(output);
  return output;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  //console.log(list[0]);
  // console.log(list);
  let arr = filters.category;
  //console.log(filters);
  let filteredcategory = filterByCategory(list, arr);
  //console.log(filteredcategory);
  if (filters.duration == "")
    return filteredcategory;
  let duration = filters.duration.split("-");


  let result = filterByDuration(filteredcategory, duration[0], duration[1]);


  // Place holder for functionality to work in the Stubs
  return result;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters', JSON.stringify(filters));


}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let data = window.localStorage.getItem('filters');
  // Place holder for functionality to work in the Stubs
  return JSON.parse(data);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  filters = { duration: "12-20", category: ["Beaches", "Cycling"] };
  for (let i = 0; i < filters.category.length; i++) {
    let subpill = document.createElement("div");
    subpill.setAttribute("class", "category-filter");
    subpill.innerHTML = filters.category[i];
    document.getElementById("category-list").appendChild(subpill);
  }
  console.log(document.getElementById("category-list").children.length);
  console.log(filters.category.length);
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
