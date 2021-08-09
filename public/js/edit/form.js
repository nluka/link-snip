import STATUS_CODES from '../status-codes.js';
import toggleFormSubmitButtonState from '../toggleFormSubmitButtonState.js';
import urlInputValidationHandler from '../urlInputValidationHandler.js';

export default function initUrlEditForm() {
  urlPatch_form.addEventListener('submit', handleSubmit);

  urlEditCancel_button.addEventListener('click', (event) => {
    event.preventDefault();
    location.replace('/');
  });
}

const urlPatch_form = document.querySelector('form#urlPatch');
const urlName_input = document.querySelector('input#urlName');
const urlNameFeedback_div = document.getElementById('urlNameFeedback');
const urlActual_input = document.querySelector('input#urlActual');
const urlActualFeedback_div = document.getElementById('urlActualFeedback');
const urlShort_input = document.querySelector('input#urlShort');
const urlShortFeedback_div = document.getElementById('urlShortFeedback');
const urlFeedback_divs = [
  urlShortFeedback_div,
  urlNameFeedback_div,
  urlActualFeedback_div,
];
const urlEditSave_button = document.querySelector('button#urlEditSave');
const urlEditCancel_button = document.querySelector('button#urlEditCancel');

const urlEditSaveButtonText = urlEditSave_button.innerText;

async function handleSubmit(event) {
  event.preventDefault();

  toggleFormSubmitButtonState(urlEditSave_button, urlEditSaveButtonText);

  urlShort_input.classList.remove('is-invalid');
  urlShortFeedback_div.innerText = '';
  urlFeedback_divs.forEach((div) => {
    div.removeAttribute('data-visible');
  });

  try {
    await axios.patch('/api/', {
      short: urlShort_input.value,
      name: urlName_input.value,
      actual: urlActual_input.value,
    });
    location.replace('/');
  } catch (err) {
    if (err.response.status === STATUS_CODES.BAD_REQUEST) {
      handleFormErrors(err.response.data.errors);
    }
  }

  toggleFormSubmitButtonState(urlEditSave_button, urlEditSaveButtonText);
}

function handleFormErrors(errors) {
  errors.forEach((err) => {
    const subject = err.split(' ')[0];
    errorSubjectToValidationHandlerMap[subject](err);
  });
}

const errorSubjectToValidationHandlerMap = {
  short: urlShortValidationHandler,
  name: urlNameValidationHandler,
  actual: urlActualValidationHandler,
};

function urlShortValidationHandler(error) {
  urlInputValidationHandler(
    'short',
    error,
    urlShort_input,
    urlShortFeedback_div
  );
}

function urlNameValidationHandler(error) {
  urlInputValidationHandler('name', error, urlName_input, urlNameFeedback_div);
}

function urlActualValidationHandler(error) {
  urlInputValidationHandler(
    'actual',
    error,
    urlActual_input,
    urlActualFeedback_div
  );
}
