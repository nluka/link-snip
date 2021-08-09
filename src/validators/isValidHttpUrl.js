module.exports = function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (err) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};
