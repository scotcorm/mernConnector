const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCitationInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.creator = !isEmpty(data.creator) ? data.creator : '';
  data.source = !isEmpty(data.source) ? data.source : '';
  data.license = !isEmpty(data.license) ? data.license : '';

  if (!Validator.isLength(data.title, { min: 3, max: 100 })) {
    errors.title = 'Title must be between 3 and 100 characters';
  }

  if (!Validator.isLength(data.creator, { min: 3, max: 300 })) {
    errors.creator = "Creator's name must be between 3 and 30 characters";
  }

  if (!Validator.isLength(data.source, { min: 3, max: 300 })) {
    errors.source = 'Source should be a URL';
  }

  // if (!Validator.isLength(data.license, { min: 3, max: 100 })) {
  //   errors.license = 'Choose a license';
  // }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.creator)) {
    errors.creator = 'Creator field is required';
  }

  if (Validator.isEmpty(data.source)) {
    errors.source = 'Source field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
