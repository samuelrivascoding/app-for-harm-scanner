import TextIdentified from "./TextIdentified";
import PropTypes from "prop-types";
import styles from "./TextComponent.module.css";

const TextComponent = ({ className = "", showTextComponent  }) => {
  return (
    !showTextComponent && (
      <div className={[styles.textComponent, className].join(" ")}>
        <b className={styles.header}>{`Highlight text for each entry to compare with data. Edit if text was inaccurate:`}</b>
        <TextIdentified/>
      </div>
    )
  );
};

TextComponent.propTypes = {
  className: PropTypes.string,
  showTextComponent: PropTypes.bool,
  
};

export default TextComponent;
