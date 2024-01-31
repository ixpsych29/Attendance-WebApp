import { useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [userProfilePic, setUserProfilePic] = useState();

  const BASE_URL = `http://localhost:3000`;

  const setUserName = (name) => {
    setUsername(name);
  };
  const setUserRole = (r) => {
    setRole(r);
  };
  const setUserProfilePicture = (pic) => {
    setUserProfilePic(pic);
  };

  const fetchProfilePicture = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${username}`
      );
      if (response.status === 200) {
        setUserProfilePic(response.data.profilePicture);
      } else {
        console.error(
          "Error fetching profile picture. Server response:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  useEffect(() => {
    fetchProfilePicture(username);
  }, [username]);

  return (
    <UserContext.Provider
      value={{
        username,
        setUserName,
        role,
        setUserRole,
        userProfilePic,
        setUserProfilePicture,
        fetchProfilePicture,
        BASE_URL,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
