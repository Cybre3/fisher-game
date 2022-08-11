import { loadCatches, addCatch, updateCatch, deleteCatch } from './app.js';
import { hideModal, toggleList } from './modal.js';
import { modalPopup } from '../js/nav.js';

// Interface
loadBtn.addEventListener('click', loadCatches);
addBtn.addEventListener('click', addCatch);

// Modal
continueButton.addEventListener('click', hideModal);
modalLoadBtn.addEventListener('click', loadCatches);
modalPopoverBtn.addEventListener('click', toggleList);

// Nav
menuBtn.addEventListener('click', modalPopup);

// make event listeners for each catch div
export function makeCatchListeners() {
  let catchDIVSEntries = Object.values(catchDIVS);
  catchDIVSEntries.forEach((aCatch) => {
    const catchUpdateBtn = aCatch.querySelector('.update');
    const catchDeleteBtn = aCatch.querySelector('.delete');
    catchUpdateBtn.addEventListener('click', updateCatch);
    catchDeleteBtn.addEventListener('click', deleteCatch);
  });
}
