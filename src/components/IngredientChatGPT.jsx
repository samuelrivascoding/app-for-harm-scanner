import PropTypes from "prop-types";
import styles from "./IngredientChatGPT.module.css";
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';




const IngredientChatGPT = ({ className = "" }) => {

  const identifiedText = useSelector((state) => {
    return state.photo.healthInfo;
  });
  const [text, setText] = useState("No text is identified. Choose a different photo.");

  useEffect(() => {
    if (identifiedText) {
      setText(identifiedText);
    }
  }, [identifiedText]);
  
  return (
    <div className={[styles.ingredienttext, className].join(" ")}>
      {text}
    </div>
  );
};

IngredientChatGPT.propTypes = {
  className: PropTypes.string,
};

export default IngredientChatGPT;
