
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';

const Header = () => {
  let isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <nav class="navbar navbar-expand-lg dark-bg navbar-dark">
      <Link class="navbar-brand" to="/">
        HOME
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 justify-content-center">
          {isLoggedIn || <LoggedOutLinks />}
          {isLoggedIn && <LoggedInLinks />}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
