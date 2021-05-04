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
  initialState: { filter: '', orderBy: '', sort: '', category: '' },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload.toLowerCase();
    },
    setOrderBy: (state, action) => {
      state.orderBy = action.payload.orderBy.toLowerCase();
      state.sort = action.payload.sort;
    },
    setCategory: (state, action) => {
      state.category = action.payload.toLowerCase();
    },
  },
});

let itemSlice = createSlice({
  name: 'item',
  initialState: { item: {}, itemId: '' },
  reducers: {
    setItemProps: (state, action) => {
      state.item = action.payload;
    },
  },
});

let store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    filter: filterSlice.reducer,
    item: itemSlice.reducer,
  },
});

export let itemSliceActions = itemSlice.actions;
export let filterSliceActions = filterSlice.actions;
export let authSliceActions = authSlice.actions;
export default store;
