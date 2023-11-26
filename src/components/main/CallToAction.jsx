import React from "react";
import classes from "./CallToAction.module.scss";
import hero_image from "../../assets/hero-section/restauranfood-tiny.jpg";
import hero from "../../assets/hero-section/restauranfood-original.webp";
import hero1 from "../../assets/hero-section/restauranfood-500px.webp";
import hero2 from "../../assets/hero-section/restauranfood-350px.webp";

import PrimaryButton from "../ui/PrimaryButton";
import { useNavigate } from "react-router-dom";

function CallToAction() {
  const navigate = useNavigate();
  return (
    <section className={classes.callToAction}>
      <div className={classes["callToAction__container"]}>
        <div className={classes["callToAction__content"]}>
          <h1 className={classes["callToAction__title"]}>little lemon</h1>
          <p className={classes["callToAction__subTitle"]}>chicago</p>
          <p className={classes["callToAction__text"]}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist. At Little Lemon,
            tradition and innovation come together to offer a dining experience
            that's both familiar and exciting.
          </p>

          <PrimaryButton
            onClick={() => navigate("/booking")}
            label="reserve a table"
          >
            reserve a table
          </PrimaryButton>
        </div>
        <picture className={classes["callToAction__image"]}>
          <img
            srcSet={`${hero} 2x, ${hero1} 1x, ${hero2} 0.5x`}
            src={hero_image}
            alt="hero"
            type="image/webp"
            sizes="
            (min-width: 650px) and (max-width: 1000px) 350px,
            (max-width: 650px) 515px,
            100vw"
            loading="lazy"
          />
        </picture>
      </div>
    </section>
  );
}

export default CallToAction;
