const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateLikeInput = [
    check('user')
      .exists({ checkFalsy: true })
      .withMessage('User is required'),
    check('likeable')
      .exists({ checkFalsy: true })
      .withMessage('Likeable item is required'),
    check('likeableType')
      .exists({ checkFalsy: true })
      .withMessage('Likeable type is required'),
    handleValidationErrors
  ];
  
  module.exports = validateLikeInput;