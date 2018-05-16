import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const Types = {
    ITEM: 'item'
};

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
};

const sourceSpec = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        }
    },
    endDrag(props, monitor, Component) {
        if (!monitor.didDrop()) {
            return;
        }

        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        props.moveItem(item, dropResult);
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class Source extends Component {
    render() {
        return this.props.connectDragSource(
            <div style={{ ...style }}>Block: {this.props.name}</div>
        )
    }
}

export default DragSource(Types.ITEM, sourceSpec, collect)(Source);