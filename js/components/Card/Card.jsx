import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { diedCard } from '../../actions/cards';
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
    selected: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    minimal: false,
    selected: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  componentWillUpdate(newProps) {
    const { dispatch } = this.props;
    if (newProps.card.health <= 0) {
      setTimeout(() => dispatch(diedCard(newProps.card)), 200);
    }
  }

  render() {
    const { card, minimal, selected } = this.props;

    return (<div className={`card${minimal ? ' small' : ''}${card.health <= 0 ? ' died' : ''}${selected ? ' selected' : ''}`}>
      <img src={card.img} className="figure" alt={`figure ${card.name}`} />
      <span className="card-name">{ card.name }</span>
      <div className="card-infos">
        <span className="info card-cost"><img src="../../../img/money-bag.svg" className="picto" alt="Card value" />{ card.value }</span>
        <span className="info card-health"><img src="../../../img/if_heart_299063.svg" className="picto" alt="Card health" />{ card.health }</span>
        <span className="info card-attq"><img src="../../../img/gaming.svg" className="picto" alt="Card attack" />{ card.attq }</span>
      </div>
      <a href="#" onClick={() => this.setState({ modal: true })}>
        show details
      </a>
      {this.state.modal ? <Modal
        isOpen={this.state.modal}
        onRequestClose={() => this.setState({ modal: false })}
        style={{
          content: {
            maxWidth: '50vw',
            height: 'auto',
            margin: 'auto',
          },
        }}
      >
        <h2>{card.name}</h2>
      </Modal> : null}
    </div>);
  }
}

export default connect()(Card);
