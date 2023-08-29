import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/authContext";


export default function Login() {
  // the auth context
  const {user, dispatch} = useContext(AuthContext)
  
  // data of the login
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  // handling empty fields
  const [fillError, setFillError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])

  // handling invalid data
  const [invalidError, setInvalidError] = useState("")

  // handle log in filling
  function handleChange(event) {
    const { name, value } = event.target;

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  // handle login submission
  async function handleSubmit(event) {
    event.preventDefault()
    // send the response
    const response = await fetch('/api/users/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    // parse the response
    const json = await response.json()
    if (response.ok) {
      setData({
        email: "",
        password: ""
      })
      setEmptyFields([])
      setFillError('')
      setInvalidError('')
      // save token and email to loclaStorage
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: 'LOGIN', payload: json})
    } else {
      if (json.emptyLoginFields) {
        setEmptyFields(json.emptyLoginFields)
        setFillError(json.error)
      } else {
        setInvalidError(json.error)
        setEmptyFields([])
        setFillError('')
      }
    }
  }

  return (
    <form
      className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center
        flex flex-col Todo px-10 sm:px-6 py-10 gap-4" onSubmit={handleSubmit}
    >
      <p className="font-bold text-3xl">Log in</p>
      <Link to='/signup' className="text-sm text-blue-800 underline pb-6"> Are you a new user?</Link>
      
      {invalidError && <p className="flex flex-start text-red-500"> {invalidError} </p> }
      
      <input
        type="email"
        name="email"
        placeholder="johndoe@gmail.com"
        value={data.email}
        onChange={handleChange}
        className={`${emptyFields.includes('email') && 'border-red-500'}`}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={data.password}
        onChange={handleChange}
        className={`${emptyFields.includes('password') && 'border-red-500'}`}
      />

      {fillError && <p className="error-msg-auth"> {fillError} </p>}

      <button className='auth-btn bg-add' >Login</button>

    </form>
  )
}
