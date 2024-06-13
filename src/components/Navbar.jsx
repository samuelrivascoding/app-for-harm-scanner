import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

const Navbar = ({
  className = "",
  onCompanyLogoContainerClick,
  harmScannerDisplay,
  harmScannerMinWidth,
}) => {
  const harmScannerStyle = useMemo(() => {
    return {
      display: harmScannerDisplay,
      minWidth: harmScannerMinWidth,
    };
  }, [harmScannerDisplay, harmScannerMinWidth]);

  return (
    <header className={[styles.navbar8, className].join(" ")}>
      <div className={styles.companyLogo} onClick={onCompanyLogoContainerClick}>
        <div className={styles.harmScanner} style={harmScannerStyle}>
          Harm Scanner
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,

  /** Style props */
  harmScannerDisplay: PropTypes.any,
  harmScannerMinWidth: PropTypes.any,

  /** Action props */
  onCompanyLogoContainerClick: PropTypes.func,
};

export default Navbar;
