import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchComments, getComments } from '../../store/comments';

const AllComments = (tweetId) => {
    const dispatch = useDispatch();

    // const comments = useSelector(getComments)

    useEffect(() => {
        dispatch(fetchComments(tweetId));
    }, [])

    return (
        <>
            {/* <ul>
                {comments.map((comment) => {
                    return comment
                })}
            </ul> */}
        </>
    )
}

export default AllComments