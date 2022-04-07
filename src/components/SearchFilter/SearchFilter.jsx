import block from "bem-cn";
import { useState } from "react";

import './SearchFilter.scss';

const b = block('SearchFilter');

const SearchFilter = ({ filterHandler }) => {
  const [filterValue, setFilterValue] = useState('title');
  const [searchField, setSearchField] = useState('');

  const handleFilterChange = (evt) => {
    const target = evt.currentTarget;

    setFilterValue(target.value);
    filterHandler && filterHandler(target.value, searchField);
  }

  const handleSearchChange = (evt) => {
    const target = evt.currentTarget;

    setSearchField(target.value);
    filterHandler && filterHandler(filterValue, target.value);
  }

  return (
    <div className={b()}>
      <label className={b('label')} htmlFor="filter">Поиск новостей:</label>
      <input className={b('search')} type="text" id="filter" value={searchField} onChange={handleSearchChange} />
      <select className={b('filter')} value={filterValue} onChange={handleFilterChange}>
        <option className={b('option')} value="title">По заголовку</option>
        <option className={b('option')} value="text">По тексту</option>
        <option className={b('option')} value="date">По дате</option>
      </select>
    </div>
  )
}

export default SearchFilter;