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
  const [pressedTwice, setPressedTwice] = useState(false);
  const [noPhotoUploaded, setNoPhoto] = useState(true);

  const onCompanyLogoContainerClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onCompanyLogoContainer2Click = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onGetStartedTextClick = useCallback(() => {
    navigate("/get-started");
  }, [navigate]);

  const onLearnMoreTextClick = useCallback(() => {
    navigate("/about-us");
  }, [navigate]);

  return (
    <div className={styles.getStarted}>
        <Provider store={store}>
      <Navbar onCompanyLogoContainerClick={onCompanyLogoContainerClick} />
      <ScannerComponent notPressed={notPressed} pressedTwice={pressedTwice} noPhotoUploaded={noPhotoUploaded} updatePressed={setNotPressed} updatePressedTwice={setPressedTwice} updatePhoto={setNoPhoto}  />
      <TextComponent showTextComponent={notPressed} />
      <ListOfItems showListOfItems={pressedTwice} />
      <Footer
        onCompanyLogoContainerClick={onCompanyLogoContainer2Click}
        onGetStartedTextClick={onGetStartedTextClick}
        onLearnMoreTextClick={onLearnMoreTextClick}
      />
      {pressedTwice && <AssistantModal />} {/* Render AssistantModal conditionally */}

        </Provider>
    </div>
  );
};

export default GetStarted;
