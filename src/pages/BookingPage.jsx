import React, { useEffect, useReducer, useState } from "react";
import BookingForm from "../components/booking/BookingForm";
import restaurant from "../assets/little-lemon-assets/restaurant.jpg";
import classes from "./BookingPage.module.scss";
import back from "../assets/little-lemon-assets/back.svg";
import { useNavigate } from "react-router-dom";

import logo from "../assets/little-lemon-assets/Logo.svg";

export const times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

export const updateTimes = function (state, action) {
  //this will handle the availabletimes values based on selected date we get from action
  // console.log(action, "reducer");
  return state;
};
export const initializeTimes = function () {
  //this is the initial state of available times
  return times;
};

function BookingPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  const navigate = useNavigate();

  const handleChange = function (selectedDate) {
    dispatch({
      type: "booking",
      value: {
        date: selectedDate
      }
    });
  };

  return (
    <section className={classes["booking-page"]}>
      <header className={classes["booking-page__header"]}>
        <h1 className={classes["booking-page__title"]}>
          Welcome to little lemon restaurant
        </h1>
        <p className={classes["booking-page__text"]}>
          We're excited to have you dine with us. Please make a reservation
          below to ensure a delightful experience:
        </p>
      </header>
      <main className={classes["booking-page__main"]}>
        <h2 className={classes["booking-page__main--title"]}>
          Reserve a table
        </h2>
        <div className={classes["booking-page__image"]}>
          <img src={restaurant} alt="" />
        </div>
        <section className={classes["booking-page__form-container"]}>
          <BookingForm availableTimes={availableTimes} />
        </section>
      </main>
      <footer className={classes["booking-page__footer"]}>
        <div className={classes["booking-page__logo"]}>
          <div className={classes["booking-page__logo-image"]}>
            <img src={logo} alt="little lemon logo" />
          </div>
          <p className={classes["booking-page__logo-text"]}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist
          </p>
        </div>
        <div className={classes["opening-hours"]}>
          <p className={classes["opening-hours__title"]}>opening hours</p>
          <ul className={classes["opening-hours__list"]}>
            <li>
              <span>mon - fri : </span>
              <span>5.30 PM - 10.30 PM</span>
            </li>
            <li>
              <span>sat : </span>
              <span>3.30 PM - 11.30 PM</span>
            </li>
            <li>
              <span>sun :</span>
              <span>Closed</span>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
}

export default BookingPage;

{
  /* <button className={classes.back} onClick={() => navigate("/")}>
        <img src={back} alt="back to home page" />
      </button>
      <div className={classes["bookingPage__container"]}>
       
        <BookingForm
          availableTimes={availableTimes}
          onTimeChange={handleChange}
        />
      </div> */
}
