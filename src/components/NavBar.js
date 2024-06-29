import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const NavbarContainer = styled.nav`
  background-color: #96C3BB;
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

const Navbar = ({ handleLogOut }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const getProfileLink = () => {
    if (user && user.registrationType === 'reserved') {
      navigate('/mydogprofile');
    } else if (user && user.registrationType === 'volunteer') {
      navigate('/MyVolunteerProfiles');
    } else {
      return '/my-profile';
    }
  };

  return (
    <NavbarContainer>
      <NavbarList>
        <NavbarItem><NavbarLink to="/feed">Home</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink to="/about">About Us</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink to={getProfileLink()}>My Profile</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink to="/requests">Requests</NavbarLink></NavbarItem>
        
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;
