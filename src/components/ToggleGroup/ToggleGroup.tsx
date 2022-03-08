import React, { FunctionComponent, useEffect, useState } from 'react';
import cs from 'classnames';

interface Selection {
  label: string;
  value: unknown;
  renderer: () => React.ReactNode;
}

interface ToggleGroupProps {
  defaultValue: unknown;
  selections: Selection[];
  onSelect: (selection: unknown) => void;
}

const ToggleGroup: FunctionComponent<ToggleGroupProps> = ({
  defaultValue,
  selections,
  onSelect,
}) => {
  const [currentSelection, setSelection] = useState(defaultValue);

  useEffect(() => {
    onSelect(currentSelection);
  }, [currentSelection]);

  return (
    <>
      {selections.map((selection) => {
        return (
          <button
            type="button"
            key={`button-${(selection.value as string) ?? 'random'}`}
            title={selection.label}
            className={cs('button is-primary', {
              'is-outlined': currentSelection !== selection.value,
            })}
            onClick={() => setSelection(selection.value)}
          >
            {selection.renderer()}
          </button>
        );
      })}
    </>
  );
};

export default ToggleGroup;
