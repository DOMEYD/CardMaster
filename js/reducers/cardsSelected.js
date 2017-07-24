const defaultValue = []

export default (state = defaultValue, action) => {
  switch (action.type) {
    case 'CARD_TOGGLE_SELECTION':
      return [...state, action.card];
    default:
      return state;
  }
}