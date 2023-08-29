const express = require('express')
const router = express.Router()

// import thr functions
const {
  createTask,
  showTasks,
  showTask,
  deleteTask,
  updateTask
} = require('../controllers/taskController')

// import unauthorized access middleware
const auth = require('../middleware/auth')

// use it before everything we need to protect (it has next do not worry)
router.use(auth)

/**
 * '/' only bcz in app we defined 'api/tasks'
 */
router.get('/', showTasks)

/**
 * single task
 */
router.get('/:id', showTask)

// post (create) a new task
router.post('/', createTask)

// delete a task
router.delete('/:id', deleteTask)

// update a task
router.patch('/:id', updateTask)

// export router to be used in app
module.exports = router