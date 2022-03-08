import React, { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cs from 'classnames';

interface NavItemProps {
  className?: string;
  path: string;
  onClick?: () => void;
}

const NavItem: FunctionComponent<NavItemProps> = ({ className, path, onClick, children }) => {
  const { pathname } = useLocation();

  return (
    <Link to={path} className={cs(className, { 'is-active': pathname === path })} onClick={onClick}>
      {children}
    </Link>
  );
};

NavItem.defaultProps = {
  className: 'navbar-item',
  onClick: () => {},
};

export default NavItem;
