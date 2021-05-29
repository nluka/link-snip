const formUrlCreate = document.getElementById('formUrlCreate');
const inputUrlName = document.getElementById('inputUrlName');
const inputUrlFull = document.getElementById('inputUrlFull');
const inputUrlShort = document.getElementById('inputUrlShort');

// action = '/';
// method = 'POST';
// enctype = 'application/x-www-form-urlencoded';

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

const buttonsUrlEdit = document.querySelectorAll('.button-url-edit');

buttonsUrlEdit.forEach((button) => {
  button.addEventListener('click', async () => {});
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
      location.reload();
    } catch (error) {
      console.error(error);
    }
  });
});
