import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../reducers/notificationReducer";
import { deleteBlog, initializeBlogs, likeBlog } from "../../reducers/blogReducer";
import Toggle from "../Toggle"
import CommentList from "../comments/Comments";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const shouldDelete = window.confirm(`Remove blog: ${blog.title}?`)
    
    if (shouldDelete) {
      dispatch(deleteBlog(blog.id));
      dispatch(setNotification(`successfully deleted blog: ${blog.title}`, 5))
    };
  };

  const handleLike = () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id};
    dispatch(likeBlog(blogToUpdate.id, blogToUpdate));
    dispatch(setNotification(`you liked: ${blog.title}`, 5));
    dispatch(initializeBlogs());
  }

  return (
  <div className='blog' >
      <p>{ blog.title }</p>
      <Toggle showLabel='view' hideLabel='hide'>
        <p>{ blog.body }</p>
        <br></br>
        <p>likes: { blog.likes }</p> 
        <br></br>
        <p>author: { blog.user ? blog.user.username : '' }</p>
        <br></br>
        <Toggle showLabel='comments' hideLabel='hide comments'>
          <CommentList 
            blog={blog}
          />
        </Toggle>
        <div className="blog-buttons">
          <button onClick={handleLike} id='like-button' >like <i className="bi bi-hand-thumbs-up"></i></button> 
          <button onClick={ handleDelete }>remove</button>
        </div>
      </Toggle>
  </div> 
  ); 
};

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => {
    const sortedBlogs = [...blogs];
    return sortedBlogs
      .sort((a, b) => {
        return b.likes - a.likes
      });
    });

    return (
      <div className="bloglist">
        {blogs.map(blog => 
          <Blog 
          key={blog.id}
          blog={blog}
          />
          )}
      </div>
    );
};

export default BlogList;