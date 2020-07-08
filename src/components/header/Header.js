import React from "react";
import NavItem from "./NavItem";

const Header = () => {
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
      </ul>
    </nav>
  );
};

export default Header;
