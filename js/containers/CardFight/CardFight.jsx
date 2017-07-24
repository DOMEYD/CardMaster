import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class CardFight extends Component {
  componentDidMount() {
    if (this.props.cardsSelected.length === 0) {
      this.props.history.push('/');
    }
  }
  render() {
    return <main>
      <section>
        { this.props.cardsSelected.map(card => <Card card={card} />) }
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