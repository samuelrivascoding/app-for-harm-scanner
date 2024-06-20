import PropTypes from "prop-types";
import styles from "./TextIdentified.module.css";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



const TextIdentified = ({ className = "" }) => {

  const identifiedText = useSelector((state) => {
    console.log(state); // Check the entire state object
    console.log(state.photo); // Check the vision slice of the state
    return state.photo.visionResult.extractedText;
  });
  const isProcessingComplete = useSelector((state) => state.photo.isProcessingComplete);
  const [text, setText] = useState("No text is identified. Choose a different photo.");

  useEffect(() => {
    if (isProcessingComplete && identifiedText) {
      setText(identifiedText);
    } else if (isProcessingComplete && !identifiedText) {
      setText("No text is identified. Choose a different photo.");
    }
  }, [isProcessingComplete, identifiedText]);


  return (
    <b
      className={[styles.textidentified, className].join(" ")}
    >{text}
    </b>
  );
};

TextIdentified.propTypes = {
  className: PropTypes.string,

};

export default TextIdentified;
