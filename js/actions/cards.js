export const CARD_FETCHING = {
  type: 'CARD_FETCHING',
};

export const fetchCards = () => (dispatch) => {
  dispatch(CARD_FETCHING);
  const cards = require('../../json/figure.json');
  dispatch({
    type: 'CARD_DATA_RECEIVE',
    payload: cards.figures,
  });
};

export const addCard = (card) => {
  return {
    type: 'CARD_ADD_SELECTION',
    card,
  };
};

export const removeCard = (card) => {
  return {
    type: 'CARD_REMOVE_SELECTION',
    card,
  };
};

export const moveToBoard = (card) => {
  return (dispatch) => {
    dispatch(removeCard(card));
    dispatch({
      type: 'CARD_ADD_BOARD',
      card,
    });
  };
};
