import PropTypes from "prop-types";
import styles from "./TextIdentified.module.css";
import { useSelector } from 'react-redux';



const TextIdentified = ({ className = "" }) => {

  const identifiedText = useSelector((state) => state.visionResult);

  return (
    <b
      className={[styles.textidentified, className].join(" ")}
    >{identifiedText ? identifiedText : "No text is identified. Choose a different photo."}</b>
  );
};

TextIdentified.propTypes = {
  className: PropTypes.string,

};

export default TextIdentified;
