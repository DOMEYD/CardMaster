import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { moveToBoard } from '../../actions/cards';
import Card from './Card';
import './style.scss';

const cardSource = {
  beginDrag() {
    return {};
  },
  endDrag(props, monitor) {
    // if target handled
    if (!monitor.didDrop() || props.card.isOnboard) {
      return;
    }
    // retrieve data from dest
    const destResponse = monitor.getDropResult();
    // dispatch request to move card from hand to board
    if (destResponse.type === 'BOARD') {
      props.dispatch(moveToBoard(props.card));
    }
  },
};

function collect(conct, monitor) {
  return {
    connectDragSource: conct.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

@DragSource('card', cardSource, collect)
class DraggableCard extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func,
  };

  static defaultProps = {
    connectDragSource: null,
  };

  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(<div><Card {...this.props} /></div>);
  }
}

export default connect()(DraggableCard);
