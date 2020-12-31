import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faCircleNotch,
  faSync,
  faCog,
  faStroopwafel,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          email: user.email,
          metadata: user.metadata,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      email: user.email,
      metadata: user.metadata,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        <>
          <div className="app__container container">
            <FontAwesomeIcon icon={faSpinner} pulse className="app__spinner" />
          </div>
        </>
      )}
    </>
  );
};

export default App;
