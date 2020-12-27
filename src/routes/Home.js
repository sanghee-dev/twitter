import React, { useState } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [tweet, SetTweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      tweet,
      createdAt: Date.now(),
    });
    SetTweet("");
  };
  const onChange = (event) => {
    const { value } = event.target;
    SetTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
    </div>
  );
};

export default Home;
