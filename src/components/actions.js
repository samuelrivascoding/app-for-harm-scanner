export const setCroppedPhoto = (base64String) => ({
  type: 'SET_CROPPED_PHOTO',
  payload: base64String,
});

export const setVisionResult = (result) => ({
  type: 'SET_VISION_RESULT',
  payload: result,
});

export const setMatchedRows = (matchedRows) => ({
  type: 'SET_MATCHED_ROWS',
  payload: matchedRows,
});
export const setHealthInfo = (info) => ({
  type: 'SET_HEALTH_INFO',
  payload: info,
});
