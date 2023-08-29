require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const tasksRoutes = require("./routes/tasks")
const usersRoutes = require("./routes/users")

// port and db connection URI
const PORT = process.env.PORT
const URI = process.env.MONGO_URI

// express app
const app = express()

// vercel
app.use(cors(
  {
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
))

/**
 * this middleware allow us to pass data to our request and
 * access it through the req.body
 */
app.use(express.json())

// middleware to log a message to consolle whenever a request occurs (optional)
app.use((req, res, next) => {
  console.log(`logged: ${req.path} with: ${req.method}`)
  next() // always run the next function to allow it to execute the next lines
})

/* use the routes of tasks defined in tasks.js
 * this middleware will take those routes defined there 
 * and use them here in the app
 * the path specified allows to use them only there
 */
// tasks routes
app.use('/api/tasks', tasksRoutes)
// users routes
app.use('/api/users', usersRoutes)

// connect to database (it is an asynchronous promise)
mongoose.connect(URI)
  .then(() => {
    // listening to the app requests better be after connecting to db
    app.listen(PORT, () => console.log("connected to db & server running..."))
  })
  .catch((err) => console.log(err))
