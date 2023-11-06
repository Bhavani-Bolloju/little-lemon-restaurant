import React, { useReducer, useState } from "react";
import BookingForm from "../components/booking/BookingForm";
import restaurant from "../assets/little-lemon-assets/restaurant.jpg";
import classes from "./BookingPage.module.scss";
import back from "../assets/little-lemon-assets/back.svg";
import { useNavigate } from "react-router-dom";

import logo from "../assets/little-lemon-assets/Logo.svg";

export const times = [];

export const updateTimes = function (state, action) {
  if (action.type === "SET_TIMES") {
    return action.times;
  }
  return state;
};

export const initializeTimes = function () {
  return times;
};

function BookingPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  const [reservedSlots, setReservedSlots] = useState(null);

  const navigate = useNavigate();

  const fetchAvailableTimes = function (selectedDate) {
    const selectedDay = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "long"
    });

    const fetchTimingsForSelectedDay = async function (day) {
      try {
        const response = await fetch(
          `https://little-lemon-restaurant-4ced5-default-rtdb.firebaseio.com/restaurant_hours/${day}/.json`
        );

        if (!response.ok) throw new Error("failed try again");

        const data = await response.json();
        console.log(data, "data");

        dispatch({ type: "SET_TIMES", times: data });
      } catch (error) {
        console.log(error, "err");
      }
    };

    fetchTimingsForSelectedDay(selectedDay);

    //fetch reserved dates
    const reservationsURL = `https://little-lemon-restaurant-4ced5-default-rtdb.firebaseio.com/reservations.json?selectedDate=${selectedDate}`;

    const fetchReservedSlots = async function () {
      const request = await fetch(reservationsURL);

      const res = await request.json();
      setReservedSlots(res);
    };

    fetchReservedSlots();
  };

  // Filter the available times to exclude already booked slots

  let filteredAvailableTimes = availableTimes;

  if (reservedSlots && availableTimes.length > 0) {
    const bookedSlots = [];

    for (const [_, obj] of Object.entries(reservedSlots)) {
      const { selectedTime } = obj;
      bookedSlots.push(selectedTime);
    }
    filteredAvailableTimes = availableTimes.filter(
      (time) => !bookedSlots.includes(time)
    );
  }

  return (
    <section className={classes["booking-page"]}>
      <button className={classes["back__btn"]} onClick={() => navigate("/")}>
        <img src={back} alt="back to home page" />
      </button>
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
        <div className={classes["booking-page__image"]}>
          <img src={restaurant} alt="" />
        </div>
        <section className={classes["booking-page__form-container"]}>
          <h2 className={classes["booking-page__main--title"]}>
            Reserve a table
          </h2>
          <BookingForm
            availableTimes={filteredAvailableTimes}
            availabilityCheck={fetchAvailableTimes}
          />
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
