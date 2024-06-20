import PropTypes from "prop-types";
import styles from "./IngredientText.module.css";
import { useSelector } from 'react-redux';
import useExcelProcessing from './useExcelProcessing'; // Adjust the import path as needed

const IngredientText = ({ className = ""}) => {
  const textToCompare = useSelector((state) => {
    return state.photo.visionResult.extractedText;
  });
  const { matchedRows } = useExcelProcessing(textToCompare);
  
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

/*
  const isProcessingComplete = useSelector((state) => state.photo.isProcessingComplete);
  const [text, setText] = useState("");
  const { matchedRows } = useExcelProcessing(text); // Using the custom hook

  useEffect(() => {
    if (isProcessingComplete) {
      const textToCompare = useSelector((state) => state.photo.visionResult.extractedText);
      setText(textToCompare);
    }
  }, [isProcessingComplete]);

  */