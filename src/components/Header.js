
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';

const Header = () => {
  let isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <nav className="navbar navbar-expand-lg dark-bg navbar-dark">
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

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 justify-content-center">
          {isLoggedIn || <LoggedOutLinks />}
          {isLoggedIn && <LoggedInLinks />}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
