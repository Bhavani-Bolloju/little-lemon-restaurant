import React from "react";
import classes from "./CallToAction.module.scss";
import heroImage from "../../assets/little-lemon-assets/restauranfood.jpg";
import PrimaryButton from "../ui/PrimaryButton";

function CallToAction() {
  return (
    <section className={classes.callToAction}>
      <div className={classes["callToAction__content"]}>
        <h1 className={classes["callToAction__title"]}>little lemon</h1>
        <p className={classes["callToAction__subTitle"]}>chicago</p>
        <p className={classes["callToAction__text"]}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist. At Little Lemon, tradition and
          innovation come together to offer a dining experience that's both
          familiar and exciting.
        </p>

        <PrimaryButton>reserve a table</PrimaryButton>
      </div>
      <div className={classes["callToAction__image"]}>
        <img src={heroImage} alt="" />
      </div>
    </section>
  );
}

export default CallToAction;
