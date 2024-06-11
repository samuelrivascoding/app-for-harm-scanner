import { FunctionComponent } from "react";
import styles from "./ScannerComponent.module.css";

export type ScannerComponentType = {
  className?: string;
};

const ScannerComponent: FunctionComponent<ScannerComponentType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.scannerComponent, className].join(" ")}>
      <div className={styles.scanner}>
        <div className={styles.camera}>
          <div className={styles.cameraChild} />
        </div>
        <div className={styles.scannerControls}>
          <div className={styles.buttons}>
            <div className={styles.gallery}>
              <div className={styles.galleryPreview}>
                <img
                  className={styles.galleryPreviewIcon}
                  loading="lazy"
                  alt=""
                  src="/frame.svg"
                />
              </div>
              <div className={styles.gallery1}>Gallery</div>
            </div>
            <div className={styles.photo}>
              <img
                className={styles.imagePreviewIcon}
                loading="lazy"
                alt=""
                src="/frame-1.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScannerComponent;
