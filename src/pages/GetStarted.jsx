import { useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScannerComponent from "../components/ScannerComponent";
import ListOfItems from "../components/ListOfItems";
import Footer from "../components/Footer";
import styles from "./GetStarted.module.css";
import TextComponent from "../components/TextComponent.jsx";

const GetStarted = () => {
  const navigate = useNavigate();
  const [notPressed, setNotPressed] = useState(true);

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
      <Navbar
        onCompanyLogoContainerClick={onCompanyLogoContainerClick}
      />
      <ScannerComponent notPressed={notPressed} updatePressed={setNotPressed}/>
      <TextComponent showTextComponent={notPressed} updatePressed={setNotPressed}/>
      <ListOfItems showListOfItems={notPressed} updatePressed={setNotPressed}/>
      <Footer
        onCompanyLogoContainerClick={onCompanyLogoContainer2Click}
        onGetStartedTextClick={onGetStartedTextClick}
        onLearnMoreTextClick={onLearnMoreTextClick}
      />
    </div>
  );
};

export default GetStarted;
