import './EditTweet.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweet, getTweet, updateTweet } from '../../store/tweets'


const EditTweet = ({tweetId}) => {

    const dispatch = useDispatch();
    const tweet = useSelector(getTweet(tweetId));
    const [text, setText] = useState(tweet.text);

    useEffect(() => {
        dispatch(fetchTweet(tweetId));
    }, [tweetId])


    function changeBody(e) {
        setText(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateTweet({tweetId, text}))
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <textarea onChange={changeBody} value={text}></textarea>
                <input type="submit" value="Update Tweet"></input>
            </form>
        </>
    )
}

export default EditTweet;