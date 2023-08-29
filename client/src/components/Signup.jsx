import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/authContext";


export default function Signup() {
  // the auth context
  const {user, dispatch} = useContext(AuthContext)

  // data of the signup
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  // error control
  const [lengthError, setLengthError] = useState(false)
  const [matchPassError, setMatchPassError] = useState(false)
  const [fillError, setFillError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])
  const [emailError, setEmailError] = useState('')

  // handling form filling
  function handleChange(event) {
    const { name, value } = event.target;
    // handle password ontime errors
    if (name=='password' && (value.length>0 && value.length<8)) {
      setLengthError(true)
    } else {
      setLengthError(false)
    }
    if ((name=='password' && value!=data.confirm) || (name=='confirm' && value!=data.password)) {
      setMatchPassError(true)
    } else {
      setMatchPassError(false)
    }

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  // handle signup submission
  async function handleSubmit(event) {
    event.preventDefault()
    // send the response
    const response = await fetch('/api/users/signup', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    // parse response
    const json = await response.json()
    if (response.ok) {
      setData({
        name: "",
        email: "",
        password: "",
        confirm: "",
      })
      setLengthError(false)
      setMatchPassError(false)
      setEmptyFields([])
      setFillError('')
      setEmailError('')
      // save token to localstorage (so reloading does not logs us out)
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: 'LOGIN', payload: json})
    } else {
      if (json.emptyFields) {
        setEmptyFields(json.emptyFields)
        setFillError(json.error)
      } else {
        setEmailError(json.error)
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
      <p className=" font-bold text-3xl">Sign up</p>
      <Link to='/login' className="text-sm text-blue-800 underline pb-6">Already have an account?</Link>
      
      <input
        type="text"
        name="name"
        placeholder="Don Juan"
        value={data.name}
        onChange={handleChange}
        className={`${emptyFields.includes('name') && 'border-red-500'}`}
      />
      
      <input
        type="email"
        name="email"
        placeholder="donjuan@gmail.com"
        value={data.email}
        onChange={handleChange}
        className={`${(emptyFields.includes('email') || emailError ) && 'border-red-500'}`}
      />
      {emailError && <p className="error-msg-auth"> {emailError} </p>}
      
      <input
        type="password"
        name="password"
        placeholder="password"
        value={data.password}
        onChange={handleChange}
        className={`${emptyFields.includes('password') && 'border-red-500'}`}
      />
      {lengthError && <p className="error-msg-auth">Password must be 8 characters at least</p>}
      
      <input
        type="password"
        name="confirm"
        placeholder="confirm your password"
        value={data.confirm}
        onChange={handleChange}
        className={`${emptyFields.includes('confirm') && 'border-red-500'}`}
      />

      {matchPassError && <p className="error-msg-auth">Passwords do not match</p>}

      {fillError && <p className="error-msg-auth"> {fillError} </p>}

      <button className={`auth-btn ${(lengthError || matchPassError) ? 'bg-gray-600' : 'bg-add'}`} disabled={lengthError || matchPassError} >Sign up</button>
    
    </form>
  );
}
