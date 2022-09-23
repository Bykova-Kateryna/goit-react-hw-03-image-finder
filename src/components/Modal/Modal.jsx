import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalOverlay, ModalSection } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleDownInEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleDownInEscape);
  }

  handleDown = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  handleDownInEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <ModalOverlay onClick={this.handleDown}>
        <ModalSection>{this.props.children}</ModalSection>
      </ModalOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
