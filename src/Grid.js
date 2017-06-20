import React, { Component } from 'react';
import update from 'react/lib/update';
import Edition from './Edition';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import data from './editions'

class Grid extends Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);
    this.state = {
      editions: data,
    };
    this.state.slotCount = this.getSlotCount(); // bad form to mutate state directly (and generates warning), but only doing so here in constructor
  }

  getSlotCount() {
    var edLengths = this.state.editions.map(function(edition) { return edition.illustrations.length; });
    return Math.max(...edLengths) + 1;
  }

  onUpdate(editionIndex, illustration, oldIndex, newIndex) {
    var eds = this.state.editions;
    if (newIndex > oldIndex && (newIndex >= eds[editionIndex].illustrations.length || eds[editionIndex].illustrations[newIndex] != null)) eds[editionIndex].illustrations[oldIndex] = null;
    else {
      var removalCount = 1;
      var lastIndex = eds[editionIndex].illustrations.length - 1;
      if (oldIndex === lastIndex) {
        lastIndex--;
        while (lastIndex >= newIndex && eds[editionIndex].illustrations[lastIndex] == null) {
          removalCount++;
          lastIndex--;
        }
      }
      eds[editionIndex].illustrations.splice(oldIndex - removalCount + 1, removalCount);
    }
    eds[editionIndex].illustrations.splice(newIndex, 0, illustration);

    this.setState(update(this.state, {
      editions: { $set: eds },
      slotCount: { $set: this.getSlotCount() }
    }));
  }

  render() {
    const { editions, slotCount } = this.state;
    const { openModal, slotWidth } = this.props;

    return (
      <div className="grid-wrapper">
        <table>
          <tbody>
            {editions.map((edition, i) => {
              return (
                <Edition key={edition.year}
                         index={i}
                         year={edition.year}
                         title={edition.title}
                         pubDate={edition.pubDate}
                         illustrations={edition.illustrations}
                         onUpdate={this.onUpdate}
                         slotCount={slotCount}
                         slotWidth={slotWidth}
                         openModal={openModal} />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Grid);
