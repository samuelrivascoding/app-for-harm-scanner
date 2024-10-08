import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Scan.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { setVisionResult, setProcessingComplete, setCompareButtonPressed, setMatchedRows } from './reducer.js'; // Adjust the import path as needed
import useExcelProcessing from './useExcelProcessing'; // Adjust the import path as needed
import fetch from 'isomorphic-fetch';


const Scan = ({ className = "", updatePressed, showScan, notPressed, updatePressedTwice}) => {
  const dispatch = useDispatch();
  const capturedPhoto = useSelector((state) => state.photo.croppedPhoto);
  const [text, setText] = useState('');
  const [lastProcessed, setLastProcessed] = useState(0); // Timestamp of the last process
  const textToCompare = useSelector((state) => state.photo.highlightedText);
  const [message, setMessage] = useState('');

  /*const isLocal = import.meta.env.VITE_VERCEL_URL === "local";
  const vercelUrl = import.meta.env.VITE_VERCEL_URL
  const domain = isLocal ? 'localhost:3000' : vercelUrl.slice(0, vercelUrl.lastIndexOf('/'));
  const protocol = isLocal ? 'http://' : 'https://';

  const createUrl = (route) => {
    const baseUrl = `${protocol}${domain}`;
    return `${baseUrl}${route}`;
  };*/

  useEffect(() => {
    console.log("highlighted lists:", textToCompare);
  }, [textToCompare]);


  
  const processComparison = async (textToCompare) => {
    if (textToCompare && textToCompare.length > 0) try {
      const textToCompareList = textToCompare.split(",").map(keyword => keyword.trim()); // Split and trim keywords
      const result = await useExcelProcessing(textToCompareList);
      console.log('processed successfully?');
      dispatch(setMatchedRows(result))
      dispatch(setCompareButtonPressed(false));
    } catch (error) {
      console.error('Error during comparing data:', error);
    } else {
      console.log('No text to compare')

    }
  };


  const processPhoto = async () => {

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Accept', 'application/json');

      //const url = createUrl('/api/analyze');

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ image: capturedPhoto }),
        redirect: "follow",

      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      const textDescriptions = result.allDescriptions;
      dispatch(setVisionResult(textDescriptions));
      setText(textDescriptions); // Update the text state with the extracted text
      console.log(text);
      dispatch(setProcessingComplete(true)); // Processing complete
      return textDescriptions;

    } catch (error) {
      console.error('Error during photo processing:', error);
      const defaultResult = { detections: ['Error during photo processing:']  }; // Set default value
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

    if (notPressed) {
      updatePressed(false);
    } else {
      updatePressedTwice(true)
      if (textToCompare){
        processComparison(textToCompare);
        console.log('compare button should work')
      }
      console.log('compare button pressed')
      return;
    }

    const currentTime = Date.now();
    if (currentTime - lastProcessed < 1000) {
      console.log('Please wait before processing again.');
      setMessage('Please wait before processing again.')
      return;
    }

    if (capturedPhoto) {
      const result = await processPhoto(capturedPhoto);
      setLastProcessed(Date.now());
      console.log(result+"this is the result:")
      console.log("vision result success");
    }
  }, [capturedPhoto, updatePressedTwice, notPressed,updatePressed, textToCompare, lastProcessed, setMessage, ,processPhoto, processComparison]);

  return (
    showScan && (
      <button
        className={[styles.scan, className].join(" ")}
        onClick={onScanClick}
      >      {message && <p>{message}</p>}
        <div className={styles.imagewithtext3}>
          <img
            className={styles.frameIcon}
            loading="lazy"
            alt=""
            src="/frame-11.svg"
          />
          <div className={styles.scanWrapper}>
            <div className={styles.scan1}>{notPressed ? "Scan Text" : "Compare Text"}</div>
          </div>
        </div>
      </button>
      
    )
  );
};

Scan.propTypes = {
  className: PropTypes.string,
  updatePressed: PropTypes.func.isRequired,
  showScan: PropTypes.bool,
};

export default Scan;
