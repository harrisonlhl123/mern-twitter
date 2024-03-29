const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateTweetInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to create/edit
// a tweet
const validateTweetInput = [
  check('text')
    .exists({ checkFalsy: true })
    // .isLength({ min: 5, max: 140 })
    .withMessage("Tweet can't be blank"),
  handleValidationErrors
];

module.exports = validateTweetInput;