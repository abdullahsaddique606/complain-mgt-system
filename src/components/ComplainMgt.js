import React from "react";
import SignUpForm from "./Signup";
import Login from "./Login";
import Dashboard from "./AppDashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./authContext";
function ComplainMgt() {
  const { isLoggedIn } = useAuth();
  let loggedINStats = localStorage.getItem('userData');
  let loggedINStatus =(JSON.parse(loggedINStats));
  if (loggedINStatus== null){
    console.log("loggedINStatus is null")
  }
  else{
    console.log("loggedINStatus is not null",{loggedINStatus} )
  }
  return (
    <div className="text-center">
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={!isLoggedIn ? <Login />: <Navigate to='/appdashboard' />} />
        <Route path="/appdashboard" element={!isLoggedIn ? <Navigate to='/login' /> : <Dashboard />}
        />
      </Routes>
    </div>
  );
}

export default ComplainMgt;
