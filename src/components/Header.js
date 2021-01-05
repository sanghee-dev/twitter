import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBars, faStarOfLife } from "@fortawesome/free-solid-svg-icons";

const Header = () => (
  <>
    <div className="header__container icon__container container">
      <li className="button container">
        <FontAwesomeIcon icon={faBars} className="icon" />
      </li>
      <li className="button container">
        <FontAwesomeIcon icon={faTwitter} className="icon" />
      </li>
      <li className="button container">
        <FontAwesomeIcon icon={faStarOfLife} className="icon" />
      </li>
    </div>
  </>
);

export default Header;
