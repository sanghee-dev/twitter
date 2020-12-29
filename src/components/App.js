import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { dbService, authService } from "fbase";

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
        dbService.collection("users").doc(user.uid).set({
          creatorId: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy;{new Date().getFullYear()} Twitter</footer>
    </>
  );
};

export default App;
