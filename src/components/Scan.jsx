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
      const formData = new FormData();
      formData.append('image', photo);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo: ' + response.status);
      }
      const result = await response.json();
      dispatch(setVisionResult(result));
      setText(result.extractedText); // Update the text state with the extracted text
      dispatch(setProcessingComplete(true)); // Processing complete

      return result;
    } catch (error) {
      const defaultResult = { extractedText: 'tobacco' }; // Set default value
      dispatch(setVisionResult(defaultResult));
      setText(defaultResult.extractedText); // Update the text state with the default text
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
