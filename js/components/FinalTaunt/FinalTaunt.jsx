import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class FinalTaunt extends Component {
  static propTypes = {
    winnerType: PropTypes.string.isRequired,
  };

  render() {
    return (<div className="final-taunt">
      <p>
        { this.props.winnerType === 'player' ? 'Hahaha! Vous êtes mort!' : 'Toujours vivant ! Toujours debout !' }
      </p>
    </div>);
  }
}

export default FinalTaunt;
