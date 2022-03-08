import React, { FunctionComponent, useCallback } from 'react';

interface NavbarBurgerProps {
  isActive: boolean;
  onClick: () => void;
}

const NavbarBurger: FunctionComponent<NavbarBurgerProps> = ({ isActive, onClick }) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onClick();
    },
    [onClick],
  );

  return (
    <button
      type="button"
      className="navbar-burger"
      aria-label="menu"
      aria-expanded={isActive ? 'true' : 'false'}
      onClick={handleClick}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  );
};

export default NavbarBurger;
