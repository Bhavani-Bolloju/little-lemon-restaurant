import React from "react";
import classes from "./NavLinks.module.scss";

function NavLinks() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <a href="#home">home</a>
        </li>
        <li>
          <a href="#about">about</a>
        </li>
        <li>
          <a href="#menu">menu</a>
        </li>
        <li>
          <a href="#reservation">reservation</a>
        </li>
        <li>
          <a href="#order">order online</a>
        </li>
        <li>
          <a href="#login">login</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavLinks;
