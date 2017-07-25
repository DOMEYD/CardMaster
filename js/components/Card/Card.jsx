import React, { PureComponent } from 'react';
import './style.scss';

class Card extends PureComponent {
  render() {
    const { card, minimal } = this.props;

    return <div className={`card`+(minimal ? ' small' : '')}>
      <img src={card.img} className="figure" />
      <span className="card-name">{ card.name }</span>
      <div className="card-infos">
        <span className="info card-cost"><img src="../../../img/money-bag.svg" className="picto" />{ card.value }</span>
        <span className="info card-health"><img src="../../../img/if_heart_299063.svg" className="picto" />{ card.health }</span>
        <span className="info card-attq"><img src="../../../img/gaming.svg" className="picto" />{ card.attq }</span>
      </div>
    </div>
  }
}

export default Card;