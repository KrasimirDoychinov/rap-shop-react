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
      <li className="nav-item">
        <Link className="nav-link" to="/create">
          CREATE ITEM
        </Link>
      </li>
      <li className="nav-item">
        <Link onClick={logoutHandler} className="nav-link">
          LOGOUT
        </Link>
      </li>
    </Fragment>
  );
};

export default LoggedInLinks;
