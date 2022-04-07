import block from "bem-cn";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import './Header.scss';
import logo from '../../assets/images/logo.svg';

import { getActiveUser, getAuthStatus, removeActiveUser, setActiveUser, setAuthStatus } from "../App/App.slice";
import SignInForm from "../SignInForm/SignInForm";

const b = block('Header');

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const authStatus = useSelector(getAuthStatus);
  const activeUser = useSelector(getActiveUser);

  const handleLoginButton = () => {
    if (authStatus === 'guest') {
      setShowForm(!showForm);
    } else {
      dispatch(setAuthStatus('guest'));
      dispatch(removeActiveUser());
    }
  }

  const handleSignIn = (data) => {
    dispatch(setAuthStatus(data.status));
    dispatch(setActiveUser(data));
    setShowForm(false);
  }

  return (
    <div className={b()}>
      <Link className={b('logo')} to="/">
        <img className={b('logo-image')} src={logo} alt='Company logo' />
      </Link>
      <ul className={b('menu')}>
        <li className={b('item')}>
          <Link className={b('button')} to='/'>Главная</Link>
        </li>
        <li className={b('item')}>
          <Link className={b('button')} to='/news'>Новости</Link>
        </li>
        <li className={b('item')}>
          {authStatus !== 'guest' ? <p className={b('user-name')}>{activeUser?.name}</p> : null}
          <button
            className={b('button')}
            onClick={handleLoginButton}
          >
            {authStatus !== 'guest' ? 'Выход' : 'Вход'}
          </button>
        </li>
      </ul>
      {showForm ? <SignInForm submitHandler={handleSignIn} /> : null}
    </div>
  )
}

export default Header;