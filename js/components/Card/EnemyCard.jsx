import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { DropTarget } from 'react-dnd';
import Card from './Card';

const enemyTarget = {
  drop(props) {
    return {
      type: 'ENEMY',
      card: props.card,
    };
  },
};

@DropTarget('card', enemyTarget, (con, monitor) => ({
  connectDropTarget: con.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
class EnemyCard extends Component {
  static propTypes = {
    card: PropTypes.shape().isRequired,
    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool,
  };

  static defaultProps = {
    connectDropTarget: null,
    isOver: false,
  };

  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(<div className={`enemy-card${isOver ? ' over' : ''}`}>
      <Card card={this.props.card} {...this.props} />
    </div>);
  }
}

export default EnemyCard;
