import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { filterSliceActions } from '../store/store';
import OrangeButton from './OrangeButton';

const Sidebar = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const categoriesClickHandler = (e) => {
    e.preventDefault();
    if (e.target.tagName == 'A') {
      dispatch(filterSliceActions.setCategory(e.target.dataset.value));
    }

    history.push(`/${e.target.dataset.value}`);
  };

  const orderByClickHandler = (e) => {
    e.preventDefault();
    if (e.target.tagName == 'I') {
      let orderObj = {
        orderBy: e.target.dataset.value,
        sort: e.target.dataset.sort,
      };

      dispatch(filterSliceActions.setOrderBy(orderObj));
    }
  };

  const resetClickHandler = (e) => {
    e.preventDefault();

    dispatch(filterSliceActions.setOrderBy({ orderBy: '', sort: '' }));
    dispatch(filterSliceActions.setCategory(''));
    history.push('/home');

    window.scrollTo(0, document.querySelector('#items').scrollTop);
  };

  return (
    <section id="sidebar" className="sidebar col-md-2 mx-3 mt-1 p-1 ">
      <div className="p-3 dark-bg">
        <div onClick={categoriesClickHandler}>
          <h6 class="p-1 border-bottom font-weight-bold orange-text">
            CATEGORIES
          </h6>
          <ul>
            <li>
              <Link
                data-value="apparel"
                className="white-text white-link text-decoration-none"
              >
                Apparel
              </Link>
            </li>
            <li>
              <Link
                data-value="shoes"
                className="white-text white-link text-decoration-none"
              >
                Shoes
              </Link>
            </li>
            <li>
              <Link
                data-value="cd"
                className="white-text white-link text-decoration-none"
              >
                CD's
              </Link>
            </li>
            <li>
              <Link
                data-value="vinyl"
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
          <button
            className="btn-sm orange-btn font-weight-bold"
            onClick={resetClickHandler}
          >
            RESET
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
