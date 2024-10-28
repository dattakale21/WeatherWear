// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', whatsapp: '', city: '' },
  reducers: {
    updateUser: (state, action) => {
      state.name = action.payload.name;
      state.whatsapp = action.payload.whatsapp;
      state.city = action.payload.city;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
