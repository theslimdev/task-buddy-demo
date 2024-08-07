// IMPORTS
// Styling
import styles from "./Card.module.scss";
// React, hooks, libraries, etc.
import React from "react";

const Card = (props) => {
  // props.children will grab any elements wrapped with the Card compnent
  return <div className={`${styles.card}`}>{props.children}</div>;
};

export default Card;
