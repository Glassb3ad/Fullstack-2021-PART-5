require('dotenv').config()

let SECRET = "SALAISUUS100"
let PORT = 3003
let MONGODB_URI = 'mongodb+srv://jhalah:Fullstack@cluster0.z1fly.mongodb.net/blogilista?retryWrites=true&w=majority'
let MONGODBTEST_URI = 'mongodb+srv://jhalah:Fullstack@cluster0.z1fly.mongodb.net/blogilista-testi?retryWrites=true&w=majority'
module.exports = {
    testEnvironment: 'node', PORT, MONGODBTEST_URI, MONGODB_URI, SECRET                   
  };
