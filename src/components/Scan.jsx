import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Scan.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { setVisionResult, setProcessingComplete } from './reducer.js'; // Adjust the import path as needed


const Scan = ({ className = "", noPhoto, updatePressed }) => {
  const dispatch = useDispatch();
  const capturedPhoto = useSelector((state) => state.photo.croppedPhoto);
  const [text, setText] = useState('');  

  const processPhoto = async (photo) => {
    try {
    // Convert the image to a base64 string
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1]; // Remove the data URL prefix

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageBase64: base64Image })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze photo: ' + response.status);
      }

      const result = await response.json();
      dispatch(setVisionResult(result));
      setText(result.detections[0]); // Update the text state with the extracted text
      dispatch(setProcessingComplete(true)); // Processing complete

      return result;
      };
      reader.onerror = (error) => {
        console.error('Error reading photo:', error);
        throw new Error('Error reading photo: ' + error);
      };

    } catch (error) {
      console.error('Error during photo processing:', error);
      const defaultResult = { detections: ['tobacco']  }; // Set default value
      dispatch(setVisionResult(defaultResult));
      setText(defaultResult.detections[0]); // Update the text state with the default text
      dispatch(setProcessingComplete(true)); // Processing complete
      return defaultResult;
    }
  };

  useEffect(() => {
    console.log("Updated text:", text);
  }, [text]);


  const onScanClick = useCallback(async () => {
    updatePressed(false);

    if (capturedPhoto) {
      const result = await processPhoto(capturedPhoto);
      console.log(result+"this is the result:")
      console.log("vision result success");
    }
  }, [capturedPhoto, updatePressed,processPhoto]);

  return (
    !noPhoto && (
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
  noPhoto: PropTypes.bool,
  updatePressed: PropTypes.func.isRequired,
};

export default Scan;
