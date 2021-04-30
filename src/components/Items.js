import { Image } from "cloudinary-react";

const Items = (props) => {
  return (
    <div class="d-flex justify-content-center  mr-1 mt-2 p-1 col-md-9 row">
      {props.items.map((x) => (
        <div class="p-3 dark-bg mr-3 mb-3">
          <div class="about-product text-center">
            <Image publicId={x.imageUrl} className="item-image"></Image>
            <div className="mt-2">
              <h4>{x.name}</h4>
              <h5>{x.category}</h5>
            </div>
          </div>
          <div class="d-flex justify-content-between font-weight-bold mt-4 ">
            <span className="mr-1">Price</span>
            <span>
              <span className="orange-text mr-1">$</span>
              {x.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
