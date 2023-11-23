import React from "react";
import classes from "./PrimaryButton.module.scss";

function PrimaryButton(props) {
  return (
    <button
      disabled={props.disabled || false}
      onClick={props.onClick}
      className={classes.btn}
    >
      {props.children}
    </button>
  );
}

export default PrimaryButton;
