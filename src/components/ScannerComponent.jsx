import React, {useCallback, useEffect, useState } from 'react';
import Camera from "./Camera";
import Gallery from "./Gallery";
import TakePhoto from "./TakePhoto";
import Scan from "./Scan";
import ChatGPT from "./ChatGPT";
import PropTypes from "prop-types";
import styles from "./ScannerComponent.module.css";
import TextIdentified from "./TextIdentified.jsx"; // Import TextIdentified component
import Photo from './Photo.jsx';

const ScannerComponent = ({ className = "", notPressed, noPhoto, updatePressed, updatePhoto}) => {

  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [visionResult, setVisionResult] = useState({
    extractedText: "Sample extracted text" // Replace with actual extracted text
  });
  const [showCamera, setShowCamera] = useState(true); // State to toggle camera feed
  
  const handlePhotoCapture = useCallback((photoURL) => {
    setCapturedPhoto(photoURL);
    setShowCamera(false); // Hide camera after uploading photo
    // You can further process or save the captured photo URL here
    updatePhoto(false);
    console.log('Captured photo URL in ScannerComponent:', photoURL);
  }, [updatePhoto]);;

  const handlePhotoUpload = useCallback((photoURL) => {
    setCapturedPhoto(photoURL);
    setShowCamera(false); // Hide camera after uploading photos

    console.log("notPressed value in ScannerComponent before:", notPressed);

    updatePhoto(false);
    console.log("notPressed value in ScannerComponent after:", notPressed);

    // You can further process or save the uploaded photo URL here
    console.log('Uploaded photo URL in ScannerComponent:', photoURL);
  }, [updatePhoto]);;

  return (
    <section className={[styles.scannerComponent, className].join(' ')}>
      <div className={styles.scanner}>
        {showCamera ? (
          <Camera />
        ) : (
          <Photo photoURL={capturedPhoto} onCapture={(capturedPhoto) => setCapturedPhoto(capturedPhoto)} />
        )}
        <div className={styles.buttonContainer}>
          <div className={styles.buttons}>
            <Gallery noPhoto={noPhoto} onPhotoUpload={(photoURL) => handlePhotoUpload(photoURL, updatePressed)}  />
            <TakePhoto noPhoto={noPhoto} onPhotoCapture={(photoURL) => handlePhotoCapture(photoURL, updatePressed)}  />
            <Scan noPhoto={noPhoto} setVisionResult={setVisionResult} capturedPhoto={capturedPhoto} updatePressed={updatePressed}/>
            <ChatGPT noPhoto={noPhoto} />
            
          </div>
        </div>
      </div>
    </section>
  );
};

ScannerComponent.propTypes = {
  className: PropTypes.string,
  notPressed: PropTypes.bool.isRequired,
  updatePressed: PropTypes.func.isRequired, // updatePressed function as required prop
  photoURL: PropTypes.string.isRequired,
  setVisionResult: PropTypes.func.isRequired,
};

export default ScannerComponent;
