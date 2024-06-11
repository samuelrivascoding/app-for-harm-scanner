import { FunctionComponent } from "react";
import styles from "./Layout.module.css";

export type LayoutType = {
  className?: string;
};

const Layout: FunctionComponent<LayoutType> = ({ className = "" }) => {
  return (
    <div className={[styles.layout219, className].join(" ")}>
      <img className={styles.imageIcon} alt="" src="/image@2x.png" />
      <div className={styles.tabsMenu}>
        <div className={styles.tabHorizontal}>
          <b className={styles.heading}>Using the Software</b>
          <div className={styles.text}>
            Open the Google Lens app. Point your camera at the text you want to
            scan. Tap the scan button to analyze the text. Simple as that!
          </div>
        </div>
        <div className={styles.tabHorizontal1}>
          <b className={styles.heading}>Analyzing the Results</b>
          <div className={styles.text}>
            Once the text is scanned, the software will provide you with
            information of any substances that are potentially harmful. You can
            then take appropriate actions based on the results.
          </div>
        </div>
        <div className={styles.tabHorizontal1}>
          <b className={styles.heading}>Taking Action</b>
          <div className={styles.text}>
            If the software detects any harmful substances or risks, it is
            important to take necessary precautions or seek professional advice.
            Consult your doctor or take caution about whether to use your
            product.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
