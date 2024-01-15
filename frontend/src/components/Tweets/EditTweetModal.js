import React, { useState } from 'react';
import Modal from '../Modal/Modal'
import EditTweet from './EditTweet';

function EditTweetModal({tweetId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => {setShowModal(true)}}>Edit</button>
            {showModal && (
                <Modal>
                    <EditTweet tweetId={tweetId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default EditTweetModal