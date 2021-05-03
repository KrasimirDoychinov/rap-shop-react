import Backendless from 'backendless';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

const useGetItem = () => {
  let [item, setItem] = useState('');

  let ownerId = useSelector((state) => state.auth.id);
  let location = useLocation();
  let itemId = location.pathname.split('/')[2];

  useEffect(async () => {
    let res = await Backendless.Data.of('Items').findById(itemId);

    if (!res.name && res.status != 200) {
      alert('Cannot fetch items on Home.js');
    }

    setItem(res);
  }, []);

  return { item, ownerId, itemId };
};

export default useGetItem;
