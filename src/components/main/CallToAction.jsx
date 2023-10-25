import React from "react";
import classes from "./CallToAction.module.scss";

function CallToAction() {
  return (
    <section className={classes.callToAction}>
      <h1 className={classes["callToAction__title"]}>little lemon</h1>
      <p className={classes["callToAction__subTitle"]}>chicago</p>
      <p className={classes["callToAction__text"]}>
        We are a family owned Mediterranean restaurant, focused on traditional
        recipes served with a modern twist
      </p>
      <button className={classes["callToAction__btn"]}>reserve a table</button>
    </section>
  );
}

export default CallToAction;
