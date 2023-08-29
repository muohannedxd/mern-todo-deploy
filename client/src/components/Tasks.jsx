import { useEffect, useContext } from "react";
import Task from "./Task";
import { TaskContext } from "../context/taskContext";
import { AuthContext } from "../context/authContext";


export default function Tasks() {

  // destructure dispatch and tasks obj (that is set to null) from the context
  const {tasks, dispatch} = useContext(TaskContext)
  const {user} = useContext(AuthContext)

  // fetching data
  useEffect(() => {
    const fetchTasks = async () => {
      // grab data from api and put it in response object
      // add authorization headers
      const response = await fetch('/api/tasks', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      // parse the data into js object
      const json = await response.json()
      
      if (response.ok) {
        dispatch({type:'SET_TASKS', payload: json})
      }
    }
    // and make sure to run the function of fetching
    fetchTasks()
  }, []);

  return (
    <div className="px-10 py-6 sm:px-4 flex flex-col gap-8">
      <div className="flex justify-between px-4 font-semibold text-lg">
        <p>Task</p>
        <p>Priority (/5)</p>
      </div>
      <div className="flex flex-col gap-4">
        { (tasks && tasks.length != 0 ) ? tasks.map((task) => {
          return <Task key={task._id} task={task} />;
        }) : "No tasks are found, create some!"}
      </div>
    </div>
  );
}

/**
 * dispatch invokes the reducer function, and based on the action type in the dispatch
 * the reducer acts, it sets the state object tasks (previously null) to the payload passed
 * to dispatch here (in this case the json objects coming from the api response fetching)
 */