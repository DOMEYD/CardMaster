import React, { Component } from 'react';
import DraggableCard from '../../components/Card/DraggableCard';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './style.scss';
import Board from "../../components/Board";

@DragDropContext(HTML5Backend)
class CardFight extends Component {
  componentDidMount() {
    if (this.props.cardsSelected.length === 0) {
      this.props.history.push('/');
    }
  }
  render() {
    return <main className="fight">
      <section className="hand"></section>
      <Board/>
      <section className="hand">
        { this.props.cardsSelected.slice(0,5).map(card => <DraggableCard key={card.name} card={card} />) }
      </section>
    </main>
  }
}

function mapStateToProps(state) {
  return {
    cardsSelected: state.cardsSelected,
  }
}

export default withRouter(connect(mapStateToProps)(CardFight));