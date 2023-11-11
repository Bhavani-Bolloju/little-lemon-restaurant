import React from "react";
import classes from "./Specials.module.scss";
import greekSalad from "../../assets/little-lemon-assets/greek salad.jpg";
import brushetta from "../../assets/little-lemon-assets/bruchetta.png";
import lemonDessert from "../../assets/little-lemon-assets/lemon dessert.jpg";
import PrimaryButton from "../ui/PrimaryButton";

import icon from "../../assets/little-lemon-assets/Delivery-iconsvg.svg";

const SpecialItem = function ({ image, title, price, text, id }) {
  return (
    <li className={classes["specials__item"]}>
      <div className={classes["specials__item--image"]}>
        <img src={image} alt={title} />
      </div>
      <div className={classes["specials__item--content"]}>
        <div className={classes["specials__item--content-info"]}>
          <p className={classes["specials__item--title"]}>greek salad</p>
          <p className={classes["specials__item--price"]}>{price}</p>
        </div>
        <p className={classes["specials__item--text"]}>{text}</p>
        <button className={classes["specials__item--btn"]}>
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
      <PrimaryButton>online menu</PrimaryButton>
      <ul className={classes["specials__list"]}>
        <SpecialItem
          title="greek salad"
          price="$12.45"
          text="Greek salad is a simple and healthy dish that typically consists of various fresh leafy greens."
          id="1"
          image={greekSalad}
        />
        <SpecialItem
          title="Bruschetta"
          price="$5.99"
          text="Our Bruschetta is made from grilled bread that has been smeared with salt and olive oil."
          id="2"
          image={brushetta}
        />
        <SpecialItem
          title="lemon dessert"
          price="$5.00"
          text="This comes straight from grandma’s recipe book, every last ingredient is an authentic as can be imagined."
          id="3"
          image={lemonDessert}
        />
      </ul>
    </section>
  );
}

export default Specials;
