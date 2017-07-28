export const CARD_FETCHING = {
  type: 'CARD_FETCHING',
};

export const addCard = card => ({
  type: 'CARD_ADD_SELECTION',
  card,
});

export const removeCard = card => ({
  type: 'CARD_REMOVE_SELECTION',
  card,
});

export const moveToBoard = card => (dispatch) => {
  dispatch(removeCard(card));
  dispatch({
    type: 'CARD_ADD_BOARD',
    card,
  });
};

export const fightCard = (fighter, defender) => (dispatch) => {
  dispatch({
    type: 'ENEMY_LOOSE_LIFE',
    card: defender,
    amount: fighter.attq,
  });
};
