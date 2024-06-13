import React, { useState } from 'react';
import Camera from "./Camera";
import Gallery from "./Gallery";
import TakePhoto from "./TakePhoto";
import Scan from "./Scan";
import ChatGPT from "./ChatGPT";
import PropTypes from "prop-types";
import styles from "./ScannerComponent.module.css";

const ScannerComponent = ({ className = "" }) => {

  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [visionResult, setVisionResult] = useState(null);
  const [showCamera, setShowCamera] = useState(true); // State to toggle camera feed



  const handlePhotoCapture = (photoURL) => {
    setCapturedPhoto(photoURL);
    processPhoto(photoURL);
    // You can further process or save the captured photo URL here
    console.log('Captured photo URL in ScannerComponent:', photoURL);
  };

  const handlePhotoUpload = (photoURL) => {
    setCapturedPhoto(photoURL);
    processPhoto(photoURL);
    setShowCamera(false); // Hide camera after uploading photos
    // You can further process or save the uploaded photo URL here
    console.log('Uploaded photo URL in ScannerComponent:', photoURL);
  };

  const processPhoto = async (photoURL) => {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photo: photoURL.split(',')[1] }),
      });
      const result = await response.json();
      setVisionResult(result);
    } catch (error) {
      console.error('Error processing photo:', error);
    }
  };

  return (
    <section className={[styles.scannerComponent, className].join(' ')}>
      <div className={styles.scanner}>
        <Camera />
        <div className={styles.buttonContainer}>
          <div className={styles.buttons}>
            <Gallery notPressed onPhotoUpload={handlePhotoUpload} />
            <TakePhoto notPressed onPhotoCapture={handlePhotoCapture} />
            <Scan notPressed />
            <ChatGPT notPressed />
          </div>
        </div>
      </div>
      {capturedPhoto && (
        <div className={styles.photoPreview}>
          <h2>Photo Preview</h2>
          <img src={capturedPhoto} alt="Captured" />
        </div>
      )}
      {visionResult && (
        <div className={styles.visionResult}>
          <h2>Vision Result</h2>
          <pre>{JSON.stringify(visionResult, null, 2)}</pre>
        </div>
      )}
    </section>
  );
};

ScannerComponent.propTypes = {
  className: PropTypes.string,
};

export default ScannerComponent;
