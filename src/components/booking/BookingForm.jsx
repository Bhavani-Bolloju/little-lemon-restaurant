import React, { useState } from "react";
import classes from "./BookingForm.module.scss";
import PrimaryButton from "../ui/PrimaryButton";
import { useNavigate } from "react-router-dom";

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

const initialState = {
  selectedDate: "",
  selectedTime: "",
  occasion: "",
  numberOfDiners: "",
  seatingOption: "",
  comments: "",
  firstName: "",
  lastName: ""
};

function BookingForm({ availableTimes, availabilityCheck }) {
  const [bookTable, setBookTable] = useState(initialState);

  const [isVisited, setIsVisited] = useState({
    selectedDate: false,
    selectedTime: false,
    occasion: false,
    numberOfDiners: false,
    seatingOption: false,
    firstName: false,
    lastName: false
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

        setBookTable((prev) => {
          return {
            ...prev,
            selectedDate: "",
            selectedTime: ""
          };
        });
        availabilityCheck("");
        return;
      } else {
        availabilityCheck(selectedDate);
      }
    }

    setBookTable((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    if (
      isVisited[e.target.name] !== "seatingOption" &&
      isVisited[e.target.name]
    ) {
      setIsVisited((prev) => {
        return {
          ...prev,
          [e.target.name]: false
        };
      });
    }
  };

  const visitHandler = function (e) {
    const key = e.target.name;

    if (e.target.value.trim().length === 0) {
      setIsVisited((prev) => {
        return {
          ...prev,
          [key]: true
        };
      });
    }
  };

  // console.log(isVisited);

  const formSubmitHandler = async function (e) {
    e.preventDefault();

    if (
      bookTable.selectedDate.trim() === "" ||
      bookTable.selectedTime.trim() === "" ||
      bookTable.seatingOption.trim() === "" ||
      bookTable.numberOfDiners.trim() === "" ||
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

    setBookTable(initialState);
  };

  return (
    <form className={classes.bookingForm} onSubmit={formSubmitHandler}>
      <div className={classes["bookingForm__container"]}>
        <div className={classes["input__controls"]}>
          <label htmlFor="firstName" id="firstName">
            first name:
          </label>
          <input
            aria-labelledby="firstName"
            id="firstName"
            name="firstName"
            type="text"
            required
            value={bookTable.firstName}
            onChange={inputHandler}
            placeholder="Your First Name"
            onBlur={visitHandler}
            className={isVisited.firstName ? classes.invalid : null}
          />
          {isVisited.firstName && (
            <p className={classes.required}>This field is required</p>
          )}
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="lastName" id="lastName">
            last name:
          </label>
          <input
            aria-labelledby="lastName"
            id="lastName"
            name="lastName"
            type="text"
            required
            value={bookTable.lastName}
            onChange={inputHandler}
            placeholder="Your Last Name"
            onBlur={visitHandler}
            className={isVisited.lastName ? classes.invalid : null}
          />

          {isVisited.lastName && (
            <p className={classes.required}>This field is required</p>
          )}
        </div>
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
            onBlur={visitHandler}
            className={isVisited.selectedDate ? classes.invalid : null}
          />
          {isVisited.selectedDate && (
            <p className={classes.required}>This field is required</p>
          )}
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
            onBlur={visitHandler}
            className={isVisited.selectedTime ? classes.invalid : null}
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

          {isVisited.selectedTime && (
            <p className={classes.required}>This field is required</p>
          )}
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
            onBlur={visitHandler}
            className={isVisited.occasion ? classes.invalid : null}
          >
            <option value="" disabled>
              choose an occasion
            </option>
            <option value="birthday">Birthday</option>
            <option value="engagement">Engagement</option>
            <option value="anniversary">Anniversary</option>
          </select>

          {isVisited.occasion && (
            <p className={classes.required}>This field is required</p>
          )}
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
            onBlur={visitHandler}
            className={isVisited.numberOfDiners ? classes.invalid : null}
          />

          {isVisited.numberOfDiners && (
            <p className={classes.required}>This field is required</p>
          )}
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
          <label htmlFor="comments">special requests:</label>
          <textarea
            name="comments"
            id="comments"
            cols="30"
            rows="3"
            placeholder="comments"
            value={bookTable.comments}
            onChange={inputHandler}
            maxLength={150}
          />
          <p className={classes["additional-comments__maxlength"]}>
            {bookTable.comments.length}/150
          </p>
        </div>

        <PrimaryButton label="submit form">
          confirm your reservation
        </PrimaryButton>
      </div>
    </form>
  );
}

export default BookingForm;
