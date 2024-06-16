import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScannerComponent from "../components/ScannerComponent";
import ListOfItems from "../components/ListOfItems";
import Footer from "../components/Footer";
import styles from "./GetStarted.module.css";
import TextComponent from "../components/TextComponent.jsx";
import store from '../components/store.js';
import { Provider } from "react-redux";


const GetStarted = () => {
  const navigate = useNavigate();
  const [notPressed, setNotPressed] = useState(true);
  const [noPhoto, setNoPhoto] = useState(true);
  const [visionResult, setVisionResult] = useState(null);

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
        <Provider store={store}>
      <Navbar onCompanyLogoContainerClick={onCompanyLogoContainerClick} />
      <ScannerComponent notPressed={notPressed} noPhoto={noPhoto} updatePressed={setNotPressed} updatePhoto={setNoPhoto} visionResult={visionResult}  />
      <TextComponent showTextComponent={notPressed} visionResult={visionResult}  />
      <ListOfItems showListOfItems={notPressed} visionResult={visionResult}  />
      <Footer
        onCompanyLogoContainerClick={onCompanyLogoContainer2Click}
        onGetStartedTextClick={onGetStartedTextClick}
        onLearnMoreTextClick={onLearnMoreTextClick}
      />
        </Provider>
    </div>
  );
};

export default GetStarted;
