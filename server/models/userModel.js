const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true //email must be unique
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)