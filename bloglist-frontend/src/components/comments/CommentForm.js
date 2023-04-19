import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../reducers/blogReducer";

const commmentForm = ({ blog }) => {
    const [ comment, setComment ] = useState('');

    const dispatch = useDispatch();

    const commentData = { comment: comment }

    const handleSubmit = (event, id, commentData) => {
        event.preventDefault();
        if (comment) {
            dispatch(createComment(id, commentData));
        } else {
            console.log('must add comment')
        }
        setComment('');
    };

     return (
        <form onSubmit={event => handleSubmit(event, blog.id, commentData)}>
            <textarea className='comment-text-area' value={comment} onChange={({ target }) => setComment(target.value)} />
            <button type='submit' >add comment</button>
        </form>
    )
};

export default commmentForm;