import React, {useCallback, useState } from 'react';
import Camera from "./Camera";
import Gallery from "./Gallery";
import TakePhoto from "./TakePhoto";
import Scan from "./Scan";
import ChatGPT from "./ChatGPT";
import PropTypes from "prop-types";
import styles from "./ScannerComponent.module.css";
import Photo from './Photo.jsx';

const ScannerComponent = ({ className = "", pressedTwice, notPressed, noPhotoUploaded, updatePressed, updatePhoto, updatePressedTwice}) => {

  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(true); // State to toggle camera feed
  const [ImageButtonPressed, SetImageButtonPressed] = useState(false);

  
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
          <Photo updatePressedTwice={updatePressedTwice} updateSetImageButtonPressed={SetImageButtonPressed} updatePressed={updatePressed} photoURL={capturedPhoto} onCapture={(capturedPhoto) => setCapturedPhoto(capturedPhoto)} />
        )}
        <div className={styles.buttonContainer}>
          <div className={styles.buttons}>
            <Gallery showGallery={noPhotoUploaded} onPhotoUpload={(photoURL) => handlePhotoUpload(photoURL, updatePressed)}  />
            <TakePhoto showTakePhoto={noPhotoUploaded} onPhotoCapture={(photoURL) => handlePhotoCapture(photoURL, updatePressed)}  />
            <Scan showScan={ImageButtonPressed} capturedPhoto={capturedPhoto} updatePressed={updatePressed} updatePressedTwice={updatePressedTwice}
            notPressed={notPressed}/>
            <ChatGPT showChatGPT={pressedTwice} />
            
          </div>
        </div>
      </div>
    </section>
  );
};

ScannerComponent.propTypes = {
  className: PropTypes.string,
  noPhotoUploaded: PropTypes.bool.isRequired,
  notPressed: PropTypes.bool.isRequired,
  updatePressed: PropTypes.func.isRequired,
  updatePressedTwice: PropTypes.func.isRequired, 
};

export default ScannerComponent;
