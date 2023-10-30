import React from "react";
import BookingForm from "../components/booking/BookingForm";
import restaurant from "../assets/little-lemon-assets/restaurant.jpg";
import classes from "./BookingPage.module.scss";

function BookingPage() {
  return (
    <section className={classes["bookingPage"]}>
      {/* <h1>reserve a table</h1> */}
      <div className={classes["bookingPage__container"]}>
        <div className={classes["bookingPage__image"]}>
          <img src={restaurant} alt="" />
        </div>
        <BookingForm />
      </div>
    </section>
  );
}

export default BookingPage;
