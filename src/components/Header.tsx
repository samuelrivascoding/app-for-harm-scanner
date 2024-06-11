import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export type HeaderType = {
  className?: string;
};

const Header: FunctionComponent<HeaderType> = ({ className = "" }) => {
  const navigate = useNavigate();

  const onButtonContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onButtonContainer1Click = useCallback(() => {
    navigate("/about-us");
  }, [navigate]);

  return (
    <div className={[styles.header5, className].join(" ")}>
      <div className={styles.column}>
        <div className={styles.content}>
          <b className={styles.mediumLengthHero}>
            Empowering you to detect harmful substances.
          </b>
          <div className={styles.loremIpsumDolor}>
            Our online software, powered by Google Lens, scans text to identify
            substances associated with carcinogens and birth defects, keeping
            you and your loved ones safe.
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.button} onClick={onButtonContainerClick}>
            <div className={styles.button1}>Get Started</div>
          </div>
          <div className={styles.button2} onClick={onButtonContainer1Click}>
            <div className={styles.button1}>Learn More</div>
          </div>
        </div>
      </div>
      <img
        className={styles.frameSquare800x800Icon}
        alt=""
        src="/framesquare800x800@2x.png"
      />
    </div>
  );
};

export default Header;
