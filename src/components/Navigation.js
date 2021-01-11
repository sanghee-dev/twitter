import React, { useState } from "react";
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

const Navigation = ({ userObj }) => {
  const [buttonNumber, setButtonNumber] = useState("1");

  const colorBtn = (number) => {
    return number === buttonNumber ? "rgb(29,161,242)" : "rgb(220,220,220)";
  };

  return (
    <nav>
      <ul className="nav__container">
        <div>
          <Link to="/">
            <li
              className="button container nav__icon"
              onClick={() => {
                setButtonNumber("1");
              }}
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="icon"
                style={{ color: colorBtn("1") }}
              />
            </li>
          </Link>
          <Link to="/profile">
            <li
              className="button container nav__icon"
              onClick={() => {
                setButtonNumber("2");
              }}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="icon"
                style={{ color: colorBtn("2") }}
              />
            </li>
          </Link>
          <Link to="/">
            <li
              className="button container nav__icon"
              onClick={() => {
                setButtonNumber("3");
              }}
            >
              <FontAwesomeIcon
                icon={faBell}
                className="icon"
                style={{ color: colorBtn("3") }}
              />
            </li>
          </Link>
          <Link to="/">
            <li
              className="button container nav__icon"
              onClick={() => {
                setButtonNumber("4");
              }}
            >
              <FontAwesomeIcon
                icon={faCog}
                className="icon"
                style={{ color: colorBtn("4") }}
              />
            </li>
          </Link>
          <Link to="/">
            <li className="button container nav__icon nav__write">
              <FontAwesomeIcon
                icon={faPlus}
                className="icon nav__write__plus"
              />
              <FontAwesomeIcon
                icon={faFeatherAlt}
                className="icon nav__write__feather"
              />
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
};

export default Navigation;
