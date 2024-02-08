const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateLikeInput = [
    check('user')
      .exists({ checkFalsy: true })
      .withMessage('User is required'),
    check(['tweet', 'comment'])
      .exists({ checkFalsy: true })
      .withMessage('Either a tweet or a comment is required')
      .custom(({ body }) => {
          // Ensure only one of 'tweet' or 'comment' is present
          if ((body.tweet && body.comment) || (!body.tweet && !body.comment)) {
              throw new Error('Either a tweet or a comment is required, but not both');
          }
          return true;
        }),
    handleValidationErrors
  ];
  
  module.exports = validateLikeInput;