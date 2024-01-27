import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_TWEETS = "tweets/RECEIVE_TWEETS";
const RECEIVE_USER_TWEETS = "tweets/RECEIVE_USER_TWEETS";
const RECEIVE_TWEET = "tweets/RECEIVE_TWEET"
const RECEIVE_TWEET_ERRORS = "tweets/RECEIVE_TWEET_ERRORS";
const CLEAR_TWEET_ERRORS = "tweets/CLEAR_TWEET_ERRORS";
const UPDATE_TWEET = "tweets/UPDATE_TWEET";
const REMOVE_TWEET = "tweets/REMOVE_TWEET";

const receiveTweets = tweets => ({
  type: RECEIVE_TWEETS,
  tweets
});

const receiveUserTweets = tweets => ({
  type: RECEIVE_USER_TWEETS,
  tweets
});

const receiveTweet = tweet => ({
  type: RECEIVE_TWEET,
  tweet
})

const receiveErrors = errors => ({
  type: RECEIVE_TWEET_ERRORS,
  errors
});

const updateTweet = tweet => ({
  type: UPDATE_TWEET,
  tweet
})

const removeTweet = tweetId => ({
  type: REMOVE_TWEET,
  tweetId
})

export const clearTweetErrors = errors => ({
    type: CLEAR_TWEET_ERRORS,
    errors
});

// export const getTweet = tweetId => state => state.tweets ? state.tweets._id == tweetId : null;
export const getTweet = tweetId => state => {
  // Assuming tweetId is a string
  const tweetArray = Object.values(state.tweets) || [];
  const tweet = tweetArray.find(t => t._id === tweetId);
  return tweet || null;
};

export const getTweets = state => state.tweets ? state.tweets : [];

export const getUserTweets = userId => state => Object.values(state.tweets)
    .filter(tweet => tweet.author._id == userId)

export const fetchTweets = () => async dispatch => {
    try {
      const res = await jwtFetch ('/api/tweets');
      const tweets = await res.json();
      dispatch(receiveTweets(tweets));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const fetchTweet = tweetId => async dispatch => {
    const res = await jwtFetch(`api/tweets/${tweetId}`);

    if (res.ok) {
      const tweet = await res.json();
      dispatch(receiveTweet(tweet));
    }
  }
  
  export const fetchUserTweets = id => async dispatch => {
    try {
      const res = await jwtFetch(`/api/tweets/user/${id}`);
      const tweets = await res.json();
      dispatch(receiveUserTweets(tweets));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };
  
  export const composeTweet = data => async dispatch => {
    try {
      const res = await jwtFetch('/api/tweets/', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const tweet = await res.json();
      dispatch(receiveTweet(tweet));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const patchTweet = (tweet) => async dispatch => {
    const res = await jwtFetch((`/api/tweets/${tweet._id}`), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tweet)
    })

    if (res.ok) {
      const tweet = await res.json()
      dispatch(updateTweet(tweet))
    }
  }

export const deleteTweet = (tweetId) => async dispatch => {
  const res = await jwtFetch((`/api/tweets/${tweetId}`), {
    method: "DELETE"
  })

  if (res.ok) {
    dispatch(removeTweet(tweetId))
  }
}


const nullErrors = null;

export const tweetErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_TWEET_ERRORS:
      return action.errors;
    case CLEAR_TWEET_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};


// const tweetsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
//     switch(action.type) {
//       case RECEIVE_TWEETS:
//         return { ...state, all: action.tweets, new: undefined};
//       case RECEIVE_USER_TWEETS:
//         return { ...state, user: action.tweets, new: undefined};
//       case RECEIVE_NEW_TWEET:
//         return { ...state, new: action.tweet};
//       case RECEIVE_TWEET:
//         return { ...state, all: {...state.all, [action.tweet._id]: action.tweet}, new: undefined}
//       case RECEIVE_USER_LOGOUT:
//         return { ...state, user: {}, new: undefined }
//       default:
//         return state;
//     }
//   };

const tweetsReducer = (state = {}, action) => {
  const newState = {...state};

  switch(action.type){
      case RECEIVE_TWEETS:
          return {...newState, ...action.tweets};
      case RECEIVE_TWEET:
          return {[action.tweet._id]: action.tweet, ...newState};      
      case UPDATE_TWEET:
          return    {...newState, [action.tweet._id]: action.tweet};
      case REMOVE_TWEET:
        delete newState[action.tweetId]
        return newState
      default:
          return state;
  }
}

  
  export default tweetsReducer;
