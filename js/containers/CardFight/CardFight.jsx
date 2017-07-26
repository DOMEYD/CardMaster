import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './style.scss';

class CardFight extends Component {
  componentDidMount() {
    if (this.props.cardsSelected.length === 0) {
      this.props.history.push('/');
    }
  }
  render() {
    return <main className="fight">
      <section className="hand"></section>
      <section className="board"></section>
      <section className="hand">
        { this.props.cardsSelected.slice(0,5).map(card => <Card card={card} />) }
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