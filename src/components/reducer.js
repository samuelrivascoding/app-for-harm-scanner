

/*const initialState = {
  croppedPhoto: null,
  visionResult: 'tobacco',
  column2: [],
  keywords: [],
  matchedRows: [],
  healthInfo: '',

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
    case 'SET_HEALTH_INFO':
            return {
                ...state,
                healthInfo: action.payload,
            };
    default:
      return state;
    
  }
};

export default photoReducer;
*/
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  croppedPhoto:   'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'  ,
  visionResult: "tobacco",
  column2: [],
  keywords: [],
  matchedRows: [],
  healthInfo: '',
  isProcessingComplete: false

};

const photoSlice = createSlice({

  name: "photo",
  initialState, 


  reducers: {
    setCroppedPhoto: (state, action) => {
      state.croppedPhoto = action.payload;
    },
    setVisionResult: (state, action) => {
      state.visionResult = action.payload;
    },
    setMatchedRows: (state, action) => {
      state.matchedRows = action.payload;
    },
    setHealthInfo: (state, action) => {
      state.healthInfo = action.payload;
    },
    setProcessingComplete(state, action) {
      state.isProcessingComplete = action.payload;
    },
  },
});

// Export actions generated from createSlice
export const {
  setCroppedPhoto,
  setVisionResult,
  setMatchedRows,
  setHealthInfo,
  setProcessingComplete ,
} = photoSlice.actions;

// Export the reducer function generated by createSlice
export default photoSlice.reducer;