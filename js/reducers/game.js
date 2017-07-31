const defaultValue = {
  winner: false,
  loadingWinner: false,
};

export default (state = defaultValue, action) => {
  switch (action.type) {
    case 'GAME_ENDING':
      return Object.assign({}, state, { loadingWinner: true });
    case 'GAME_WINNER_IS':
      return Object.assign({}, state, {
        loadingWinner: false,
        winner: action.winner,
      });
    case 'GAME_START':
      return Object.assign({}, defaultValue);
    default:
      return state;
  }
};
