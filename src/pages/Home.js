import Backendless from 'backendless';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from 'cloudinary-react';
import { useEffect, useState } from 'react';

const Home = () => {
  let [items, setItems] = useState([]);

  useEffect(async () => {
    let res = await Backendless.Data.of('Items').find();

    if (!res[0] && res.status != 200) {
      alert('Cannot fetch items on Home.js');
    }

    setItems(res);
  }, []);

  return (
    <CloudinaryContext cloudName="detha4545">
      <div class="d-flex justify-content-center container mt-5">
        {items.map((x) => (
          <div class="card p-3 bg-white">
            <i class="fa fa-apple"></i>
            <div class="about-product text-center mt-2">
              <Image publicId={x.imageUrl}>
                <Transformation height="200" width="300" crop="fit" />
              </Image>
              <div>
                <h4>Believing is seeing</h4>
                <h6 class="mt-0 text-black-50">Apple pro display XDR</h6>
              </div>
            </div>
            <div class="stats mt-2">
              <div class="d-flex justify-content-between p-price">
                <span>Pro Display XDR</span>
                <span>$5,999</span>
              </div>
              <div class="d-flex justify-content-between p-price">
                <span>Pro stand</span>
                <span>$999</span>
              </div>
              <div class="d-flex justify-content-between p-price">
                <span>Vesa Mount Adapter</span>
                <span>$199</span>
              </div>
            </div>
            <div class="d-flex justify-content-between total font-weight-bold mt-4">
              <span>Total</span>
              <span>$7,197.00</span>
            </div>
          </div>
        ))}
      </div>
    </CloudinaryContext>
  );
};

export default Home;
