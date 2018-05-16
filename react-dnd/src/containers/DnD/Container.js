import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import update from 'immutability-helper';

import Target from './Target';
import Source from './Source';

class Container extends Component {
    state = {
        items: [
            {id: 1, index: 1, name: 'Item name 1'},
            {id: 2, index: 2, name: 'Item name 2'},
            {id: 3, index: 3, name: 'Item name 3'},
            {id: 4, index: 4, name: 'Item name 4'}
        ],
        targetItems: []
    }

    moveItem = (dragItem, dropResult) => {
        const { items } = this.state;
        const draggedItem = items.filter(item => item.id === dragItem.id);
        const updatedItems = items.filter(item => item.id !== dragItem.id);

        this.setState(
            update(this.state, {
                items: {
                    $set: updatedItems
                },
                targetItems: {
                    $push: draggedItem
                }
            })
        );
    }

    render() {
        const source = this.state.items.map(item => {
            return <Source key={item.index} id={item.id} name={item.name} moveItem={this.moveItem}/>
        })
        return (
            <div>
                {source}
                <Target moveItem={this.moveItem} items={this.state.targetItems}/>
            </div>
        )
    }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Container);