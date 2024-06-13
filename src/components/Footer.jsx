import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Footer.module.css";

const Footer = ({
  className = "",
  onCompanyLogoContainerClick,
  harmScannerDisplay,
  harmScannerMinWidth,
  onGetStartedTextClick,
  getStartedDisplay,
  getStartedMinWidth,
  onLearnMoreTextClick,
  learnMoreDisplay,
  learnMoreMinWidth,
}) => {
  const harmScanner1Style = useMemo(() => {
    return {
      display: harmScannerDisplay,
      minWidth: harmScannerMinWidth,
    };
  }, [harmScannerDisplay, harmScannerMinWidth]);

  const getStartedStyle = useMemo(() => {
    return {
      display: getStartedDisplay,
      minWidth: getStartedMinWidth,
    };
  }, [getStartedDisplay, getStartedMinWidth]);

  const learnMoreStyle = useMemo(() => {
    return {
      display: learnMoreDisplay,
      minWidth: learnMoreMinWidth,
    };
  }, [learnMoreDisplay, learnMoreMinWidth]);

  return (
    <footer className={[styles.footer4, className].join(" ")}>
      <div className={styles.content3}>
        <div className={styles.logo}>
          <div
            className={styles.companylogo}
            onClick={onCompanyLogoContainerClick}
          >
            <div className={styles.harmscanner} style={harmScanner1Style}>
              Harm Scanner
            </div>
          </div>
        </div>
        <div className={styles.links}>
          <b
            className={styles.getStarted}
            onClick={onGetStartedTextClick}
            style={getStartedStyle}
          >
            Get Started
          </b>
          <b
            className={styles.getStarted}
            onClick={onLearnMoreTextClick}
            style={learnMoreStyle}
          >
            Learn More
          </b>
        </div>
      </div>
      <div className={styles.credits}>
        <div className={styles.divider} />
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,

  /** Style props */
  harmScannerDisplay: PropTypes.any,
  harmScannerMinWidth: PropTypes.any,
  getStartedDisplay: PropTypes.any,
  getStartedMinWidth: PropTypes.any,
  learnMoreDisplay: PropTypes.any,
  learnMoreMinWidth: PropTypes.any,

  /** Action props */
  onCompanyLogoContainerClick: PropTypes.func,
  onGetStartedTextClick: PropTypes.func,
  onLearnMoreTextClick: PropTypes.func,
};

export default Footer;
