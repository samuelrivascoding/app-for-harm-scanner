import React, {useCallback, useState } from 'react';
import Camera from "./Camera";
import Gallery from "./Gallery";
import TakePhoto from "./TakePhoto";
import Scan from "./Scan";
import ChatGPT from "./ChatGPT";
import PropTypes from "prop-types";
import styles from "./ScannerComponent.module.css";
import TextIdentified from "./TextIdentified.jsx"; // Import TextIdentified component

const ScannerComponent = ({ className = "", notPressed, updatePressed}) => {

  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [visionResult, setVisionResult] = useState({
    extractedText: "Sample extracted text" // Replace with actual extracted text
  });
  const [showCamera, setShowCamera] = useState(true); // State to toggle camera feed

  
  const handlePhotoCapture = useCallback((photoURL,updatePressed) => {
    setCapturedPhoto(photoURL);
    processPhoto(photoURL);
    setShowCamera(false); // Hide camera after uploading photo
    // You can further process or save the captured photo URL here
    updatePressed(false);
    console.log('Captured photo URL in ScannerComponent:', photoURL);
  }, [updatePressed]);;

  const handlePhotoUpload = useCallback((photoURL, updatePressed) => {
    setCapturedPhoto(photoURL);
    processPhoto(photoURL);
    setShowCamera(false); // Hide camera after uploading photos
    updatePressed(false);
    // You can further process or save the uploaded photo URL here
    console.log('Uploaded photo URL in ScannerComponent:', photoURL);
  }, [updatePressed]);;

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
        {showCamera ? (
          <Camera />
        ) : (
          <div className={styles.photoPreview}>
            <h2>Processed Image</h2>
            <img src={capturedPhoto} alt="Processed" />
          </div>
        )}
        <div className={styles.buttonContainer}>
          <div className={styles.buttons}>
            <Gallery notPressed={notPressed} onPhotoUpload={handlePhotoUpload} />
            <TakePhoto notPressed={notPressed} onPhotoCapture={handlePhotoCapture} />
            <Scan notPressed={notPressed} />
            <ChatGPT notPressed={notPressed} />
          </div>
        </div>
      </div>
    </section>
  );
};

ScannerComponent.propTypes = {
  className: PropTypes.string,
  notPressed: PropTypes.bool,
  updatePressed: PropTypes.func.isRequired, // updatePressed function as required prop
};

export default ScannerComponent;
