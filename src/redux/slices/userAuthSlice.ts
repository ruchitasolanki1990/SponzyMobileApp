import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatar_image?: string;
  cover_image?: string;
  status?: string;
  profession?: string;
  language?: string;
  birthday?: string;
  gender?: string;
  website?: string;
  category?: string;
  story?: string;
  bio?: string;
  location?: string;
  phone?: string;
  company?: string;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  facebookLink?: string;
  twitterLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
  pinterestLink?: string;
  githubLink?: string;
  snapchatLink?: string;
  telegramLink?: string;
  twitchLink?: string;
  discordLink?: string;
  vkLink?: string;
  redditLink?: string;
  spotifyLink?: string;
  threadsLink?: string;
  kickLink?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    signupSuccess(state, action: PayloadAction<{ token: string; user: User }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    clearAllData(state) {
      // Reset to initial state
      Object.assign(state, initialState);
    },
    setProfile(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, signupSuccess, logout, clearAllData, setProfile } = userAuthSlice.actions;
export default userAuthSlice.reducer; 