import Backendless from 'backendless';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { itemSliceActions } from '../store/store';

const useGetItem = () => {
  let [item, setItem] = useState('');
  let dispatch = useDispatch();

  let ownerId = useSelector((state) => state.auth.id);
  let location = useLocation();
  let itemId = location.pathname.split('/')[2];

  useCallback(
    useEffect(async () => {
      let res = await Backendless.Data.of('Items').findById(itemId);

      if (!res.name && res.status != 200) {
        alert('Cannot fetch items on Home.js');
      }

      setItem(res);

      dispatch(itemSliceActions.setItemProps(res));
    }, []),
  );

  return { item, ownerId, itemId };
};

export default useGetItem;
