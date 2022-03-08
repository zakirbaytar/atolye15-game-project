import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import cs from 'classnames';
import useGameManager from '../../../hooks/useGameManager';

import Modal from '../../../components/Modal';
import capitalize from '../../../utils/capitalize';

import { Turn } from '../../../types/game';

import './style.css';

const GameOverModal: FunctionComponent = () => {
  const { winner, wordHistory } = useGameManager();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (winner) {
      setIsOpen(true);
    }
  }, [winner]);

  const { title, subtitle } = useMemo(() => {
    if (winner === Turn.Computer) {
      return {
        title: 'Bilgisayar Kazandı!',
        subtitle: 'Senin daha başarılı olabileceğine inanıyorum',
      };
    }

    return {
      title: 'Tebrikler!',
      subtitle: 'Bilgisayara karşı başarılı olacağını biliyordum',
    };
  }, [winner]);

  return (
    <Modal
      className={cs('game-over-modal', {
        'game-won': winner === Turn.Player,
        'game-lost': winner === Turn.Computer,
      })}
      isOpen={isOpen}
      toggle={() => setIsOpen(false)}
    >
      <div className="modal-content">
        <article className="message">
          <div className="message-header is-flex-direction-column">
            <h1 className="is-size-4 has-text-centered has-text-weight-bold mb-2">{title}</h1>
            <h2 className="is-size-7 has-text-centered has-text-weight-semibold">{subtitle}</h2>
            <button
              type="button"
              className="delete"
              aria-label="Close modal"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="message-body">
            {wordHistory.length ? (
              <>
                <h1 className="is-size-5 is-underlined mb-2 has-text-centered">
                  Söylenen kelimeler
                </h1>
                <ul>
                  {wordHistory.map((word: string) => (
                    <li key={word}>
                      <p className="is-size-6 has-text-centered">{capitalize(word)}</p>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="is-size-7 has-text-centered mt-4">
                Maalesef sözlükteki kelimelerden herhangi biri söylenmeden oyun bitti
              </p>
            )}
          </div>
          <div className="message-footer is-clearfix">
            <button
              type="button"
              className="button is-small is-outlined is-pulled-right"
              onClick={() => setIsOpen(false)}
            >
              Tamam
            </button>
          </div>
        </article>
      </div>
    </Modal>
  );
};

export default GameOverModal;
