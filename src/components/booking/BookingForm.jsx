import React, { useState } from "react";
import classes from "./BookingForm.module.scss";
import PrimaryButton from "../ui/PrimaryButton";

function BookingForm({ availableTimes, onTimeChange }) {
  const [bookTable, setBookTable] = useState({
    date: "",
    time: availableTimes[0],
    guests: 1,
    occassion: "birthday"
  });

  const inputHandler = function (e) {
    // console.log(e.target.name, e.target.value);
    setBookTable((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const formSubmitHandler = function (e) {
    e.preventDefault();
    onTimeChange(bookTable.date, bookTable.time);

    // console.log(availableTimes, bookTable);
  };

  return (
    <form className={classes.bookingForm} onSubmit={formSubmitHandler}>
      <h2>Reserve a table</h2>
      <div className={classes["bookingForm__container"]}>
        <div className={classes["input__controls"]}>
          <label htmlFor="">choose date</label>
          <input
            type="date"
            name="date"
            onChange={inputHandler}
            value={bookTable.date}
          />
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="time">choose time</label>
          <select
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
          />
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="occassion">occasion</label>
          <select
            name="occassion"
            id="occassion"
            onChange={inputHandler}
            value={bookTable.occassion}
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
