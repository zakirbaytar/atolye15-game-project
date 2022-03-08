import React, { FunctionComponent } from 'react';

import ToggleGroup from '../../../components/ToggleGroup';
import useGameManager from '../../../hooks/useGameManager';
import { Turn } from '../../../types/game';

const PlayerSelectionControls: FunctionComponent = () => {
  const { startingPlayer, setStartingPlayer } = useGameManager();

  return (
    <div className="buttons are-small">
      <ToggleGroup
        defaultValue={startingPlayer}
        selections={[
          {
            label: 'Bilgisayar',
            value: Turn.Computer,
            renderer: () => (
              <span className="icon is-small">
                <i className="icon-computer" />
              </span>
            ),
          },
          {
            label: 'Rastgele',
            value: null,
            renderer: () => (
              <span className="icon is-small">
                <i className="icon-random" />
              </span>
            ),
          },
          {
            label: 'Siz',
            value: Turn.Player,
            renderer: () => (
              <span className="icon is-small">
                <i className="icon-player" />
              </span>
            ),
          },
        ]}
        onSelect={(selection) => setStartingPlayer(selection as Turn)}
      />
    </div>
  );
};

export default PlayerSelectionControls;
