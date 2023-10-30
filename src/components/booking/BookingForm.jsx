import React, { useState } from "react";
import classes from "./BookingForm.module.scss";
import PrimaryButton from "../ui/PrimaryButton";

function BookingForm() {
  return (
    <form className={classes.bookingForm}>
      <h2>Reserve a table</h2>
      <div className={classes["bookingForm__container"]}>
        <div className={classes["input__controls"]}>
          <label htmlFor="">choose date</label>
          <input type="date" />
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="">choose time</label>
          <select name="" id="">
            <option value="">17:00</option>
            <option value="">18:00</option>
            <option value="">19:00</option>
            <option value="">20:00</option>
            <option value="">21:00</option>
            <option value="">22:00</option>
          </select>
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="">Number of guests</label>
          <input type="number" placeholder="1" min="1" max="10" />
        </div>
        <div className={classes["input__controls"]}>
          <label htmlFor="">occasion</label>
          <select name="" id="">
            <option value="">Birthday</option>
            <option value="">Engagement</option>
            <option value="">Anniversary</option>
          </select>
        </div>

        <PrimaryButton>confirm your reservation</PrimaryButton>
      </div>
    </form>
  );
}

export default BookingForm;
