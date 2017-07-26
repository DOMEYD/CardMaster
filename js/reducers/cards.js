const defaultValue = {
  isFetching: false,
  data: [],
};

export default (state = defaultValue, action) => {
  switch (action.type) {
    case 'CARD_FETCHING':
      return Object.assign({}, state, { isFetching: true });
    case 'CARD_DATA_RECEIVE':
      return Object.assign({}, state, { isFetching: false, data: action.payload });
    default:
      return state;
  }
};
