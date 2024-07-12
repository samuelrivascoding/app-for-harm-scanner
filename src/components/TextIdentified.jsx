import PropTypes from "prop-types";
import styles from "./TextIdentified.module.css";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { setHighlightedText } from './reducer.js'; // Adjust path as needed
import { Button, IconButton } from '@mui/material'; // Import Button and IconButton




const TextIdentified = ({ className = "" }) => {
  const dispatch = useDispatch();
  const identifiedText = useSelector((state) => {
    return state.photo.visionResult;
  });
  const isProcessingComplete = useSelector((state) => state.photo.isProcessingComplete);
  const [ThisIstext, setText] = useState("No text is identified. Choose a different photo.");
  const [highlightedTexts, setHighlightedTexts] = useState([]); // Maintain a list of highlighted texts


  useEffect(() => {
    if (isProcessingComplete && identifiedText) {
      setText(identifiedText);
    } else {
      setText("No text is identified. Choose a different photo.");
    }
  }, [isProcessingComplete, identifiedText]);

  const handleHighlight = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim().slice(0, 50);

    if (selectedText) {
      setHighlightedTexts(prev => {
        if (prev.some(textObj => textObj.text === selectedText)) {
          // If text is already highlighted, remove it
          const newHighlights = prev.filter(textObj => textObj.text !== selectedText);
          dispatch(setHighlightedText(newHighlights.map(obj => obj.text).join(',')));
          return newHighlights;
        } else {
          // If text is not highlighted, add it
          const newHighlights = [...prev, { text: selectedText }];
          dispatch(setHighlightedText(newHighlights.map(obj => obj.text).join(',')));
          return newHighlights;
        }
      });
    }
  };

  const handleEditHighlight = (index, newText) => {
    setHighlightedTexts(prev => {
      const updatedHighlights = [...prev];
      updatedHighlights[index].text = newText;
      dispatch(setHighlightedText(updatedHighlights.map(obj => obj.text).join(',')));
      return updatedHighlights;
    });
  };

  const handleClearHighlights = () => {
    setHighlightedTexts([]);
    dispatch(setHighlightedText(''));
  };

  const getHighlightedText = (text, highlights) => {
    if (!highlights.length) return text;

    let parts = text.split(new RegExp(`(${highlights.map(obj => obj.text.slice(0, 50)).join('|')})`, 'gi'));
    return parts.map((part, index) =>
      highlights.some(obj => obj.text === part) ? <mark key={index}>{part}</mark> : part
    );
  };


  return (
    <div className={[styles.textidentified, className].join(" ")}>
      <div className={[styles.thisistext, className].join(" ")} onMouseUp={handleHighlight}>
        {getHighlightedText(ThisIstext, highlightedTexts)}
      </div>
      <div>
      <ul>
          {highlightedTexts.map((textObj, index) => (
            <li key={index}>
            <input
              type="text"
              value={textObj.text}
              onChange={(e) => handleEditHighlight(index, e.target.value)}
            />
          </li>
          ))}
        </ul>
      </div>
      <Button variant="contained" color="primary" onClick={handleClearHighlights}>Clear Highlights</Button>
    </div>
    

  );
};

TextIdentified.propTypes = {
  className: PropTypes.string,

};

export default TextIdentified;