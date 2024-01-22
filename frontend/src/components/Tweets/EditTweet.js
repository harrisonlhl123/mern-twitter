import './EditTweet.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweet, getTweet, patchTweet } from '../../store/tweets'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const EditTweet = ({tweetId, setShowModal}) => {

    const dispatch = useDispatch();
    const tweet = useSelector(getTweet(tweetId));
    const [text, setText] = useState(tweet.text);
    const history = useHistory();


    function changeBody(e) {
        setText(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(patchTweet({_id: tweetId, text})).then(() => setShowModal(false));
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