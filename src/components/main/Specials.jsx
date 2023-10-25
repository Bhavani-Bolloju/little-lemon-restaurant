import React from "react";
import classes from "./Specials.module.scss";
import greekSalad from "../../assets/little-lemon-assets/greek salad.jpg";
import brushetta from "../../assets/little-lemon-assets/bruchetta.png";
import lemonDessert from "../../assets/little-lemon-assets/lemon dessert.jpg";

const SpecialItem = function ({ image, title, price, text, id }) {
  return (
    <li className={classes["specials__item"]}>
      <img src={image} alt={title} />
      <p>greek salad</p>
      <p>$ 12.4</p>
      <p>{text}</p>
      <button>
        <span>order to delivery</span>
        <span>logo</span>
      </button>
    </li>
  );
};

function Specials() {
  return (
    <section className={classes.specials}>
      <h2 className={classes["specials__title"]}>This weeks special</h2>
      <button className={classes["specials__order-btn"]}>online menu</button>
      <ul className={classes["specials__list"]}>
        <SpecialItem
          title="greek salad"
          price="$12.45"
          text="Greek salad is a simple and healthy dish that typically consists of various fresh leafy greens and other vegetables.. It's a versatile dish."
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
          text="This comes straight from grandma’s recipe book, every last ingredient has been sourced and is an authentic as can be imagined."
          id="3"
          image={lemonDessert}
        />
      </ul>
    </section>
  );
}

export default Specials;
