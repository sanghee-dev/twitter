import React from "react";
import { firebaseInstance, authService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const AuthSocial = ({ newAccount }) => {
  const onSocialClick = async (event) => {
    const { name } = event.target;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div className="auth__buttons container">
      <button
        onClick={onSocialClick}
        name="google"
        className="auth__button auth__input container"
      >
        <div>
          <FontAwesomeIcon icon={faGoogle} className="auth__button__logo" />
        </div>
        <span>Continue with Google</span>
      </button>
      <button
        onClick={onSocialClick}
        name="github"
        className="auth__button auth__input container"
      >
        <div>
          <FontAwesomeIcon icon={faGithub} className="auth__button__logo" />
        </div>
        <span>Continue with GitHub</span>
      </button>
      <input
        type="submit"
        value={newAccount ? "Create Account" : "Sign In"}
        className="auth__input auth__submit"
      />
    </div>
  );
};

export default AuthSocial;
