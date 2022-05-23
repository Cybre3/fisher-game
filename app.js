// catch log elements

let catchesDiv = document.getElementById("catches");
let loadBtn = document.getElementsByClassName("load")[0];
let addBtn = document.querySelector("button.add");
let catchDIVS = document.getElementsByClassName("catch");
// console.log(catchDIVS)
// let addFormEls = document.getElementById("addForm").querySelectorAll("* input");
let tempFields = document.querySelectorAll("#addForm > input");
let [angler, weight, species, loactionCaught, bait, captureTime] = tempFields;
// console.log(tempFields);
// console.log(
//   angler,
//   weight,
//   species.value,
//   loactionCaught,
//   bait.value,
//   captureTime.value
// );

// Event Listener

loadBtn.addEventListener("click", loadCatches);

addBtn.addEventListener("click", addCatch);

// Load catches and return parsed JSON

async function fetchCatches() {
  const response = await fetch(
    "https://kings-fisher-game-default-rtdb.firebaseio.com/catches/.json"
  );

  if (!response.ok) {
    const message = `Some error, ${response.status}`;
    throw new Error(message);
  }

  const catches = await response.json();

  return catches;
}

// Loop over all the items in the object, create the html

async function loadCatches() {
  // console.log("load catches button clicked");
  let catchesHTML = ``;
  let fetchedCatches = await fetchCatches();
  // console.log("fetched catches are", fetchedCatches);

  for (const key in fetchedCatches) {
    // console.log(fetchedCatches[key]);

    catchesHTML += `<div class="catch" data-id="${key}">
    <label>Angler</label>
    <input type="text" class="angler" value="${fetchedCatches[key].angler}" />
    <hr>
    <label>Weight</label>      
    <input type="number" class="weight" value="${fetchedCatches[key].weight}" />
    <hr>
    <label>Species</label>
    <input type="text" class="species" value="${fetchedCatches[key].species}" />
    <hr>
    <label>Location</label>
    <input type="text" class="location" value="${fetchedCatches[key].location}" />
    <hr>
    <label>Bait</label>
    <input type="text" class="bait" value="${fetchedCatches[key].bait}" />
    <hr>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${fetchedCatches[key].captureTime}" />
    <hr>
    <button class="update">Update</button>
    <button class="delete">Delete</button>
</div>`;
  }

  catchesDiv.innerHTML = catchesHTML;
  makeCatchListeners();
}

// Add a new catch and reload the catches

async function addCatch() {
  console.log("add catch was clicked");

  var newCatch = JSON.stringify({
    angler: angler.value,
    bait: bait.value,
    captureTime: captureTime.value,
    location: loactionCaught.value,
    species: species.value,
    weight: weight.value,
  });

  await fetch("https://kings-fisher-game-default-rtdb.firebaseio.com/catches/.json", {
    method: "POST",
    body: newCatch,
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  loadCatches();
}

function makeCatchListeners() {
  let catchDIVSEntries = Object.entries(catchDIVS);
  catchDIVSEntries.forEach((aCatch) => {
    const catchUpdateBtn = aCatch[1].children[18];
    const catchDeleteBtn = aCatch[1].children[19];
    catchDeleteBtn.addEventListener("click", deleteCatch);
    catchUpdateBtn.addEventListener("click", updateCatch);
  });
}

async function updateCatch(e) {
  // console.log("updateCatch invoked!");
  let catchID = e.target.parentElement.getAttribute("data-id");
  // console.log(catchID);
  let tempUdateFields = Object.values(e.target.parentElement.children);
  // console.log(tempUdateFields);
  let tempAngler = tempUdateFields[1];
  let tempWeight = tempUdateFields[4];
  let tempSpecies = tempUdateFields[7];
  let tempLocationCaught = tempUdateFields[10];
  let tempBait = tempUdateFields[13];
  let tempCaptureTime = tempUdateFields[16];

  // console.log(tempAngler, tempBait, tempCaptureTime, tempLocationCaught, tempSpecies, tempWeight)

  var updatedCatch = JSON.stringify({
    angler: tempAngler.value,
    bait: tempBait.value,
    captureTime: tempCaptureTime.value,
    location: tempLocationCaught.value,
    species: tempSpecies.value,
    weight: tempWeight.value,
  });

  await fetch(`https://kings-fisher-game-default-rtdb.firebaseio.com/catches/${catchID}.json`, {
    method: "PUT",
    body: updatedCatch,
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  loadCatches();
}

async function deleteCatch(e) {
  let catchID = e.target.parentElement.getAttribute("data-id");
  // console.log(catchID);

  await fetch(`https://kings-fisher-game-default-rtdb.firebaseio.com/catches/${catchID}.json`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  loadCatches();
}
