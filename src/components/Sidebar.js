import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <section id="sidebar" className="sidebar col-md-2 ml-3 mt-2 p-1">
      <div className="p-3 dark-bg">
        <div>
          <h6 class="p-1 border-bottom font-weight-bold">CATEGORIES</h6>
          <ul>
            <li>
              <Link to="/clothes" className="white-text text-decoration-none">Clothes</Link>
            </li>
            <li>
              <Link to="/shoes">Shoes</Link>
            </li>
            <li>
              <Link to="/cd">CD's</Link>
            </li>
            <li>
              <Link to="/vinyl">Vinyl</Link>
            </li>
          </ul>
        </div>
        <div>
          <h6 class="p-1 border-bottom">Filter By</h6>
          <p class="mb-2">Color</p>
          <ul class="list-group">
            <li class="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                <span class="fa fa-circle pr-1" id="red"></span>Red
              </a>
            </li>
            <li class="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                <span class="fa fa-circle pr-1" id="teal"></span>Teal
              </a>
            </li>
            <li class="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                <span class="fa fa-circle pr-1" id="blue"></span>Blue
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
