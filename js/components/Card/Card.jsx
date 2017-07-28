import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { diedCard } from '../../actions/cards';
import { connect } from 'react-redux';
import './style.scss';

class Card extends PureComponent {
  static propTypes = {
    card: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      health: PropTypes.number.isRequired,
      attq: PropTypes.number.isRequired,
    }).isRequired,
    minimal: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    minimal: false,
  };

  componentWillUpdate(newProps) {
    const { dispatch } = this.props;
    if (newProps.card.health <= 0) {
      setTimeout(() => dispatch(diedCard()), 200);
    }
  }

  render() {
    const { card, minimal } = this.props;

    return (<div className={`card${minimal ? ' small' : ''}${card.health <= 0 ? ' died' : ''}`}>
      <img src={card.img} className="figure" alt={`figure ${card.name}`} />
      <span className="card-name">{ card.name }</span>
      <div className="card-infos">
        <span className="info card-cost"><img src="../../../img/money-bag.svg" className="picto" alt="Card value" />{ card.value }</span>
        <span className="info card-health"><img src="../../../img/if_heart_299063.svg" className="picto" alt="Card health" />{ card.health }</span>
        <span className="info card-attq"><img src="../../../img/gaming.svg" className="picto" alt="Card attack" />{ card.attq }</span>
      </div>
    </div>);
  }
}

export default connect()(Card);
