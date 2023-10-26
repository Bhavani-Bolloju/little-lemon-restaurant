import React from "react";
import classes from "./CustomerSays.module.scss";
import akash from "../../assets/little-lemon-assets/akash.jpg";
import andrea from "../../assets/little-lemon-assets/andrea.jpg";
import engelsen from "../../assets/little-lemon-assets/engelsen.jpg";
import campbell from "../../assets/little-lemon-assets/campbell.jpg";
import star from "../../assets/little-lemon-assets/Star.svg";

function StarRating({ rating }) {
  const maxStars = 5;
  const filledStars = Math.round(rating);

  const emptyStars = maxStars - filledStars;
  const stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(
      <li key={`${i}filled`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 13"
          className={classes.filledStar}
        >
          <path d="M6.79999 0L8.30872 4.83688H13.1911L9.24117 7.82624L10.7499 12.6631L6.79999 9.67376L2.85007 12.6631L4.3588 7.82624L0.408887 4.83688H5.29125L6.79999 0Z" />
        </svg>
      </li>
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <li key={`${i}empty`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13">
          <path d="M6.79999 0L8.30872 4.83688H13.1911L9.24117 7.82624L10.7499 12.6631L6.79999 9.67376L2.85007 12.6631L4.3588 7.82624L0.408887 4.83688H5.29125L6.79999 0Z" />
        </svg>
      </li>
    );
  }

  return <ul className={classes["customerSays__rating"]}>{stars}</ul>;
}

function CustomerSaysItem({ name, profession, review, image, rating }) {
  return (
    <li className={classes["customerSays__item"]}>
      <blockquote className={classes["customerSays__quote"]}>
        <figure className={classes["customerSays__figure"]}>
          <img
            src={image}
            alt={name}
            className={classes["customerSays__avatar"]}
          />
          <figcaption className={classes["customerSays__caption"]}>
            <p className={classes["customerSays__name"]}>{name}</p>
            <p className={classes["customerSays__profession"]}>{profession}</p>
          </figcaption>
        </figure>
        {/* <p className={classes["customerSays__rating"]}>{rating}</p> */}
        <StarRating rating={rating} />
        <p className={classes["customerSays__review"]}>{review}</p>
      </blockquote>
    </li>
  );
}

function CustomersSay() {
  return (
    <section className={classes.customerSays}>
      <h2 className={classes["customerSays__heading"]}>testimonial</h2>
      <ul className={classes["customerSays__list"]}>
        <CustomerSaysItem
          image={akash}
          review="The unique blend of Mediterranean flavors and the cozy ambiance create a dining experience like no other."
          name="akash"
          profession="marketing"
          rating="5"
        />
        <CustomerSaysItem
          image={campbell}
          review="As an event planner, I'm always on the lookout for exquisite dining options. Little Lemon Restaurant never disappoints."
          name="campbell"
          profession="Event Planner"
          rating="5"
        />
        <CustomerSaysItem
          image={engelsen}
          review=" I'm a tough critic when it comes to dining out. Little Lemon Restaurant impresses me with their exquisite cuisine"
          name="engelsen"
          profession="Chef"
          rating="4"
        />
        <CustomerSaysItem
          image={andrea}
          review="Little Lemon Restaurant has been my go-to for healthy and delicious Mediterranean mealse."
          name="andrea"
          profession="Health Nut"
          rating="5"
        />
      </ul>
    </section>
  );
}

export default CustomersSay;
