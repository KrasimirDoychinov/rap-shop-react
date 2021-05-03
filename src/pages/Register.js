import Backendless from 'backendless';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import DarkButton from '../components/DarkButton';
import useValidation from '../hooks/use-validation';
import { authSliceActions } from '../store/store';

const Register = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [registerIsValid, setRegisterIsValid] = useState(true);
  let history = useHistory();

  let dispatch = useDispatch();

  let {
    onBlurHandler: emailBlurHandler,
    newMessage: emailMessage,
    inputIsValid: emailIsValid,
  } = useValidation(
    "The email must contain 6 symbols and must be a valid email '@'",
    () => email.trim().length >= 6 && email.trim().includes('@'),
  );

  let {
    onBlurHandler: passwordBlurHandler,
    newMessage: passwordMessage,
    inputIsValid: passwordIsValid,
  } = useValidation(
    'Password must contain 6 symbols.',
    () => password.trim().length >= 6,
  );

  let {
    onBlurHandler: confirmPasswordBlurHandler,
    newMessage: confirmPasswordMessage,
    inputIsValid: confirmPasswordIsValid,
  } = useValidation(
    'Both passwords must match',
    () => confirmPassword === password,
  );

  let formIsValid = false;

  if (
    email.trim().length >= 6 &&
    email.trim().includes('@') &&
    password.trim().length >= 6 &&
    password === confirmPassword
  ) {
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

      setEmail('');
      setPassword('');
      setConfirmPassword('');
      history.push('/');
    } catch (error) {
      setRegisterIsValid(false);
      Backendless.UserService.logout();
    }
  };

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPassChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPassChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <form onSubmit={onRegisterHandler} className="container w-50 mt-3 p-5">
      <div className="form-group">
        {!registerIsValid && <p className="text-danger">User already exists</p>}
        <label className="font-weight-bold ">EMAIL</label>
        <input
          className="form-control mb-2"
          onChange={onEmailChangeHandler}
          onBlur={emailBlurHandler}
          value={email}
          type="email"
        />
        {!emailIsValid && <p className="text-danger">{emailMessage}</p>}
        <label className="font-weight-bold ">PASSWORD</label>
        <input
          className="form-control mb-2"
          onChange={onPassChangeHandler}
          onBlur={passwordBlurHandler}
          value={password}
          type="password"
        />
        {!passwordIsValid && <p className="text-danger">{passwordMessage}</p>}
        <label className="font-weight-bold ">CONFIRM PASSWORD</label>
        <input
          className="form-control mb-2"
          onChange={onConfirmPassChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          value={confirmPassword}
          type="password"
        />
        {!confirmPasswordIsValid && (
          <p className="text-danger">{confirmPasswordMessage}</p>
        )}
        {!formIsValid ? (
          <DarkButton isDisabled="true" text="REGISTER" />
        ) : (
          <DarkButton text="REGISTER" />
        )}
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-decoration-none blue-text">
            Login!
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
