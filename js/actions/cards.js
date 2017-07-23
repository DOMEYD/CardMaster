export const CARD_FETCHING = {
  type: 'CARD_FETCHING',
};

export const fetchCards = () => dispatch => {
  dispatch(CARD_FETCHING);

  return fetch('https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1&locale=frFR', {
    headers: {
      'X-Mashape-Key': 'Dj3yLxYpbEmshaBbOSuWbGc0Hgncp1RPKuzjsnrQ18SrbDDkcS'
    }
  })
    .then(response => response.json())
    .then(payload => dispatch({
      type: 'CARD_DATA_RECEIVE',
      payload,
    }))
};