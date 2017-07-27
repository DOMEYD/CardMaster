import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import autobind from 'autobind-decorator';
import { PropTypes } from 'prop-types';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import { fetchCards, removeCard, addCard } from '../../actions/cards';
import './style.scss';

class CardList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.arrayOf(Card),
      }).isRequired,
    ).isRequired,
    cardsSelected: PropTypes.arrayOf(Card).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: {
        ammounts: [],
      },
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchCards());
  }

  @autobind
  filterCards(e) {
    const index = this.state.filter.ammounts.indexOf(e.currentTarget.value);
    if (index > -1) {
      this.setState({
        filter: {
          ammounts: this.state.filter.ammounts.slice(0, index).concat(this.state.filter.ammounts.slice(index + 1)),
        },
      });
    } else {
      this.setState({
        filter: {
          ammounts: [...this.state.filter.ammounts, e.currentTarget.value],
        },
      });
    }
  }

  cards = () => {
    let cards = this.props.cards.data;
    const { ammounts } = this.state.filter;

    if (ammounts.length > 0) {
      cards = cards.filter((card) => {
        return ammounts.indexOf(card.value ? card.value.toString() : '0') > -1;
      });
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
    const { cards } = this.props;
    if (cards.isFetching) {
      return <Loader />;
    }
    return (<div className="card-list-container">
      <ul className="card-list">
        { this.cards().map(card => (
          <li key={card.name} onClick={() => this.toggleCardSelection(card)}>
            <Card card={card} />
          </li>
        )) }
      </ul>
      <aside>
        <section>
          <header>Filter</header>
          <div>
            {(new Array(9)).fill(0).map((k, i) => (
              <label key={i + 1}>
                <input type="checkbox" name="value" value={i + 1} onChange={this.filterCards} />
                {i + 1}
              </label>
            ))}
          </div>
        </section>
        <section className="selected-cards">
          <ul>
            { this.props.cardsSelected.map(selected => (
              <li key={selected.name} onClick={() => this.removeCardFromSelection(selected)}>
                <Card card={selected} minimal />
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
