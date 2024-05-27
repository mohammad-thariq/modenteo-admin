import React from "react";
import styles from "./index.module.css";

export const Popup = ({ children, open, onClose }) => {
  if (!open) return null;
  return (
    <div className={styles.bg}>
      <div className={styles.wrapper}>
        <span className="material-icons" onClick={onClose}>
          close
        </span>

        {children}
      </div>
    </div>
  );
};
