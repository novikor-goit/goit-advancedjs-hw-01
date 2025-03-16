let formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

function save() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function load() {
  return JSON.parse(window.localStorage.getItem(STORAGE_KEY));
}

function clear() {
  window.localStorage.clear();
  for (let key in formData) {
    formData[key] = '';
  }
}

/**
 * @param {String} fieldName
 */
const trackState = fieldName => {
  const field = document.querySelector(`[name=${fieldName}]`);
  if (formData[fieldName]) {
    field.value = formData[fieldName];
  }

  field.addEventListener('input', event => {
    formData[fieldName] = event.target.value.trim();
    save();
  });
};

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();

  if (Object.values(formData).some(field => field === '')) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);
  clear();
  event.target.reset();
});

(() => {
  formData = load() || formData;
  Object.keys(formData).forEach(trackState);
})();
