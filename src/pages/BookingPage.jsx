import React, { useReducer, useState } from "react";
import BookingForm from "../components/booking/BookingForm";
import restaurant from "../assets/little-lemon-assets/restaurant.jpg";
import classes from "./BookingPage.module.scss";

const times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

const updateTimes = function (state, action) {
  //this will handle the availabletimes values based on selected date we get from action
  console.log(action, "reducer");
  return state;
};
const initializeTimes = function () {
  //this is the initial state of available times
  return times;
};

function BookingPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  const handleChange = function (selectedDate, selectedTime) {
    dispatch({
      type: "booking",
      value: {
        time: selectedTime,
        date: selectedDate
      }
    });
  };

  return (
    <section className={classes["bookingPage"]}>
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
