import React, { FunctionComponent, useCallback, useEffect } from 'react';
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
  const handleKeyDown = useCallback(
    (event: KeyboardEvent | React.KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        toggle();
      }
    },
    [isOpen, toggle],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div className={cs('modal', { 'is-active': isOpen }, className)} style={style} role="dialog">
      {/* Modal background is used for closing modal when clicked  */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="modal-background" onClick={toggle} onKeyDown={handleKeyDown} />
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
