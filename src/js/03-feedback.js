import throttle from 'lodash.throttle';

const STORAGE_KEY_EMAIL = 'email';
const STORAGE_KEY_MESSAGE = 'message';
const STORAGE_KEY_FORM_DATA = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', throttle(onEmailInput, 500));
refs.textarea.addEventListener('input', throttle(onMessageInput, 500));

populateInput();
populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(localStorage.getItem(STORAGE_KEY_FORM_DATA));
  localStorage.removeItem(STORAGE_KEY_FORM_DATA);
}

function updateFormData(value, property) {
  let currentFormData = {};
  if (localStorage.getItem(STORAGE_KEY_FORM_DATA)) {
    currentFormData = JSON.parse(localStorage.getItem(STORAGE_KEY_FORM_DATA));
  }
  currentFormData[property] = value;
  localStorage.setItem(STORAGE_KEY_FORM_DATA, JSON.stringify(currentFormData));
}

function onEmailInput(evt) {
  updateFormData(evt.target.value, STORAGE_KEY_EMAIL);
}

function onMessageInput(evt) {
  updateFormData(evt.target.value, STORAGE_KEY_MESSAGE);
}

function populateFormData(target, field) {
  if (localStorage.getItem(STORAGE_KEY_FORM_DATA)) {
    const existingFormData = JSON.parse(
      localStorage.getItem(STORAGE_KEY_FORM_DATA)
    );
    target.value = existingFormData[field];
  }
}

function populateInput() {
  populateFormData(refs.input, STORAGE_KEY_EMAIL);
}

function populateTextarea() {
  populateFormData(refs.textarea, STORAGE_KEY_MESSAGE);
}
