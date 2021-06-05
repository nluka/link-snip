//#region form

const formUrlCreate = document.getElementById('formUrlCreate');
const inputUrlName = document.getElementById('inputUrlName');
const inputUrlFull = document.getElementById('inputUrlFull');
const inputUrlShort = document.getElementById('inputUrlShort');
const divShortUrlFeedback = document.getElementById('divUrlShortFeedback');

const statusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
};

const handleSubmit = async (event) => {
  event.preventDefault();
  divShortUrlFeedback.removeAttribute('data-visible');
  try {
    // eslint-disable-next-line no-undef
    await axios.post('/api/create', {
      name: inputUrlName.value,
      fullUrl: inputUrlFull.value,
      shortUrl: inputUrlShort.value,
    });
    location.reload();
  } catch (error) {
    if (error.response.status === statusCode.CONFLICT) {
      inputUrlShort.classList.add('invalid');
      divShortUrlFeedback.setAttribute('data-visible', `${true}`);
      inputUrlShort.addEventListener(
        'input',
        () => {
          inputUrlShort.classList.remove('invalid');
          divShortUrlFeedback.removeAttribute('data-visible');
        },
        { once: true }
      );
    }
    console.error(error);
  }
};

formUrlCreate.addEventListener('submit', handleSubmit);

//#endregion

//#region table

const tdsUrlShort = document.querySelectorAll('.td-url-short');

tdsUrlShort.forEach((td) => {
  const divTextUrlShort = td.querySelector('.div-text-url-short');
  const btnCopyToClipboard = td.querySelector('.btn-url-short-copy');
  btnCopyToClipboard.addEventListener('click', () => {
    navigator.clipboard.writeText(
      `${location.href}short/${divTextUrlShort.innerText}`
    );
    btnCopyToClipboard.classList.add('copied');
    btnCopyToClipboard.addEventListener(
      'blur',
      () => {
        btnCopyToClipboard.classList.remove('copied');
      },
      { once: true }
    );
  });
});

const buttonsUrlEdit = document.querySelectorAll('.button-url-edit');

buttonsUrlEdit.forEach((button) => {
  button.addEventListener('click', async () => {
    location.replace(`/edit/${button.getAttribute('data-url-short')}`);
  });
});

const buttonsUrlDelete = document.querySelectorAll('.button-url-delete');

buttonsUrlDelete.forEach((button) => {
  button.addEventListener('click', async () => {
    const shortUrl = button.getAttribute('data-url-short');
    try {
      // eslint-disable-next-line no-undef
      await axios.delete('/api/delete', {
        data: {
          shortUrl,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      location.reload();
    }
  });
});

//#endregion
