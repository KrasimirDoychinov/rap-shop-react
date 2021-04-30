import { useState } from 'react';

const useAuth = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [emailValid, setEmailValid] = useState(true);
  let [passValid, setPassValid] = useState(true);

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPassChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onBlurEmail = () => {
    if (email.trim().length <= 6 || !email.trim().includes('@')) {
      return setEmailValid(false);
    }

    setEmailValid(true);
  };

  const onBlurPass = () => {
    if (password.trim().length <= 6) {
      return setPassValid(false);
    }

    setPassValid(true);
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    onEmailChangeHandler,
    onPassChangeHandler,
    emailValid,
    passValid,
    onBlurEmail,
    onBlurPass
  };
};

export default useAuth;
