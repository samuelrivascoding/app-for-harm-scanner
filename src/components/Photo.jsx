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
import { setCroppedPhoto } from './reducer.js'; // Adjust the import path as needed
import { Button, IconButton } from '@mui/material'; // Import Button and IconButton
import { NumericFormat } from 'react-number-format';





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

export default function App({photoURL, updateSetImageButtonPressed, updatePressed, updatePressedTwice}) {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState(photoURL || defaultPhotoUrl);
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale1] = useState(1.0);
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

    updateSetImageButtonPressed(true);
    updatePressedTwice(false)
    updatePressed(true)

    if (scale === 0) {
      console.log("Scale is 0, photo not dispatched.");
      return;
    }
    
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    // This will size relative to the uploaded image size.
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const canvas = document.createElement('canvas');
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(async (blob) => {
      if (!blob) {
        throw new Error('Failed to create blob');
      }

      // Convert blob to base64
      const tempUrl = await toBase64(blob);

      dispatch(setCroppedPhoto(tempUrl));
      console.log("Set cropped photo success:", tempUrl );
    }, 'image/png');
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
          <NumericFormat
            id="scale-input"
            value={scale}
            onValueChange={(values) => {
              const { floatValue } = values;
              setScale1(floatValue || 1); // Default to 1 if input is cleared
            }}
            decimalScale={1}
            fixedDecimalScale
            allowNegative={false}
            isAllowed={(values) => {
              const { floatValue } = values;
              return floatValue === undefined || (floatValue >= 0.1 && floatValue <= 3);
            }}
            disabled={!imgSrc}
            placeholder="Enter scale (e.g., 1.5)"
            style={{ width: '100px' }}
          />
        </div>
        <div>
          <label htmlFor="rotate-input" style={{color: 'white'}}>Rotate: </label>
          <NumericFormat
            id="rotate-input"
            value={rotate}
            onValueChange={(values) => {
              const { floatValue } = values;
              setRotate(floatValue || 0);
            }}
            decimalScale={0}
            allowNegative={true}
            isAllowed={(values) => {
              const { floatValue } = values;
              return floatValue === undefined || (floatValue >= -180 && floatValue <= 180);
            }}
            disabled={!imgSrc}
            placeholder="Enter rotation (-180 to 180)"
            style={{ width: '100px' }}
          />
        </div>
        <div>
          <Button onClick={handleToggleAspectClick} variant="contained" color="primary">
            Toggle aspect {aspect ? 'off' : 'on'}
          </Button>
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
            <Button  variant="contained" color="primary" onClick={onSetImageClick}>Set Image to be scanned</Button>
          </div>
        </>
      )}
    </div>
    
  );
}
