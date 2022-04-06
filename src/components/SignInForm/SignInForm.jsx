import block from "bem-cn";
import { useState } from "react";

import './SignInForm.scss';

import users from '../../assets/data/users';

const b = block('SignInForm');

const SignInForm = ({ submitHandler }) => {
  const [nameField, setNameField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    setError('');

    const providedData = {
      name: nameField,
      password: passwordField,
    }

    const signInAttempt = users.find(user => providedData.name === user.name);

    if (!signInAttempt) {
      setError('Нет такого пользователя!');
      return false;
    };

    const passIsValid = providedData.password === signInAttempt.password ? true : false;

    if (!passIsValid) {
      setError('Пароль не верный!');
      return false;
    };

    submitHandler && submitHandler(signInAttempt);
    evt.currentTarget.reset();
  }

  const fieldChangeHandler = (evt) => {
    const target = evt.currentTarget;

    switch (target.name) {
      case "name":
        setNameField(target.value);
        break;
      case "password":
        setPasswordField(target.value);
        break;
      default:
        return false;
    }
  }

  return (
    <form className={b()} method="POST" onSubmit={handleFormSubmit}>
      <h2 className={b('title')}>Вход</h2>
      {error ? <p className={b('error')}>{error}</p> : null}
      <input
        className={b('input')}
        type="text" name="name"
        value={nameField}
        onChange={fieldChangeHandler}
        placeholder="Введите имя пользователя"
        autoComplete="off"
      />
      <input
        className={b('input')}
        type="password"
        name="password"
        value={passwordField}
        onChange={fieldChangeHandler}
        placeholder="Введите пароль"
        autoComplete="off"
      />
      <button className={b('button')} type="submit">Войти</button>
    </form>
  )
}

export default SignInForm;