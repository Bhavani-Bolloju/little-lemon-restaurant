import React from "react";

function BookingForm() {
  return (
    <form>
      <label htmlFor="">choose date</label>
      <input type="date" />
      <label htmlFor="">choose time</label>
      <select name="" id="">
        <option value="">17:00</option>
        <option value="">18:00</option>
        <option value="">19:00</option>
        <option value="">20:00</option>
        <option value="">21:00</option>
        <option value="">22:00</option>
      </select>
      <label htmlFor="">Number of guests</label>
      <input type="number" placeholder="1" min="1" max="10" />
      <label htmlFor="">occasion</label>
      <select name="" id="">
        <option value="">Birthday</option>
        <option value="">Engagement</option>
        <option value="">Anniversary</option>
      </select>
    </form>
  );
}

export default BookingForm;
