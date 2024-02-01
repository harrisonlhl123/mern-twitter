import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchComments, getComments } from '../../store/comments';

const AllComments = ({tweetId}) => {
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(fetchComments(tweetId));
    }, [tweetId]);
    
    const comments = useSelector(getComments)

    return (
        <>
            <ul>
            {Object.values(comments).map((comment) => (
                <li key={comment._id}>{comment.text}</li>
            ))}
            </ul>
        </>
    )
}

export default AllComments