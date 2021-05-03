import Backendless from 'backendless';
import { Image } from 'cloudinary-react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { itemSliceActions } from '../store/store';

const Details = () => {
  let [item, setItem] = useState('');

  let dispatch = useDispatch();

  let ownerId = useSelector((state) => state.auth.id);
  let location = useLocation();
  let itemId = location.pathname.split('/')[2];

  useEffect(async () => {
    let res = await Backendless.Data.of('Items').findById(itemId);

    if (!res.name && res.status != 200) {
      alert('Cannot fetch items on Home.js');
    }

    setItem(res);
    dispatch(itemSliceActions.setItemProps(res));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5">
          <div className="project-info-box mt-0">
            <h5 className="font-weight-bold orange-text">
              NAME:{' '}
              <span className="font-weight-normal white-text">{item.name}</span>
            </h5>
            <h5 className="orange-text font-weight-bold">DESCRIPTION</h5>
            <p className="mb-0">{item.description}</p>
          </div>

          <div className="project-info-box">
            <h6 className="font-weight-bold orange-text">
              ARTIST:{' '}
              <span className="font-weight-normal white-text">
                {item.artist}
              </span>
            </h6>
            <h6 className="font-weight-bold orange-text">
              CATEGORY:{' '}
              <span className="font-weight-normal white-text">
                {item.category}
              </span>
            </h6>
            <h6 className="font-weight-bold orange-text">
              CREATED:{' '}
              <span className="font-weight-normal white-text">
                {new Date(item.created).toLocaleDateString()}
              </span>
            </h6>
            <h6 className="font-weight-bold orange-text">
              PRICE:{' '}
              <span className="font-weight-normal white-text">
                ${item.price}
              </span>
            </h6>
          </div>
        </div>

        <div className="col-md-7">
          <Image
            publicId={item.imageUrl}
            cloudName="detha4545"
            className="detail-image mb-2"
          ></Image>

          {ownerId !== item.ownerId && (
            <Link>
              <button className="btn btn orange-btn font-weight-bold mr-2 mt-2">
                BUY
              </button>
            </Link>
          )}
          {ownerId === item.ownerId && (
            <Fragment>
              <Link to={`/edit/${itemId}`}>
                <button className="btn btn blue-btn font-weight-bold mr-2 mt-2">
                  EDIT
                </button>
              </Link>

              <button className="btn btn red-btn font-weight-bold mr-2 mt-2">
                DELETE
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
