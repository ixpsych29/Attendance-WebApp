import { useState } from "react";
import UserContext from "./UserContext";
import setupEnv from "../../setupEnv.js";

const UserProvider = ({ children }) => {
  const Api_EndPoint = setupEnv.apiEndpoint;

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const setUserName = (name) => {
    setUsername(name);
  };
  const setUserRole = (r) => {
    setRole(r);
  };

  return (
    <UserContext.Provider
      value={{ username, setUserName, role, setUserRole, Api_EndPoint }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
