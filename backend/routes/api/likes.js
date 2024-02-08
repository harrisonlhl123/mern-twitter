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

router.delete('/:id', requireUser, async (req, res, next) => {
    try {
      const like = await Like.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
      });
      if (!like){
        const error = new Error('Like not found or unauthorized')
        error.statusCode = 404;
        error.errors = { message: 'No like found with that id or unauthorized access' };
        return next(error);
      }
      return res.json({ message: 'Like deleted successfully' });
    } catch(err) {
      next(err);
    }
  })

module.exports = router;