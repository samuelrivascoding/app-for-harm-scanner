import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import styles from "./Root.module.css";

const Root = () => {
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
    <div className={styles.home}>
      <Navbar onCompanyLogoContainerClick={onCompanyLogoContainerClick} />
      <Header />
      <Layout />
      <Footer
        onCompanyLogoContainerClick={onCompanyLogoContainer2Click}
        onGetStartedTextClick={onGetStartedTextClick}
        onLearnMoreTextClick={onLearnMoreTextClick}
      />
    </div>
  );
};

export default Root;
