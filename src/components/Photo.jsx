import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from 'react-image-crop';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import styles from './Photo.module.css';


import 'react-image-crop/dist/ReactCrop.css';

// Default photo URL
const defaultPhotoUrl =
  'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';

// This is to demonstrate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function App({photoURL}) {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState(photoURL || defaultPhotoUrl);
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);

  const toBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  useEffect(() => {
    // Initialize crop when image loads
    if (aspect && imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }, [photoURL, aspect]);

  async function onSetImageClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    // This will size relative to the uploaded image size.
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    });

    const base64String = await toBase64(blob);

    // Dispatch an action with the base64 string (adjust the action type and payload as necessary)
    dispatch({ type: 'SET_CROPPED_PHOTO', payload: base64String });
    console.log("set cropped photo success");
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  return (
    <div className={styles.App}>
      <div className={styles.CropControls}>
        <div>
          <label htmlFor="scale-input" style={{color: 'white'}}>Scale: </label>
          <input
            id="scale-input"
            type="number"
            value={Number.isInteger(scale) ? scale : scale.toFixed(1)} // Format to 1 decimal place if not an integer
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input" style={{color: 'white'}}>Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(
                Math.min(180, Math.max(-180, Number(e.target.value)))
              )
            }
          />
        </div>
        <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button>
        </div>
      </div>
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={(c) => setCompletedCrop(c)}
        aspect={aspect}
      >
        <img
          ref={imgRef}
          alt="Crop me"
          src={imgSrc}
          style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
        />
      </ReactCrop>
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              className={styles.previewCanvas}
            />
          </div>
          <div>
            <button onClick={onSetImageClick}>Set Image to be scanned</button>
          </div>
        </>
      )}
    </div>
  );
}
