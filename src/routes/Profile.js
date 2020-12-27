import { authService } from "fbase";
import React from "react";

const Profile = () => {
  const onLogOutClick = () => {
    authService.signOut();
  };
  return (
    <>
      <div>Profile</div>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
