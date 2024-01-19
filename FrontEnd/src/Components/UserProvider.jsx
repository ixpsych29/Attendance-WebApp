import { useState } from "react";
import UserContext from "./userContext";

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const setUserName = (name) => {
    setUsername(name);
  };
  const setUserRole = (r) => {
    setRole(r);
  };

  return (
    <UserContext.Provider value={{ username, setUserName, role, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
