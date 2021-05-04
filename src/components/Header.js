import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { filterSliceActions } from '../store/store';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import OrangeButton from './OrangeButton';

const Header = () => {
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let [filter, setFilter] = useState('');

  let dispatch = useDispatch();
  let history = useHistory();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(filterSliceActions.setFilter(filter));
    setFilter('');

    history.push(`/${filter}`);
  };

  const filterChangeHandler = (e) => {
    setFilter(e.target.value);
  };

  const resetClickHandler = (e) => {
    dispatch(filterSliceActions.setFilter(''));
    setFilter('');
    
    history.push('/home');
  };

  return (
    <nav className="navbar navbar-expand-lg container-fluid dark-bg navbar-dark sticky-top">
      <Link className="navbar-brand" to="/">
        HOME
      </Link>

      <div className="navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          {isLoggedIn || <LoggedOutLinks />}
          {isLoggedIn && <LoggedInLinks />}
        </ul>
      </div>
      {isLoggedIn && (
        <form class="form-inline my-2 my-lg-0" onSubmit={searchSubmitHandler}>
          <button
            type="button"
            className="btn btn-sm orange-btn font-weight-bold mr-2"
            onClick={resetClickHandler}
          >
            RESET
          </button>
          <input
            onChange={filterChangeHandler}
            value={filter}
            class="form-control mr-sm-2"
            type="search"
            placeholder="f.e 2pac"
          />
          <OrangeButton text="SEARCH" />
        </form>
      )}
    </nav>
  );
};

export default Header;
