const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
    const body = request.body;

    if (!(body.likes)) {
      body.likes = 0;
    };

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    };

    const user = await User.findById(decodedToken.id);
    
    const blog = new Blog({
      ...body,
      user: user,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  });

blogRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      response.status(404).send({ error: 'blog not found' });
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    };

    if (decodedToken.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(blog.id);
      console.log('h')
      response.status(204).end();
    } else {
      return response.status(401).json({ error: 'you cannot delete another user\'s post' });
    };
  });

blogRouter.put('/:id', async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body);
  if (!result) {
    response.status(404).send({ error: 'blog not found' });
  };

  response.json(result);
});

blogRouter.put('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  
  if (blog) {
    const comment = request.body.comment;
    const newBlog = ({
      ...blog,
      'comments': blog.comments.push(comment)
    })

    console.log(newBlog)
    
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })

    console.log(updatedBlog)

    response.json(updatedBlog);
  }

  response.status(404).end();
})

module.exports = blogRouter;