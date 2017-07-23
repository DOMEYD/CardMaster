import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
// Reducers
import cards from '../reducers/cards';
// Containers
import CardList from "../containers/CardList";

// Make the store
const store = createStore(combineReducers({
  cards,
}));

class App extends Component {
  render () {
    return (<Provider store={store}>
      <CardList />
    </Provider>)
  }
}

export default App;