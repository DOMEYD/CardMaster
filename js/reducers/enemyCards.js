import shuffle from 'shuffle-array';

const defaultValue = {
  data: shuffle(require('../../json/figure.json').figures, { copy: true }).slice(0, 5), // eslint-disable-line global-require
};

export default (state = defaultValue, action) => {
  switch (action.type) {
    case 'ENEMY_LOOSE_LIFE':
      const searchedCardIndex = state.data.indexOf(action.card);
      const searchedCard = state.data[searchedCardIndex];
      searchedCard.health -= action.amount;
      // return hand with less life card
      return Object.assign({}, state, {
        data: [
          ...state.data.slice(0, searchedCardIndex),
          Object.assign({}, searchedCard),
          ...state.data.slice(searchedCardIndex + 1),
        ],
      });
    case 'ENEMY_DIED':
      const index = state.data.indexOf(action.card);
      return Object.assign({}, state, {
        data: [
          ...state.data.slice(0, index),
          ...state.data.slice(index + 1),
        ],
      });
    default:
      return state;
  }
};
