import { useEffect, useState } from "react";
import Toggle from "../Toggle";
import CommentForm from './CommentForm';

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            {comment}
        </div>
    )
};

const CommentList = ({ blog }) => {
    const [ comments, setComments ] = useState([])

    useEffect(() => {
        if (blog.comments) {
            setComments(blog.comments)
        }
    }, []);

    return (
        <div className="comments">
            <h4>Comments</h4>
            <Toggle showLabel='add comment' hideLabel='cancel'>
                <CommentForm blog={blog}/>
            </Toggle>
            {comments.map(comment => 
                <Comment 
                    comment={comment}
                />
                )}
        </div>
    )
};

export default CommentList;