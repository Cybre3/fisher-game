import { fetchData } from '../Utilities/fetch.js';
let showList = false;

// Modal show toggle
export function hideModal() {
  const app = document.querySelectorAll('button:not(#modal button), input');

  modalContainer.style.animation = 'fadeout 0.4s ease-out forwards';

  setTimeout(() => {
    modalContainer.style.display = 'none';
  }, 500);

  app.forEach((el) => {
    el.disabled = false;
    if (el.tagName === 'BUTTON') 
      el.style.cursor = 'pointer';
  });
}

// Small code list toggle
export function toggleList() {
  showList ? hideSmallCodeProjList() : showSmallCodeProjList();
}

function showSmallCodeProjList() {
  const outerDiv = document.createElement('div');
  outerDiv.classList = 'challenge-container';

  const innerDiv = document.createElement('div');
  innerDiv.classList = 'arrow';

  const ul = document.createElement('ul');
  ul.id = 'scc-options';

  outerDiv.appendChild(innerDiv);
  outerDiv.appendChild(ul);
  modalDescript.appendChild(outerDiv);

  listSmallCodeProjLinks();
  showList = true;
}

function hideSmallCodeProjList() {
  showList = false;
  modalDescript.removeChild(modalDescript.lastChild);
}

// List small code proj links
async function listSmallCodeProjLinks() {
  const fetchSmallCodeProjs = fetchData(
    'https://kings-fisher-game-default-rtdb.firebaseio.com/manifests/smallcodechallenges.json',
    'Small Coding Projects'
  );
  const sccOptions = document.querySelector('#scc-options');
  const fetchedSmallCodeProjs = await fetchSmallCodeProjs;
  const currentProjValuesArr = Object.values(fetchedSmallCodeProjs);
  const currentProjFilter = currentProjValuesArr.filter((proj) => proj.projName !== document.title);

  currentProjFilter.forEach((proj) => {
    const { linkName, projName } = proj;
    let li = ``;

    li += `<li class="link"><a href=${linkName}>${projName}</a></li>`;
    
    sccOptions.innerHTML += li;
  });
}
