import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Gallery.module.css";

const Gallery = ({ className = '', notPressed, onPhotoUpload }) => {
  const onGalleryClick = useCallback((event) => {
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
    notPressed && (
      <input
        className={[styles.gallery, className].join(" ")}
        type="file"
        onClick={onGalleryClick}
      />
    )
  );
};

Gallery.propTypes = {
  className: PropTypes.string,
  notPressed: PropTypes.bool,
  onPhotoUpload: PropTypes.func.isRequired,
};

export default Gallery;
