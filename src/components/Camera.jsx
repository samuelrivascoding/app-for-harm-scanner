import React, { useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import styles from "./Camera.module.css";

const Camera = ({ className = '' }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let constraints = { 
      video: {
        facingMode: 'user' // Default to user-facing camera
      } 
    };

    // Check if we're on a mobile device
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
      constraints = { 
        video: {
          facingMode: { exact: "environment" } // Use rear-facing camera on mobile
        } 
      };
    }

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
