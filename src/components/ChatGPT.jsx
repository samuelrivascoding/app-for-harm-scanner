import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./ChatGPT.module.css";
import { lookupHealthInfo } from "../../server/api/ChatGPTScript.js"
import { useDispatch, useSelector } from "react-redux";
import { setHealthInfo, setChatGPTPressed,  } from './reducer'; // Adjust the import path as needed




const ChatGPT = ({ className = "", showChatGPT }) => {
  const dispatch = useDispatch();
  const textToCompare = useSelector((state) => state.photo.highlightedText);


  const onChatGPTClick = useCallback(async () => {
    if (textToCompare && textToCompare.length > 0) {
      try {
        const textToCompareList = Array.isArray(textToCompare) ? textToCompare.map(keyword => keyword.trim()) // Handle string case
          : textToCompare.split(",").map(keyword => keyword.trim()); // Split if string
          if (Array.isArray(textToCompareList)){
            console.log("its an array")
            console.log(textToCompareList)
          }
          if (textToCompareList.length < 4) {
          const result = await lookupHealthInfo(textToCompareList);
          console.log('onchatgptclick result recieved');
          dispatch(setHealthInfo(result));
        } else {
          dispatch(setHealthInfo([]));
          console.log('onchatgptclick result failed');
        }
        dispatch(setChatGPTPressed(true)); // Set pressed state once after processing
      } catch (error) {
        dispatch(setHealthInfo([]));
        console.error('Error during ChatGPT lookup:', error);
        // Optionally, dispatch an action to set an error state
      }
    }
  }, [dispatch, lookupHealthInfo, setHealthInfo, setChatGPTPressed, textToCompare ]);



  return (
    showChatGPT ? (
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
    ): 
    null
  );
};

ChatGPT.propTypes = {
  className: PropTypes.string,
  showChatGPT: PropTypes.bool,
};

export default ChatGPT;
