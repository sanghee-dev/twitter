import React, { useState } from "react";
import AuthEmail from "components/AuthEmail";
import AuthSocial from "components/AuthSocial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className="auth__container">
      <div className="auth__header container">
        <FontAwesomeIcon icon={faTwitter} className="auth__header__logo" />
        <h1 className="auth__header__text">
          지금 전 세계에서 무슨 일이
          <br />
          일어나고 있는지 알아보세요
        </h1>
        <h2 className="auth__header__text">오늘 트위터에 가입하세요.</h2>
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
        &copy; {new Date().getFullYear()} Twitter
      </footer>
    </div>
  );
};

export default Auth;
