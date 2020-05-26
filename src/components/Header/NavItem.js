import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = (props) => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={props.link} exact>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
