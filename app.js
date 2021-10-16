const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')

const mongoUrl =  process.env.NODE_ENV === 'test'
?'mongodb+srv://jhalah:Fullstack@cluster0.z1fly.mongodb.net/blogilista-testi?retryWrites=true&w=majority'
:'mongodb+srv://jhalah:Fullstack@cluster0.z1fly.mongodb.net/blogilista?retryWrites=true&w=majority'

mongoose.connect(mongoUrl)
    .then((_result) => {
        console.log("connected to MongoDB")
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)

module.exports = app