import React, { useState } from 'react';
import EditTweet from './EditTweet';
import { Modal } from '../Modal/Modal';

function EditTweetModal({tweetId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => {setShowModal(true)}}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditTweet tweetId={tweetId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default EditTweetModal