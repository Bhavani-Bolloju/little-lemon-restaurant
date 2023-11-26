import React from "react";
import classes from "./PrimaryButton.module.scss";

function PrimaryButton(props) {
  console.log(props.label, "label");
  return (
    <button
      disabled={props.disabled || false}
      onClick={props.onClick}
      className={classes.btn}
      aria-label={props.label || "button"}
    >
      {props.children}
    </button>
  );
}

export default PrimaryButton;
