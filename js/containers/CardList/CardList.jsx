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
    cards: PropTypes.shape({
      data: PropTypes.array.isRequired,
    }).isRequired,
    cardsSelected: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
    addCardToSelection: PropTypes.func.isRequired,
    removeCardFromSelection: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: {
        amounts: [],
        health: [],
        attq: [],
      },
    };
  }

  /**
   * Set filter for cards
   * @param e
   */
  @autobind
  filterCards(e) {
    const filterName = e.currentTarget.name;
    if (!['amounts', 'health', 'attq'].indexOf(filterName)) {
      // Prevent add not handled filter
      return;
    }
    const filter = this.state.filter[filterName];
    const index = filter.indexOf(e.currentTarget.value);
    if (index > -1) {
      // suppress item
      this.setState({
        filter: Object.assign({}, this.state.filter, {
          [filterName]: [
            ...filter.slice(0, index),
            ...filter.slice(index + 1),
          ],
        }),
      });
    } else {
      // add item
      this.setState({
        filter: Object.assign({}, this.state.filter, {
          [filterName]: [...filter, e.currentTarget.value],
        }),
      });
    }
  }

  /**
   * Return card
   * if filter set, return only filtered cards
   */
  cards = () => {
    const cards = this.props.cards.data;
    const { amounts, health, attq } = this.state.filter;

    return cards.filter((card) => {
      if (amounts.length > 0 && amounts.indexOf(card.value ? card.value.toString() : '0') === -1) {
        return false;
      }
      if (health.length > 0 && health.indexOf(card.health ? card.health.toString() : '0') === -1) {
        return false;
      }
      if (attq.length > 0 && attq.indexOf(card.attq ? card.attq.toString() : '0') === -1) {
        return false;
      }
      return true;
    });
  }

  render() {
    const { cardsSelected } = this.props;
    return (<div className="card-list-container">
      <ul className="card-list">
        { this.cards().map(card => (
          <li key={card.name}>
            <a href="#" onClick={() => cardsSelected.indexOf(card) === -1 && this.props.addCardToSelection(card)}>
              <Card
                card={card}
                selected={cardsSelected.indexOf(card) !== -1}
              />
            </a>
          </li>
        )) }
      </ul>
      <aside>
        <section className="filters">
          <div>
            {(new Array(9)).fill(0).map((k, i) => (
              <label key={`value${i + 1}`} htmlFor={`amounts${i + 1}`} className="filter filter-amounts">
                <input type="checkbox" name="amounts" id={`amounts${i + 1}`} value={i + 1} onChange={this.filterCards} />
                <span>{i + 1}</span>
              </label>
            ))}
          </div>
          <div>
            {(new Array(9)).fill(0).map((k, i) => (
              <label key={`value${i + 1}`} htmlFor={`health${i + 1}`} className="filter filter-health">
                <input type="checkbox" name="health" id={`health${i + 1}`} value={i + 1} onChange={this.filterCards} />
                <span>{i + 1}</span>
              </label>
            ))}
          </div>
          <div>
            {(new Array(9)).fill(0).map((k, i) => (
              <label key={`value${i + 1}`} htmlFor={`attq${i + 1}`} className="filter filter-attq">
                <input type="checkbox" name="attq" id={`attq${i + 1}`} value={i + 1} onChange={this.filterCards} />
                <span>{i + 1}</span>
              </label>
            ))}
          </div>
        </section>
        <section className="selected-cards">
          <ul>
            { this.props.cardsSelected.map(selected => (
              <li key={selected.name}>
                <a href="#" onClick={() => this.props.removeCardFromSelection(selected)}>
                  <Card card={selected} minimal />
                </a>
              </li>
            )) }
          </ul>
        </section>
        <Link to="/fight" className={`fight-btn${this.props.cardsSelected.length < 5 ? ' disabled' : ''}`}>
          FIGHT ! {this.props.cardsSelected.length} / 5
        </Link>
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

const mapDispatchToProps = dispatch => ({
  addCardToSelection: card => dispatch(addCard(card)),
  removeCardFromSelection: card => dispatch(removeCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
