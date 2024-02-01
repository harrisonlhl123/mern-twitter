import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../store/comments';

const MakeComment = ({tweetId}) => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const changeText = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createComment({text, tweetId}))

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