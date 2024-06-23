import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./ChatGPT.module.css";
import { lookupHealthInfo } from "../../api/ChatGPTScript.js"
import { useDispatch, useSelector } from "react-redux";
import { setHealthInfo } from './reducer'; // Adjust the import path as needed

const ChatGPT = ({ className = "", noPhoto }) => {
  const dispatch = useDispatch();
  const visionResult = useSelector((state) => state.photo.visionResult);

  const onChatGPTClick = useCallback(async () => {
    try {
      const result = await lookupHealthInfo(visionResult);
      dispatch(setHealthInfo(result));
    } catch (error) {
      console.error('Error during ChatGPT lookup:', error);
      // Optionally, dispatch an action to set an error state
    }
  }, [dispatch, visionResult]);



  return (
    !noPhoto && (
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
  noPhoto: PropTypes.bool,
};

export default ChatGPT;
