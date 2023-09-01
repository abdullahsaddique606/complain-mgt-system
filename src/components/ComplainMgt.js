import React from 'react';
import SignUpForm from './Signup';
import Login from './Login';
import Dashboard from './AppDashboard'
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
import { useAuth } from './authContext';
function ComplainMgt() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="text-center">
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/appdashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/appdashboard" />} />
      </Routes>
    </div>
  );
}

export default ComplainMgt;
