/* ToDo
* On start check if there are options already set
* Save options on change
* Change debucsser behavior on change
*/

function saveSettings (event) {
  const field = event.target;
  const key = field.name;
  const value = field.value;

  // Create a key value pair for each form field based on the html name and value of the field.
  chrome.storage.sync.set({ [key]: value}, () => {
    console.log('Value ist set to', value);
  })
}

function applySettings (field) {
  chrome.storage.sync.get([field.name], (result) => {
    field.value = result[field.name];
  });
}

function init() {
  const formFields = document.querySelectorAll('.debucsser-form-field');

  formFields.forEach(field => {
    // set initial values for each form field
    applySettings(field);
    // register event listeners for each form field
    field.addEventListener('change', event => saveSettings(event));
  });
}

init();