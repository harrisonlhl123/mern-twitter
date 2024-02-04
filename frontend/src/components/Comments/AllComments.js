import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchComments, getComments } from '../../store/comments';

const AllComments = ({tweetId}) => {
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(fetchComments(tweetId));
    }, [tweetId]);
    
    const allComments = useSelector(getComments);
    // Filter comments based on the tweetId
    const comments = Object.values(allComments).filter(
      (comment) => comment.tweet === tweetId
    );

    return (
        <>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>{comment.text}</li>
                ))}
            </ul>
        </>
    )
}

export default AllComments