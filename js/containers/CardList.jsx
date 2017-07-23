import React, { Component } from 'react';
import {connect} from "react-redux";
import Card from "../components/Card/component";

class CardList extends Component {
  render() {
    const { cards } = this.props;
    return <ul>
      {cards.map(card => <li key={card.id}>
        <Card card={card} />
      </li>)}
    </ul>
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
  }
}

export default connect(mapStateToProps)(CardList);