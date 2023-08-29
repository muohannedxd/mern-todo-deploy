import { useContext } from "react";
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../context/authContext";


export default function Navbar() {
  // the auth context
  const {user, dispatch} = useContext(AuthContext)

  function handleLogout(params) {
    // remove user from localstorage
    localStorage.removeItem('user')
    // disipatch
    dispatch({type: 'LOGOUT'})
  }
  
  return (
    <nav className='flex justify-between py-3 px-10 items-center
        bg-white shadow-md'>
      <p className="font-bold text-2xl">
        <Link to='/'>Taskiez</Link>
      </p>
      {
        // show Links based on loggedin
      user ? <Link to='/login' className="logout-btn" onClick={handleLogout}>Logout</Link> : 
      <div className="flex gap-4">
        <NavLink to='/login' className='navLink'>Login</NavLink>
        <NavLink to='/signup' className='navLink'>Signup</NavLink>
      </div>
    }
    </nav>
  )
}
