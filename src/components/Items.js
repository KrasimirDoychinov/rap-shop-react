import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import OrangeButton from './OrangeButton';

const Items = (props) => {
  return (
    <div class="d-flex justify-content-center ml-1 mr-1 mt-2 p-1 col-md-9 row">
      {props.items.map((x) => (
        <div class="p-2 dark-bg mr-2 mb-2">
          <div class="about-product text-center">
            <Image publicId={x.imageUrl} className="item-image"></Image>
            <div className="mt-2">
              <h4 className="orange-text">{x.name}</h4>
              <h6>{x.artist}</h6>
              <h6 className="mt-3">{x.price}$</h6>

              <Link to="/details/" className="text-decoration-none">
                <OrangeButton text="BUY" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
