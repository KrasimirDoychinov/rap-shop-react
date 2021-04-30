import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LoggedOutLinks = () => {
  return (
    <Fragment>
      <li class="nav-item">
        <Link class="nav-link" to="/login">
          LOGIN
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/register">
          REGISTER
        </Link>
      </li>
    </Fragment>
  );
};

export default LoggedOutLinks;
