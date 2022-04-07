import block from "bem-cn";
import { useDispatch, useSelector } from "react-redux";

import './NewsBlock.scss';

import { getNews, setNews } from "./NewsBlock.slice";
import { getAuthStatus } from "../App/App.slice";
import NewsCard from "../NewsCard/NewsCard";
import { useState } from "react";

const b = block('NewsBlock');

const NewsBlock = () => {
  const [showForm, setShowForm] = useState(false);
  const [titleField, setTitleField] = useState('');
  const [textField, setTextfield] = useState('');

  const dispatch = useDispatch();
  const news = useSelector(getNews);
  const authStatus = useSelector(getAuthStatus);

  const handleChange = (evt) => {
    const target = evt.currentTarget;

    switch (target.name) {
      case 'title':
        setTitleField(target.value);
        break;
      case 'text':
        setTextfield(target.value);
        break;
      default:
        return false;
    }
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const providedData = {
      title: titleField,
      text: textField,
      date: new Date().toDateString(),
      accepted: false
    }

    dispatch(setNews([...news, providedData]));
    setTitleField('');
    setTextfield('');
    setShowForm(false);
  }

  return (
    <div className={b()}>
      <h1>Новости:</h1>
      <div className={b('cards')}>
        {news.map((item, index) => (
          <NewsCard
            title={item.title}
            text={item.text}
            date={item.date}
            accepted={item.accepted}
            key={index}
            authStatus={authStatus}
          />
        ))}
        {authStatus === 'user' ?
          <div className={b('add-card-wrapper')}>
            {!showForm ?
              <span className={b('add-card')} title="Добавить новость" onClick={() => setShowForm(true)}></span> :
              <form className={b('form')} onSubmit={handleFormSubmit}>
                <h2 className={b('form-title')}>Добавить новость:</h2>
                <input
                  className={b('form-input')}
                  type="text"
                  name="title"
                  placeholder="Заголовок"
                  value={titleField}
                  onChange={handleChange}
                />
                <textarea
                  className={b('form-textarea')}
                  type="text"
                  name="text"
                  rows='4'
                  placeholder="Текст новости"
                  value={textField}
                  onChange={handleChange}
                />
                <button className={b('form-button')} type="submit">Добавить</button>
              </form>}
          </div> :
          null}
      </div>
    </div>
  )
}

export default NewsBlock;