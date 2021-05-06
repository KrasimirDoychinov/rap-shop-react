import Backendless from 'backendless';
import { Image } from 'cloudinary-react';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import LoadingCircle from '../components/LoadingCircle';
import { cartSliceActions } from '../store/store';

const Cart = () => {
  let stateItems = useSelector((state) => state.cart.items);
  let [items, setItems] = useState(stateItems);
  let [isLoading, setIsLoading] = useState(false);

  let dispatch = useDispatch();
  let history = useHistory();

  let totalPrice = 0;
  items.forEach((x) => (totalPrice += x.price));

  const removeClickHandler = async (e) => {
    try {
      let item = await Backendless.Data.of('Items').findById(
        e.target.dataset.id,
      );

      dispatch(cartSliceActions.removeItem(item));
      setItems(items.filter((x) => x.objectId !== e.target.dataset.id));
    } catch (err) {
      alert(err.message);
    }
  };

  const buyClickHandler = (e) => {
    e.preventDefault();

    try {
      items.forEach(async (x) => {
        await Backendless.Data.of('Items').remove(x);
      });

      dispatch(cartSliceActions.resetCart());
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        history.push('/home');
      }, 1500);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div class="container mt-5 mb-5 ">
      <div class="d-flex justify-content-center row">
        {isLoading && <LoadingCircle />}
        {isLoading || (
          <div class="col-md-8">
            {items.length <= 0 && (
              <h1 className="text-center orange-text">
                YOU CURRENTLY HAVE NO ITEMS IN YOUR CART
              </h1>
            )}

            {items.length > 0 && (
              <div class="col-md-12 dark-bg">
                <div class="p-2">
                  <h4 className="font-weigt-bold orange-text border-bottom pb-1">
                    CART
                  </h4>
                  <div class="d-flex flex-row align-items-center pull-right"></div>
                </div>

                {items.map((x) => (
                  <div class="border-bottom  d-flex flex-row justify-content-between align-items-center p-2 mt-4 px-3 rounded">
                    <div class="mr-1">
                      <Image
                        publicId={x.imageUrl}
                        cloudName="detha4545"
                        className="cart-image"
                      />
                    </div>
                    <div class="d-flex flex-column align-items-center product-details">
                      <span class="font-weight-bold orange-text">{x.name}</span>
                      <div class="d-flex flex-row product-desc">
                        <div class="size mr-1">
                          <span class="text-grey">Artist: </span>
                          <span class="font-weight-bold">{x.artist}</span>
                        </div>
                        <div class="color">
                          <span class="text-grey">Category:</span>
                          <span class="font-weight-bold"> {x.category}</span>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center qty"></div>
                    <div>
                      <h5 class="text-grey">${x.price}</h5>
                    </div>
                    <div class="d-flex align-items-center">
                      <i
                        class="fa fa-trash mb-1 text-danger"
                        data-id={x.objectId}
                        onClick={removeClickHandler}
                      ></i>
                    </div>
                  </div>
                ))}
                <div class="d-flex flex-row align-items-center mt-3 p-2 rounded">
                  <button
                    onClick={buyClickHandler}
                    class="btn orange-btn btn-block btn-lg ml-2 font-weight-bold"
                    type="button"
                  >
                    YOUR TOTAL IS ${totalPrice}. ORDER!
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
