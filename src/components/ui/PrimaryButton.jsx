import React from "react";
import classes from "./PrimaryButton.module.scss";

function PrimaryButton(props) {
  return (
    <button onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  );
}

export default PrimaryButton;
