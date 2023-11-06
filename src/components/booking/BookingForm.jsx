import React, { useState, useEffect } from "react";
import classes from "./BookingForm.module.scss";
import PrimaryButton from "../ui/PrimaryButton";
import { useNavigate } from "react-router-dom";

function BookingForm({ availableTimes, availabilityCheck }) {
  const [bookTable, setBookTable] = useState({
    selectedDate: "",
    selectedTime: "",
    occassion: "birthday",
    numberOfDiners: 1,
    seatingOption: "indoor",
    comments: ""
  });

  const navigate = useNavigate();

  const inputHandler = function (e) {
    if (e.target.name === "selectedDate") {
      availabilityCheck(e.target.value);
    }

    setBookTable((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // console.log(bookTable);

  const formSubmitHandler = async function (e) {
    e.preventDefault();
    if (
      bookTable.selectedDate.trim() === "" ||
      bookTable.selectedTime.trim() === "" ||
      bookTable.numberOfDiners < 0 ||
      bookTable.comments.trim() === "" ||
      bookTable.occassion.trim() === ""
    ) {
      return;
    }

    console.log(bookTable);

    try {
      const request = await fetch(
        `https://little-lemon-restaurant-4ced5-default-rtdb.firebaseio.com/reservations.json`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(bookTable)
        }
      );

      if (!request.ok) throw new Error("Failed to send data");
      const res = await request.json();
      // console.log(res.name);
      navigate(`/bookingConfirm/${res.name}`);
    } catch (error) {
      console.log(error, "err");
    }
  };

  // console.log(bookTable);

  return (
    <form className={classes.bookingForm} onSubmit={formSubmitHandler}>
      <div className={classes["bookingForm__container"]}>
        <div className={classes["input__controls"]}>
          <label htmlFor="">choose date: </label>
          <input
            type="date"
            name="selectedDate"
            min={new Date().toISOString().split("T")[0]}
            onChange={inputHandler}
            value={bookTable.selectedDate}
            required
          />
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="time">time:</label>
          <select
            required
            name="selectedTime"
            id="time"
            onChange={inputHandler}
            value={bookTable.selectedTime}
          >
            {bookTable.selectedTime === "" && (
              <option value={bookTable.selectedTime}>00:00</option>
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
            name="numberOfDiners"
            onChange={inputHandler}
            value={bookTable.numberOfDiners}
            required
          />
        </div>
        <div className={classes.seatingOptions}>
          <p className={classes["seatingOptions__title"]}>seating options:</p>
          <div className={classes["input__controls"]}>
            <input
              type="radio"
              id="indoor"
              name="seatingOption"
              value="indoor"
              checked={bookTable.seatingOption === "indoor"}
              onChange={inputHandler}
            />
            <label htmlFor="indoor">indoor</label>
          </div>
          <div className={classes["input__controls"]}>
            <input
              type="radio"
              id="outdoor"
              name="seatingOption"
              value="outdoor"
              checked={bookTable.seatingOption === "outdoor"}
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
