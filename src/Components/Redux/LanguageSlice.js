import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'languages',
  initialState: 'en', // Default language
  reducers: {
    changeLanguage: (state, action) => action.payload, // Update the state with the new language
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
