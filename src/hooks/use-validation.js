import { useState } from 'react';

const useValidation = (message, validationFunc) => {
  let [inputIsValid, setInputIsValid] = useState(true);
  let newMessage = message;
  const onBlurHandler = () => {
    setInputIsValid(validationFunc());
  };

  return { onBlurHandler, newMessage, inputIsValid };
};

export default useValidation;
