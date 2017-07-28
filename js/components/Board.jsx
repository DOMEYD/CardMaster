import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DraggableCard from './Card/DraggableCard';

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
    connectDropTarget: PropTypes.func,
    board: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  };

  static defaultProps = {
    board: null,
    connectDropTarget: null,
  };

  render() {
    const { connectDropTarget, board } = this.props;
    return connectDropTarget(<section className="board">
      {board ? board.map(card => <DraggableCard key={card.name} card={card} />) : null}
    </section>);
  }
}

function mapStateToProps(state) {
  return {
    board: state.board,
  };
}

export default connect(mapStateToProps)(Board);
