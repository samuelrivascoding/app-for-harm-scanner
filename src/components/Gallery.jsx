import {useRef, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Gallery.module.css";

const Gallery = ({ className = '', onPhotoUpload, showGallery }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback( (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoUpload(reader.result); // Pass base64-encoded URL to parent
      };
      reader.readAsDataURL(file);
    }
  
  }, [onPhotoUpload]);


  return (
    showGallery && (
      <div className={[styles.gallery, className].join(" ")}>
        <label className={styles.label}>
          <div className={styles.imagewithtext}>
            <div className={styles.optionIcon}>
              <img
                className={styles.galleryPreviewIcon}
                loading="lazy"
                alt="Upload Photo"
                src="/frame.svg"
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              id="file-upload"
              className={styles.input}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            <div className={styles.gallery1}>Gallery</div>
          </div>
        </label>
      </div>
    )
  );
};

Gallery.propTypes = {
  className: PropTypes.string,
  showGallery: PropTypes.bool,
  onPhotoUpload: PropTypes.func.isRequired,
};

export default Gallery;
