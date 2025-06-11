import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState} from './type';

const initialState: AppState = {
  isLoggedIn: false,
  isActive: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
  },
});

export const {setIsLoggedIn, setIsActive} = appSlice.actions;

export default appSlice.reducer;
