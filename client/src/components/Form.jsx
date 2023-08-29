import { useContext, useState } from "react";
import Button from "./Button";
import { TaskContext } from "../context/taskContext";
import { AuthContext } from "../context/authContext";


export default function Form() {
  // state variable for form inputs
  const [data, setData] = useState({
    name: "",
    priority: "",
  });

  // controll if added or not
  const [added, setAdded] = useState(false);
  const [emptyFields, setEmptyFields] = useState([])
  const [error, setError] = useState("")

  // destructure dispatch from the context
  const {dispatch} = useContext(TaskContext)
  const {user} = useContext(AuthContext)

  // handling the form change
  function handleFormChange(event) {
    // destructure form inputs name and value
    const { name, value } = event.target;
    setData((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  }

  // handling the submission
  async function handleSubmit(event) {
    event.preventDefault();
    // add authorization headers before creating
    const response = await fetch("/api/tasks", {
      // specify method, body of the fetch request, and type
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    });
    // parse the response into json (to send to backend)
    const json = await response.json();
    // check if response valid or not
    if (response.ok) {
      // set data back to null
      setData({
        name: "",
        priority: 1,
      });
      setAdded(true);
      // dispatch the created task so that the context is updated
      dispatch({type: 'CREATE_TASK', payload: json})
      // setError and emptyFields back
      setError("")
      setEmptyFields([])
      
    } else {
      setAdded(false);
      setEmptyFields(json.emptyFields)
      setError(json.error)
    }
  }

  return (
    <>
      <form
        className="py-4 px-10 flex justify-between sm:flex-col sm:gap-2 sm:px-4 w-[100%]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          value={data.name}
          className={`name ${emptyFields.includes('name') && 'border-red-500'}`}
          onChange={handleFormChange}
          placeholder="type a task"
        />
        <input
          type="number"
          name="priority"
          className={`priority ${emptyFields.includes('priority') && 'border-red-500'}`}
          onChange={handleFormChange}
          min={1}
          max={5}
          maxLength={1}
          placeholder="/5"
        />
        <button
          type="submit"
          className="text-white font-semibold px-6 py-2 rounded-lg cursor-pointer bg-add"
        >
          Add Task
        </button>
      </form>
      {added && <p className="text-green-500 px-10 sm:px-6">New task added</p>}
      {error && <p className="text-red-500 px-10 sm:px-6"> {error} </p>}
    </>
  );
}
