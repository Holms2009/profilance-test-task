import block from "bem-cn";
import { useDispatch, useSelector } from "react-redux";

import './NewsBlock.scss';

import { getNews } from "./NewsBlock.slice";
import NewsCard from "../NewsCard/NewsCard";

const b = block('NewsBlock');

const NewsBlock = () => {
  const dispatch = useDispatch();
  const news = useSelector(getNews);

  return (
    <div className={b()}>
      <h1>Новости:</h1>
      <div className={b('cards')}>
        {news.map((item, index) => (
          <NewsCard title={item.title} text={item.text} date={item.date.toLocaleString()} key={index} />
        ))}
      </div>

    </div>
  )
}

export default NewsBlock;