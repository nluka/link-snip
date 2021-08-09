import STATUS_CODES from '../status-codes.js';
import toggleFormSubmitButtonState from '../toggleFormSubmitButtonState.js';
import urlInputValidationHandler from '../urlInputValidationHandler.js';

export default function initUrlForm() {
  urlPost_form.addEventListener('submit', handleSubmit);
}

const urlPost_form = document.querySelector('form#urlPost');
const urlName_input = document.querySelector('input#urlName');
const urlNameFeedback_div = document.getElementById('urlNameFeedback');
const urlActual_input = document.querySelector('input#urlActual');
const urlActualFeedback_div = document.getElementById('urlActualFeedback');
const urlShort_input = document.querySelector('input#urlShort');
const urlShortFeedback_div = document.getElementById('urlShortFeedback');
const urlPostSubmit_button = document.querySelector('button#urlPostSubmit');

const urlPostSubmitButtonText = urlPostSubmit_button.innerText;

async function handleSubmit(event) {
  event.preventDefault();

  toggleFormSubmitButtonState(urlPostSubmit_button, urlPostSubmitButtonText);

  urlNameFeedback_div.removeAttribute('data-visible');
  urlActualFeedback_div.removeAttribute('data-visible');
  urlShortFeedback_div.removeAttribute('data-visible');

  try {
    await axios.post('/api/', {
      name: urlName_input.value,
      actual: urlActual_input.value,
      short: urlShort_input.value,
    });
    location.reload();
  } catch (err) {
    if (err.response.status === STATUS_CODES.BAD_REQUEST) {
      handleFormErrors(err.response.data.errors);
    }
  }

  toggleFormSubmitButtonState(urlPostSubmit_button, urlPostSubmitButtonText);
}

function handleFormErrors(errors) {
  errors.forEach((err) => {
    const subject = err.split(' ')[0];
    errorSubjectToValidationHandlerMap[subject](err);
  });
}

const errorSubjectToValidationHandlerMap = {
  actual: urlActualValidationHandler,
  name: urlNameValidationHandler,
  short: urlShortValidationHandler,
};

function urlActualValidationHandler(error) {
  urlInputValidationHandler(
    'actual',
    error,
    urlActual_input,
    urlActualFeedback_div
  );
}

function urlNameValidationHandler(error) {
  urlInputValidationHandler('name', error, urlName_input, urlNameFeedback_div);
}

function urlShortValidationHandler(error) {
  urlInputValidationHandler(
    'short',
    error,
    urlShort_input,
    urlShortFeedback_div
  );
}
