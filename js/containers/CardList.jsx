import React, { Component } from 'react';
import {connect} from "react-redux";
import Card from "../components/Card/Card";
import { fetchCards } from "../actions/cards";

class CardList extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCards());
  }
  render() {
    const { cards } = this.props;
    return <div>
      {cards.isFetching ?
        <div><span className="loader"></span></div> :
        <ul>{cards.data.map(card => <li key={card.cardId}>
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