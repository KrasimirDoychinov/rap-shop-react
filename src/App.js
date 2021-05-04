import Backendless from 'backendless';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Jumbotron from './components/Jumbotron';
import OrangeButton from './components/OrangeButton';
import useGetItem from './hooks/use-getItem';
import CreateItem from './pages/CreateItem';
import Details from './pages/Details';
import EditItem from './pages/EditItem';
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

  useEffect(async () => {
    let currUser = await Backendless.UserService.getCurrentUser();

    if (!currUser) {
      return;
    }

    let user = {
      email: currUser.email,
      id: currUser.objectId,
    };

    

    dispatch(authSliceActions.setState(user));
  }, [authSliceActions, Backendless]);

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/details/:id">
          <Details />
        </Route>
        <Route path="/edit/:id">
          <EditItem />
        </Route>
        <Route path="/create" exact>
          <CreateItem />
        </Route>
        <Route path="/register" exact>
          {isLoggedIn ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/login" exact>
          {isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/" exact>
          <Jumbotron />
          <Home />
        </Route>
        <Route path="/:filter" exact>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
