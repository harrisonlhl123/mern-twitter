const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');
const { requireUser } = require('../../config/passport');
const validateTweetInput = require('../../validations/tweets');

router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find()
                              .populate("author", "_id username")
                              .sort({ createdAt: -1 });

    let tweetsObject = {}
    tweets.forEach((tweet) => {
      tweetsObject[tweet._id] = tweet;
    })

    return res.json(tweetsObject);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const tweets = await Tweet.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id username");
    return res.json(tweets);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
                             .populate("author", "_id username");
    return res.json(tweet);
  }
  catch(err) {
    const error = new Error('Tweet not found');
    error.statusCode = 404;
    error.errors = { message: "No tweet found with that id" };
    return next(error);
  }
});


router.post('/', requireUser, validateTweetInput, async (req, res, next) => {
    try {
      const newTweet = new Tweet({
        text: req.body.text,
        author: req.user._id
      });
  
      let tweet = await newTweet.save();
      tweet = await tweet.populate('author', '_id username');
      return res.json(tweet);
    }
    catch(err) {
      next(err);
    }
});

router.patch('/:id', requireUser, async (req, res, next) => {
  try {
    const tweet = await Tweet.findOneAndUpdate(
      // Find the tweet by ID and ensure it belongs to the authenticated user
      {_id: req.params.id, author: req.user._id},
      {
        // Use the $set operator to update the specified fields (in this case, the 'text' field)
        $set: {
          text: req.body.text
        }
      },
      // Set { new: true } to return the updated document instead of the original one
      {new: true}
    ).populate('author', '_id username');

    // If the tweet is not found or the user is not authorized to update it, handle the error
    if (!tweet){
      const error = new Error('Tweet not found or unauthorized');
      error.statusCode = 404;
      error.errors = { message: 'No tweet found with that id or unauthorized access'};
      return next(error);
    }

    // If the tweet is successfully updated, return the updated tweet in the response
    return res.json(tweet)
  } catch (err) {
    // If an error occurs during the update process, pass it to the error handling middleware
    next(err);
  }

});

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const tweet = await Tweet.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id
    });
    if (!tweet){
      const error = new Error('Tweet not found or unauthorized')
      error.statusCode = 404;
      error.errors = { message: 'No tweet found with that id or unauthorized access' };
      return next(error);
    }
    return res.json({ message: 'Tweet deleted successfully' });
  } catch(err) {
    next(err);
  }
})

module.exports = router;