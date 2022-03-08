import React, { FunctionComponent, useState } from 'react';
import cs from 'classnames';
import NavItem from '../../components/NavItem';
import NavbarBurger from '../../components/NavbarBurger';

const NavBar: FunctionComponent = () => {
  const [isActive, setIsActive] = useState(false);

  const closeMenu = () => {
    setIsActive(false);
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="navbar is-fixed-top">
      <div className="container is-max-widescreen">
        <div className="navbar-brand">
          <NavItem path="/" onClick={closeMenu}>
            <img src="./logo.png" alt="Türetmeç: Kelime Türetme Oyunu" width="112" height="28" />
          </NavItem>
          <NavbarBurger isActive={isActive} onClick={toggleMenu} />
        </div>
        <div className={cs('navbar-menu', { 'is-active': isActive })}>
          <div className="navbar-start">
            <NavItem path="/" onClick={closeMenu}>
              Ana Sayfa
            </NavItem>
            <NavItem path="/how-to-play" onClick={closeMenu}>
              Nasıl Oynanır?
            </NavItem>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons is-justify-content-center">
                <NavItem className="button is-primary is-small" path="/play" onClick={closeMenu}>
                  <strong>Hemen Oynamaya Başla</strong>
                </NavItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
