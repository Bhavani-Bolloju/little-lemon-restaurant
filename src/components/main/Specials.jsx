import React from "react";
import classes from "./Specials.module.scss";
import greekSalad from "../../assets/specials/greek-salad.jpg";
import greekSalad_large from "../../assets/specials/greek-salad_large.webp";
import greekSalad_small from "../../assets/specials/greek-salad_small.webp";

// import image1 from '../../assets/specials/'

import brushetta from "../../assets/specials/bruchetta.png";
import brushetta_large from "../../assets/specials/bruchetta_large.webp";
import brushetta_small from "../../assets/specials/bruchetta_small.webp";

import lemonDessert from "../../assets/specials/lemon-dessert.jpg";
import lemonDessert_large from "../../assets/specials/lemon-dessert_large.webp";
import lemonDessert_small from "../../assets/specials/lemon-dessert_small.webp";

import PrimaryButton from "../ui/PrimaryButton";
import icon from "../../assets/little-lemon-assets/delivery-icon.svg";

const SpecialItem = function ({
  defaultImage,
  image_large,
  image_small,
  title,
  price,
  text,
  id
}) {
  return (
    <li className={classes["specials__item"]}>
      <div className={classes["specials__item--image"]}>
        <img
          srcSet={`${image_large} 2x, ${image_small} 1x`}
          sizes="(min-width: 750px) 600px, 400px"
          src={defaultImage}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className={classes["specials__item--content"]}>
        <div className={classes["specials__item--content-info"]}>
          <p className={classes["specials__item--title"]}>{title}</p>
          <p className={classes["specials__item--price"]}>{price}</p>
        </div>
        <p className={classes["specials__item--text"]}>{text}</p>
        <button
          className={classes["specials__item--btn"]}
          label="order delivery"
        >
          <span>order to delivery</span>
          <img src={icon} alt="delivery icon" />
        </button>
      </div>
    </li>
  );
};

function Specials() {
  return (
    <section className={classes.specials}>
      <h2 className={classes["specials__title"]}>This weeks special!</h2>
      <PrimaryButton label="online menu">online menu</PrimaryButton>
      <ul className={classes["specials__list"]}>
        <SpecialItem
          title="greek salad"
          price="$12.45"
          text="Greek salad is a simple and healthy dish that typically consists of various fresh leafy greens."
          id="1"
          defaultImage={greekSalad}
          image_large={greekSalad_large}
          image_small={greekSalad_small}
        />
        <SpecialItem
          title="Bruschetta"
          price="$5.99"
          text="Our Bruschetta is made from grilled bread that has been smeared with salt and olive oil."
          id="2"
          defaultImage={brushetta}
          image_large={brushetta_large}
          image_small={brushetta_small}
        />
        <SpecialItem
          title="lemon dessert"
          price="$5.00"
          text="This comes straight from grandma’s recipe book, every last ingredient is an authentic as can be imagined."
          id="3"
          defaultImage={lemonDessert}
          image_large={lemonDessert_large}
          image_small={lemonDessert_small}
        />
      </ul>
    </section>
  );
}

export default Specials;
