import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import autobind from 'autobind-decorator';
import { PropTypes } from 'prop-types';
import Card from '../../components/Card/Card';
import { removeCard, addCard } from '../../actions/cards';
import './style.scss';

class CardList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    cards: PropTypes.shape({
      data: PropTypes.array.isRequired,
    }).isRequired,
    cardsSelected: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: {
        amounts: [],
      },
    };
  }

  /**
   * Set filter for cards
   * @param e
   */
  @autobind
  filterCards(e) {
    const { ammounts } = this.state.filter.amounts;
    const index = ammounts.indexOf(e.currentTarget.value);
    if (index > -1) {
      // suppress item
      this.setState({
        filter: {
          amounts: [
            ...ammounts.slice(0, index),
            ...ammounts.slice(index + 1),
          ],
        },
      });
    } else {
      // add item
      this.setState({
        filter: {
          amounts: [...ammounts, e.currentTarget.value],
        },
      });
    }
  }

  /**
   * Return card
   * if filter set, return only filtered cards
   */
  cards = () => {
    let cards = this.props.cards.data;
    const { amounts } = this.state.filter;

    if (amounts.length > 0) {
      cards = cards.filter(card => amounts.indexOf(card.value ? card.value.toString() : '0') > -1);
    }

    return cards;
  }

  @autobind
  toggleCardSelection(card) {
    this.props.dispatch(addCard(card));
  }

  @autobind
  removeCardFromSelection(card) {
    this.props.dispatch(removeCard(card));
  }

  render() {
    return (<div className="card-list-container">
      <ul className="card-list">
        { this.cards().map(card => (
          <li key={card.name}>
            <a href="#" onClick={() => this.toggleCardSelection(card)}>
              <Card card={card} />
            </a>
          </li>
        )) }
      </ul>
      <aside>
        <section>
          <header>Filter</header>
          <div>
            {(new Array(9)).fill(0).map((k, i) => (
              <label key={`value${i + 1}`} htmlFor={`value${i + 1}`}>
                <input type="checkbox" name="value" id={`value${i + 1}`} value={i + 1} onChange={this.filterCards} />
                {i + 1}
              </label>
            ))}
          </div>
        </section>
        <section className="selected-cards">
          <ul>
            { this.props.cardsSelected.map(selected => (
              <li key={selected.name}>
                <a href="#" onClick={() => this.removeCardFromSelection(selected)}>
                  <Card card={selected} minimal />
                </a>
              </li>
            )) }
          </ul>
        </section>
        <Link to="/fight" className="fight-btn">FIGHT !</Link>
      </aside>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
    cardsSelected: state.cardsSelected,
  };
}

export default connect(mapStateToProps)(CardList);
