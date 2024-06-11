import { FunctionComponent } from "react";
import styles from "./Layout1.module.css";

export type Layout1Type = {
  className?: string;
};

const Layout1: FunctionComponent<Layout1Type> = ({ className = "" }) => {
  return (
    <section className={[styles.layout213, className].join(" ")}>
      <img
        className={styles.placeholderImageIcon}
        loading="lazy"
        alt=""
        src="/placeholder-image-1@2x.png"
      />
      <div className={styles.content}>
        <div className={styles.sectionTitle}>
          <img
            className={styles.iconRelume}
            loading="lazy"
            alt=""
            src="/icon--relume.svg"
          />
          <div className={styles.sectionTitle}>
            <h1 className={styles.heading}>What to do afterwards</h1>
            <div className={styles.text}>
              If you do identify a product that may be harmful for your health,
              consult your doctor if you do decide to use that product, or take
              the initiative to research whether or not that substance may be
              harmful for you
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout1;
