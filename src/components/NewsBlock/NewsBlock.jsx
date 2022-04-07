import block from "bem-cn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './NewsBlock.scss';

import { getNews, setNews } from "./NewsBlock.slice";
import { getAuthStatus } from "../App/App.slice";
import NewsCard from "../NewsCard/NewsCard";
import SearchFilter from "../SearchFilter/SearchFilter";
import cardsFilter from '../../utils/cardsFilter';

const b = block('NewsBlock');

const NewsBlock = () => {
  const [showForm, setShowForm] = useState(false);
  const [titleField, setTitleField] = useState('');
  const [textField, setTextfield] = useState('');
  const [currentFIlter, setCurrentFilter] = useState({ type: 'title', value: '' })

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

  const handleCardAcceptance = (card, result) => {
    const updatedNews = [...news];

    if (result) {
      const updatedCard = {};

      Object.assign(updatedCard, card);
      updatedCard.accepted = true;
      updatedNews[updatedNews.indexOf(card)] = updatedCard;
    } else {
      const cardIndex = news.indexOf(card);

      updatedNews.splice(cardIndex, 1);
    }

    dispatch(setNews(updatedNews));
  }

  const filterHandler = (type, value) => {
    const updatedFilter = { type, value };
    setCurrentFilter(updatedFilter);
  }

  return (
    <div className={b()}>
      <div className={b('header')}>
        <h1 className={b('title')}>Новости:</h1>
        <SearchFilter filterHandler={filterHandler} />
      </div>
      <div className={b('cards')}>
        {cardsFilter(news, currentFIlter).map((item, index) => {
          if (authStatus === 'guest' && !item.accepted) return null;

          return (
            <NewsCard
              card={item}
              key={index}
              authStatus={authStatus}
              acceptHandler={handleCardAcceptance}
            />
          )
        })}
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