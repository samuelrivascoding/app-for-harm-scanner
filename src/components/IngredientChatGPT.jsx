import PropTypes from "prop-types";
import styles from "./IngredientChatGPT.module.css";

const IngredientChatGPT = ({ className = "" }) => {
  return (
    <div className={[styles.ingredienttext, className].join(" ")}>
      <div className={styles.item}>Lorem ipsum dolor sit amet</div>
    </div>
  );
};

IngredientChatGPT.propTypes = {
  className: PropTypes.string,
};

export default IngredientChatGPT;
