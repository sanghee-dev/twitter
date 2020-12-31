import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <>
      <header>Tweet</header>
      <div className="container">
        <TweetFactory userObj={userObj} />
        <div style={{ marginTop: 50 }}>
          {tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.userId === userObj.uid}
              displayName={userObj.displayName}
              photoURL={userObj.photoURL}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
