import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    preferences: {
      notifications: true,
      emailUpdates: true,
      theme: 'dark',
    },
    stats: {
      propertiesViewed: 0,
      savedProperties: 0,
      inquiriesMade: 0,
    },
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    resetUser: (state) => {
      state.profile = null;
      state.preferences = {
        notifications: true,
        emailUpdates: true,
        theme: 'dark',
      };
      state.stats = {
        propertiesViewed: 0,
        savedProperties: 0,
        inquiriesMade: 0,
      };
    },
  },
});

export const {
  setProfile,
  updatePreferences,
  updateStats,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;