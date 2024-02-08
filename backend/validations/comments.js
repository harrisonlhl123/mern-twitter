const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCommentInput = [
  check('text')
    .exists({ checkFalsy: true })
    // .isLength({ min: 5, max: 140 })
    .withMessage("Comment can't be blank"),
  check('tweet')
    .exists({ checkFalsy: true })
    .withMessage('Tweet is required'),
  check('user')
    .exists({ checkFalsy: true })
    .withMessage('User is required'),
  handleValidationErrors
];

module.exports = validateCommentInput;