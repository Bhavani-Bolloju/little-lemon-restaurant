import React from "react";
import classes from "./Footer.module.scss";
import logo from "../../assets/little-lemon-assets/Logo.svg";

import Navlinks from "../header/NavLinks";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes["footer__container"]}>
        <img src={logo} alt="logo" className={classes["footer__logo"]} />
        <div className={classes["footer__links"]}>
          <section className={classes["links__dormant"]}>
            <h3>dormant navigation</h3>
            <Navlinks />
          </section>
          <section className={classes["links__contacts"]}>
            <h3>contacts</h3>
            <ul>
              <li>
                <a href="#address">address</a>
              </li>
              <li>
                <a href="#phoneNumber">phone number</a>
              </li>
              <li>
                <a href="#email">email</a>
              </li>
            </ul>
          </section>
          <section className={classes["links__social-media"]}>
            <h3>social media links</h3>
            <ul>
              <li>
                <a href="#twitter">twitter</a>
              </li>
              <li>
                <a href="#instagram">instagram</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
