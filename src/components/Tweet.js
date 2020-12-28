import React from "react";

const Tweet = ({ tweetObj, isOwner }) => (
  <div>
    <span>{tweetObj.text}</span>
    {isOwner && (
      <>
        <button>Delete</button>
        <button>Edit</button>
      </>
    )}
  </div>
);

export default Tweet;
