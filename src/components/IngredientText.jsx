import PropTypes from "prop-types";
import styles from "./IngredientText.module.css";

const IngredientText = ({ className = "", matchedRows }) => {

  if (matchedRows.length === 0) {
    return (
      <div className={[styles.ingredienttext, className].join(" ")}>
        No harmful substances detected
      </div>
    );
  }
  
  return (
    <div className={[styles.ingredienttext, className].join(" ")}>
      {matchedRows.map((row, index) => (
        <div key={index} className={styles.item}>
          <div>{row.column1}</div>
          <div>{row.column2}</div>
        </div>
      ))}
    </div>
  );
};

IngredientText.propTypes = {
  className: PropTypes.string,
  matchedRows: PropTypes.arrayOf(
    PropTypes.shape({
      column1: PropTypes.string,
      column2: PropTypes.string,
    })
  ).isRequired,
};

export default IngredientText;
