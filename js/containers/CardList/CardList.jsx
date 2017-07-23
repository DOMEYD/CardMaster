import React, { Component } from 'react';
import {connect} from 'react-redux';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import { fetchCards } from "../../actions/cards";
import './style.scss';

class CardList extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCards());
  }
  render() {
    const { cards } = this.props;
    return <div>
      {cards.isFetching ?
        <Loader /> :
        <ul className="card-list-container">
          {cards.data.map(card => <li key={card.cardId}>
            <Card card={card} />
          </li>)}
        </ul>}
    </div>
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
  }
}

export default connect(mapStateToProps)(CardList);