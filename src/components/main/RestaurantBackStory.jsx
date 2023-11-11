import React from "react";
import classes from "./RestaurantBackStory.module.scss";
import chef1 from "../../assets/little-lemon-assets/Mario and Adrian A.jpg";

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
        <div className={classes["image__restaurant"]}>
          <img src={chef1} alt="" />
        </div>
        <div className={classes["image__restaurant"]}>
          <img src={chef2} alt="" />
        </div>
      </div>
    </section>
  );
}

export default RestaurantBackStory;
