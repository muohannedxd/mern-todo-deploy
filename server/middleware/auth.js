/**
 * this middleware is to make only authenticated users to
 * access our data and be able to execute routes
 */

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = async (req, res, next) => {
  // grab authorization (contains token) from headers
  // make sure to add authorization headers property in eact through each
  // place when we make a request that is caught up by this middleware (maily all tasks relevant actions)
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401).json({error: 'Authorization token is required'})
  }

  /**
   * getting token from authorization, authorization is a string
   * "Bearer <token>" so we'll split it and take the second element (token)
   */
  const token = authorization.split(' ')[1]

  // verify token
  try {
    // this verifies and returns the token (we grab id from it)
    const {_id} = await jwt.verify(token, process.env.SECRET)
    // check if the user exists (we will attach user to request to be used by all functions coming after this middleware)
    // this will be used to add a user id for each task
    req.user = await User.findOne({_id}).select({_id}) // to select only _id
    // do not forget the next
    next()
  } catch (error) {
    res.status(401).json({error: error.message})
  }
}

// export ofcrs to use it in tasks routes (the things we wanna protect frim unauthorized access)
module.exports = auth