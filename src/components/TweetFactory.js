import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faImages } from "@fortawesome/free-solid-svg-icons";

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
    <>
      <form onSubmit={onSubmit} div className="tweetFactory__container">
        <img
          src={userObj.photoURL}
          alt={userObj.displayName}
          className="profile__image"
        />
        <div className="tweetFactory__input">
          <div>
            <input
              value={tweet}
              onChange={onChange}
              type="text"
              placeholder="What's on your mind?"
              maxLength={120}
              className="tweetFactory__input__text"
            />
          </div>
          <div className="tweetFactory__attachment__container">
            {attachment && (
              <>
                <div>
                  <button
                    onClick={clearAttachment}
                    className="tweetFactory__attachment__button tweet__button button"
                  >
                    <FontAwesomeIcon icon={faTimes} className="icon" />
                  </button>
                  <img
                    src={attachment}
                    alt={userObj.displayName}
                    className="tweetFactory__attachment"
                  />
                </div>
              </>
            )}
          </div>
          <div className="tweetFactory__input__container">
            <label
              for="tweetFactory__input__file"
              className="tweet__button button"
            >
              <FontAwesomeIcon icon={faImages} className="icon" />
            </label>
            <input
              onChange={onFileChange}
              type="file"
              id="tweetFactory__input__file"
              accept="image/*"
              className="tweetFactory__input__file"
            />
            <button
              type="submit"
              className="tweetFactory__input__file tweetFactory__input__button container"
            >
              Tweet
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TweetFactory;
