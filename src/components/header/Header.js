import React from "react";
import NavItem from "./NavItem";
import { PropTypes } from "prop-types";

const Header = ({ loggedIn }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav mr-auto">
        <NavItem link="/" exact={true}>
          Home
        </NavItem>
        <NavItem link="/clothing" exact={true}>
          Add Clothing
        </NavItem>
        <NavItem link="/clothes">All Clothes</NavItem>
        <NavItem link="/colors">Colors</NavItem>
        {loggedIn ? (
          <NavItem link="/logout">Logout</NavItem>
        ) : (
          <NavItem link="/login">Login</NavItem>
        )}
      </ul>
    </nav>
  );
};

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Header;
