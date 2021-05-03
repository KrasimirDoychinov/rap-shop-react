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

  useEffect(async () => {
    try {
      let res = await Backendless.Data.of('Items').findById(itemId);

      setItem(res);
      dispatch(itemSliceActions.setItemProps(res));
    } catch (err) {
      alert(err.message);
    }
  }, []);

  return { item, ownerId, itemId };
};

export default useGetItem;
