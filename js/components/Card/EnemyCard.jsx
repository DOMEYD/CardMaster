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
  canDrop(props, monitor) {
    const item = monitor.getItem();
    // prevent not onboard to fight enemy card
    if (!item.onboard) {
      return false;
    }
    // prevent angel to fight good guys
    if (item.type === 'angel' && props.card.type !== 'demon' && props.card.type !== 'fighter') {
      return false;
    }
    // prevent villager to fight to angel
    if (item.type === 'villager' && props.card.type === 'angel') {
      return false;
    }
    return true;
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
    canDrop: PropTypes.bool,
  };

  static defaultProps = {
    connectDropTarget: null,
    isOver: false,
    canDrop: false,
  };

  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(<div className={`enemy-card${isOver ? ' over' : ''}${canDrop ? '' : ' not-drop'}`}>
      <Card card={this.props.card} {...this.props} />
    </div>);
  }
}

export default EnemyCard;
