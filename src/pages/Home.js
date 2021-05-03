import Backendless from 'backendless';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from 'cloudinary-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Items from '../components/Items';
import Sidebar from '../components/Sidebar';

const Home = () => {
  let filter = useSelector(state => state.filter.filter);
  let [items, setItems] = useState([]);
  
  useEffect(async () => {
    let res = await Backendless.Data.of('Items').find();

    if (!res[0] && res.status != 200) {
      alert('Cannot fetch items on Home.js');
    }

    if (filter) {
      res = filterItems(res, filter);
    }

    setItems(res);
  }, [filter]);

  const filterItems = (items, filter) => {
    return items.filter(x => x.name.toLowerCase().includes(filter) || x.artist.toLowerCase().includes(filter));
  }

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
