import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LoggedOutLinks = () => {
  return (
    <Fragment>
      <li className="nav-item ">
        <Link className="nav-link" to="/login">
          LOGIN
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          REGISTER
        </Link>
      </li>
    </Fragment>
  );
};

export default LoggedOutLinks;
