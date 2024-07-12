import PropTypes from "prop-types";
import styles from "./IngredientChatGPT.module.css";
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

const IngredientChatGPT = ({ className = "" }) => {
  const healthInfoList = useSelector((state) => state.photo.healthInfo);
  const [text, setText] = useState([]); // Array to store health info


  // Update text based on healthInfoList or error condition
  useEffect(() => {
    if (healthInfoList && healthInfoList.length > 0) {
      setText(healthInfoList);
    } else {
      setText(["Bad ChatGPT Response. Make sure you choose less than three items or try again later."])
    }

  }, [healthInfoList]);

  return (
    <div className={[styles.ingredienttext, className].join(" ")}>
      {text.length > 0 && ( // Check if list is not empty
        <ul>  {/* Wrap the list in an unordered list (ul) */}
          {text.map((info, index) => (
            <li key={index}> {info} </li>
          ))}
        </ul>
      )}
    </div>
  );
};

IngredientChatGPT.propTypes = {
  className: PropTypes.string,
};

export default IngredientChatGPT;