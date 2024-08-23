import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./TakePhoto.module.css";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};


const TakePhoto = ({ className = "", showTakePhoto, onPhotoCapture, webcamRef  }) => {
  
  const capturePhoto = useCallback(() => {

    const image = webcamRef.current.getScreenshot();
    onPhotoCapture(image); // Pass captured photo URL to parent component

  }, [onPhotoCapture, webcamRef]);

  return (
    showTakePhoto && (
      <div>
      <button
        className={[styles.takephoto, className].join(" ")}
        onClick={capturePhoto}
      >
        <img
          className={styles.photoIcon}
          loading="lazy"
          alt=""
          src="/frame-1.svg"
        />
      </button>
      </div>
    )
  );
};

TakePhoto.propTypes = {
  className: PropTypes.string,
  showTakePhoto: PropTypes.bool,
  onPhotoCapture: PropTypes.func.isRequired,
};

export default TakePhoto;
