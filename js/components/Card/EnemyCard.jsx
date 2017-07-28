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
  };

  static defaultProps = {
    connectDropTarget: null,
  };

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(<div><Card card={this.props.card} /></div>);
  }
}

export default EnemyCard;
