import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DarkButton from './DarkButton';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';

const Header = () => {
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <nav className="navbar navbar-expand-lg container-fluid dark-bg navbar-dark">
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
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <DarkButton text="SEARCH"/>
      </form>
    </nav>
  );
};

export default Header;
