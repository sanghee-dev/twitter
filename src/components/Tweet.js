import { dbService, storageService } from "fbase";
import React, { useState } from "react";

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
        <div>
          <div>
            <img
              src={tweetObj.photoURL}
              alt={tweetObj.displayName}
              width="25px"
              height="25px"
            />
            <span>{tweetObj.displayName} </span>
          </div>
          <div>
            {tweetObj.attachmentUrl && (
              <img
                src={tweetObj.attachmentUrl}
                alt={tweetObj.displayName}
                width="25px"
                height="25px"
              />
            )}
            <span>"{tweetObj.text}"</span>
            <span>{tweetObj.createdAt}</span>
          </div>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Tweet;
