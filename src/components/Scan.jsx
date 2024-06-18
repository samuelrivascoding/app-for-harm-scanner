import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Scan.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { setMatchedRows, setVisionResult } from './actions';
import { compareTextWithKeywords } from './compareTextWithKeywords'; // Import the function here


const Scan = ({ className = "", noPhoto, updatePressed }) => {
  const capturedPhoto = useSelector((state) => state.photo.croppedPhoto);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const matchedRows = useSelector(state => state.matchedRows);

  const compareText = () => {
    compareTextWithKeywords(text);
  };




  const processPhoto = async (photo) => {
    try {
      const formData = new FormData();
      formData.append('image', photo);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data', // Do not set Content-Type manually for FormData
        },
        body: formData,
      });
      const result = await response.json();
      dispatch(setVisionResult(result));
      setText(result.extractedText); // Update the text state with the extracted text
      return result;
    } catch (error) {
      console.error('Error processing photo:', error);
      const defaultResult = { extractedText: 'Still text' }; // Set default value
      dispatch(setVisionResult(defaultResult));
      setText(defaultResult.extractedText); // Update the text state with the default text
      return null;
    }
  };


  const onScanClick = useCallback(async () => {
    updatePressed(false);

    if (capturedPhoto) {
      const result = await processPhoto(capturedPhoto);
      if (result) {
        compareText();
      }
    }
  }, [capturedPhoto, updatePressed, compareText]);

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
  setVisionResult: PropTypes.func.isRequired,
  updatePressed: PropTypes.func.isRequired,
};

export default Scan;
