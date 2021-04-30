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
      let currUser = await Backendless.UserService.login(email, password, true);
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
    <form onSubmit={onLoginHandler} className="container w-50 mt-5">
      <div className="form-group">
        <label className="font-weight-bold">EMAIL</label>
        <input
          className="form-control"
          onChange={onEmailChangeHandler}
          value={email}
          type="email"
        />
        <label className="font-weight-bold">PASSWORD</label>
        <input
          className="form-control"
          onChange={onPassChangeHandler}
          value={password}
          type="password"
        />
        <button className="btn dark-btn mt-2 float-right font-weight-bold">
          LOGIN
        </button>
        <p>
          Don't have an account? <Link to="/register">Create one!</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
