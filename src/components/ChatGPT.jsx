import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./ChatGPT.module.css";

const ChatGPT = ({ className = "", notPressed }) => {
  const onChatGPTClick = useCallback(() => {
    //TODO: hide initially, once gallery or takePhoto pressed, use this button to process selected text and change gpt/ ingredient text
  }, []);

  return (
    !notPressed && (
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
  notPressed: PropTypes.bool,
};

export default ChatGPT;
