import { Image } from 'cloudinary-react';
import Backendless from 'backendless';
import DarkButton from '../components/DarkButton';
import useItem from '../hooks/use-item';
import { useSelector } from 'react-redux';
import { Fragment, useState } from 'react';
import { useLocation } from 'react-router';

const EditItem = () => {
  let [imageCheck, setImageCheck] = useState(true);
  let item = useSelector((state) => state.item.item);

  let location = useLocation();
  let itemId = location.pathname.split('/')[2];

  let {
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
    categoryOnChangeHandler,
    descriptionBlurHandler,
    descriptionOnChangeHandler,
    descriptionIsValid,
    descriptionMessage,
    imageBlurHandler,
    image,
    imageIsValid,
    imageMessage,
    formIsValid,
  } = useItem(
    item.name,
    item.artist,
    item.description,
    item.category,
    item.imageUrl,
    item.price,
  );

  if (!item.name) {
    history.push(`/details/${itemId}`);
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let editedItem = {
      objectId: item.objectId,
      category,
      description,
      name,
      price,
      artist,
      imageUrl: item.imageUrl,
    };

    if (!imageCheck) {
      let publicId = await uploadImageToCloudinary();
      editedItem.image = publicId;
    }

    Backendless.Data.of('Items')
      .save(editedItem)
      .then((res) => {
        setName('');
        setArtist('');
        setDescription('');
        setCategory('');
        setImage('');
        setPrice(0);

        history.push(`/details/${item.objectId}`);
      })
      .catch((err) => {
        setFormErr(true);
        setFormErrMessage(err.message);
      });
  };

  const imageCheckChangeHandler = (e) => {
    setImageCheck(e.target.checked);
  };

  return (
    <form className="container w-50 mt-3 p-5" onSubmit={onSubmitHandler}>
      {imageErr && (
        <p className="text-danger">
          Only files with .png, .jpg, .jpeg are permitted.
        </p>
      )}
      {formErr && <p className="text-danger">{formErrMessage}</p>}
      <div className="form-group">
        <label className="orange-text font-weight-bold ">NAME</label>
        <input
          maxLength="30"
          onBlur={nameBlurHandler}
          className="form-control"
          onChange={nameOnChangeHandler}
          value={name}
        />
        {!nameIsValid && <p className="text-danger">{nameMessage}</p>}
      </div>
      <div className="form-group">
        <label className="orange-text font-weight-bold ">ARTIST</label>
        <input
          maxLength="30"
          onBlur={artistBlurHandler}
          className="form-control"
          onChange={artistOnChangeHandler}
          value={artist}
        />
        {!artistIsValid && <p className="text-danger">{artistMessage}</p>}
      </div>
      <div className="form-group ">
        <label className="orange-text font-weight-bold ">PRICE</label>
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
        <label className="orange-text font-weight-bold ">CATEGORY</label>
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
        <label className="orange-text font-weight-bold ">DESCRIPTION</label>
        <textarea
          className="form-control"
          maxLength="500"
          rows="3"
          onBlur={descriptionBlurHandler}
          onChange={descriptionOnChangeHandler}
          value={description}
        ></textarea>
        {!descriptionIsValid && (
          <p className="text-danger">{descriptionMessage}</p>
        )}
      </div>
      {imageCheck || (
        <Fragment>
          <label className="orange-text font-weight-bold ">IMAGE</label>
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
        </Fragment>
      )}

      <div class="form-check">
        <input
          onChange={imageCheckChangeHandler}
          class="form-check-input"
          type="checkbox"
          id="flexCheckChecked"
          checked={imageCheck}
        />
        <label class="form-check-label mb-2" for="flexCheckChecked">
          Check this if you want to keep the original image
        </label>
      </div>
      {!imageIsValid && <p className="text-danger">{imageMessage}</p>}
      <small className="text-break">
        Please use only images (.png, .jpg, .jpeg). If you attempt to upload
        anything else, the file won't upload.
      </small>
      {!formIsValid ? (
        <DarkButton text="EDIT" isDisabled="true" />
      ) : (
        <DarkButton text="EDIT" />
      )}
      <Image cloudName="detha4545" />
    </form>
  );
};

export default EditItem;
