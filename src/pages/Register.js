import Backendless from 'backendless';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../hooks/use-auth';
import { authSliceActions } from '../store/auth';

const Register = () => {
  let [confirmPass, setConfirmPass] = useState('');
  let [confirmPassValid, setConfirmPassValid] = useState(true);
  let [registerIsValid, setRegisterIsValid] = useState(true);
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

  if (email.trim() != '' && password.trim() != '' && password === confirmPass) {
    formIsValid = true;
  }

  const onRegisterHandler = async (e) => {
    e.preventDefault();

    let newUser = new Backendless.User();
    newUser.email = email;
    newUser.password = password;

    try {
      let currUser = await Backendless.UserService.register(newUser);
      await Backendless.UserService.login(
        newUser.email,
        newUser.password,
        true,
      );

      let user = {
        id: currUser.objectId,
        email: currUser.email,
      };
      dispatch(authSliceActions.setState(user));
    } catch (error) {
      setRegisterIsValid(false);
      Backendless.UserService.logout();
    }

    setEmail('');
    setPassword('');
    setConfirmPass('');
    history.push('/');
  };

  const onConfirmPassChangeHandler = (e) => {
    setConfirmPass(e.target.value);
  };

  const onBlurConfirmPass = () => {
    if (confirmPass.trim() !== password.trim()) {
      return setConfirmPassValid(false);
    }

    setConfirmPassValid(true);
  };

  return (
    <form onSubmit={onRegisterHandler} className="container w-50 mt-5">
      <div className="form-group">
        {!registerIsValid && (
          <p className="text-danger">User already exists</p>
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
        <label className="font-weight-bold">CONFIRM PASSWORD</label>
        <input
          className="form-control"
          onChange={onConfirmPassChangeHandler}
          onBlur={onBlurConfirmPass}
          value={confirmPass}
          type="password"
        />
        {!confirmPassValid && (
          <p className="text-danger">The two passwords must match</p>
        )}
        {!formIsValid ? (
          <button
            className="btn dark-btn mt-2 float-right font-weight-bold disabled"
            disabled
          >
            REGISTER
          </button>
        ) : (
          <button className="btn dark-btn mt-2 float-right font-weight-bold">
            REGISTER
          </button>
        )}
        <p>
          Already have an account? <Link to="/login">Login!</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
