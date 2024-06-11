import { FunctionComponent } from "react";
import styles from "./Navbar.module.css";

export type NavbarType = {
  className?: string;

  /** Action props */
  onCompanyLogoContainerClick?: () => void;
};

const Navbar: FunctionComponent<NavbarType> = ({
  className = "",
  onCompanyLogoContainerClick,
}) => {
  return (
    <div className={[styles.navbar8, className].join(" ")}>
      <div className={styles.companyLogo} onClick={onCompanyLogoContainerClick}>
        <div className={styles.harmScanner}>Harm Scanner</div>
      </div>
    </div>
  );
};

export default Navbar;
