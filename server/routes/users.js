const express = require('express')
const routes = express.Router()
// controllers
const {
  getUser,
  signupUser,
  signoutUser,
  loginUser
} = require('../controllers/userController')

// one user
routes.get('/:id', getUser)

// signup new user
routes.post('/signup' , signupUser)

// login
routes.post('/login', loginUser)

// sign out a user
routes.delete('/:id', signoutUser)

module.exports = routes