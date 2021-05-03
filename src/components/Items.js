import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import OrangeButton from './OrangeButton';

const Items = (props) => {
  return (
    <div class="d-flex dark-bg justify-content-center ml-1 mr-1 mt-2 p-1 col-md-9 row items">
      {props.items.map((x) => (
        <div class="p-2 border dark-bg border-dark m-1">
          <div class="about-product text-center">
            <Image publicId={x.imageUrl} className="item-image"></Image>
            <div className="mt-2">
              <h4 className="orange-text">{x.name}</h4>
              <h6>{x.artist}</h6>
              <h6 className="mt-3">{x.price}$</h6>

              <Link to={`/details/${x.objectId}`} className="text-decoration-none">
                <OrangeButton text="BUY" />
              </Link>
            </div>
          </div>
        </div>
      ))}
      {props.items.length <= 0 && <h1 className="row align-content-center">No items found...</h1>}
    </div>
  );
};

export default Items;
