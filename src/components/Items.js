import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

const Items = (props) => {
  return (
    <div class="d-flex justify-content-center ml-1 mr-1 mt-2 p-1 col-md-9 row">
      {props.items.map((x) => (
        <div class="p-2 dark-bg mr-2 mb-2">
          <div class="about-product text-center">
            <Image publicId={x.imageUrl} className="item-image"></Image>
            <div className="mt-2">
              <h3 className="orange-text">{x.name}</h3>
              <h5>{x.category}</h5>
              <h6 className="mt-3">{x.price}$</h6>

              <Link to="/details/" className="text-decoration-none">
                <button className="btn orange-btn font-weight-bold">BUY</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
