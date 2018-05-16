import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const style = {
    width: '100%',
    height: '500px',
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
};

const itemStyle = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

const Types = {
    ITEM: 'item'
};

const targetSpec = {
    hover(props, monitor, component) {
        // This is fired very often and lets you perform side effects
        // in response to the hover. You can't handle enter and leave
        // here—if you need them, put monitor.isOver() into collect() so you
        // can just use componentWillReceiveProps() to handle enter/leave.

        // You can access the coordinates if you need them
        const clientOffset = monitor.getClientOffset();
        const componentRect = findDOMNode(component).getBoundingClientRect();

        // You can check whether we're over a nested drop target
        const isJustOverThisOne = monitor.isOver({ shallow: true });

        // You will receive hover() even for items for which canDrop() is false
        const canDrop = monitor.canDrop();
    },

    drop(props, monitor, component) {
        if (monitor.didDrop()) {
            return;
        }
    }
}

function collect(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Target extends Component {
    render() {
        let items = null;

        items = this.props.items.map(item => {
            return (
                <div key={item.index} style={{ ...itemStyle }}>Block: {item.name}</div>
            )
        });

        return this.props.connectDropTarget(
            <div style={{ ...style }}>
                {items}
            </div>
        )
    }
}

export default DropTarget(Types.ITEM, targetSpec, collect)(Target);