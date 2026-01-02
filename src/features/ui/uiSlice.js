import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    notifications: [],
    modal: null,
    sidebarOpen: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'info',
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    openModal: (state, action) => {
      state.modal = action.payload;
    },
    closeModal: (state) => {
      state.modal = null;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const {
  setLoading,
  addNotification,
  removeNotification,
  openModal,
  closeModal,
  toggleSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;