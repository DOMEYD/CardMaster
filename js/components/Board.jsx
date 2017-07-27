import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from './Card/Card';

const boardTarget = {
  drop() {
    return {
      type: 'BOARD',
    };
  },
};

@DropTarget('card', boardTarget, (con, monitor) => ({
  connectDropTarget: con.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
class Board extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    board: PropTypes.arrayOf(Card),
  }
  render() {
    const { connectDropTarget, board } = this.props;
    return connectDropTarget(<section className="board">
      {board ? board.map(card => <Card key={card.name} card={card} />) : null}
    </section>);
  }
}

function mapStateToProps(state) {
  return {
    board: state.board,
  };
}

export default connect(mapStateToProps)(Board);
