// IMPORTS
// Styling
import styles from "./PostIt.module.scss";
// React, hooks, libraries, etc.
import React from "react";

const PostIt = (props) => {
  return (
    // Post it note look that adds classes from props to determine color based on priority and takes in props children
    <div
      className={`${styles["sticky-container"]} ${styles[props.typeClass]} ${
        props.typeClass === "details-post" ? styles[props.showClass] : ""
      } `}
    >
      <div className={styles["sticky-outer"]}>
        <div className={styles.sticky}>
          <svg width="0" height="0">
            <defs>
              <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                <path
                  d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                  strokeLinejoin="round"
                  strokeLinecap="square"
                />
              </clipPath>
            </defs>
          </svg>
          <div
            className={`${styles["sticky-content"]} ${
              styles[props.colorClass]
            }`}
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostIt;
