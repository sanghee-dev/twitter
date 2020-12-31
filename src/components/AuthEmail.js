import React, { useState } from "react";
import { authService } from "fbase";

const AuthForm = ({ newAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="authEmail__container container">
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={onChange}
        className="auth__input"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={onChange}
        className="auth__input"
      />
      <input
        type="submit"
        value={newAccount ? "Create Account" : "Sign In"}
        className="auth__input auth__submit"
      />
      <div className="auth__error">{error && <span>{error}</span>}</div>
    </form>
  );
};

export default AuthForm;
