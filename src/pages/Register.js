
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authSliceActions } from '../store/auth';

const Register = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let dispatch = useDispatch();

  const onRegisterHandler = (e) => {
    e.preventDefault();

    let user = {
      email,
      password,
    };

    dispatch(authSliceActions.register(user));

    setEmail('');
    setPassword('');
  };

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPassChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={onRegisterHandler}>
      <label>Email</label>
      <input onChange={onEmailChangeHandler} value={email} type="email"/>
      <label>Pass</label>
      <input onChange={onPassChangeHandler} value={password} type="password"/>
      <button>Register</button>
    </form>
  );
};

export default Register;
