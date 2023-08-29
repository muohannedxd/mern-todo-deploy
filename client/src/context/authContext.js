import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()

// the reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload
      }
  
    case 'LOGOUT':
      return {
        user: null
      }

    default:
      return state
  }
}

export const AuthContextProvider = ({children}) => {
  // global state
  const [state, dispatch] = useReducer(authReducer, {
    user: ''
  })

  // checking if user logged in in localStorage 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({type: 'LOGIN', payload: user})
    }
  }, []) // once only when the context renders

  // just to check
  console.log(`AuthContext state: ${state.user}`)

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}