import block from "bem-cn";

import './NewsCard.scss';

const b = block('NewsCard');

const NewsCard = ({ title, text, date, authStatus, accepted }) => {
  return (
    <article className={b()}>
      <h2 className={b('title')}>{title}</h2>
      <p className={b('text')}>{text}</p>
      <span className={b('date')}>{date}</span>
      {authStatus === "admin" && !accepted ?
        <>
          <button className={b('accept')} title="Одобрить новость"></button>
          <button className={b('delete')} title="Удалить новость"></button>
        </> :
        null}
    </article>
  )
}

export default NewsCard;