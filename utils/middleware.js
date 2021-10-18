const Blog = require("../models/Blog")
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const config = require('./config')

const getTokenFrom = (request,response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)
        request.token = token 
        next()
    }
    else{
        next()
    }
  }
const getUserFrom = async (request,response, next) => {
    const token = request.token
    if(token){
    const decodedToken = jwt.verify(token, config.SECRET)
    if (token && decodedToken.id){
    request.user = await User.findById(decodedToken.id)}}
    next()
}

module.exports = [getTokenFrom, getUserFrom]