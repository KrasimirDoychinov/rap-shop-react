import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { filterSliceActions } from '../store/store';

const Sidebar = () => {
  let dispatch = useDispatch();
  let history = useHistory();

  const categoriesClickHandler = (e) => {
    e.preventDefault();
    if (e.target.tagName == 'A') {
      dispatch(filterSliceActions.setCategory(e.target.dataset.value));
    }
  };

  const orderByClickHandler = (e) => {
    e.preventDefault();
    if (e.target.tagName == 'I') {
      let orderObj = {
        orderBy: e.target.dataset.value,
        sort: e.target.dataset.sort,
      };

      console.log(e.target.dataset.sort);
      dispatch(filterSliceActions.setOrderBy(orderObj));
    }
  };

  return (
    <section id="sidebar" className="sidebar col-md-2 mx-3 mt-1 p-1">
      <div className="p-3 dark-bg">
        <div onClick={categoriesClickHandler}>
          <h6 class="p-1 border-bottom font-weight-bold orange-text">
            CATEGORIES
          </h6>
          <ul>
            <li>
              <Link
                data-value="apparel"
                to="/"
                className="white-text white-link text-decoration-none"
              >
                Apparel
              </Link>
            </li>
            <li>
              <Link
                data-value="shoes"
                to="/"
                className="white-text white-link text-decoration-none"
              >
                Shoes
              </Link>
            </li>
            <li>
              <Link
                data-value="cd"
                to="/"
                className="white-text white-link text-decoration-none"
              >
                CD's
              </Link>
            </li>
            <li>
              <Link
                data-value="vinyl"
                to="/"
                className="white-text white-link text-decoration-none"
              >
                Vinyl
              </Link>
            </li>
          </ul>
        </div>
        <div onClick={orderByClickHandler}>
          <h6 class="p-1 border-bottom font-weight-bold orange-text">
            ORDER BY
          </h6>
          <ul>
            <li>
              <Link
                to="/"
                className="normal-cursor white-text white-link text-decoration-none"
              >
                Price
              </Link>
              <i
                data-value="price"
                data-sort="asc"
                className="pointer ml-2 fas fa-arrow-up"
              ></i>
              <i
                data-value="price"
                data-sort="desc"
                className="pointer ml-2 fas fa-arrow-down"
              ></i>
            </li>
            <li>
              <Link
                to="/"
                className="normal-cursor white-text white-link text-decoration-none"
              >
                Name
              </Link>
              <i
                data-value="name"
                data-sort="asc"
                className="pointer ml-2 fas fa-arrow-up"
              ></i>
              <i
                data-value="name"
                data-sort="desc"
                className="pointer ml-2 fas fa-arrow-down"
              ></i>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
