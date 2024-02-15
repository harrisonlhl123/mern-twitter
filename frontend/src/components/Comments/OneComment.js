import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getCommentLikes, deleteLike, createLike, fetchLikes } from "../../store/like";


function OneComment ({comment}) {
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    useEffect(() => {
        if (comment._id) {
            dispatch(fetchLikes(comment._id));
        }
    }, [comment._id]);

    let likesForComment = useSelector(getCommentLikes(comment._id))

    let numOfLikes = likesForComment.length ? likesForComment.length : null;
  
    //checks if there exists a like in the likes array that matches currentUser
    const userliked = likesForComment.some((like) => like.user == currentUser._id )
    //finds the actual like in the array and sets it to likeByUser
    const likeByUser = likesForComment.find((like) => like.user == currentUser._id)
  
    function handleUnlikeClick(e) {
        e.preventDefault();
  
        dispatch(deleteLike(likeByUser._id))
    }
  
    function handleLikeClick(e) {
        e.preventDefault();
  
        let like = {
            user: currentUser._id,
            likeable: comment._id,
            likeableType: 'comment'
        }
        dispatch(createLike(like))
    }
  
    const likeButtonStyle = {
        color: userliked ? 'blue' : 'grey',
    };

    return (
        <>
            {comment.user.username}: {comment.text}
            <>{numOfLikes}</>
            <button onClick={userliked ? handleUnlikeClick : handleLikeClick}>
                <i className="fa-solid fa-thumbs-up" style={likeButtonStyle}></i>
                <p style={likeButtonStyle}>Like</p>
            </button>
        </>
    );
}

export default OneComment