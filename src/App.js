import React, { Component } from 'react';
import Modal from 'react-modal'
import './App.css';
import Grid from './Grid';

class App extends Component {
  constructor () {
    super();
    this.state = {modalOpen: false, imageUri: "", slotWidth: "80"};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSlotWidthChange = this.onSlotWidthChange.bind(this);
  }

  openModal(imageUri) {
    this.setState({modalOpen: true, modalImageUri: imageUri});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  onSlotWidthChange(event) {
    this.setState({slotWidth: event.target.value});
  }

  render() {
    const { slotWidth, modalOpen, modalImageUri } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Illustration Collation</h2>
          <form className="zoom-control">
            <label htmlFor="zoom">Zoom level</label>
            <input name="zoom" type="range" min="20" max="300" step="20" value={slotWidth} onChange={this.onSlotWidthChange} />
          </form>
        </div>
        <Modal isOpen={modalOpen}
               onRequestClose={this.closeModal}
               style={{ content: { position: "static", width: "fit-content", margin: "auto", marginTop: "40px", marginBottom: "40px" },
                        overlay: { overflow: "scroll" }}}>
          <a href="#" onClick={this.closeModal} className="modal-close">Close</a>
          <img src={modalImageUri} alt="Illustration detail" />
        </Modal>
        <Grid openModal={this.openModal}
              slotWidth={slotWidth} />
      </div>
    );
  }
}

export default App;
