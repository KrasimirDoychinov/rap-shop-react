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

let cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], itemCount: 0 },
  reducers: {
    addItem: (state, action) => {
      let itemExists = state.items.find(x => x.objectid === action.payload.objectid);
      console.log(itemExists);
      if (!itemExists) {
        state.items.push(action.payload);
        state.itemCount++;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (x) => x.objectid !== action.payload.objectid,
      );

      if (!state.itemCount == 0) {
        state.itemCount--;
      }
    },
    resetCart: (state) => {
      state.items = [];
      state.itemCount = 0;
    },
  },
});

let store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    filter: filterSlice.reducer,
    item: itemSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export let cartSliceActions = cartSlice.actions;
export let itemSliceActions = itemSlice.actions;
export let filterSliceActions = filterSlice.actions;
export let authSliceActions = authSlice.actions;
export default store;
