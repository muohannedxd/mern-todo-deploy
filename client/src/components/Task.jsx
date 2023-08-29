import { useContext } from 'react';
import check from '../assets/icons/checked.png'
import del from '../assets/icons/delete.png'
import { TaskContext } from '../context/taskContext';
import { AuthContext } from "../context/authContext";


export default function Task(props) {
  // destructure task elements
  const {_id, name, priority} = props.task

  // to dispatch and display tasks after delete
  const {dispatch} = useContext(TaskContext)
  const {user} = useContext(AuthContext)

  // handling the deletion button
  async function handleDelete() {
    // interact with API
    // add authorization headers
    const response = await fetch(`/api/tasks/${_id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    // parse response coming from API
    const json = await response.json()
    console.log(json)
    if (response.ok) {
      dispatch({type: "DELETE_TASK", payload: json})
    }
  }

  return (
    <div className="flex justify-between items-center gap-16">
      <div className="flex gap-4 items-center">
        <img src={check} alt="" className='h-5' />
        <p className=''>
          {name}
        </p>
      </div>
      <div className="flex gap-3 justify-center">
        <p className='text-xl'>
          {priority}
        </p>
        <img src={del} alt="" className='cursor-pointer h-5 w-5' onClick={handleDelete} />
      </div>
    </div>
  );
}
