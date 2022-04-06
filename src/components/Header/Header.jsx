import block from "bem-cn";
import { useDispatch, useSelector } from "react-redux";

import './Header.scss';
import logo from '../../assets/images/logo.svg';
import { getActiveUser, getAuthStatus, removeActiveUser, setActiveUser } from "../App/App.slice";
import { useState } from "react";

const b = block('Header');

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const authStatus = useSelector(getAuthStatus);
  const activeUser = useSelector(getActiveUser);

  const handleLoginButton = () => {
    if (authStatus === 'guest') {
      setShowForm(true);
    } else {
      dispatch(removeActiveUser());
      dispatch(setActiveUser('guest'));
    }
  }

  return (
    <div className={b()}>
      <a className={b('logo')} href="/">
        <img className={b('logo-image')} src={logo} alt='Company logo' />
      </a>
      <ul className={b('menu')}>
        <li className={b('item')}>
          <button className={b('button')}>Главная</button>
        </li>
        <li className={b('item')}>
          <button className={b('button')}>Новости</button>
        </li>
        <li className={b('item')}>
          {(authStatus !== 'guest') ? <p className={b('user-name')}>{activeUser.name}</p> : null}
          <button
            className={b('button')}
            onClick={handleLoginButton}
          >
            {(authStatus !== 'guest') ? 'Выход' : 'Вход'}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Header;