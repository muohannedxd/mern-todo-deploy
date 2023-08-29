import Todo from "./components/Todo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoMatch from "./components/NoMatch";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  // grab user
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          // if logged in, show home, else show login
          element={user ? <Todo /> : <Navigate to="/login"></Navigate>}
        ></Route>
        <Route
          path="/login"
          // if not logged in, show login, else show home
          element={!user ? <Login /> : <Navigate to="/"></Navigate>}
        ></Route>
        <Route
          path="/signup"
          // if not logged in, show signup, else show home
          element={!user ? <Signup /> : <Navigate to="/"></Navigate>}
        ></Route>
        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
    </>
  );
}

export default App;
