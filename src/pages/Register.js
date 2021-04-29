import Backendless from 'backendless';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authSliceActions } from '../store/auth';

const Register = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPass, setConfirmPass] = useState('');
  let dispatch = useDispatch();

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
      alert(error.message);
      Backendless.UserService.logout();
    }

    setEmail('');
    setPassword('');
  };

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPassChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPassChangeHandler = (e) => {
    setConfirmPass(e.target.value);
  };

  return (
    <form onSubmit={onRegisterHandler}>
      <label>Email</label>
      <input onChange={onEmailChangeHandler} value={email} type="email" />
      <label>Pass</label>
      <input onChange={onPassChangeHandler} value={password} type="password" />
      <label>Confirm password</label>
      <input
        onChange={onConfirmPassChangeHandler}
        value={confirmPass}
        type="password"
      />
      <button>Register</button>
      <p>
        Already have an account <Link to="/login">Login!</Link>
      </p>
    </form>
  );
};

export default Register;
