import { FunctionComponent } from "react";
import styles from "./List.module.css";

export type ListType = {
  className?: string;
  header?: string;
};

const List: FunctionComponent<ListType> = ({ className = "", header }) => {
  return (
    <div className={[styles.list, className].join(" ")}>
      <div className={styles.listheader}>
        <h3 className={styles.header}>{header}</h3>
      </div>
      <div className={styles.listlistofitems}>
        <div className={styles.ingredienttext}>
          <input
            className={styles.item}
            placeholder="Lorem ipsum dolor sit amet"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default List;
