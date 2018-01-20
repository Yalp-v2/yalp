import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
  <div>{value}</div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
       <button className="sortingOptionDrag" onClick={ () => {
          console.log('setting ' + value + ' to '+ index)
        }}> <SortableItem key={`item-${index}`} index={index} value={value} /> </button>
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: this.props.items,
    };
    this.onSortEnd = this.onSortEnd.bind(this);
  }
  
  onSortEnd({oldIndex, newIndex}) {
    if (newIndex !== oldIndex) {
      this.props.dragHandler()
      this.setState({
        items: arrayMove(this.state.items, oldIndex, newIndex),
      });
    };
  }
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default SortableComponent;