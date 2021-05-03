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

let filterSlice = createSlice({
  name: 'filter',
  initialState: { filter: '' },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload.toLowerCase();
    },
  },
});

let store = configureStore({
  reducer: { auth: authSlice.reducer, filter: filterSlice.reducer },
});

export let filterSliceActions = filterSlice.actions;
export let authSliceActions = authSlice.actions;
export default store;
