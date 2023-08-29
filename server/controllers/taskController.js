/**
 * this file is a controller file that help us to not heavy load the routes
 * with business logic and db interactions
 */

/**
 * since db interactions are asynchronous (do not wait for previous function to finish)
 * async and await are ways to control the asynchronous functions
 * await pauses the execution of this function until the previous one terminates
 * so here once the creation completes, the posting function works
 */

/**
 * 200: request valid
 * 400: request invalid
 * 404: request missing
 */


// lets require the model we created of tasks
const Task = require('../models/taskModel')

// this is to check validity of type of id
const mongoose = require('mongoose')

// get all tasks
const showTasks = async (req, res) => {
  // fetch all tasks (sorted by date of creation)
  // req.user is id of the user logged in (auth middleware)
  const tasks = await Task.find({user_id: req.user}).sort({createdAt:-1})
  res.status(200).json(tasks)
}

// get a single task
const showTask = async (req, res) => {
  const {id} = req.params
  // check validity (to avoid errors)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'task does not exist'})
  }
  // else, continue logic
  const task = await Task.findOne({_id: id})
  if (!task) {
    return res.status(404).json({error: 'task does not exist'})
  }
  res.status(200).json(task)
}

// post a new task
const createTask = async (req, res) => {
  // destructure data from request body holder
  const {name, priority} = req.body
  // handling empty fields
  emptyFields = []
  if (!name) {
    emptyFields.push('name')
  }
  if (!priority) {
    emptyFields.push('priority')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({error: "Please fill all fields", emptyFields})
  }

  try {
    // create a new Task record (insertOne does not work in express models)
    const task = await Task.create({name, priority, user_id:req.user})
    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

// delete a task
const deleteTask = async (req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'task does not exist'})
  }
  // else (use findOneAndDelete so that to return json of the deleted object to update UI)
  const task = await Task.findOneAndDelete({_id: id, user_id: req.user})
  if (!task) {
    return res.status(404).json({error: 'task does not exist'})
  }
  //else
  res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'task does not exist'})
  }
  // else (use findOneAndDelete so that to return json of the deleted object to update UI)
  const task = await Task.findOneAndUpdate({_id: id, user_id: req.body}, {
    // update if there are new values, else keep the current ones
    ...req.body
  })
  if (!task) {
    return res.status(404).json({msg: 'task does not exist'})
  }
  // else
  res.status(200).json(task)
}


// and of course export all functions to use them in routes file
module.exports = {
  createTask,
  showTasks,
  showTask,
  deleteTask,
  updateTask
}