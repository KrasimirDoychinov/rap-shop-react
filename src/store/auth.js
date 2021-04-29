import { configureStore, createSlice } from '@reduxjs/toolkit';
import Backendless from 'backendless';

let authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    register: (state, action) => {
      let user = new Backendless.User();
      user.email = action.payload.email;
      user.password = action.payload.password;

      Backendless.UserService.register(user)
        .then(async (newUser) => {
            console.log(newUser);
          Backendless.UserService.login(user.email, user.password, true)
            .then(e => {
                console.log(e);
                console.log('LOGGED IN');
            })
          state.isLoggedIn = true;
        })
        .catch((err) => {
          console.log(err.message);
          console.log('ERROR');
        });
    },
    login: (state, action) => {

    }
  },
});

let store = configureStore({
  reducer: authSlice.reducer,
});

export let authSliceActions = authSlice.actions;
export default store;
