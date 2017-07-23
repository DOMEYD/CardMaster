import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
// Reducers
import cards from '../reducers/cards';
// Containers
import CardList from "../containers/CardList";

// Make the store
const store = createStore(combineReducers({
  cards,
}), applyMiddleware(thunk));

class App extends Component {
  render () {
    return (<Provider store={store}>
      <CardList />
    </Provider>)
  }
}

export default App;