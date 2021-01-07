import React, { useState } from "react";
import AuthEmail from "components/AuthEmail";
import AuthSocial from "components/AuthSocial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faSearch,
  faUserFriends,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className="auth__container">
      <div className="auth__content">
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          관심사를 팔로우하세요.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUserFriends} />
          사람들이 무엇에 대해 이야기하고 있는지 알아보세요.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          대화에 참여하세요.
        </h2>
      </div>

      <div>
        <div className="auth__header container">
          <FontAwesomeIcon icon={faTwitter} className="auth__header__logo" />
          <h1 className="auth__header__text">
            지금 전 세계에서 무슨 일이
            <br />
            일어나고 있는지 알아보세요
          </h1>
          <h3 className="auth__header__text">오늘 트위터에 가입하세요.</h3>
        </div>
        {newAccount ? (
          <AuthEmail newAccount={newAccount} />
        ) : (
          <AuthSocial newAccount={newAccount} />
        )}
        <div onClick={toggleAccount} className="auth__toggle">
          {newAccount ? "Sign In" : "Create Account"}
        </div>
        <footer className="auth__copyright">
          <h4>&copy; {new Date().getFullYear()} Twitter, Inc.</h4>
        </footer>
      </div>
    </div>
  );
};

export default Auth;
