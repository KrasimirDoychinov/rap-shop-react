import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <section id="sidebar" className="sidebar col-md-2 mx-3 mt-1 p-1">
      <div className="p-3 dark-bg">
        <div>
          <h6 class="p-1 border-bottom font-weight-bold orange-text">
            CATEGORIES
          </h6>
          <ul>
            <li>
              <Link
                to="/clothes"
                className="white-text white-link text-decoration-none"
              >
                Clothes
              </Link>
            </li>
            <li>
              <Link
                to="/shoes"
                className="white-text white-link text-decoration-none"
              >
                Shoes
              </Link>
            </li>
            <li>
              <Link
                to="/cd"
                className="white-text white-link text-decoration-none"
              >
                CD's
              </Link>
            </li>
            <li>
              <Link
                to="/vinyl"
                className="white-text white-link text-decoration-none"
              >
                Vinyl
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 class="p-1 border-bottom font-weight-bold orange-text">
            FILTER BY
          </h6>
          <ul>
            <li>
              <Link
                to="/clothes"
                className="white-text white-link text-decoration-none"
              >
                Price
              </Link>
            </li>
            <li>
              <Link
                to="/shoes"
                className="white-text white-link text-decoration-none"
              >
                Name
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
