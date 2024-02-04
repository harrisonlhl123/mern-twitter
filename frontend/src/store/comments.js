import jwtFetch from './jwt';

export const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "comments/RECEIVE_COMMENT";

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
})

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
})

export const getComments = state => state.comments ? state.comments : [];

export const fetchComments = (tweetId) => async dispatch => {
    const res = await jwtFetch(`/api/comments/tweet/${tweetId}`)

    if (res.ok) {
        const comments = await res.json()
        dispatch(receiveComments(comments))
        // debugger
    }
}

export const createComment = (comment) => async dispatch => {
    const res = await jwtFetch(('/api/comments/'), {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const comment = await res.json()
        dispatch(receiveComment(comment))
    }
}

const commentsReducer = (state = {}, action) => {
    let newState = {...state}

    switch(action.type){
        case RECEIVE_COMMENT:
            return {...newState, [action.comment._id]: action.comment};
        case RECEIVE_COMMENTS:
            // let comments = {}
            // action.comments.forEach((comment) => {
            //     comments[comment._id] = comment
            // })
            // return comments;
            const commentsMap = {};
            action.comments.forEach((comment) => {
              commentsMap[comment._id] = comment;
            });
            return { ...newState, ...commentsMap };
        default:
            return state;
    }
}

export default commentsReducer;

