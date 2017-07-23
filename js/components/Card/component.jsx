import React, { PureComponent } from 'react';

class Card extends PureComponent {
  render() {
    return <div>
      {this.props.card.id}
    </div>
  }
}

export default Card;