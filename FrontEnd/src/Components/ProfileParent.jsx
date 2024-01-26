import { Button } from "@mui/material";
import ChangePassword from "./ChangePassword";
import ProfilePage from "./ProfilePage";
import { useState } from "react";

const ProfileParent = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowPassword(false);
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
    setShowProfile(false);
  };

  return (
    <div>
      <Button onClick={toggleProfile}>Update Profile</Button>
      {showProfile && <ProfilePage />}
      <Button onClick={togglePassword}>Update Password</Button>
      {showPassword && <ChangePassword />}
    </div>
  );
};

export default ProfileParent;
