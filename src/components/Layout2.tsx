import { FunctionComponent } from "react";
import styles from "./Layout2.module.css";

export type Layout2Type = {
  className?: string;
};

const Layout2: FunctionComponent<Layout2Type> = ({ className = "" }) => {
  return (
    <section className={[styles.layout4, className].join(" ")}>
      <div className={styles.content}>
        <div className={styles.content1}>
          <div className={styles.sectionTitle}>
            <div className={styles.subheading}>How it works</div>
            <div className={styles.content2}>
              <h1 className={styles.heading}>What it detects as harmful</h1>
              <div className={styles.contentParagraph}>
                Based on the The Proposition 65 List from the California Office
                of Environmental Health Hazard Assessment, the software detects
                substances that are on that list and other substances that may
                require caution during pregnancy, such as retinoids
              </div>
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <b className={styles.subheadingOne}>Scan</b>
              <div className={styles.text}>
                Effortlessly scan text using Google Lens to identify harmful
                substances and protect your health.
              </div>
            </div>
            <div className={styles.listItem}>
              <b className={styles.subheadingOne}>Protect</b>
              <div className={styles.text}>
                Take control of your health by using our software to identify
                potential hazards. Preemptively research beauty products to use
                in your routine
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className={styles.placeholderImageIcon}
        loading="lazy"
        alt=""
        src="/placeholder-image@2x.png"
      />
    </section>
  );
};

export default Layout2;
