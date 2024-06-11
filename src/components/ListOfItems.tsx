import { FunctionComponent } from "react";
import List from "./List";
import styles from "./ListOfItems.module.css";

export type ListOfItemsType = {
  className?: string;
};

const ListOfItems: FunctionComponent<ListOfItemsType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.listOfItems, className].join(" ")}>
      <List header="List of ingredients that may be harmful" />
      <List header="Highlighted Text and if harmful to your health" />
    </section>
  );
};

export default ListOfItems;
