// import "./App.css";

import Dashboard from "./Components/Dashboard";
import ProfilePage from "./Components/ProfilePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Attendence from "./Components/Attendence";

// import LoginForm from "./Components/LoginForm";
// import SignupForm from "./Components/SignupForm";

function App() {
  // eslint-disable-next-line no-unused-vars

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Attendence />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
