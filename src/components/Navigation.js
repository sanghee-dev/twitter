import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faBell, faCog } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul className="nav__container icon__container container">
      <Link to="/">
        <li className="button container">
          <FontAwesomeIcon icon={faTwitter} className="icon" />
        </li>
      </Link>
      <Link to="/profile">
        <li className="button container">
          <FontAwesomeIcon icon={faUser} className="icon" />
        </li>
      </Link>
      <li className="button container">
        <FontAwesomeIcon icon={faBell} className="icon" />
      </li>
      <li className="button container">
        <FontAwesomeIcon icon={faCog} className="icon" />
      </li>
    </ul>
  </nav>
);

export default Navigation;
