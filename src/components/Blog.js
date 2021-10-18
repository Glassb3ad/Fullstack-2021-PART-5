
import React, { useState } from 'react'
import Like from './Like'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const tyyli = { borderStyle: 'solid' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const removebutton = () => {
    return(<button onClick={handleRemove}>remove</button>)
  }
  const handleRemove = async () => {
    if(window.confirm('Are you sure you want remove this blog?')){
      await blogService.deleteBlog(blog.id)
      setBlogs((await blogService.getAll()).sort((a,b) => b.likes-a.likes))
    }
  }
  //console.log(user)
  //console.log(blog.user.id)

  return (
    <div style = {tyyli}>
      <div style={hideWhenVisible}>
        <p>{blog.title} <button onClick={toggleVisibility}>view</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <Like blog = {blog} setBlogs = {setBlogs}/></p>
        <p>{blog.author}</p>
        {user.username === blog.user.username && removebutton()}
      </div>
    </div>
  )
}


export default Blog