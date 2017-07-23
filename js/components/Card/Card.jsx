import React, { PureComponent } from 'react';
import './style.scss';

class Card extends PureComponent {
  render() {
    const { card } = this.props;

    return <div className="card">
      <img src={card.img} />
      {/*<span className="card-name">{ card.name }</span>*/}
    </div>
  }
}

export default Card;