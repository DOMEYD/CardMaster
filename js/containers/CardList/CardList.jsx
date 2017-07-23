import React, { Component } from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import { fetchCards } from "../../actions/cards";
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
    this.setState({
      filter: {
        ammounts: [...this.state.filter.ammounts, e.currentTarget.value]
      }
    });
  }

  cards = () => {
    let cards = this.props.cards.data;
    const {ammounts} = this.state.filter;

    if (ammounts.length > 0) {
      cards = cards.filter(card => {
        return ammounts.indexOf(card.cost ? card.cost.toString() : '0') > -1
      })
    }

    return cards;
  }

  render() {
    const { cards } = this.props;
    if (cards.isFetching) {
      return <Loader/>
    }
    return <div className="card-list-container">
      <ul className="card-list">
        {this.cards().map(card => <li key={card.cardId}>
          <Card card={card} />
        </li>)}
      </ul>
      <aside>
        <section>
          <header>Filter</header>
          <div>
            {(new Array(10)).fill(0).map((k,i) => <label key={i}>
              <input type="checkbox" name="value" value={i} onChange={this.filterCards}/>
              {i}
            </label>)}
          </div>
        </section>
      </aside>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
  }
}

export default connect(mapStateToProps)(CardList);