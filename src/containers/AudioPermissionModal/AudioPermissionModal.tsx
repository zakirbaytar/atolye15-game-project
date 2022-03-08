import React, { FunctionComponent, useEffect, useState } from 'react';
import useAudioPermission from '../../hooks/useAudioPermission';
import { AudioPermission } from '../../context/PermissionContext';

import Modal from '../../components/Modal';

import './style.css';

const AudioPermissionModal: FunctionComponent = () => {
  const { permission } = useAudioPermission();

  const [isOpen, setIsOpen] = useState(permission === AudioPermission.Denied);

  useEffect(() => {
    setIsOpen(permission === AudioPermission.Denied);
  }, [permission]);

  return (
    <Modal className="audio-permission-modal" isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
      <div className="modal-content">
        <article className="message">
          <div className="message-header">
            <p className="is-size-7">Mikrofon erişim izni verilmedi</p>
            <button
              className="delete"
              aria-label="Close microphone permission dialogue"
              type="button"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="message-body">
            <p className="is-size-7 mb-4">
              Oyunu oynayabilmeniz için tarayıcınızdan mikrofon iznini açmanız gerekmektedir.
            </p>
            <img src="./microphone-access.png" alt="Mikrofon erişimi" />
            <p className="is-size-7 mt-4">
              Yukarıdaki görseldeki gibi tarayıcı ayarlarından mikrofon iznini sıfırlayabilir ya da
              izin verebilirsiniz.
            </p>
          </div>
          <div className="message-footer is-clearfix">
            <button
              type="button"
              className="button is-pulled-right"
              onClick={() => setIsOpen(false)}
            >
              Kapat
            </button>
          </div>
        </article>
      </div>
    </Modal>
  );
};

export default AudioPermissionModal;
