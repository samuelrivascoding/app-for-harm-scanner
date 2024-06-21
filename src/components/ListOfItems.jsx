import IngredientChatGPT from "./IngredientChatGPT";
import IngredientText from "./IngredientText";
import PropTypes from "prop-types";
import styles from "./ListOfItems.module.css";

const ListOfItems = ({ className = "", showListOfItems }) => {
  return (
    !showListOfItems && (
      <section className={[styles.listOfItems, className].join(" ")}>
        <div className={styles.list}>
          <div className={styles.listheader}>
            <h3 className={styles.header}>
              List of ingredients that may be harmful
            </h3>
          </div>
          <div className={styles.listlistofitems}>
            <IngredientText />
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.listheader}>
            <h3 className={styles.header}>
              Highlighted Text and if harmful to your health
            </h3>
          </div>
          <div className={styles.listlistofitems}>
            <IngredientChatGPT />
          </div>
        </div>
      </section>
    )
  );
};

ListOfItems.propTypes = {
  className: PropTypes.string,
  showListOfItems: PropTypes.bool,
};

export default ListOfItems;
