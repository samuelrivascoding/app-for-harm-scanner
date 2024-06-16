import PropTypes from "prop-types";
import styles from "./IngredientText.module.css";

const IngredientText = ({ className = "" }) => {
  return (
    <div className={[styles.ingredienttext, className].join(" ")}>
      <div className={styles.item}>Lorem ipsum dolor sit amet</div>
    </div>
  );
};

IngredientText.propTypes = {
  className: PropTypes.string,
};

export default IngredientText;
