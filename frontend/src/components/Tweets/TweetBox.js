import "./TweetBox.css"
import EditTweetModal from "./EditTweetModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTweet } from "../../store/tweets";
import MakeComment from "../Comments/MakeComment";

function TweetBox ({ tweet: { _id, text, author }}) {
  const { username } = author;
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)

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

      <MakeComment tweetId={_id}/>
    </div>
  );
}

export default TweetBox;