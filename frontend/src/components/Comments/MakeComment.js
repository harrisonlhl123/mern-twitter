import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../store/comments';

const MakeComment = ({tweetId}) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const currentUser = useSelector((state) => state.session.user);

    const changeText = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createComment({text, tweet: tweetId, user: currentUser}))

        setText("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea onChange={changeText} value={text} placeholder="Write a comment"></textarea>
            <input type="submit" valeue="Send"></input>
        </form>
    )
}

export default MakeComment