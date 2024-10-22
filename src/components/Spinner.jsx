import React from "react";
import styles from "../styles/spinner.module.scss";

const Spinner = () => {
  return (
    <div
      className="flex items-center justify-center mt-9 "
      aria-label="Loading spinner"
    >
      <div className={`${styles.spinner}`}>
        {[...Array(12)].map((_, index) => (
          <div key={index} className={styles["spinner-blade"]}></div>
        ))}
      </div>
    </div>
  );
};

export default Spinner;
