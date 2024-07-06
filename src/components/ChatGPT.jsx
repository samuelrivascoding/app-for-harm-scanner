import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./ChatGPT.module.css";
import { lookupHealthInfo } from "../../server/api/ChatGPTScript.js"
import { useDispatch, useSelector } from "react-redux";
import { setHealthInfo, setChatGPTPressed,  } from './reducer'; // Adjust the import path as needed
import { useState, useEffect  } from 'react';


const ChatGPT = ({ className = "", showChatGPT }) => {
  const dispatch = useDispatch();
  const identifiedText = useSelector((state) => state.photo.highlightedText);
  const [highlightedText, setHighlightedText ] = useState([]);

  useEffect(() => {
      setHighlightedText(identifiedText);
  }, [identifiedText]);


  const onChatGPTClick = useCallback(async () => {
    try {
      console.log(highlightedText);
      const result = await lookupHealthInfo([highlightedText]);
      console.log('onchatgptclick result recieved');
      dispatch(setHealthInfo(result));
      dispatch(setChatGPTPressed(true));
    } catch (error) {
      console.error('Error during ChatGPT lookup:', error);
      // Optionally, dispatch an action to set an error state
    }
  }, [dispatch,  highlightedText, lookupHealthInfo, setHealthInfo, setChatGPTPressed]);



  return (
    showChatGPT && (
      <button
        className={[styles.chatgpt, className].join(" ")}
        onClick={onChatGPTClick}
      >
        <div className={styles.imagewithtext4}>
          <div className={styles.arcticonsopenaiChatgptWrapper}>
            <img
              className={styles.arcticonsopenaiChatgpt}
              loading="lazy"
              alt=""
              src="/arcticonsopenaichatgpt.svg"
            />
          </div>
          <div className={styles.chatgpt1}>ChatGPT</div>
        </div>
      </button>
    )
  );
};

ChatGPT.propTypes = {
  className: PropTypes.string,
  showChatGPT: PropTypes.bool,
};

export default ChatGPT;
