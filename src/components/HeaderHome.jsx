import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./HeaderHome.module.css";

const Header = ({ className = "" }) => {
  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate("/get-started");
  }, [navigate]);

  const onButton1Click = useCallback(() => {
    navigate("/about-us");
  }, [navigate]);

  return (
    <section className={[styles.header5, className].join(" ")}>
      <div className={styles.column}>
        <div className={styles.content}>
          <h1 className={styles.mediumLengthHero}>
            Empowering you to detect harmful substances.
          </h1>
          <div className={styles.loremIpsumDolor}>
            Our online software, powered by Google Lens and ChatGPT, scans text to identify
            substances associated with carcinogens and birth defects, keeping
            you and your loved ones safe.
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.button} onClick={onButtonClick}>
            <div className={styles.button1}>Get Started</div>
          </button>
          <button className={styles.button2} onClick={onButton1Click}>
            <div className={styles.button1}>Learn More</div>
          </button>
        </div>
      </div>
    </section>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
