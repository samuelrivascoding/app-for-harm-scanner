import { FunctionComponent } from "react";
import styles from "./Footer.module.css";

export type FooterType = {
  className?: string;

  /** Action props */
  onCompanyLogoContainerClick?: () => void;
  onGetStartedTextClick?: () => void;
  onLearnMoreTextClick?: () => void;
};

const Footer: FunctionComponent<FooterType> = ({
  className = "",
  onCompanyLogoContainerClick,
  onGetStartedTextClick,
  onLearnMoreTextClick,
}) => {
  return (
    <div className={[styles.footer4, className].join(" ")}>
      <div className={styles.content3}>
        <div className={styles.logo}>
          <div
            className={styles.companylogo}
            onClick={onCompanyLogoContainerClick}
          >
            <div className={styles.harmscanner}>Harm Scanner</div>
          </div>
        </div>
        <div className={styles.links}>
          <div className={styles.getStarted} onClick={onGetStartedTextClick}>
            Get Started
          </div>
          <div className={styles.getStarted} onClick={onLearnMoreTextClick}>
            Learn More
          </div>
        </div>
      </div>
      <div className={styles.credits}>
        <div className={styles.divider} />
      </div>
    </div>
  );
};

export default Footer;
