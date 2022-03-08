import React, { FunctionComponent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cs from 'classnames';

import './style.css';

export interface ModalProps {
  className?: string;
  style?: React.CSSProperties;
  isOpen: boolean;
  toggle: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ className, style, isOpen, toggle, children }) => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        toggle();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <div className={cs('modal', { 'is-active': isOpen }, className)} style={style} role="dialog">
      <div className="modal-background" onClick={toggle} />
      {children}
    </div>,
    document.body,
  );
};

Modal.defaultProps = {
  className: '',
  style: {},
};

export default Modal;
