import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs';
import { setNotification } from '../reducers/notificationReducer';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        like(state, action) {
            const changedBlog = action.payload;
            const { id } = action.payload;

            const newState = state.map(b => b.id !== id ? b : changedBlog);
            return newState;

        },
        setBlogs(state, action) {
            return action.payload;
        },
        appendBlog(state, action) {
            state.push(action.payload);
        },
        addComment(state, action) {
            const changedBlog = action.payload;
            const { id } = action.payload;

            const newState = state.map(b => b.id !== id ? b : changedBlog);
            return newState;
        }
    },
});

export const { setBlogs, appendBlog, like, addComment } = blogSlice.actions;

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createBlog = (blog) => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blog);
            dispatch(appendBlog(newBlog));
            dispatch(setNotification(`successfully added blog: ${newBlog.title}`, 5))
        } catch (error) {
            dispatch(setNotification(`error: ${error}`, 5));
        }

    };
};

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id);
        dispatch(setBlogs());
    };
};

export const likeBlog = (id, blog) => {
    return async dispatch => {
        const likedBlog = await blogService.update(id, blog);
        dispatch(like(likedBlog))
    };
};

export const createComment = (id, comment) => {
    return async dispatch => {
        const newComment = await blogService.addComment(id, comment);
        dispatch(addComment(newComment))
    }
}

export default blogSlice.reducer;