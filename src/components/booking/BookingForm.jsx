import React, { useState } from "react";
import classes from "./BookingForm.module.scss";
import PrimaryButton from "../ui/PrimaryButton";
import { useNavigate } from "react-router-dom";

import { act } from "@testing-library/react";

export const fetchReq = async function (bookTable) {
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
  return res;
};

function BookingForm({ availableTimes, availabilityCheck }) {
  const [bookTable, setBookTable] = useState({
    selectedDate: "",
    selectedTime: "",
    occasion: "",
    numberOfDiners: 0,
    seatingOption: "",
    comments: ""
  });

  const navigate = useNavigate();

  const inputHandler = function (e) {
    if (e.target.name === "selectedDate") {
      const selectedDate = e.target.value;
      const selectedDay = new Date(selectedDate).getDay();

      if (selectedDay === 0) {
        alert(
          "Sorry, the restaurant is closed on Sundays. Please choose a different date."
        );
        return;
      } else {
        availabilityCheck(selectedDate);
      }
    }

    act(() => {
      setBookTable((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    });
  };

  const formSubmitHandler = async function (e) {
    e.preventDefault();

    if (
      bookTable.selectedDate.trim() === "" ||
      bookTable.selectedTime.trim() === "" ||
      bookTable.seatingOption.trim() === "" ||
      bookTable.numberOfDiners < 0 ||
      bookTable.comments.trim() === "" ||
      bookTable.occasion.trim() === ""
    ) {
      return;
    }

    try {
      const res = await fetchReq(bookTable);
      navigate(`/bookingConfirm/${res.name}`);
    } catch (error) {
      alert(error.message);
    }

    setBookTable({
      selectedDate: "",
      selectedTime: "",
      occasion: "birthday",
      numberOfDiners: 0,
      seatingOption: "indoor",
      comments: ""
    });
  };

  let isDisabled = true;

  if (
    bookTable.selectedDate.trim() !== "" &&
    bookTable.selectedTime.trim() !== "" &&
    bookTable.seatingOption.trim() !== "" &&
    bookTable.numberOfDiners > 0 &&
    bookTable.comments.trim() !== "" &&
    bookTable.occasion.trim() !== ""
  ) {
    isDisabled = false;
  }

  return (
    <form className={classes.bookingForm} onSubmit={formSubmitHandler}>
      <div className={classes["bookingForm__container"]}>
        <div className={classes["input__controls"]}>
          <label htmlFor="selectedDate" id="selectedDate">
            choose date:
          </label>
          <input
            aria-labelledby="selectedDate"
            id="selectedDate"
            min={new Date().toISOString().split("T")[0]}
            name="selectedDate"
            type="date"
            required
            value={bookTable.selectedDate}
            onChange={inputHandler}
          />
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="selectedTime" id="selectedTime">
            time:
          </label>
          <select
            aria-labelledby="selectedTime"
            id="selectedTime"
            name="selectedTime"
            required
            value={bookTable.selectedTime}
            onChange={inputHandler}
          >
            <option value="" disabled>
              select an option
            </option>
            {availableTimes?.map((time, i) => (
              <option key={i} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className={classes["input__controls"]}>
          <label htmlFor="occasion" id="occasion">
            occasion:
          </label>
          <select
            aria-labelledby="occasion"
            id="occasion"
            name="occasion"
            onChange={inputHandler}
            value={bookTable.occasion}
            required
          >
            <option value=""></option>
            <option value="birthday">Birthday</option>
            <option value="engagement">Engagement</option>
            <option value="anniversary">Anniversary</option>
          </select>
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="diners" id="diners">
            Diners:
          </label>
          <input
            aria-labelledby="diners"
            id="diners"
            type="number"
            placeholder="0"
            min="1"
            max="10"
            name="numberOfDiners"
            value={bookTable.numberOfDiners}
            onChange={inputHandler}
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
              onChange={inputHandler}
              required
            />
            <label htmlFor="indoor">indoor</label>
          </div>
          <div className={classes["input__controls"]}>
            <input
              type="radio"
              id="outdoor"
              name="seatingOption"
              value="outdoor"
              onChange={inputHandler}
              required
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
            rows="3"
            placeholder="Your comments"
            value={bookTable.comments}
            onChange={inputHandler}
            maxLength={150}
          />
          <p className={classes["additional-comments__maxlength"]}>
            {bookTable.comments.length}/150
          </p>
        </div>

        <PrimaryButton disabled={isDisabled} label="submit form">
          confirm your reservation
        </PrimaryButton>
      </div>
    </form>
  );
}

export default BookingForm;
