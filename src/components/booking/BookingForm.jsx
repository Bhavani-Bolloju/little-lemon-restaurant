import React, { useState } from "react";
import classes from "./BookingForm.module.scss";
import PrimaryButton from "../ui/PrimaryButton";
import { useNavigate } from "react-router-dom";

function BookingForm({ availableTimes, onTimeChange }) {
  const [bookTable, setBookTable] = useState({
    date: "",
    time: "00:00",
    occassion: "birthday",
    diners: 1,
    seating: "indoor",
    comments: ""
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
      bookTable.diners.trim() == "" ||
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
      <div className={classes["bookingForm__container"]}>
        <div className={classes["input__controls"]}>
          <label htmlFor="">choose date: </label>
          <input
            type="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={inputHandler}
            value={bookTable.date}
            required
          />
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="time">time:</label>
          <select
            required
            name="time"
            id="time"
            onChange={inputHandler}
            value={bookTable.time}
          >
            {bookTable.time === "00:00" && (
              <option value={bookTable.time}>00:00</option>
            )}
            {availableTimes?.map((time, i) => (
              <option key={i} value={time}>
                {time}
              </option>
            ))}
          </select>
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
        <div className={classes["input__controls"]}>
          <label htmlFor="diners">Diners: </label>
          <input
            type="number"
            placeholder="0"
            min="1"
            max="10"
            name="diners"
            onChange={inputHandler}
            value={bookTable.guests}
            required
          />
        </div>
        <div className={classes.seatingOptions}>
          <p className={classes["seatingOptions__title"]}>seating options:</p>
          <div className={classes["input__controls"]}>
            <input
              type="radio"
              id="indoor"
              value="indoor"
              name="seating"
              checked={bookTable.seating === "indoor"}
              onChange={inputHandler}
            />
            <label htmlFor="indoor">indoor</label>
          </div>
          <div className={classes["input__controls"]}>
            <input
              type="radio"
              id="outdoor"
              name="seating"
              value="outdoor"
              checked={bookTable.seating === "outdoor"}
              onChange={inputHandler}
            />
            <label htmlFor="outdoor">outdoor</label>
          </div>
        </div>
        <div className={classes["additional-comments"]}>
          <label htmlFor="comments">additional comments:</label>
          <textarea
            name="comments"
            id="comments"
            cols="30"
            rows="5"
            placeholder="Your comments"
            value={bookTable.comments}
            onChange={inputHandler}
            required
          />
        </div>
        <PrimaryButton>confirm your reservation</PrimaryButton>
      </div>
    </form>
  );
}

export default BookingForm;
