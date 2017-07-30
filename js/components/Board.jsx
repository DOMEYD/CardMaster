import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DraggableCard from './Card/DraggableCard';
import './style.scss';

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
    isOver: PropTypes.bool,
  };

  static defaultProps = {
    board: null,
    isOver: false,
    connectDropTarget: null,
  };

  render() {
    const { connectDropTarget, board, isOver } = this.props;
    return connectDropTarget(<section className={`board ${isOver ? ' over' : ''}`}>
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
