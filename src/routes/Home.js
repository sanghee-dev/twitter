import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import Navigation from "components/Navigation";

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
    <div className="home__screen">
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div className="home__container">
        <h2 className="home__title">Home</h2>
        <TweetFactory userObj={userObj} />
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
      <div className="home__side">
        <div className="home__side__trends">
          <h2 className="home__title">Trends for you</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
