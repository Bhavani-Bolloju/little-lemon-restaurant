import React from "react";
import classes from "./RestaurantBackStory.module.scss";

import MandA_large from "../../assets/restaurant-backstory/Mario and Adrian A.webp";
import MandA_small from "../../assets/restaurant-backstory/Mario and Adrian A-small.webp";
import MandA from "../../assets/restaurant-backstory/Mario and Adrian-A.jpg";

import MandA2 from "../../assets/restaurant-backstory/Mario and Adrian-B.jpg";

import MandA2_small from "../../assets/restaurant-backstory/Mario and Adrian b_small.webp";

import MandA2_large from "../../assets/restaurant-backstory/Mario and Adrian b__large.webp";

import chef2 from "../../assets/little-lemon-assets/Mario and Adrian b.jpg";

function RestaurantBackStory() {
  return (
    <section className={classes.restaurantBackStory}>
      <div className={classes["restaurantBackStory__content"]}>
        <h2 className={classes["content__title"]}>little lemon</h2>
        <p className={classes["content__location"]}>chicago</p>
        <p className={classes["content__description"]}>
          Welcome to Little Lemon Restaurant, where Mediterranean tradition
          meets modern innovation. Nestled in the heart of Chicago, we're a
          family-owned culinary haven with a passion for crafting authentic and
          exquisite dishes. Our menu offers a fusion of fresh ingredients,
          vibrant spices, and centuries-old recipes, ensuring every meal is a
          memorable culinary journey.
        </p>
      </div>
      <div className={classes["restaurantBackStory__images"]}>
        <picture className={classes["image__restaurant"]}>
          <img
            srcSet={`${MandA_large} 2x, ${MandA_small} 1x`}
            src={MandA}
            alt="Mario and adrian"
            type="image/webp"
            sizes="
            (max-width: 650px) 300px,
            (max-width: 1200px) 250px"
            loading="lazy"
          />
        </picture>
        <picture className={classes["image__restaurant"]}>
          <img
            srcSet={`${MandA2_large} 2x, ${MandA2_small} 1x`}
            src={MandA2}
            alt="Mario and adrian"
            type="image/webp"
            sizes="
            (max-width: 650px) 300px,
            (max-width: 1200px) 250px"
            loading="lazy"
          />
        </picture>
      </div>
    </section>
  );
}

export default RestaurantBackStory;
