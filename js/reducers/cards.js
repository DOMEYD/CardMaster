const defaultValue = {
  data: require('../../json/figure.json').figures, // eslint-disable-line global-require
};

export default (state = defaultValue, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
