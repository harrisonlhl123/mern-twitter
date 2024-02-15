import "./TweetBox.css"
import EditTweetModal from "./EditTweetModal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTweet } from "../../store/tweets";
import MakeComment from "../Comments/MakeComment";
import AllComments from "../Comments/AllComments";
import { getTweetLikes, deleteLike, createLike, fetchLikes } from "../../store/like";

function TweetBox ({ tweet: { _id, text, author }}) {
  const { username } = author;
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    if (_id) {
        dispatch(fetchLikes(_id));
    }
  }, [_id]);

  let likesForTweet = useSelector(getTweetLikes(_id))

  let numOfLikes = likesForTweet.length ? likesForTweet.length : null;

  //checks if there exists a like in the likes array that matches currentUser
  const userliked = likesForTweet.some((like) => like.user == currentUser._id )
  //finds the actual like in the array and sets it to likeByUser
  const likeByUser = likesForTweet.find((like) => like.user == currentUser._id)

  function handleUnlikeClick(e) {
      e.preventDefault();

      dispatch(deleteLike(likeByUser._id))
  }

  function handleLikeClick(e) {
      e.preventDefault();

      let like = {
          user: currentUser._id,
          likeable: _id,
          likeableType: 'tweet'
      }
      dispatch(createLike(like))
  }

  const likeButtonStyle = {
      color: userliked ? 'blue' : 'grey',
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTweet(_id));
  }

  return (
    <div className="tweet">
      <h3>{username}</h3>
      <p>{text}</p>
      {currentUser._id == author._id && (
        <>
          <EditTweetModal tweetId={_id}/>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
      <>{numOfLikes}</>
      <button onClick={userliked ? handleUnlikeClick : handleLikeClick}>
        <i className="fa-solid fa-thumbs-up" style={likeButtonStyle}></i>
        <p style={likeButtonStyle}>Like</p>
      </button>

      <AllComments tweetId={_id} />

      <MakeComment tweetId={_id}/>
    </div>
  );
}

export default TweetBox;

