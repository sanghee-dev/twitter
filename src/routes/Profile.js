import React, { useState } from "react";
import { authService, storageService } from "fbase";
import { useHistory } from "react-router-dom";
import Header from "components/Header";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newProfilePhoto, setNewProfilePhoto] = useState(false);
  const [attachment, setAttachment] = useState(userObj.photoURL);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (event) => {
    const { value } = event.target;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
    if (newProfilePhoto) {
      await userObj.updateProfile({
        photoURL: attachment,
      });
      setAttachment("");
      refreshUser();
    }
  };

  const onProfilePhotoChange = async (event) => {
    const { files } = event.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = async (event) => {
      const { result } = await event.currentTarget;
      const fileRef = storageService.ref().child(`${userObj.uid}`);
      const response = await fileRef.putString(result, "data_url");
      const attachmentUrl = await response.ref.getDownloadURL();
      setAttachment(attachmentUrl);
    };
    reader.readAsDataURL(theFile);
    setNewProfilePhoto(true);
  };

  return (
    <>
      <Header />
      <header>{userObj.displayName}'s Profile</header>
      <img
        src={userObj.photoURL}
        alt={userObj.displayName}
        width="50px"
        height="50px"
      />
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input onChange={onProfilePhotoChange} type="file" accept="image/*" />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
