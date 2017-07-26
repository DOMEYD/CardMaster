const defaultValue = [];

export default (state = defaultValue, action) => {
  switch (action.type) {
    case 'CARD_REMOVE_SELECTION':
      const index = state.indexOf(action.card);
      return state.slice(0, index).concat(state.slice(index + 1));
    case 'CARD_ADD_SELECTION':
      return [...state, action.card];
    default:
      return state;
  }
};
