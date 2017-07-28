import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { PropTypes } from 'prop-types';
import DraggableCard from '../../components/Card/DraggableCard';
import Board from '../../components/Board';
import EnemyCard from '../../components/Card/EnemyCard';
import './style.scss';

@DragDropContext(HTML5Backend)
class CardFight extends Component {
  static propTypes = {
    cardsSelected: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
    enemyCards: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    if (this.props.cardsSelected.length === 0) {
      this.props.history.push('/');
    }
  }

  render() {
    const { enemyCards } = this.props;

    return (<main className="fight">
      <section className="enemy-board">
        { enemyCards ? enemyCards.map(card => <EnemyCard key={`enemy${card.name}`} card={card} />) : null }
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
    cards: state.cards.data,
    enemyCards: state.enemyCards.data,
  };
}

export default withRouter(connect(mapStateToProps)(CardFight));
