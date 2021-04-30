import Backendless from 'backendless';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from 'cloudinary-react';
import { useEffect, useState } from 'react';
import Items from '../components/Items';
import Sidebar from '../components/Sidebar';

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
    <CloudinaryContext cloudName="detha4545" >
      <div className=" row">
        <Sidebar />
        <Items items={items}/>
      </div>
    </CloudinaryContext>
  );
};

export default Home;
