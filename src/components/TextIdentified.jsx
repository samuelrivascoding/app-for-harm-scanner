import PropTypes from "prop-types";
import styles from "./TextIdentified.module.css";

const TextIdentified = ({visionResult, className = "" }) => {

  const identifiedText = visionResult && visionResult.extractedText ? visionResult.extractedText : '';

  return (
    <b
      className={[styles.textidentified, className].join(" ")}
    >{identifiedText ? identifiedText : "No text is identified. Choose a different photo."}</b>
  );
};

TextIdentified.propTypes = {
  className: PropTypes.string,
  visionResult: PropTypes.shape({
    extractedText: PropTypes.string // Assuming extractedText is a string
  }),

};

export default TextIdentified;
