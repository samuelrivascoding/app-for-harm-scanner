import PropTypes from "prop-types";
import styles from "./IngredientText.module.css";
import { useSelector  } from 'react-redux';


const IngredientText = ({ className = ""}) => {
  const matchedRows = useSelector((state) => state.photo.matchedRows);

  
  return (
    <div className={[styles.ingredienttext, className].join(" ")}>
      <div>
      {matchedRows.length > 0 ? (
        <ul>
          {matchedRows.map((row, index) => (
            <li key={index}>
              <strong>Keywords:</strong> {row.keywords.join(', ')}<br />
              <strong>Data:</strong> {row.data}
            </li>
          ))}
        </ul>
      ) : (
        <p>No matched rows found.</p>
      )}
    </div>
    </div>
  );
 

};

IngredientText.propTypes = {
  className: PropTypes.string,
};

export default IngredientText;
