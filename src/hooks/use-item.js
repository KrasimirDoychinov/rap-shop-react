import axios from 'axios';
import { useState } from 'react';
import Backendless from 'backendless';
import useValidation from '../hooks/use-validation';
import { useHistory } from 'react-router';

const useItem = (defName, defArtist, defDescription, defCategory, defImage, defPrice) => {
  let [name, setName] = useState(defName || '');
  let [artist, setArtist] = useState(defArtist || '');
  let [description, setDescription] = useState(defDescription || '');
  let [category, setCategory] = useState(defCategory || 'Apparel');
  let [image, setImage] = useState(defImage || '');
  let [price, setPrice] = useState(defPrice || 0);

  let history = useHistory();

  let [formErr, setFormErr] = useState(false);
  let [formErrMessage, setFormErrMessage] = useState('');

  let {
    onBlurHandler: nameBlurHandler,
    newMessage: nameMessage,
    inputIsValid: nameIsValid,
  } = useValidation('Name cannot be empty.', () => name.trim() != '');

  let {
    onBlurHandler: artistBlurHandler,
    newMessage: artistMessage,
    inputIsValid: artistIsValid,
  } = useValidation('Artist cannot be empty.', () => artist.trim() != '');

  let {
    onBlurHandler: descriptionBlurHandler,
    newMessage: descriptionMessage,
    inputIsValid: descriptionIsValid,
  } = useValidation(
    'Description cannot be empty.',
    () => description.trim() != '',
  );

  let {
    onBlurHandler: priceBlurHandler,
    newMessage: priceMessage,
    inputIsValid: priceIsValid,
  } = useValidation('Price must be a positive number.', () => price > 0);

  let {
    onBlurHandler: imageBlurHandler,
    newMessage: imageMessage,
    inputIsValid: imageIsValid,
  } = useValidation('Image cannot be empty.', () => image);

  let [imageErr, setImageErr] = useState(false);

  let formIsValid = false;
  if (
    name.trim() != '' &&
    description.trim() != '' &&
    category.trim() != '' &&
    price >= 0 &&
    image &&
    artist.trim() != ''
  ) {
    formIsValid = true;
  }


  const nameOnChangeHandler = (e) => {
    setName(e.target.value);
  };

  const artistOnChangeHandler = (e) => {
    setArtist(e.target.value);
  };

  const descriptionOnChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const categoryOnChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const priceOnChangeHandler = (e) => {
    setPrice(Number(e.target.value));
  };

  const uploadImageToCloudinary = async (e) => {
    let formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'o8mrcchb');

    let res = await axios.post(
      'https://api.cloudinary.com/v1_1/detha4545/image/upload',
      formData,
    );

    if (res.status != 200) {
      setImageErr(true);
      alert('Something went wrong with the image uploading!');
    }

    return res.data.public_id;
  };

  return {
    uploadImageToCloudinary,
    category,
    description,
    name,
    price,
    artist,
    setFormErr,
    setFormErrMessage,
    setName,
    setArtist,
    setDescription,
    setCategory,
    setImage,
    setPrice,
    history,
    imageErr,
    formErr,
    formErrMessage,
    nameBlurHandler,
    nameOnChangeHandler,
    nameIsValid,
    nameMessage,
    artistBlurHandler,
    artistOnChangeHandler,
    artistIsValid,
    artistMessage,
    priceBlurHandler,
    priceOnChangeHandler,
    priceIsValid,
    priceMessage,
    category,
    categoryOnChangeHandler,
    descriptionBlurHandler,
    descriptionOnChangeHandler,
    descriptionIsValid,
    descriptionMessage,
    imageBlurHandler,
    setImage,
    image,
    imageIsValid,
    imageMessage,
    formIsValid,
    setImageErr
  };
};

export default useItem;
