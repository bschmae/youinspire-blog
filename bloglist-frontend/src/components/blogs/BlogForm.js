import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../reducers/blogReducer';


const BlogForm = () => {
    const [ body, setBody ] = useState('');
    const [ title, setTitle ] = useState('');
    const dispatch = useDispatch();

    const onSubmiteHandleForm = (event) => {
        event.preventDefault();
        const blog = {
            title: title,
            body: body,
        };
        
        setTitle('')
        setBody('')

        dispatch(createBlog(blog));
       

    }

    return (
    <form onSubmit={ onSubmiteHandleForm } className='blogform'>
        <div >
            <h1>Add new blog</h1>
            Title
                <br></br>
                <input
                    className='blogform-inputs'
                    type='text'
                    value={title}
                    name='title'
                    onChange={({ target }) => setTitle(target.value)}
                    id='title'
                />
                <br></br>
                Start blog here
                <br></br>
                <textarea 
                    className='blogform-inputs'
                    type='text'
                    value={body}
                    name='text'
                    onChange={({ target }) => setBody(target.value)}
                    id='blog-body'
                />
                <br></br>
            <button type='submit'>publish</button>
        </div>
        
    </form>
    )
};

export default BlogForm;