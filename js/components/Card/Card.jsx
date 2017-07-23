import React, { PureComponent } from 'react';

class Card extends PureComponent {
  render() {
    const { card } = this.props;

    return <div>
      { card.name }
    </div>
  }
}

export default Card;