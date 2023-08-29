/**
 * we will use a global context to serve our app (since it is only one page app)
 * with the data (all tasks) coming from the API, in order to avoid passing data through the dom tree
 * from the local state (useState)
 * it is a global state, that each component (child) can dispatch it
 */

// this function allows to create a context
import { createContext, useReducer } from "react";

// make sure to export this context created
export const TaskContext = createContext()

/**
 * here we define our reducer, it takes the previous state (the null tasks obj passed),
 * and the action (change & payload for dispatch)
 */
export const taskReducer = (state, action) => {
  switch (action.type) {
    // if we want to set all tasks we have in the api, so we return payload
    // this sets tasks from null to all data pased to payload through dispatch
    case 'SET_TASKS':
      return {
        tasks: action.payload
      }

    // when we create a workout, we set the array of all our previous tasks
    // plus: the new added one (passed to dispatch payload)
    // remember that payload is whatever data that causes the change (causes the action.type)
    case 'CREATE_TASK':
      return {
        // all the state tasks + the new created task (payload)
        tasks: [action.payload, ...state.tasks]
      }
    
      // using filter to set the tasks to all tasks except the one being deleted
      case 'DELETE_TASK':
        return {
          // return only tasks objects where they are not the one being deleted
          // (aka. their id != id of payload json being sent between API and client side)
          tasks: state.tasks.filter((task) => task._id !== action.payload._id)
        }


    // default, return the state as it is
    default:
      return state
  }
}

// we need a provider (react component) to provide our context to the application (or any set of pages we want)
export const TaskContextProvider = ({ children }) => {
  // children obj represents all components wrapped by this context provider (App here)
  // return a template that wraps the set of components in our app that need the context
  // since our app is one page only, we need to wrap the App tag here (we do that on index.js)

  /**
   * we will use a state (or reducer) to pass as value to our children
   * it takes a reducer function and an initial object (set to null)
   * this is similar to useState, in addition to a reducer function
   * to update state, we use dispatch (has type that describes our change,
   * payload that describes any data we need to make the action) (both: action)
   * to keep the UI in sync w db, we dispatch an action
   */
  const [state, dispatch] = useReducer(taskReducer, {
    // put empty array instead of null
    tasks: []
  })

  return (
    // pass the state and dispatch to be invoked by children (both as ONE object)
    // ...state <=> tasks (that are set to null)
    <TaskContext.Provider value={{...state, dispatch}}>
      { children }
    </TaskContext.Provider>
  )
}