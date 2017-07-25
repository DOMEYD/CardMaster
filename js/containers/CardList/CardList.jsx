import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import autobind from 'autobind-decorator';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import { fetchCards, toggleCard } from "../../actions/cards";
import './style.scss';

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        ammounts: []
      }
    }
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
          ammounts: this.state.filter.ammounts.slice(0,index).concat(this.state.filter.ammounts.slice(index+1)),
        }
      });
    } else {
      this.setState({
        filter: {
          ammounts: [...this.state.filter.ammounts, e.currentTarget.value]
        }
      });
    }
  }

  cards = () => {
    let cards = this.props.cards.data;
    const {ammounts} = this.state.filter;

    if (ammounts.length > 0) {
      cards = cards.filter(card => {
        return ammounts.indexOf(card.value ? card.value.toString() : '0') > -1
      })
    }

    return cards;
  }

  @autobind
  toggleCardSelection(card) {
    this.props.dispatch(toggleCard(card));
  }

  render() {
    const { cards } = this.props;
    if (cards.isFetching) {
      return <Loader/>
    }
    return <div className="card-list-container">
      <ul className="card-list">
        {this.cards().map(card => <li key={card.cardId} onClick={() => this.toggleCardSelection(card)}>
          <Card card={card} />
        </li>)}
      </ul>
      <aside>
        <section>
          <header>Filter</header>
          <div>
            {(new Array(10)).fill(0).map((k,i) => <label key={i}>
              <input type="checkbox" name="value" value={i} onChange={this.filterCards} />
              {i}
            </label>)}
          </div>
        </section>
        <section className="selected-cards">
          <ul>
            { this.props.cardsSelected.map(selected => <Card card={selected} minimal={true} />) }
          </ul>
        </section>
        <Link to="/fight" className="fight-btn">FIGHT !</Link>
      </aside>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
    cardsSelected: state.cardsSelected,
  }
}

export default connect(mapStateToProps)(CardList);