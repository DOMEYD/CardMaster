import React, { Component } from 'react';
import { connect } from 'react-redux';
import shuffle from 'shuffle-array';
import { withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { PropTypes } from 'prop-types';
import DraggableCard from '../../components/Card/DraggableCard';
import Card from '../../components/Card/Card';
import Board from '../../components/Board';
import './style.scss';

@DragDropContext(HTML5Backend)
class CardFight extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(Card).isRequired,
    cardsSelected: PropTypes.arrayOf(Card).isRequired,
    history: PropTypes.objectOf({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      enemyHand: shuffle(props.cards.data, { copy: true }).slice(0, 5),
    };
  }
  componentDidMount() {
    if (this.props.cardsSelected.length === 0) {
      this.props.history.push('/');
    }
  }
  render() {
    const { enemyHand } = this.state;

    return (<main className="fight">
      <section className="enemy-board">
        { enemyHand ? enemyHand.map(card => <Card key={`enemy${card.name}`} card={card} />) : null }
      </section>
      <Board />
      <section className="hand">
        { this.props.cardsSelected.slice(0, 5).map(card => <DraggableCard key={`myHand${card.name}`} card={card} />) }
      </section>
    </main>);
  }
}

function mapStateToProps(state) {
  return {
    cardsSelected: state.cardsSelected,
    cards: state.cards,
  };
}

export default withRouter(connect(mapStateToProps)(CardFight));
