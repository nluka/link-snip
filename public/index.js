//#region form

const formUrlCreate = document.getElementById('formUrlCreate');
const inputUrlName = document.getElementById('inputUrlName');
const inputUrlFull = document.getElementById('inputUrlFull');
const inputUrlShort = document.getElementById('inputUrlShort');

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post('/api/create', {
      name: inputUrlName.value,
      fullUrl: inputUrlFull.value,
      shortUrl: inputUrlShort.value,
    });
    location.reload();
  } catch (error) {
    console.error(error);
  }
};

formUrlCreate.addEventListener('submit', handleSubmit);

//#endregion

const tdsUrlShort = document.querySelectorAll('.td-url-short');

tdsUrlShort.forEach((td) => {
  const divTextUrlShort = td.querySelector('.div-text-url-short');
  const btnCopyToClipboard = td.querySelector('.btn-url-short-copy');
  btnCopyToClipboard.addEventListener('click', () => {
    navigator.clipboard.writeText(
      `${location.href}short/${divTextUrlShort.innerText}`
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
