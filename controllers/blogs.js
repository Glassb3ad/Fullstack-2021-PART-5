const blogsRouter = require('express').Router()
const Blog = require("../models/Blog.js")
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({}).populate('user',{username: 1, name: 1})
      .then(blogs => {
        response.json(blogs)
      })
  })

blogsRouter.post('/', (request, response) => {
    const blog = (request.body)
    const token = request.token
    //console.log (request)
    console.log(token)
    const decodedToken = jwt.verify(token, "process.env.SECRET")
    if (!token || !decodedToken.id) {
      response.status(401).json({ error: 'token missing or invalid' }).end()
    }
    User.findById(decodedToken.id)
     .then((user) =>{
    
    if (blog.likes === undefined) blog.likes = 0
    if(blog.url === undefined && blog.title === undefined) response.status(400).end()
    else{
      blog.user = user._id
      const newBlog = new Blog(blog)
      newBlog
        .save()
        .then(result => {
          user.blogs = user.blogs.concat(result._id)
          const newUser = new User(user)
          User.findByIdAndUpdate(user._id, newUser)
            .then(() =>
              response.status(201).json(result)
            )
        })   
    }
  })
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) =>{
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try{
    await Blog.findByIdAndUpdate(request.params.id, blog)
    response.json(blog).status(200).end()
  } catch (exception){
    response.status(400).send(exception)
  }
})

module.exports = blogsRouter
