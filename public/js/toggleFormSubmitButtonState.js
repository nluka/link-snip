export default function toggleFormSubmitButtonState(
  buttonElement,
  defaultInnerText
) {
  if (buttonElement.innerText === defaultInnerText) {
    buttonElement.setAttribute('disabled', 'true');
    buttonElement.innerText = '';

    const spinner_div = document.createElement('div');
    spinner_div.classList.add('spinner-border');
    spinner_div.classList.add('text-light');
    spinner_div.setAttribute('role', 'status');

    const sr_span = document.createElement('span');
    sr_span.classList.add('visually-hidden');
    sr_span.innerText = 'Loading...';

    buttonElement.appendChild(spinner_div);
    spinner_div.appendChild(sr_span);
  } else {
    buttonElement.innerHTML = '';
    buttonElement.innerText = defaultInnerText;
    buttonElement.removeAttribute('disabled');
  }
}
