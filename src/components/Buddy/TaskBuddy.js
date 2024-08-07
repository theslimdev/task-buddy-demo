// IMPORTS
// Styling
import styles from "./TaskBuddy.module.scss";
// React, hooks, libraries, etc.
import React, { useEffect } from "react";

const TaskBuddy = ({ buddy, setBuddy, points }) => {
  useEffect(() => {
    if (points <= 60) {
      setBuddy("😀");
    } else if (points > 61 && points <= 150) {
      setBuddy("🙂");
    } else if (points > 151 && points <= 250) {
      setBuddy("😳");
    } else if (points > 251 && points <= 400) {
      setBuddy("😰");
    } else if (points > 400) {
      setBuddy("💀");
    } else {
      setBuddy("😀");
    }
  });

  return <div className={styles["taskbuddy-buddy"]}>{buddy}</div>;
};

export default TaskBuddy;
