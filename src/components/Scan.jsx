import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Scan.module.css";

const Scan = ({ className = "", notPressed }) => {
  const onScanClick = useCallback(() => {
    //TODO: hide initially, once gallery or takePhoto pressed, use this button to process selected text,
  }, []);

  return (
    !notPressed && (
      <button
        className={[styles.scan, className].join(" ")}
        onClick={onScanClick}
      >
        <div className={styles.imagewithtext3}>
          <img
            className={styles.frameIcon}
            loading="lazy"
            alt=""
            src="/frame-11.svg"
          />
          <div className={styles.scanWrapper}>
            <div className={styles.scan1}>Scan</div>
          </div>
        </div>
      </button>
    )
  );
};

Scan.propTypes = {
  className: PropTypes.string,
  notPressed: PropTypes.bool,
};

export default Scan;
