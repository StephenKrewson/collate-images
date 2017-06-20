import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource } from 'react-dnd';

const style = {
  width: '100%',
  padding: '0',
  backgroundColor: 'white',
};

const illustrationSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      number: props.number
    };
  }
};

class Illustration extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    number: PropTypes.any.isRequired,
    page: PropTypes.string.isRequired,
    editionYear: PropTypes.number.isRequired,
  };

  constructor() {
    super();
    this.loadModal = this.loadModal.bind(this);
    this.imageUriString = this.imageUriString.bind(this);
  }

  loadModal() {
    const { openModal } = this.props;
    openModal(this.imageUriString());
  }

  imageUriString() {
    const { page, editionYear } = this.props;
    return "assets/" + editionYear + "_Page_" + page + ".jpg";
  }

  render() {
    const { page, editionYear, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.2 : 1;

    return connectDragSource(
      <div style={{ backgroundColor: "white", width: "100%", height: "100%", cursor: "move" }} onClick={this.loadModal}>
        <img src={this.imageUriString()} alt={editionYear + ", page " + page} style={{ ...style, opacity }} />
      </div>
    );
  }
}

export default DragSource(ItemTypes.ILLUSTRATION_IN_EDITION, illustrationSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Illustration);
