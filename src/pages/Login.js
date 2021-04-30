import Backendless from 'backendless';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../hooks/use-auth';
import { authSliceActions } from '../store/auth';

const Login = () => {
  let [loginIsValid, setLoginIsValid] = useState(true);
  let history = useHistory();
  let dispatch = useDispatch();
  let {
    email,
    password,
    setEmail,
    setPassword,
    onPassChangeHandler,
    onEmailChangeHandler,
    emailValid,
    passValid,
    onBlurEmail,
    onBlurPass,
  } = useAuth();

  let formIsValid = false;

  if (email.trim() != '' && password.trim() != '') {
    formIsValid = true;
  }

  const onSubmitHandler = async (e) => {
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
      history.push('/');

    } catch (error) {
      setLoginIsValid(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="container w-50 mt-5">
      <div className="form-group">
        {!loginIsValid && (
          <p className="text-danger">The user doesn't exist!</p>
        )}
        <label className="font-weight-bold">EMAIL</label>
        <input
          className="form-control"
          onChange={onEmailChangeHandler}
          onBlur={onBlurEmail}
          value={email}
          type="email"
        />
        {!emailValid && (
          <p className="text-danger">
            The email must contain 6 symbols and must be a valid email '@'
          </p>
        )}
        <label className="font-weight-bold">PASSWORD</label>
        <input
          className="form-control"
          onChange={onPassChangeHandler}
          onBlur={onBlurPass}
          value={password}
          type="password"
        />
        {!passValid && (
          <p className="text-danger">The password must contain 6 symbols</p>
        )}
        {!formIsValid ? (
          <button
            className="btn dark-btn mt-2 float-right font-weight-bold disabled"
            disabled
          >
            LOGIN
          </button>
        ) : (
          <button className="btn dark-btn mt-2 float-right font-weight-bold">
            LOGIN
          </button>
        )}
        <p>
          Don't have an account? <Link to="/register">Create one!</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
