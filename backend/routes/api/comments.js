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
            user: req.user._id,
            tweet: req.body.tweet
        });

        let comment = await newComment.save();
        comment = await comment.populate('user', '_id name');
        await comment.populate('tweet', '_id');

        return res.json(comment);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
