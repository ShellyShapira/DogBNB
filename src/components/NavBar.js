import React, { Profiler, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import FormSection from './FormSection';
import VolFormSection from './Volform';
import { registrationType } from './FormSection';
import { registrationType2 } from './Volform';


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
    if (registrationType === 'reserved') {
      return '/mydogprofile';
    } else if (registrationType2 === 'volunteer') {
      return'/VolProfile';
    } else {
      return '/VolProfile';
    }
  };

  return (
    <NavbarContainer>
      <NavbarList>
        <NavbarItem><NavbarLink to="/feed">Home</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink to="/about">About Us</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink to={getProfileLink()}>My Profile</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink to="/requests">Request-volunteer</NavbarLink></NavbarItem>
        <NavbarItem><NavbarLink to="/requests-2">Requests-reserve</NavbarLink></NavbarItem>
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;
