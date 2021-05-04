import Backendless from 'backendless';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSliceActions, cartSliceActions } from '../store/store';
import { Link, useHistory } from 'react-router-dom';

const LoggedInLinks = () => {
  let itemCountInCart = useSelector(state => state.cart.itemCount);

  let dispatch = useDispatch();
  let history = useHistory();
  
  const logoutHandler = async (e) => {
    await Backendless.UserService.logout();
    dispatch(authSliceActions.logout());
    dispatch(cartSliceActions.resetCart());
    history.push('/');
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
      <li className="nav-item">
        <Link to="/cart" className="nav-link">
          CART <button className="btn btn-sm orange-btn">{itemCountInCart}</button>
        </Link>
      </li>
    </Fragment>
  );
};

export default LoggedInLinks;
