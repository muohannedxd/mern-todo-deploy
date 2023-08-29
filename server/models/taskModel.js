const mongoose = require('mongoose')
const Schema = mongoose.Schema

// we will create schemas for our collections
const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, {timestamps: true}) // to track when it is set and updated

module.exports = mongoose.model('Task', taskSchema)
/**
 * the model is like the collection, we give it the schema defined
 * eg: fetching data => Task.find()
 */