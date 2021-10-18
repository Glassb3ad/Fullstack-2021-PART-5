/* eslint-disable linebreak-style */
import React from 'react'
import blogService from '../services/blogs'
const Like = ({ blog, setBlogs }) => {
  const addLike = async () => {
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes +1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.updateBlog(newBlog,blog.id)
    setBlogs((await blogService.getAll()).sort((a,b) => b.likes-a.likes))

  }
  return (
    <button type="button" onClick={addLike}>like</button>
  )
}

export default Like