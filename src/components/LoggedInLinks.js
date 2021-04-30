import Backendless from 'backendless';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { authSliceActions } from '../store/auth';
import { Link } from 'react-router-dom';

const LoggedInLinks = () => {
  let dispatch = useDispatch();

  const logoutHandler = async (e) => {
    await Backendless.UserService.logout();
    dispatch(authSliceActions.logout());
  };

  return (
    <Fragment>
      <li class="nav-item">
        <Link onClick={logoutHandler} class="nav-link">
          LOGOUT
        </Link>
      </li>
    </Fragment>
  );
};

export default LoggedInLinks;
