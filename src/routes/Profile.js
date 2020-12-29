import React, { useEffect, useState } from "react";
import { authService, dbService, storageService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
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
      await dbService.collection("users").doc(userObj.uid).update({
        displayName: newDisplayName,
      });
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
    if (newProfilePhoto) {
      await dbService.collection("users").doc(userObj.uid).update({
        photoURL: attachment,
      });
      await userObj.updateProfile({
        photoURL: attachment,
      });
      setAttachment("");
    }
  };

  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "decs")
      .get();
    console.log(tweets.docs.map((doc) => doc.data()));
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
      <img src={userObj.photoURL} width="50px" height="50px" />
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
