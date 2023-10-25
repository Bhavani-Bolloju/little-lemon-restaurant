import React from "react";
import classes from "./Header.module.scss";
import logo from "../../assets/little-lemon-assets/Logo.svg";

import NavLinks from "./NavLinks";

function Header() {
  return (
    <header className={classes.header}>
      <img src={logo} alt="" className={classes["header__logo"]} />
      <NavLinks />
    </header>
  );
}

export default Header;
