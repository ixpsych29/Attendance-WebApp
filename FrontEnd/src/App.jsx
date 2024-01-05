// import "./App.css";

import Dashboard from "./Components/Dashboard";
import ProfilePage from "./Components/ProfilePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Attendence from "./Components/Attendence";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import { useState } from "react";
import Nopage from "./Components/Nopage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const ProtectedRoute = ({ element, ...rest }) => {
    const isAuthenticated = authenticated;

    return isAuthenticated ? (
      // If authenticated, render the provided element
      element
    ) : (
      // If not authenticated, redirect to the login page
      <Navigate to="/" replace />
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginForm login={setAuthenticated} />}
          index
        />
        <Route path="/signup" element={<SignupForm />} index />
        <Route path="/*" element={<Nopage />} index />
        <Route
          path="/home/"
          element={
            <ProtectedRoute element={<Home login={setAuthenticated} />} />
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          ></Route>
          <Route
            path="attendence"
            element={<ProtectedRoute element={<Attendence />} />}
          ></Route>
          <Route
            path="settings"
            element={<ProtectedRoute element={<ProfilePage />} />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
