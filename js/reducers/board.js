const defaultValue = [];

export default (state = defaultValue, action) => {
  switch (action.type) {
    case 'CARD_ADD_BOARD':
      const movedCard = action.card;
      movedCard.isOnboard = true;
      return [...state, movedCard];
    default:
      return state;
  }
};
