import React, { useState } from "react";
import classes from "./Header.module.scss";
import logo from "../../assets/little-lemon-assets/Logo.svg";

import NavLinks from "./NavLinks";

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" className={classes["header__logo"]} />
      <div
        className={`${classes["nav__container"]} ${
          isDrawerOpen && classes["nav__container--active"]
        }`}
      >
        <NavLinks />
      </div>

      {!isDrawerOpen ? (
        <button
          className={`${classes["header__nav--btn"]} `}
          onClick={() => setIsDrawerOpen(true)}
          aria-label="open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      ) : (
        <button
          className={`${classes["header__nav--btn"]}`}
          onClick={() => setIsDrawerOpen(false)}
          aria-label="close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </header>
  );
}

export default Header;
