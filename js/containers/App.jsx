import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Reducers
import cards from '../reducers/cards';
import cardsSelected from '../reducers/cardsSelected';
import board from '../reducers/board';
// Containers
import CardList from './CardList/CardList';
import CardFight from './CardFight/CardFight';

// Make the store
const store = createStore(combineReducers({
  cards,
  cardsSelected,
  board,
}), applyMiddleware(thunk));

class App extends Component {
  render() {
    return (<Provider store={store}>
      <Router>
        <Switch>
          <Route path="/fight" component={CardFight} />
          <Route path="/" component={CardList} />
        </Switch>
      </Router>
    </Provider>);
  }
}

export default App;
