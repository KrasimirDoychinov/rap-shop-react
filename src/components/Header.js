import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterSliceActions } from '../store/store';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import OrangeButton from './OrangeButton';

const Header = () => {
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let [filter, setFilter] = useState('');
  
  let dispatch = useDispatch();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(filterSliceActions.setFilter(filter));
    setFilter('');
  };

  const filterChangeHandler = (e) => {
    setFilter(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg container-fluid dark-bg navbar-dark sticky-top">
      <Link className="navbar-brand" to="/">
        HOME
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
          {isLoggedIn || <LoggedOutLinks />}
          {isLoggedIn && <LoggedInLinks />}
        </ul>
      </div>
      {isLoggedIn && (
        <form class="form-inline my-2 my-lg-0" onSubmit={searchSubmitHandler}>
          <input
            onChange={filterChangeHandler}
            value={filter}
            class="form-control mr-sm-2"
            type="search"
            placeholder="f.e 2pac"
          />
          <OrangeButton text="SEARCH"/>
        </form>
      )}
    </nav>
  );
};

export default Header;
