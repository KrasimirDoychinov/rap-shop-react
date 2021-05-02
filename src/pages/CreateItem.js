import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import Backendless from 'backendless';
import useValidation from '../hooks/use-validation';

const CreateItem = () => {
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [category, setCategory] = useState('Apparel');
  let [image, setImage] = useState('');
  let [price, setPrice] = useState(0);

  let {
    onBlurHandler: nameBlurHandler,
    newMessage: nameMessage,
    inputIsValid: nameIsValid,
  } = useValidation(
    'Name cannot be empty.',
    () => name.trim() != ''
  );

  let {
    onBlurHandler: descriptionBlurHandler,
    newMessage: descriptionMessage,
    inputIsValid: descriptionIsValid,
  } = useValidation(
    'Description cannot be empty.',
    () => description.trim() != ''
  );

  let {
    onBlurHandler: priceBlurHandler,
    newMessage: priceMessage,
    inputIsValid: priceIsValid,
  } = useValidation(
    'Price must be a positive number.',
    () => price > 0
  );

  let {
    onBlurHandler: imageBlurHandler,
    newMessage: imageMessage,
    inputIsValid: imageIsValid,
  } = useValidation(
    'Image cannot be empty.',
    () => image
  );


  let [imageErr, setImageErr] = useState(false);

  let formIsValid = false;
  if (
    name.trim() != '' &&
    description.trim() != '' &&
    category.trim() != '' &&
    price >= 0 &&
    image
  ) {
    formIsValid = true;
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let publicId = await uploadImageToCloudinary();
    console.log(publicId);
    let item = {
      category,
      description,
      imageUrl: publicId,
      name,
      price,
    };

    console.log(item);

    Backendless.Data.of('Items')
      .save(item)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });

    setName('');
    setDescription('');
    setCategory('');
    setImage('');
    setPrice(0);
  };

  const nameOnChangeHandler = (e) => {
    setName(e.target.value);
  };

  const descriptionOnChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const categoryOnChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const priceOnChangeHandler = (e) => {
    setPrice(Number(e.target.value));
    console.log(price);
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
  return (
    <form className="container w-50 mt-3 p-5" onSubmit={onSubmitHandler}>
      {imageErr && (
        <p className="text-danger">
          Only files with .png, .jpg, .jpeg are permitted.
        </p>
      )}
      <div className="form-group">
        <label className="font-weight-bold ">NAME</label>
        <input
          onBlur={nameBlurHandler}
          className="form-control"
          onChange={nameOnChangeHandler}
          value={name}
        />
        {!nameIsValid && <p className="text-danger">{nameMessage}</p>}
      </div>
      <div className="form-group ">
        <label className="font-weight-bold ">PRICE</label>
        <input
          min="0"
          type="number"
          className="form-control"
          onBlur={priceBlurHandler}
          onChange={priceOnChangeHandler}
          value={price}
        />
        {!priceIsValid && <p className="text-danger">{priceMessage}</p>}
      </div>
      <div className="form-group">
        <label className="font-weight-bold ">CATEGORY</label>
        <select
          className="form-control"
          value={category}
          onChange={categoryOnChangeHandler}
        >
          <option value="Apparel">Apparel</option>
          <option value="Shoes">Shoes</option>
          <option value="CD">CD</option>
          <option value="Vinyl">Vinyl</option>
        </select>
      </div>
      <div className="form-group">
        <label className="font-weight-bold ">DESCRIPTION</label>
        <textarea
          className="form-control"
          maxLength="250"
          rows="3"
          onBlur={descriptionBlurHandler}
          onChange={descriptionOnChangeHandler}
          value={description}
        ></textarea>
        {!descriptionIsValid && <p className="text-danger">{descriptionMessage}</p>}
      </div>
      <label className="font-weight-bold ">IMAGE</label>
      <div className="input-group mb-3">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            onBlur={imageBlurHandler}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <label className="custom-file-label" placeholder="Choose image">
            {image && image.name}
          </label>
        </div>
      </div>
          {!imageIsValid && <p className="text-danger">{imageMessage}</p>}
      <small className="text-break">
        Please use only images (.png, .jpg, .jpeg). If you attempt to upload
        anything else, the file won't upload.
      </small>
      {!formIsValid ? (
        <button
          className="btn dark-btn mt-2 float-right font-weight-bold disabled"
          disabled
        >
          CREATE
        </button>
      ) : (
        <button className="btn dark-btn mt-2 float-right font-weight-bold">
          CREATE
        </button>
      )}
      <Image cloudName="detha4545" />
    </form>
  );
};

export default CreateItem;
