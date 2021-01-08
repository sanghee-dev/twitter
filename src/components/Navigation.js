import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faUser,
  faBell,
  faCog,
  faFeatherAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul className="nav__container">
      <div>
        <Link to="/">
          <li className="button container nav__icon">
            <FontAwesomeIcon icon={faTwitter} className="icon" />
          </li>
        </Link>
        <Link to="/profile">
          <li className="button container nav__icon">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </li>
        </Link>
        <Link>
          <li className="button container nav__icon">
            <FontAwesomeIcon icon={faBell} className="icon" />
          </li>
        </Link>
        <Link>
          <li className="button container nav__icon">
            <FontAwesomeIcon icon={faCog} className="icon" />
          </li>
        </Link>
        <Link>
          <li className="button container nav__icon nav__write">
            <FontAwesomeIcon icon={faPlus} className="icon nav__write__plus" />
            <FontAwesomeIcon icon={faFeatherAlt} className="icon" />
          </li>
        </Link>
      </div>

      <Link to="/">
        <li className="button container nav__icon nav__profile">
          <img
            src={userObj.photoURL}
            width="30px"
            height="30px"
            className="profile__image nav__profile__image"
          />
        </li>
      </Link>
    </ul>
  </nav>
);

export default Navigation;
