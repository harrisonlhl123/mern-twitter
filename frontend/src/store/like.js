import jwtFetch from './jwt';

export const RECEIVE_LIKES = 'likes/RECEIVE_LIKES'
export const RECEIVE_LIKE = 'likes/RECEIVE_LIKE'
export const REMOVE_LIKE = 'likes/REMOVE_LIKE'

const receiveLikes = likes =>({
    type: RECEIVE_LIKES,
    likes
})

const receiveLike = like =>({
    type: RECEIVE_LIKE,
    like 
})

const removeLike = likeId =>({
    type: REMOVE_LIKE,
    likeId
})

export const getLike = likeId => state => state.likes ? state.likes[likeId] : null;

export const getLikes = state => state.likes ? state.likes : [];

export const getTweetLikes = tweetId => state => Object.values(state.likes)
    .filter(like => like.likeable == tweetId && like.likeableType === 'tweet');

export const getCommentLikes = commentId => state => Object.values(state.likes)
    .filter(like => like.likeable == commentId && like.likeableType == 'comment');


export const fetchTweets = () => async dispatch => {
    try {
        const res = await jwtFetch ('/api/likes/');
        const tweets = await res.json();
        dispatch(receiveTweets(tweets));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
        }
    }
    };