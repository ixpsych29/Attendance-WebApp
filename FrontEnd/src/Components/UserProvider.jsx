import { useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [userProfilePic, setUserProfilePic] = useState();
  const [email, setEmail] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [phNumber, setPhNumber] = useState("");

  const BASE_URL = `http://localhost:3000`;

  const setNameOfUser = (name) => {
    setNameUser(name);
  };
  const setPhoneNumber = (phone) => {
    setPhNumber(phone);
  };
  const setUserName = (name) => {
    setUsername(name);
  };
  const setUserRole = (r) => {
    setRole(r);
  };
  const setUserProfilePicture = (pic) => {
    setUserProfilePic(pic);
  };
  const setUserEmail = (userEmail) => {
    setEmail(userEmail);
  };

  const fetchProfilePicture = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${username}`
      );
      if (response.status === 200) {
        setNameOfUser(response.data.name);
        setUserProfilePic(response.data.profilePicture);
        setUserEmail(response.data.email);
        setPhoneNumber(response.data.phoneNo);
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
        nameUser,
        username,
        phNumber,
        setUserName,
        role,
        setUserRole,
        userProfilePic,
        setUserProfilePicture,
        fetchProfilePicture,
        BASE_URL,
        email,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
