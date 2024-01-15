import "./TweetBox.css"
import EditTweetModal from "./EditTweetModal";
import { useState } from "react";

function TweetBox ({ tweet: { _id, text, author }}) {
  const { username } = author;

  return (
    <div className="tweet">
      <h3>{username}</h3>
      <p>{text}</p>
      <EditTweetModal tweetId={_id}/>
    </div>
  );
}

export default TweetBox;