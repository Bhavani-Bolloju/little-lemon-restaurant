import React, { useEffect, useState } from "react";

import classes from "./BookingConfirmationPage.module.scss";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import booking_confirmation from "../assets/little-lemon-assets/booking-confirmation.jpg";

function BookingConfirmationPage() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserBookingDetails = async function (userId) {
      const req = await fetch(
        `https://little-lemon-restaurant-4ced5-default-rtdb.firebaseio.com/reservations/${userId}/.json`
      );

      const res = await req.json();

      setUser(res);
    };

    if (id) {
      fetchUserBookingDetails(id);
    }
  }, [id]);

  console.log(user);

  return (
    <section className={classes["bookingconfirmation"]}>
      <figure className={classes["bookingconfirmation__image"]}>
        <img
          src={booking_confirmation}
          alt="booking confirmation"
          loading="lazy"
        />
      </figure>
      <div className={classes["bookingconfirmation__content"]}>
        <h2 className={classes["bookingconfirmation__title"]}>
          Booking Confirmation
        </h2>
        <p className={classes["bookingconfirmation__text"]}>
          Thank you for choosing Little Lemon Restaurant. Your reservation
          details are as follows:
        </p>
        {user && (
          <ul className={classes["bookingconfirmation__list"]}>
            <li className={classes["bookingconfirmation__item"]}>
              <strong className={classes["bookingconfirmation__label"]}>
                Date:
              </strong>{" "}
              {user?.selectedDate}
            </li>
            <li className={classes["bookingconfirmation__item"]}>
              <strong className={classes["bookingconfirmation__label"]}>
                Time:
              </strong>{" "}
              {user?.selectedTime}
            </li>
            <li className={classes["bookingconfirmation__item"]}>
              <strong className={classes["bookingconfirmation__label"]}>
                Number of Diners:
              </strong>{" "}
              {user?.numberOfDiners}
            </li>
            <li className={classes["bookingconfirmation__item"]}>
              <strong className={classes["bookingconfirmation__label"]}>
                Seating Option:
              </strong>{" "}
              {user?.seatingOption}
            </li>
            <li className={classes["bookingconfirmation__item"]}>
              <strong className={classes["bookingconfirmation__label"]}>
                Occasion:
              </strong>
              {user?.occasion}
            </li>
          </ul>
        )}
        {user && (
          <p className={classes["bookingconfirmation__text"]}>
            We look forward to serving you on
            <span className={classes["bookingconfirmation__highlight"]}>
              {" "}
              {user?.selectedDate}{" "}
            </span>{" "}
            at
            <span className={classes["bookingconfirmation__highlight"]}>
              {" "}
              {user?.selectedTime}
            </span>
            . If you have any special requests or need to make changes, please
            contact us.
          </p>
        )}
        <p className={classes["bookingconfirmation__text"]}>Enjoy your meal!</p>
      </div>
      <p className={classes.redirect}>
        go to <Link to="/">home</Link>
      </p>
    </section>
  );
}

export default BookingConfirmationPage;
