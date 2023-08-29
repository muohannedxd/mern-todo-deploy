const User = require('../models/userModel')
const mongoose = require('mongoose')
// to hash the password (bcrypt is asynchronous, use await)
const bcrypt = require('bcrypt')
// to validate email
const validator = require('validator')
// JWT
const jwt = require('jsonwebtoken')
// to access .env
require('dotenv').config()

/**
 * JWT is a package tool that allows us to authenticate and secure API, routes
 * in both server & client sides
 * a token is composed of headers (hashtype), payload (nonsensitive data)
 * and signature (for server, it should be hidden)
 */

// function to create tokens (to be used in both signup & login)
const createToken = (_id) => {
  // _id:_id => _id only
  // sign takes payload and signature + optional config (like expiredate...)
  return jwt.sign({_id}, process.env.SECRET)
}


// one user
const getUser = async (req, res) => {
  // get id
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({msg: 'user not found'})
  }
  const user = await User.findOne({_id: id})
  if (!user) {
    return res.status(400).json({msg: 'user not found'})
  }
  res.status(200).json(user)
}

// signup
const signupUser = async (req, res) => {
  const {name, email, password, confirm} = req.body
  // handling empty fields
  emptyFields = []
  if (!name) {
    emptyFields.push('name')
  }
  if (!email) {
    emptyFields.push('email')
  }
  if (!password) {
    emptyFields.push('password')
  }
  if (!confirm) {
    emptyFields.push('confirm')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill all fields', emptyFields})
  }

  // checking email
  if(!validator.isEmail(email)) {
    return res.status(400).json({error: 'Invalid Email Address'})
  }
  const exists = await User.findOne({email: email})
  if (exists) {
    return res.status(400).json({error: 'Email Address already in use'})
  }

  // hashing the password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  try {
    /**
     * since name:name and email:email we shorten them to name, email
     * but since password:hash we ust type it explicitly
     */
    const user = await User.create({name, email, password:hash})
    // after saved to db, create the token
    const token = createToken(user._id)
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// login
const loginUser = async (req, res) => {
  const {email, password} = req.body
  // handling empty fields
  emptyLoginFields = []
  if (!email) {
    emptyLoginFields.push('email')
  }
  if (!password) {
    emptyLoginFields.push('password')
  }

  if (emptyLoginFields.length > 0) {
    return res.status(400).json({error: 'Please fill all fields', emptyLoginFields})
  }
  // validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({error: 'Invaid Email Address'})
  }
  // check if user exists
  const user = await User.findOne({email:email})
  
  // this should be before checking password (bcz if user does not exist there would not be his password)
  if (!user) {
    return res.status(400).json({error: 'Wrong Email Address or Password'})
  }
  // compare between user found password and password typed
  const match = await bcrypt.compare(password, user.password)
  
  if (!match) {
    return res.status(400).json({error: 'Wrong Email Address or Password'})
  }
  const token = createToken(user._id)
  res.status(200).json({email, token})

}

// signout
const signoutUser = async (req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({msg: 'user not found'})
  }

  const user = await User.findOneAndDelete({_id: id})
  if (!user) {
    return res.status(400).json({msg: 'cannot delete user'})
  }
  res.status(200).json(user)
}

module.exports = {
  getUser,
  signupUser,
  signoutUser,
  loginUser
}