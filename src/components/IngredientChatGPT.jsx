import PropTypes from "prop-types";
import styles from "./IngredientChatGPT.module.css";
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

const IngredientChatGPT = ({ className = "" }) => {

  const healthInfoList = useSelector((state) => {
    return state.photo.healthInfo;
  });
  const [text, setText] = useState([]); // Now stores an array of health info

  useEffect(() => {
    if (healthInfoList && healthInfoList.length > 0) {
      setText(healthInfoList); // Update state with the entire list
      console.log('healthinfolist set' + " text")

    } else {
      setText(["Bad ChatGPT Response"]); // Default case for empty list
      console.log('no text is identified')
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