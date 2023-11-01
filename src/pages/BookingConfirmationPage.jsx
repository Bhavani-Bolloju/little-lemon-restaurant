import React from "react";

import classes from "./BookingConfirmationPage.module.scss";
import restaurant from "../assets/little-lemon-assets/restaurant.jpg";
import { Link } from "react-router-dom";

function BookingConfirmationPage() {
  return (
    <section className={classes["bookingconfirmation"]}>
      <figure className={classes["bookingconfirmation__image"]}>
        <img src={restaurant} alt="" />
      </figure>
      <p className={classes["bookingconfirmation__text"]}>
        Your booking confirmed!!
      </p>
      <p className={classes.redirect}>
        go to <Link to="/">home</Link>
      </p>
    </section>
  );
}

export default BookingConfirmationPage;
