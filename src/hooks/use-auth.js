import { useState } from 'react';

const useAuth = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPassChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    onEmailChangeHandler,
    onPassChangeHandler,
  };
};

export default useAuth;
