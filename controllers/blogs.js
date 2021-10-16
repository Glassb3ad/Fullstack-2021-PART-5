const blogsRouter = require('express').Router()
const Blog = require("../models/Blog.js")

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    if (blog.likes === undefined) blog.likes = 0
    if(blog.url === undefined && blog.title === undefined) response.status(400).end()
    else{
      blog
        .save()
        .then(result => {
          response.status(201).json(result)
        })
      }
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
