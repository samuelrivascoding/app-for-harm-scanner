const initialState = {
  croppedPhoto: null,
  visionResult: null,
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CROPPED_PHOTO':
      return {
        ...state,
        croppedPhoto: action.payload,
      };
    case 'SET_VISION_RESULT':
      return {
        ...state,
        visionResult: action.payload,
      };
    default:
      return state;
  }
};

export default photoReducer;
