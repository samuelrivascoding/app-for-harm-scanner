import React, { useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import styles from "./Camera.module.css";

const Camera = ({ className = '' }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = { video: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });

    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
      }
    };
  }, []);

  return (
    <div className={[styles.camera, className].join(' ')}>
      <video className={styles.cameraChild} ref={videoRef} autoPlay playsInline muted />
    </div>
  );
};

Camera.propTypes = {
  className: PropTypes.string,
};

export default Camera;
