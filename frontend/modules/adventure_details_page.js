import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  //console.log(search);
  let u = new URLSearchParams(search);
  let id = u.get('adventure');
  //console.log(id);
  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    // const result = await fetch(
    //   `${'https://qtrip-dynamic.herokuapp.com'}` + `/adventures/detail?adventure=${adventureId}`
    // );
    let res = await fetch(`${config["backendEndpoint"]}/adventures/detail/?adventure=${adventureId}`)
    let data = await res.json();
    return data;
    return data;
  } catch (e) {
    return null;
  }



  //  'https://qtrip-dynamic.herokuapp.com/adventures/detail?'

  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add adventure details to DOM
async function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure);
  // console.log(adventure.name);
  // document.getElementById("adventure-name").innerText=adventure.name;
  // document.getElementById("adventure-subtitle").innerText=adventure.subtitle;

  document.getElementById("adventure-name").innerHTML = adventure.name;

  //Setting the subtitle
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  //Loading the images
   adventure.images.map((image) => {
    //console.log(image);
    let ele = document.createElement("div");
    ele.className = "col-lg-12";
    ele.innerHTML = `
    <img
        src=${image}
        alt=""
        srcset=""

        class="activity-card-image pb-3 pb-md-0"
      />
      
          `;
    document.getElementById("photo-gallery").appendChild(ele);
  });
  
  //Setting the content
  document.getElementById("adventure-content").innerHTML = adventure.content;



}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  /*let flag = false;
  let i = 0;
  let container = document.createElement("div");
  container.setAttribute("id", "myCarousel");
  container.setAttribute("class", "carousel slide");
  container.setAttribute("data-ride", "carousel");
  let ol = document.createElement("ol");
  ol.setAttribute("class", "carousel-indicators");
  let div2 = document.createElement("div");
  div2.setAttribute("class", "carousel-inner");

  images.map(image => {
    let div = document.createElement("div");
    if (flag == false) {
      ol.innerHTML = ` <li data-target="#myCarousel" data-bs-slide-to=${i} class="active"></li>`;

    }
    else {
      ol.innerHTML = ` <li data-target="#myCarousel" data-bs-slide-to=${i}></li>`;
    }
    if (flag == false) {
      div.setAttribute("class","carousel-item active");
      flag = true;
    }
    else
      div.setAttribute("class","carousel-item");
    div.innerHTML = `<img
    src=${image}
    alt=""
    />`
    div2.appendChild(div);
    ++i;
  }
  );
  container.appendChild(ol);
  container.appendChild(div2);
  container.innerHTML = ` <a class="left carousel-control" href="#myCarousel" data-slide="prev">
  <span class="glyphicon glyphicon-chevron-left"></span>
  <span class="sr-only">Previous</span>
</a>
<a class="right carousel-control" href="#myCarousel" data-slide="next">
  <span class="glyphicon glyphicon-chevron-right"></span>
  <span class="sr-only">Next</span>
</a>`
  document.getElementById("photo-gallery").appendChild(container);*/
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  console.log(adventure);
  let avl =adventure.available;
  if (avl == true)
  {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else
  {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
  console.log(document.getElementById("reservation-panel-sold-out").style.display);
  
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
 // console.log(adventure.id);
  let perhead = adventure.costPerHead;
  let totalcoast = persons * perhead;
  document.getElementById("reservation-cost").innerHTML = totalcoast;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 // console.log(adventure.json());
  let id = adventure.id;
  console.log(adventure);
  document.getElementById("myForm").addEventListener('submit', function (evt) {
    debugger;
    evt.preventDefault();
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let person = document.getElementById("person").value;
    console.log("hello");
  
    const update = {
     "name": name,
     "date": date ,
     "person": person,
     "adventure": id
    };

const options = {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(update),
};
    
    fetch(`${config["backendEndpoint"]}/reservations/new`, options).then(data => { if (data.ok) { alert("Success!");  } else alert("Failed") }).catch(e => console.log(e));

 });
  
  showBannerIfAlreadyReserved(adventure);

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  //let temp = true;
  if (adventure.reserved== false)
  {
    document.getElementById("reserved-banner").style.display="none";

  }
  else
  {
    document.getElementById("reserved-banner").style.display= "block";
    }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
