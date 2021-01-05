import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faBell, faCog } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul className="container nav__container">
      <Link to="/">
        <li className="nav__button container">
          <FontAwesomeIcon icon={faTwitter} className="nav__icon" />
        </li>
      </Link>
      <Link to="/profile">
        <li className="nav__button container">
          <FontAwesomeIcon icon={faUser} className="nav__icon" />
        </li>
      </Link>
      <li className="nav__button container">
        <FontAwesomeIcon icon={faBell} className="nav__icon" />
      </li>
      <li className="nav__button container">
        <FontAwesomeIcon icon={faCog} className="nav__icon" />
      </li>
    </ul>
  </nav>
);

export default Navigation;
