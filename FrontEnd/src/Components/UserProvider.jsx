import { useState } from "react";
import UserContext from "./userContext";

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  const setUserName = (name) => {
    setUsername(name);
  };

  return (
    <UserContext.Provider value={{ username, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
