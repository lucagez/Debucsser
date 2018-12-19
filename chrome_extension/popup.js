function saveSettings(field) {
  const key = field.name;
  const value = field.type !== "checkbox" ? field.value : field.checked;

  // Create a key value pair for each form field based on the html name and value of the field.
  chrome.storage.sync.set({ [key]: value}, () => {
    console.log('Value ist set to', value);
  })
}

function initForm() {
  const formFields = document.querySelectorAll('.debucsser-form-field');
  formFields.forEach(field => {
    chrome.storage.sync.get([field.name], (result) => {
      const value = result[field.name];
      if (field.type !== "checkbox") {
        field.value = value;
      } else {
        field.checked = value;
      }
    })
  })
}

function getSettings(callback) {
  chrome.storage.sync.get(null, settings => {
    callback(settings);
  })
}

function getActiveTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const activeTab = tabs[0].id;
    callback(activeTab);
  })
}

function sendToActiveTab(settings) {
  getActiveTab(activeTab => {
    chrome.tabs.sendMessage(activeTab, { settings: settings }, (response) => {
      console.log(response);
    });
  })
}

function handleFormSubmit(event) {
  event.preventDefault();
  Array.from(event.target.children)
    .filter(child => child.classList.contains('debucsser-form-field'))
    .map(field => saveSettings(field));

  getSettings(sendToActiveTab);
}

function injectDebucsser() {
  getActiveTab(activeTab => {
    chrome.tabs.executeScript(activeTab, {
      file: 'debucsser.js'
    });

    getSettings(sendToActiveTab);
  });
}

function listenForLaunch() {
  const launcher = document.getElementById('debucsser-launcher');
  launcher.addEventListener('change', () => {
    if (launcher.checked) {
      injectDebucsser();
    } else {
      // ToDo
      // remove the injected div and style tags
    }
  })
}

function listenForFormUpdate() {
  const form = document.getElementById('debucsser-settings');
  form.addEventListener('submit', handleFormSubmit);
}

function init() {
  injectDebucsser();
  listenForLaunch();
  initForm();
  listenForFormUpdate();
}

init();