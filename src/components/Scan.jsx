import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Scan.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { setVisionResult, setProcessingComplete } from './reducer.js'; // Adjust the import path as needed
import analyze from '../../api/analyze.js'
import useExcelProcessing from './useExcelProcessing.js'


const Scan = ({ className = "", noPhoto, updatePressed }) => {
  const dispatch = useDispatch();
  const capturedPhoto = useSelector((state) => state.photo.croppedPhoto);
  const [text, setText] = useState('');  

  useEffect(() => {
    console.log('Text state updated:', text);
    // You can perform any actions here that depend on the updated text state
  }, [text]); // Include text as a dependency to run useEffect on text state updates

  const processPhoto = async () => {
    try {
      const result = await analyze(capturedPhoto);
      dispatch(setVisionResult(result));
      setText(result); // Update the text state with the extracted text
      dispatch(setProcessingComplete(true)); // Processing complete

      return result;

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
      useExcelProcessing(result);
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
