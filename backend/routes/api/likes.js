const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');
const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');
const { requireUser } = require('../../config/passport');
const validateLikeInput = require('../../validations/likes');

router.post('/', requireUser, async (req, res, next) => {
    try {
        const newLike = new Like({
            user: req.body.user,
            likeable: req.body.likeable,
            likeableType: req.body.likeableType
        });

        let like = await newLike.save();
        like = await like.populate('user', '_id username');
        return res.json(like);
    } catch (err) {
        next(err);
    }
});

module.exports = router;