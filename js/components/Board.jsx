import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import Card from "./Card/Card";

const boardTarget = {
    hover(props, monitor, component) {},
    drop(props, monitor, component) {
        return {
            type: 'BOARD'
        }
    }
}

@DropTarget('card', boardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))
class Board extends Component {
    render() {
        const { connectDropTarget, board } = this.props;
        return connectDropTarget(<section className="board">
            { board ? board.map(card => <Card card={card} />) : null }
        </section>);
    }
}

function mapStateToProps(state) {
    return {
        board: state.board,
    }
}

export default connect(mapStateToProps)(Board);