export const CARD_FETCHING = {
  type: 'CARD_FETCHING',
};

export const fetchCards = () => dispatch => {
  dispatch(CARD_FETCHING);
  const cards = require('../../json/figure.json');
  dispatch({
    type: 'CARD_DATA_RECEIVE',
    payload: cards.figures,
  })
};

export const toggleCard = (card) => {
  return {
    type: 'CARD_TOGGLE_SELECTION',
    card,
  }
};
