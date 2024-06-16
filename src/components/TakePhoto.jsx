import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./TakePhoto.module.css";

const TakePhoto = ({ className = "", noPhoto, onPhotoCapture  }) => {
  const capturePhoto = useCallback(() => {
    //TODO: capture photo, then once photo is uploaded and processed, hide and switch to new buttons
    const canvas = document.createElement('canvas');
    const video = document.querySelector('video');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoURL = canvas.toDataURL('image/jpeg');
    onPhotoCapture(photoURL); // Pass captured photo URL to parent component

  }, [onPhotoCapture]);

  return (
    noPhoto && (
      <button
        className={[styles.takephoto, className].join(" ")}
        onClick={capturePhoto}
      >
        <img
          className={styles.photoIcon}
          loading="lazy"
          alt=""
          src="/frame-1.svg"
        />
      </button>
    )
  );
};

TakePhoto.propTypes = {
  className: PropTypes.string,
  noPhoto: PropTypes.bool,
  onPhotoCapture: PropTypes.func.isRequired,
};

export default TakePhoto;
