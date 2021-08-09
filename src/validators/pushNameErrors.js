const nameRegex = /^[a-zA-Z0-9'"\-_ ]{1,32}$/;

module.exports = function pushNameErrors(name, errors) {
  if (typeof name !== 'string') {
    errors.push('name must be a string');
    return;
  }

  name = name.trim();

  if (!name.match(nameRegex)) {
    errors.push(`name must match ${nameRegex}`);
  }
};
