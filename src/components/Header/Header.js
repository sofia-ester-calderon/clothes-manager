import React from "react";
import NavItem from "./NavItem";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav mr-auto">
        <NavItem link="/">Home</NavItem>
        <NavItem link="/clothing">Add Clothing</NavItem>
        <NavItem link="/clothes">All Clothes</NavItem>
      </ul>
    </nav>
  );
};

export default Header;
