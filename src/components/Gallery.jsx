import {useRef, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Gallery.module.css";

const Gallery = ({ className = '', noPhoto, onPhotoUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback(async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoUpload(reader.result); // Pass base64-encoded URL to parent
      };
      reader.readAsDataURL(file);
    }
    /*if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/photoupload.js', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          onPhotoUpload(data.imageUrl); // Assuming server returns processed image URL
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error
      }
    }*/
  }, [onPhotoUpload]);

  const handleLabelClick = () => {
    event.preventDefault(); // Prevent default label behavior
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    noPhoto && (
      <div className={[styles.gallery, className].join(" ")}>
        <label className={styles.label} onClick={handleLabelClick}>
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
  noPhoto: PropTypes.bool.isRequired,
  onPhotoUpload: PropTypes.func.isRequired,
};

export default Gallery;
