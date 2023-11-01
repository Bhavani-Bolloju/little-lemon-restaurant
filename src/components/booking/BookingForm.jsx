import React, { useState } from "react";
import classes from "./BookingForm.module.scss";
import PrimaryButton from "../ui/PrimaryButton";
import { useNavigate } from "react-router-dom";

function BookingForm({ availableTimes, onTimeChange }) {
  const [bookTable, setBookTable] = useState({
    date: "",
    time: "",
    guests: 1,
    occassion: "birthday"
  });

  const navigate = useNavigate();

  const inputHandler = function (e) {
    setBookTable((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const formSubmitHandler = function (e) {
    e.preventDefault();
    if (
      bookTable.date.trim() == "" ||
      bookTable.time.trim() == "" ||
      bookTable.guests.trim() == "" ||
      bookTable.occassion.trim() == ""
    ) {
      return;
    }

    console.log("done");

    // setBookTable({
    //   date: "",
    //   time: availableTimes[0],
    //   guests: 1,
    //   occassion: "birthday"
    // });

    navigate("/bookingConfirm");
  };

  return (
    <form className={classes.bookingForm} onSubmit={formSubmitHandler}>
      <h2
        role="heading"
        aria-level="2"
        className={classes["bookingForm__title"]}
      >
        Reserve a table
      </h2>
      <div className={classes["bookingForm__container"]}>
        <div className={classes["input__controls"]}>
          <label htmlFor="">choose date</label>
          <input
            type="date"
            name="date"
            onChange={inputHandler}
            value={bookTable.date}
            required
          />
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="time">choose time</label>
          <select
            required
            name="time"
            id="time"
            onChange={inputHandler}
            value={bookTable.time}
          >
            {availableTimes.map((time, i) => (
              <option key={i} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            placeholder="1"
            min="1"
            max="10"
            name="guests"
            onChange={inputHandler}
            value={bookTable.guests}
            required
          />
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="occassion">occasion</label>
          <select
            name="occassion"
            id="occassion"
            onChange={inputHandler}
            value={bookTable.occassion}
            required
          >
            <option value="birthday">Birthday</option>
            <option value="engagement">Engagement</option>
            <option value="anniversary">Anniversary</option>
          </select>
        </div>
        <PrimaryButton>confirm your reservation</PrimaryButton>
      </div>
    </form>
  );
}

export default BookingForm;
