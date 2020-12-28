import { dbService } from "fbase";
import React from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete thie tweet?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
    console.log(ok);
  };
  return (
    <div>
      <span>{tweetObj.text}</span>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
