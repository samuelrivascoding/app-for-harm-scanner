import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar1.module.css";

export type Navbar1Type = {
  className?: string;
};

const Navbar1: FunctionComponent<Navbar1Type> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onCompanyLogoContainerClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <header className={[styles.navbar8, className].join(" ")}>
      <div className={styles.content}>
        <div
          className={styles.companyLogo}
          onClick={onCompanyLogoContainerClick}
        >
          <div className={styles.harmScanner}>Harm Scanner</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar1;
