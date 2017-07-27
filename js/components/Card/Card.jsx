import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import './style.scss';

class Card extends PureComponent {
  static propTypes = {
    card: PropTypes.Card.isRequired,
    minimal: PropTypes.boolean,
  };

  render() {
    const { card, minimal } = this.props;

    return (<div className={`card${minimal ? ' small' : ''}`}>
      <img src={card.img} className="figure" />
      <span className="card-name">{ card.name }</span>
      <div className="card-infos">
        <span className="info card-cost"><img src="../../../img/money-bag.svg" className="picto" alt="Card value" />{ card.value }</span>
        <span className="info card-health"><img src="../../../img/if_heart_299063.svg" className="picto" alt="Card health" />{ card.health }</span>
        <span className="info card-attq"><img src="../../../img/gaming.svg" className="picto" alt="Card attack" />{ card.attq }</span>
      </div>
    </div>);
  }
}

export default Card;
