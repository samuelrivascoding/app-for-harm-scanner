import PropTypes from "prop-types";
import styles from "./Layout2.module.css";

const Layout2 = ({ className = "" }) => {
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
                require caution, especially during pregnancy, like retinoids.
              </div>
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <b className={styles.subheadingOne}>Scan</b>
              <div className={styles.text}>
                Effortlessly scan text using Google Lens to identify harmful
                substances and protect your health. Text identified is compared to over 1000 items that may be associated with harm.
                <div>Click here to download full list: <a href="public\Book 1.xlsx" download="listOfSubstances.xlsx">List</a></div>
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

Layout2.propTypes = {
  className: PropTypes.string,
};

export default Layout2;
