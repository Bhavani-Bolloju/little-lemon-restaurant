import React, { useEffect, useReducer, useState } from "react";
import BookingForm from "../components/booking/BookingForm";
import restaurant from "../assets/little-lemon-assets/restaurant.jpg";
import classes from "./BookingPage.module.scss";
import back from "../assets/little-lemon-assets/back.svg";
import { useNavigate } from "react-router-dom";

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
    <section className={classes["bookingPage"]}>
      <button className={classes.back} onClick={() => navigate("/")}>
        <img src={back} alt="back to home page" />
      </button>
      <div className={classes["bookingPage__container"]}>
        <div className={classes["bookingPage__image"]}>
          <img src={restaurant} alt="" />
        </div>
        <BookingForm
          availableTimes={availableTimes}
          onTimeChange={handleChange}
        />
      </div>
    </section>
  );
}

export default BookingPage;
