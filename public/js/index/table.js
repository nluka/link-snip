export default function initUrlTable() {
  addUrlShortTextCopyToClipboardButtonListeners();
  addUrlEditButtonListeners();
}

let copyToClipboardButtonTimeout;

function addUrlShortTextCopyToClipboardButtonListeners() {
  const urlShort_tds = document.querySelectorAll('td.url-short');

  urlShort_tds.forEach((td) => {
    const urlShortText_div = td.querySelector('.url-short-text');
    const copyToClipboard_button = td.querySelector('button.url-short-copy');

    copyToClipboard_button.addEventListener('click', () => {
      if (copyToClipboard_button.classList.contains('copied')) {
        return;
      }

      navigator.clipboard.writeText(
        `${location.href}short/${urlShortText_div.innerText}`
      );

      copyToClipboard_button.classList.add('copied');
      copyToClipboardButtonTimeout = setTimeout(() => {
        copyToClipboard_button.classList.remove('copied');
      }, 2000);

      copyToClipboard_button.addEventListener(
        'blur',
        () => {
          clearTimeout(copyToClipboardButtonTimeout);
          copyToClipboard_button.classList.remove('copied');
        },
        { once: true }
      );
    });
  });
}

function addUrlEditButtonListeners() {
  const urlEdit_buttons = document.querySelectorAll('.url-edit');

  urlEdit_buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      location.replace(`/edit/${button.getAttribute('data-url-short')}`);
    });
  });

  const urlDelete_buttons = document.querySelectorAll('button.url-delete');

  urlDelete_buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const short = button.getAttribute('data-url-short');
      try {
        await axios.delete('/api/', {
          data: {
            short,
          },
        });
      } catch (err) {
        console.error(err);
      } finally {
        location.reload();
      }
    });
  });
}
