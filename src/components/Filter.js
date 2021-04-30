const Filter = () => {
  return (
    <section id="sidebar" >
      <div className="col-md-3 dark-bg">
        <div className="">
          <h6 class="p-1 border-bottom">Home Furniture</h6>
          <ul>
            <li>
              <a href="#">Living</a>
            </li>
            <li>
              <a href="#">Dining</a>
            </li>
            <li>
              <a href="#">Office</a>
            </li>
            <li>
              <a href="#">Bedroom</a>
            </li>
            <li>
              <a href="#">Kitchen</a>
            </li>
          </ul>
        </div>
        <div>
          <h6 class="p-1 border-bottom">Filter By</h6>
          <p class="mb-2">Color</p>
          <ul class="list-group">
            <li class="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                {' '}
                <span class="fa fa-circle pr-1" id="red"></span>Red{' '}
              </a>
            </li>
            <li class="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                {' '}
                <span class="fa fa-circle pr-1" id="teal"></span>Teal{' '}
              </a>
            </li>
            <li class="list-group-item list-group-item-action mb-2 rounded">
              <a href="#">
                {' '}
                <span class="fa fa-circle pr-1" id="blue"></span>Blue{' '}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Filter;
