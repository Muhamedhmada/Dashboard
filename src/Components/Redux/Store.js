import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './LanguageSlice'
import tokenReducer from './TokenSlice'

const store = configureStore({
  reducer: {
    language: languageReducer, // Add your language slice here
    token: tokenReducer,
  },
});

export default store;