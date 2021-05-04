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
  let filter = useSelector((state) => state.filter.filter);
  let category = useSelector((state) => state.filter.category);
  let orderBy = useSelector((state) => state.filter.orderBy);
  let sort = useSelector((state) => state.filter.sort);
  let storeItems = useSelector((state) => state.cart.items);
  
  let [items, setItems] = useState([]);

  useEffect(async () => {
    try {
      let res = await Backendless.Data.of('Items').find();

      if (filter) {
        res = filterItems(res, filter);
        window.scrollTo(0, document.querySelector('#items').scrollHeight);
      }

      if (category) {
        res = filterItemsByCategory(res, category);
      }

      if (orderBy) {
        res = orderItems(res, orderBy, sort);
      }

      setItems(res);
    } catch (err) {
      alert(err.message);
    }
  }, [filter, orderBy, category, sort, storeItems]);


  const filterItems = (items, filter) => {
    return items.filter(
      (x) =>
        x.name.toLowerCase().includes(filter) ||
        x.artist.toLowerCase().includes(filter),
    );
  };

  const filterItemsByCategory = (items, category) => {
    return items.filter((x) => x.category.toLowerCase() === category);
  };

  const orderItems = (items, orderBy, sort) => {
    let sortedItems;
    if (orderBy == 'price') {
      sortedItems = items.sort((a, b) => a.price - b.price);
    } else {
      sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort == 'desc') {
      sortedItems = sortedItems.reverse();
    }

    console.log(sortedItems);

    return sortedItems;
  };

  return (
    <CloudinaryContext cloudName="detha4545">
      <div className="row" id="items">
        <Sidebar />
        <Items items={items} />
      </div>
    </CloudinaryContext>
  );
};

export default Home;
