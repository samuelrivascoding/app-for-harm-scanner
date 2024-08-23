import React, { useRef, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import styles from "./Camera.module.css";
import Webcam from "react-webcam";


const Camera = ({ className = '' , webcamRef}) => {

  const [videoConstraints, setVideoConstraints] = useState({
    width: 1280,
    height: 720,
    facingMode: "user"
  });

  useEffect(() => {
    const detectDevice = () => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      
      if (isIOS) {
        setVideoConstraints(prevConstraints => ({
          ...prevConstraints,
          facingMode: { exact: "environment" }
        }));
      }
    };

    detectDevice();
  }, []);


  return (
    <div className={[styles.camera, className].join(' ')}>
        <Webcam
        className={styles.cameraChild}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onError={(error) => console.log(error)}
      />
    </div>
  );
};

Camera.propTypes = {
  className: PropTypes.string,
};

export default Camera;
