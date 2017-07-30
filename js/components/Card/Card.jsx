import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import autobind from 'autobind-decorator';
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

  @autobind
  openMore(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ modal: true });
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

      <button className="more" onClick={this.openMore}>
        show details
      </button>

      {this.state.modal ? <Modal
        isOpen={this.state.modal}
        onRequestClose={() => this.setState({ modal: false })}
        className="card-modal"
        contentLabel="card data"
      >
        <h2 className="card-name">{card.name}</h2>
        <p className="info card-cost">
          <img src="../../../img/money-bag.svg" className="picto" alt="Card value" />
          { card.value }
        </p>
        <p className="info card-health">
          <img src="../../../img/if_heart_299063.svg" className="picto" alt="Card health" />
          { card.health }
        </p>
        <p className="info card-attq">
          <img src="../../../img/gaming.svg" className="picto" alt="Card attack" />
          { card.attq }
        </p>
      </Modal> : null}
    </div>);
  }
}

export default connect()(Card);
