const inputUrlName = document.getElementById('inputUrlName');
const inputUrlFull = document.getElementById('inputUrlFull');
const inputUrlShort = document.getElementById('inputUrlShort');

const currentShortUrl = inputUrlShort.value;

const formUrlPatch = document.getElementById('formUrlPatch');

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.patch('/api/patch', {
      shortUrl: currentShortUrl,
      newName: inputUrlName.value,
      newFullUrl: inputUrlFull.value,
    });
  } catch (error) {
    console.error(error);
  } finally {
    location.replace('/');
  }
};

formUrlPatch.addEventListener('submit', handleSubmit);

const buttonCancel = document.getElementById('buttonCancel');

buttonCancel.addEventListener('click', (event) => {
  event.preventDefault();
  location.replace('/');
});
