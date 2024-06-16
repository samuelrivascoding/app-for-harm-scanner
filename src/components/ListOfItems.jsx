import IngredientText from "./IngredientText";
import IngredientChatGPT from "./IngredientChatGPT";
import PropTypes from "prop-types";
import styles from "./ListOfItems.module.css";

const ListOfItems = ({ className = "", showListOfItems }) => {
  return (
    showListOfItems && (
      <div className={[styles.listOfItems, className].join(" ")}>
        <div className={styles.list}>
          <div className={styles.listheader}>
            <b className={styles.header}>
              List of ingredients that may be harmful
            </b>
          </div>
          <div className={styles.listlistofitems}>
            <IngredientText />
          </div>
        </div>
        <div className={styles.list1}>
          <div className={styles.listheader1}>
            <b className={styles.header1}>
              Highlighted Text and if harmful to your health
            </b>
          </div>
          <div className={styles.listlistofitems1}>
            <IngredientChatGPT />
          </div>
        </div>
      </div>
    )
  );
};

ListOfItems.propTypes = {
  className: PropTypes.string,
  showListOfItems: PropTypes.bool,
};

export default ListOfItems;
