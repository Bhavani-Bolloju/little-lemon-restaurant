import React, { useReducer } from "react";
import BookingForm from "../components/booking/BookingForm";
import restaurant from "../assets/booking/restaurant.jpg";
import restaurant_large from "../assets/booking/restaurant_large.webp";
import restaurant_small from "../assets/booking/restaurant_small.webp";
import classes from "./BookingPage.module.scss";
import back from "../assets/little-lemon-assets/back.svg";
import { useNavigate } from "react-router-dom";

import logo from "../assets/little-lemon-assets/Logo.svg";

export const times = [];

export const initialState = {
  times,
  isLoading: false,
  reservedSlots: null
};

//reducer update function
export const updateTimes = function (state, action) {
  if (action.type === "SET_TIMES") {
    return {
      ...state,
      times: action.times
    };
  }

  if (action.type === "LOADING") {
    return {
      ...state,
      isLoading: action.loading
    };
  }

  if (action.type === "RESERVED_SLOTS") {
    return {
      ...state,
      reservedSlots: action.reservedSlots
    };
  }
  return state;
};

//reducer initial value
export const initializeTimes = function () {
  return initialState;
};

//bookingpage component for reserving table
function BookingPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  const navigate = useNavigate();

  const fetchAvailableTimes = function (selectedDate) {
    const selectedDay = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "long"
    });

    const fetchTimingsForSelectedDay = async function (day) {
      try {
        dispatch({ type: "LOADING", loading: true });
        const response = await fetch(
          `https://little-lemon-restaurant-4ced5-default-rtdb.firebaseio.com/restaurant_hours/${day}/.json`
        );

        if (!response.ok)
          throw new Error(
            "Failed to get available time slots, please try again"
          );

        const data = await response.json();
        dispatch({ type: "SET_TIMES", times: data });
      } catch (error) {
        alert(error.message);
      }

      dispatch({ type: "LOADING", loading: false });
    };

    fetchTimingsForSelectedDay(selectedDay);

    //fetch reserved dates
    const reservationsURL = `https://little-lemon-restaurant-4ced5-default-rtdb.firebaseio.com/reservations.json?orderBy="selectedDate"&equalTo="${selectedDate}"`;

    const fetchReservedSlots = async function () {
      try {
        dispatch({ type: "LOADING", loading: true });
        const request = await fetch(reservationsURL);
        if (!request.ok)
          throw new Error(
            "Failed to get Reserved Booking slots, please try again"
          );

        const res = await request.json();

        dispatch({ type: "RESERVED_SLOTS", reservedSlots: res });

        // setReservedSlots(res);
      } catch (error) {
        alert(error.message);
      }

      dispatch({ type: "LOADING", loading: false });
    };

    fetchReservedSlots();
  };

  //logic to filter already reserved bookings
  let filteredAvailableTimes = [];

  let bookedSlots = [];
  if (availableTimes?.reservedSlots && availableTimes?.times?.length > 0) {
    // eslint-disable-next-line
    for (const [_, obj] of Object.entries(availableTimes?.reservedSlots)) {
      const { selectedTime } = obj;
      bookedSlots.push(selectedTime);
    }
    filteredAvailableTimes = availableTimes?.times?.filter(
      (time) => !bookedSlots.includes(time)
    );
  }

  let allSlotsReserved = true;
  if (availableTimes?.reservedSlots && filteredAvailableTimes?.length === 0) {
    allSlotsReserved = false;
  }

  if (!allSlotsReserved) {
    alert("all slots booked");
  }

  return (
    <section className={classes["booking-page"]}>
      {availableTimes?.isLoading && <p data-testid="loading">Loading...</p>}
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
          <img
            srcSet={`${restaurant_large} 2x, ${restaurant_small} 1x`}
            sizes="(max-width: 650px) 600px, 750px"
            src={restaurant}
            alt=""
          />
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
          <img
            src={logo}
            className={classes["booking-page__logo-image"]}
            alt="little lemon logo"
          />

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
