import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import { PropTypes } from 'prop-types';
import DraggableCard from '../../components/Card/DraggableCard';
import Loader from '../../components/Loader/Loader';
import Board from '../../components/Board';
import EnemyCard from '../../components/Card/EnemyCard';
import FinalTaunt from '../../components/FinalTaunt/FinalTaunt';
import { endGame, startGame } from '../../actions/game';
import './style.scss';

@DragDropContext(TouchBackend({ enableMouseEvents: true }))
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
    endingGame: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    game: PropTypes.shape({
      loadingWinner: PropTypes.bool.isRequired,
      winner: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    if (this.props.cardsSelected.length === 0) {
      this.props.history.push('/');
    }
    this.props.startGame();
  }

  componentWillUpdate(nextProps) {
    if (this.props.enemyCards.length > 0 && nextProps.enemyCards.length <= 0) {
      this.props.endingGame();
    }
    if (!this.props.game.winner && nextProps.game.winner) {
      setTimeout(() => this.props.history.push('/'), 4000);
    }
  }

  render() {
    const { enemyCards } = this.props;

    return (<main className="fight">
      <section className="enemy-board">
        { enemyCards ? enemyCards.map((card, k) => (
          <EnemyCard key={`enemy${card.name}`} card={card} taunt={k === 0} />
        )) : null }
      </section>
      <Board />
      <section className="hand">
        { this.props.cardsSelected.slice(0, 5).map((card, k) => (
          <DraggableCard key={`myHand${card.name}`} card={card} taunt={k === 0} />
        )) }
      </section>
      { this.props.game.loadingWinner ? <Loader /> : null }
      { this.props.game.winner !== false ? (
        <FinalTaunt winnerType={this.props.game.winner} />
      ) : null }
    </main>);
  }
}

function mapStateToProps(state) {
  return {
    cardsSelected: state.cardsSelected,
    cards: state.cards.data,
    enemyCards: state.enemyCards.data,
    game: state.game,
  };
}

const mapDispatchToProps = dispatch => ({
  endingGame: () => dispatch(endGame()),
  startGame: () => dispatch(startGame()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardFight));
