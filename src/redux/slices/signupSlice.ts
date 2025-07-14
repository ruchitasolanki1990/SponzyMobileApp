import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

interface SignupState {
  loading: boolean;
  success: boolean;
  error: string | null;
  userData: SignupData | null;
}

const initialState: SignupState = {
  loading: false,
  success: false,
  error: null,
  userData: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupStart(state, action: PayloadAction<SignupData>) {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.userData = action.payload;
    },
    signupSuccess(state, action: PayloadAction<{ token: string; user: any }>) {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    resetSignupState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.userData = null;
    },
    clearAllData(state) {
      // Reset to initial state
      Object.assign(state, initialState);
    },
  },
});

export const { signupStart, signupSuccess, signupFailure, resetSignupState, clearAllData } = signupSlice.actions;
export default signupSlice.reducer; 