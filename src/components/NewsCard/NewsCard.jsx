import block from "bem-cn";

import './NewsCard.scss';

const b = block('NewsCard');

const NewsCard = ({ title, text, date }) => {
  return (
    <article className={b()}>
      <h2 className={b('title')}>{title}</h2>
      <p className={b('text')}>{text}</p>
      <span className={b('date')}>{date}</span>
    </article>
  )
}

export default NewsCard;