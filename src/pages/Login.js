
import Backendless from 'backendless';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authSliceActions } from '../store/auth';

const Login = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  

  let dispatch = useDispatch();

  const onLoginHandler = async (e) => {
    e.preventDefault();

    try {
      let currUser = await Backendless.UserService.login(email, password);
      let user = {
        email: currUser.email,
        id: currUser.objectId,
      };

      dispatch(authSliceActions.setState(user));

      setEmail('');
      setPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPassChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  

  return (
    <form onSubmit={onLoginHandler}>
      <label>Email</label>
      <input onChange={onEmailChangeHandler} value={email} type="email" />
      <label>Pass</label>
      <input onChange={onPassChangeHandler} value={password} type="password" />
      <button>Login</button>
      <p>
        Don't have an account? <Link to="/register">Make one!</Link>
      </p>
    </form>
  );
};

export default Login;
