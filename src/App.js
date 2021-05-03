import Backendless from 'backendless';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import Header from './components/Header';
import CreateItem from './pages/CreateItem';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { authSliceActions } from './store/store';

const APP_ID = '95DD6575-7321-470D-9574-05E6A27ADA04';
const API_KEY = '2AB164E3-2144-46CF-A945-46D3532B602A';
Backendless.serverURL = 'https://eu-api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

function App() {
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  let dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let currUser = await Backendless.UserService.getCurrentUser();

      if (!currUser) {
        return;
      }

      let user = {
        email: currUser.email,
        id: currUser.objectId,
      };

      dispatch(authSliceActions.setState(user));
    };

    fetchData();
  }, [authSliceActions, Backendless]);

  return (
    <div>
      <Header />
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/create">
        <CreateItem />
      </Route>
      <Route path="/register">
        {isLoggedIn ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route path="/login">
        {isLoggedIn ? <Redirect to="/" /> : <Login />}
      </Route>
    </div>
  );
}

export default App;
