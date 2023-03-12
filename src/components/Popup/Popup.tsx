import React, { Component } from 'react';
import './Popup.scss';

interface PopupProps {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface PopupState {
  isVisible: boolean;
}

class Popup extends Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);
    this.state = { isVisible: true };
  }

  handleConfirm = () => {
    this.setState({ isVisible: false });
    this.props.onConfirm();
  };

  handleCancel = () => {
    this.setState({ isVisible: false });
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  render() {
    const { message } = this.props;
    const { isVisible } = this.state;

    return (
      <>
        {isVisible && (
          <div className="components-popup-wrapper">
            <div className="content">
              <p className="message">{message}</p>
              <div className="buttons">
                <button className="button" onClick={this.handleConfirm}>
                  Confirm
                </button>
                <button className="button" onClick={this.handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Popup;
