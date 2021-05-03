import { configureStore, createSlice } from '@reduxjs/toolkit';

let authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false, email: '', id: '' },
  reducers: {
    setState: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.id = '';
      state.email = '';
      state.isLoggedIn = false;
    },
  },
});

let searchSlice = createSlice({
  name: 'search',
  initialState: { filter: '' },
  reducers: {
    filterItems: (state, action) => {
      
    },
  },
});

let store = configureStore({
  reducer: { auth: authSlice.reducer },
});

export let authSliceActions = authSlice.actions;
export default store;
