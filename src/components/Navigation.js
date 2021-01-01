import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faBell, faCog } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul className="nav__container container">
      <li className="nav__icon">
        <FontAwesomeIcon icon={faBell} size="2x" className="nav__icon" />
      </li>
      <li className="nav__icon">
        <Link to="/">
          <FontAwesomeIcon icon={faTwitter} size="2x" className="nav__icon" />
        </Link>
      </li>
      <li className="nav__icon">
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} size="2x" className="nav__icon" />
        </Link>
      </li>
      <li className="nav__icon">
        <FontAwesomeIcon icon={faCog} size="2x" className="nav__icon" />
      </li>
    </ul>
  </nav>
);

export default Navigation;
