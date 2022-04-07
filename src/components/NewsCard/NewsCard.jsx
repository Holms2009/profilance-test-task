import block from "bem-cn";

import './NewsCard.scss';

const b = block('NewsCard');

const NewsCard = ({ card, authStatus, acceptHandler }) => {
  const clickHandler = (evt) => {
    const target = evt.currentTarget;

    if (target.id === 'accept') {
      acceptHandler && acceptHandler(card, true);
    }

    if (target.id === 'delete') {
      acceptHandler && acceptHandler(card, false);
    }
  }

  return (
    <article className={b()}>
      <h2 className={b('title')}>{card.title}</h2>
      <p className={b('text')}>{card.text}</p>
      <span className={b('date')}>{card.date}</span>
      {authStatus === "admin" && !card.accepted ?
        <>
          <button className={b('accept')} title="Одобрить новость" id="accept" onClick={clickHandler}></button>
          <button className={b('delete')} title="Удалить новость" id="delete" onClick={clickHandler}></button>
        </> :
        null}
    </article>
  )
}

export default NewsCard;