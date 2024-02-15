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


export const fetchLikes = () => async (dispatch) => {
    const response = await jwtFetch('/api/likes')

    if(response.ok){
        const likes = await response.json()
        dispatch(receiveLikes(likes))
    }
}

export const fetchLike = likeId => async dispatch => {
    const res = await jwtFetch(`api/likes/${likeId}`);

    if (res.ok) {
      const like = await res.json();
      dispatch(receiveLike(like));
    }
}


export const createLike = (like) => async dispatch => {
    const res = await jwtFetch(('/api/likes/'), {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(like)
    })

    if (res.ok) {
        const like = await res.json()
        dispatch(receiveLike(like))
    }
}

export const deleteLike = (likeId) => async (dispatch) => {
    const response = await jwtFetch(`/api/likes/${likeId}`, {
        method: 'DELETE',
    })

    if(response.ok){
        dispatch(removeLike(likeId))
    }
}

const likesReducer = (state = {}, action) => {
    const newState = {...state};

    switch(action.type){
        case RECEIVE_LIKES:
            return {...newState, ...action.likes};
        case RECEIVE_LIKE:
            return {...newState, [action.like._id]: action.like};
        case REMOVE_LIKE:
            delete newState[action.likeId];
            return newState;
        default:
            return state;
    }
}

export default likesReducer





