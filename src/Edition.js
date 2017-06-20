import React, { Component } from 'react';
import Slot from './Slot';

export default class Edition extends Component {
  constructor(props) {
    super(props);
    this.moveIllustration = this.moveIllustration.bind(this);
  }

  moveIllustration(dragIndex, hoverIndex) {
    const { illustrations, index, onUpdate } = this.props;
    const dragIllustration = illustrations[dragIndex];
    onUpdate(index, dragIllustration, dragIndex, hoverIndex);
  }

  render() {
    const { year, title, pubDate, illustrations, openModal, slotCount, slotWidth } = this.props;
    var slots = [];
    for (let i=0; i < slotCount; i++) {
      var illustration = illustrations.length > i ? illustrations[i] : null;
      slots.push(<Slot index={i}
                       illustration={illustration}
                       moveIllustration={this.moveIllustration}
                       openModal={openModal}
                       slotWidth={slotWidth}
                       editionYear={year}
                       key={year + "-" + i} />);
    }
    return (
      <tr>
        <td className="edition-label">
          <div style={{ width: "100%", height: "100%" }}>
            {year}
            {title ? <p className="edition-info edition-title">{title}</p> : null}
            {pubDate ? <p className="edition-info">{pubDate}</p> : null}
          </div>
        </td>
        {slots}
      </tr>
    );
  }
}
