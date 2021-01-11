import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import Navigation from "components/Navigation";
import Side from "components/Side";

const Home = ({ isLoggedIn, userObj }) => {
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
    <div className="main__screen">
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div className="main__container">
        <h2 className="main__title">Home</h2>
        <TweetFactory userObj={userObj} />
        <div className=".main__line"></div>
        <div>
          {tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              userObj={userObj}
              isOwner={tweet.userId === userObj.uid}
              displayName={userObj.displayName}
              photoURL={userObj.photoURL}
            />
          ))}
        </div>
      </div>
      <Side />
    </div>
  );
};

export default Home;
