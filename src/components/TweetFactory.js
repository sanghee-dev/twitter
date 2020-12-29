import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.email}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const getTime = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      let milliseconds = date.getMilliseconds();
      if (milliseconds < 10) {
        milliseconds = `00${milliseconds}`;
      } else if (milliseconds < 100) {
        milliseconds = `0${milliseconds}`;
      } else {
        milliseconds = milliseconds;
      }
      const currentTime = `${year}${month < 10 ? `0${month}` : month}${
        day < 10 ? `0${day}` : day
      }${hours < 10 ? `0${hours}` : hours}${
        minutes < 10 ? `0${minutes}` : minutes
      }${seconds < 10 ? `0${seconds}` : seconds}${milliseconds}`;
      return currentTime;
    };
    const tweetObj = {
      text: tweet,
      createdAt: getTime(),
      attachmentUrl,
      userId: userObj.uid,
      displayName: userObj.displayName,
      photoURL: userObj.photoURL,
    };
    await dbService
      .collection("tweets")
      .doc(`${10 ** 17 - Number(tweetObj.createdAt)}${tweetObj.userId}`)
      .set(tweetObj);
    setTweet("");
    setAttachment("");
    console.log(tweetObj.createdAt.length);
  };

  const onChange = (event) => {
    const { value } = event.target;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const { files } = event.target;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (event) => {
      const { result } = event.currentTarget;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const clearAttachment = () => setAttachment(null);

  return (
    <form onSubmit={onSubmit}>
      <input
        value={tweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input onChange={onFileChange} type="file" accept="image/*" />
      <input type="submit" value="Tweet" />
      {attachment && (
        <div>
          <img
            src={attachment}
            alt={userObj.displayName}
            width="50px"
            height="50px"
          />
          <button onClick={clearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
