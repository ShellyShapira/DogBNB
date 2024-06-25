
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  background-color: rgba(101, 145, 164, 1);
  padding: 1rem;
`;

const NavbarList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
`;

const NavbarItem = styled.li`
  margin: 0 1rem;
`;

const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarList>
        <NavbarItem><NavbarLink to="/">Home</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink to="/about">About Us</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink to="/profile">My Profile</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink to="/requests">Requests</NavbarLink></NavbarItem>
      </NavbarList>
    </NavbarContainer>
  );
}

export default Navbar;
