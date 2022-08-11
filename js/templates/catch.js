export const catchDiv = (key, fetchedCatches) => {
  return `<div class="catch" data-id="${key}">
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
};
