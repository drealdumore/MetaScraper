// import React from "react";

// const Spinner = () => {
//   return (
//     <div className="flex item-center justify-center">
//       <div className="spinner center">
//         <div className="spinner-blade"></div>
//         <div className="spinner-blade"></div>
//         <div className="spinner-blade"></div>
//         <div className="spinner-blade"></div>
//         <div className="spinner-blade"></div>
//         <div className="spinner-blade"></div>
//         <div className="spinner-blade"></div>
//         <div className="spinner-blade"></div>
//         <div className="spinner-blade"></div>
//         <div className="spinner-blade"></div>
//         <div className="spinner-blade"></div>
//         <div className="spinner-blade"></div>
//       </div>
//     </div>
//   );
// };

// export default Spinner;

import React from "react";
import styles from "../styles/spinner.module.scss";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className={`${styles.spinner} ${styles.center}`}>
        {[...Array(12)].map((_, index) => (
          <div key={index} className={styles["spinner-blade"]}></div>
        ))}
      </div>
    </div>
  );
};

export default Spinner;
