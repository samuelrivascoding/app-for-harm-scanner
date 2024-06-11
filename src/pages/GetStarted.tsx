import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScannerComponent from "../components/ScannerComponent";
import ListOfItems from "../components/ListOfItems";
import Footer from "../components/Footer";
import styles from "./GetStarted.module.css";

const GetStarted: FunctionComponentGetStartedType = () => {
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
    <div className={styles.getStarted}>
      <Navbar onCompanyLogoContainerClick={onCompanyLogoContainerClick} />
      <ScannerComponent />
      <ListOfItems />
      <Footer
        onCompanyLogoContainerClick={onCompanyLogoContainer2Click}
        onGetStartedTextClick={onGetStartedTextClick}
        onLearnMoreTextClick={onLearnMoreTextClick}
      />
    </div>
  );
};

export default GetStarted;
