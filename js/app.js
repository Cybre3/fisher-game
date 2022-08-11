import { fetchData } from '../Utilities/fetch.js';
import { makeCatchListeners } from '../js/eventListeners.js';
import { catchDiv } from './templates/catch.js';

// button disable logic
app.forEach((el) => {
  el.disabled = true;
  el.style.cursor = 'auto';
});

// Loop over all the items in the object, create the html
async function loadCatches() {
  const fetchedCatches = await fetchData(
    'https://kings-fisher-game-default-rtdb.firebaseio.com/catches/.json',
    'Catches'
  );

  let catchesHTML = ``;

  for (const key in fetchedCatches) 
    catchesHTML += catchDiv(key, fetchedCatches);
  
  catchesDiv.innerHTML = catchesHTML;
  makeCatchListeners();
}

// Add a new catch and reload the catches

async function addCatch() {
  const addCatchFields = document.querySelectorAll('#addForm > input');
  const [angler, weight, species, loactionCaught, bait, captureTime] = addCatchFields;

  const newCatch = JSON.stringify({
    angler: angler.value,
    bait: bait.value,
    captureTime: captureTime.value,
    location: loactionCaught.value,
    species: species.value,
    weight: weight.value,
  });

  await fetchData(
    'https://kings-fisher-game-default-rtdb.firebaseio.com/catches/.json',
    'Add Catch',
    {
      method: 'POST',
      body: newCatch,
    }
  );

  loadCatches();
}

// Handle update catch button
async function updateCatch(e) {
  const catchID = e.target.parentElement.getAttribute('data-id');

  const updateCatchFields = document.querySelectorAll(`[data-id=${catchID}] > input`);
  const [angler, weight, species, loactionCaught, bait, captureTime] = updateCatchFields;

  const updatedCatch = JSON.stringify({
    angler: angler.value,
    bait: bait.value,
    captureTime: captureTime.value,
    location: loactionCaught.value,
    species: species.value,
    weight: weight.value,
  });

  await fetchData(
    `https://kings-fisher-game-default-rtdb.firebaseio.com/catches/${catchID}.json`,
    'Update Catch',
    {
      method: 'PUT',
      body: updatedCatch,
    }
  );

  loadCatches();
}

// Handle delete catch button
async function deleteCatch(e) {
  let catchID = e.target.parentElement.getAttribute('data-id');

  await fetchData(
    `https://kings-fisher-game-default-rtdb.firebaseio.com/catches/${catchID}.json`,
    'Delete Catch',
    {
      method: 'DELETE',
    }
  );

  loadCatches();
}

export { loadCatches, addCatch, updateCatch, deleteCatch };
