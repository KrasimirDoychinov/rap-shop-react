import Backendless from 'backendless';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import DarkButton from '../components/DarkButton';
import useValidation from '../hooks/use-validation';
import { authSliceActions } from '../store/store';

const Login = () => {
  let [loginIsValid, setLoginIsValid] = useState(true);
  let history = useHistory();
  let dispatch = useDispatch();

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

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

  let formIsValid = false;

  if (
    email.trim().length >= 6 &&
    email.trim().includes('@') &&
    password.trim().length >= 6
  ) {
    formIsValid = true;
  }

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPassChangeHandler = (e) => {
    setPassword(e.target.value);
  };

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
    <form onSubmit={onSubmitHandler} className="container w-50 mt-3 p-5">
      <div className="form-group">
        {!loginIsValid && (
          <p className="text-danger">
            The user doesn't exist. The email and/or password may be incorrect.
          </p>
        )}
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
        {!formIsValid ? (
          <DarkButton isDisabled="true" text="LOGIN" />
        ) : (
          <DarkButton text="LOGIN" />
        )}
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="blue-text">
            Create one!
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
