import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Layout2 from "../components/Layout2";
import Layout1 from "../components/Layout1";
import Footer from "../components/Footer";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  const navigate = useNavigate();

  const onCompanyLogoContainerClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onCompanyLogoContainer2Click = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onGetStartedTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onLearnMoreTextClick = useCallback(() => {
    navigate("/about-us");
  }, [navigate]);

  return (
    <div className={styles.aboutUs}>
      <Navbar
        onCompanyLogoContainerClick={onCompanyLogoContainerClick}
      />
      <Layout2 />
      <Layout1 />
      <Footer
        onCompanyLogoContainerClick={onCompanyLogoContainer2Click}
        onGetStartedTextClick={onGetStartedTextClick}
        onLearnMoreTextClick={onLearnMoreTextClick}
      />
    </div>
  );
};

export default AboutUs;
