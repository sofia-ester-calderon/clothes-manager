import React from "react";
import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";

const NavItem = ({ link, exact = false, ...props }) => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={link} exact={exact}>
        {props.children}
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

export default NavItem;
