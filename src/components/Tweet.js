import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete thie tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onEditTweet = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const { value } = event.target;
    setNewTweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onEditTweet}>
                <input
                  type="text"
                  placeholder="Edit your tweet"
                  value={newTweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update" />
                <input onClick={toggleEditing} type="button" value="Cancel" />
              </form>
            </>
          )}
        </>
      ) : (
        <div className="tweet__container">
          <img
            src={tweetObj.photoURL}
            alt={tweetObj.displayName}
            className="profile__image"
          />
          <div className="tweet__object">
            <div className="tweet__object__container">
              <div>
                <span className="tweet__displayName">
                  {tweetObj.displayName}
                </span>
                <span className="tweet__nickname">@{tweetObj.displayName}</span>
                <span className="tweet__createdAt">
                  <span>·</span>
                  {tweetObj.createdAt.substring(6, 8)},
                  {tweetObj.createdAt.substring(4, 6)},
                  {tweetObj.createdAt.substring(0, 4)}
                </span>
              </div>
              <FontAwesomeIcon icon={faEllipsisH} className="tweet__icon" />
            </div>
            <div className="tweet__text__container">
              <div className="tweet__text">{tweetObj.text}</div>
              <div>
                {isOwner && (
                  <>
                    <button
                      onClick={onDeleteClick}
                      className="tweet__button button"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                    </button>
                    <button
                      onClick={toggleEditing}
                      className="tweet__button button"
                    >
                      <FontAwesomeIcon icon={faEdit} className="icon" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div>
              {tweetObj.attachmentUrl && (
                <img
                  src={tweetObj.attachmentUrl}
                  alt={tweetObj.displayName}
                  className="tweet__attachment"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tweet;
