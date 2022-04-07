function cardsFilter(cards, filter) {
  const result = cards.filter(card => card[filter.type].indexOf(filter.value) !== -1);

  return result;
}

export default cardsFilter;