import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'react-dnd';
import Illustration from './Illustration';

const style = {
  height: '1px',
  padding: '0',
  border: '1px dashed white',
  backgroundColor: 'black',
};

const illustrationTarget = {
  canDrop(props, monitor, component) {
    return Math.abs(monitor.getItem().index - props.index) === 1 && (props.illustration == null || monitor.getItem().number < props.illustration.number);
  },

  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (!monitor.canDrop()) {
      return;
    }

    props.moveIllustration(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

class Slot extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    editionYear: PropTypes.number.isRequired,
    moveIllustration: PropTypes.func.isRequired
  };

  render() {
    const { connectDropTarget, illustration, editionYear, index, openModal, slotWidth } = this.props;
    const illustrationId = illustration ? editionYear + "-illustration-" + illustration.number : "";

    return connectDropTarget(
      <td style={{ ...style, minWidth: slotWidth + "px", width: slotWidth + "px" }}>
        {illustration ? <Illustration {...illustration}
                                      openModal={openModal}
                                      editionYear={editionYear}
                                      index={index}
                                      id={illustrationId}
                                      key={illustrationId}/> : null }
      </td>
    );
  }
}

export default DropTarget(ItemTypes.ILLUSTRATION_IN_EDITION, illustrationTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Slot);
