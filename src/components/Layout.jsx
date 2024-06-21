import PropTypes from "prop-types";
import styles from "./Layout.module.css";

const Layout = ({ className = "" }) => {
  return (
    <section className={[styles.layout219, className].join(" ")}>
      <img
        className={styles.imageIcon}
        loading="lazy"
        alt=""
        src="/image@2x.png"
      />
      <div className={styles.tabsMenu}>
        <div className={styles.tabHorizontal}>
          <h1 className={styles.heading}>Using the Software</h1>
          <div className={styles.text}>
            Open the Google Lens app. Point your camera at the text you want to
            scan. Tap the scan button to analyze the text. Simple as that!
          </div>
        </div>
        <div className={styles.tabHorizontal1}>
          <h1 className={styles.heading}>Analyzing the Results</h1>
          <div className={styles.text}>
            Once the text is scanned, the software will provide you with
            information of any substances that are potentially harmful. You can
            then take appropriate actions based on the results.
          </div>
        </div>
        <div className={styles.tabHorizontal2}>
          <b className={styles.heading2}>Taking Action</b>
          <div className={styles.text}>
            If the software detects any harmful substances or risks, it is
            important to take necessary precautions or seek professional advice.
            Consult your doctor or take caution about whether to use your
            product.
          </div>
        </div>
      </div>
    </section>
  );
};

Layout.propTypes = {
  className: PropTypes.string,
};

export default Layout;
