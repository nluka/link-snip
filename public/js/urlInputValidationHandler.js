export default function urlInputValidationHandler(
  field,
  error,
  inputElement,
  feedbackElement
) {
  const message = error.split(field + ' ')[1];
  feedbackElement.innerText =
    message.charAt(0).toUpperCase() + message.slice(1);
  feedbackElement.setAttribute('data-visible', `${true}`);

  inputElement.classList.add('is-invalid');
  inputElement.addEventListener(
    'input',
    () => {
      inputElement.classList.remove('is-invalid');
      feedbackElement.removeAttribute('data-visible');
    },
    { once: true }
  );
}
