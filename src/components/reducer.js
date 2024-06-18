const initialState = {
  croppedPhoto: null,
  visionResult: 'tobacco',
  column2: [],
  keywords: [],
  matchedRows: [],

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
    case 'SET_MATCHED_ROWS':
    return { ...state, matchedRows: action.payload };
    default:
      return state;
  }
};

export default photoReducer;
