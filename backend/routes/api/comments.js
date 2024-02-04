const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');
const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');
const validateCommentInput = require('../../validations/comments');

router.post('/', requireUser, async (req, res, next) => {
    try {
        const newComment = new Comment({
            text: req.body.text,
            user: req.body.user,
            tweet: req.body.tweet
        });

        let comment = await newComment.save();
        comment = await comment.populate('user', '_id username');
        // await comment.populate('tweet', '_id');
        comment = {
            ...comment.toJSON(),
            tweet: comment.tweet._id,
        };

        return res.json(comment);
    } catch (err) {
        next(err);
    }
});

router.get('/tweet/:tweetId', async (req, res, next) => {
    let tweet;
    try{
        tweet = await Tweet.findById(req.params.tweetId);
    } catch(err) {
        const error = new Error("Tweet not found");
        error.statusCode = 404;
        error.errors = { message: "No tweet found with that id" };
        return next(error);
    }
    try{
        const comments = await Comment.find({ tweet: tweet._id })
        .populate("user", "_id username");
        return res.json(comments);
    }
    catch(err) {
        return res.json([]);
    }
});


module.exports = router;
