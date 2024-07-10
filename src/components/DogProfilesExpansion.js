import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Collapsible from 'react-collapsible';
import dog1 from '../images/dog1.jpg';
import dog2 from '../images/dog2.jpg';

const GlobalStyle = createGlobalStyle`
  :root {
    --TITLE_FONT: 'Source Serif Pro', serif;
    --TEXT_FONT: Arial, sans-serif;
    --TITLE_COLOR_H1: #4C7572;
    --BACKGROUND_COLOR: #F0EDEB;
    --TEXT_COLOR_H1: #46454A;
    --BUTTON_COLOR_H1: #628991;
  }

  body {
    font-family: var(--TEXT_FONT);
    direction: ltr;
    margin: 0;
    padding: 0;
    background-color: var(--BACKGROUND_COLOR);
    color: var(--TEXT_COLOR_H1);
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

const Container = styled.div`
  width: 30%;
  max-width: 1200px;
  margin: 20px auto;
  text-align: left;
  background: var(--BACKGROUND_COLOR);
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: none;
  box-shadow: none;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-left: 20px;
`;

const BasicInfo = styled.div`
  text-align: left;
  flex-grow: 1;
`;

const SubTitle = styled.h2`
  font-family: var(--TEXT_FONT);
  font-size: 1.5rem;
  margin: 5px 0;
  color: #555;
`;

const Text = styled.p`
  font-family: var(--TEXT_FONT);
  font-size: 1rem;
  margin: 5px 0;
  color: var(--TEXT_COLOR_H1);
`;

const Card = styled.div`
  background-color: transparent;
  border-radius: 0;
  padding: 15px;
  margin: 10px 0;
  box-shadow: none;
  text-align: left;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const DetailLabel = styled.label`
  font-weight: bold;
  color: #333;
`;

const DetailValue = styled.span`
  color: #666;
`;

const ContactButton = styled.button`
  background-color: #628991;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: box-shadow 0.3s ease-in-out;
  display: inline-block;
  width: auto;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
    background-color: #628991;
  }
`;

const CollapsibleTrigger = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: '▼';
    font-size: 1rem;
    margin-left: 10px;
  }

  &:hover {
    background-color: #d5d5d5;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const DogProfileCard = ({ profile }) => {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    const photos = [dog1, dog2]; // Add more dog images here as needed
    const photoIndex = (profile.id - 1) % photos.length; // Use modulo to cycle through images
    setPhotoUrl(photos[photoIndex]);
  }, [profile.id]);

  const [showModal, setShowModal] = useState(false);

  const handleContactClick = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000); // Close the modal after 3 seconds
  };

  return (
    <Container>
      <GlobalStyle />
      <Header>
        <BasicInfo>
          <SubTitle>{profile.name}</SubTitle>
          <Text>{profile.breed}, {profile.age}, {profile.size}</Text>
          <Text>{profile.address}</Text>
          <Text>Dates for BBsitting: {profile.datesForBBsitting}</Text>
        </BasicInfo>
        <ProfileImage src={photoUrl} alt={`${profile.name}`} />
      </Header>

      <Collapsible trigger={<CollapsibleTrigger>Owner I.D</CollapsibleTrigger>}>
        <Card>
          <DetailRow>
            <DetailLabel><strong>Name:</strong></DetailLabel>
            <DetailValue>{profile.ownerName}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Address:</strong></DetailLabel>
            <DetailValue>{profile.address}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Email:</strong></DetailLabel>
            <DetailValue>{profile.email}</DetailValue>
          </DetailRow>
        </Card>
      </Collapsible>

      <Collapsible trigger={<CollapsibleTrigger>Dog I.D</CollapsibleTrigger>}>
        <Card>
          <DetailRow>
            <DetailLabel><strong>Name:</strong></DetailLabel>
            <DetailValue>{profile.name}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Breed:</strong></DetailLabel>
            <DetailValue>{profile.breed}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Age:</strong></DetailLabel>
            <DetailValue>{profile.age}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Gender:</strong></DetailLabel>
            <DetailValue>{profile.gender}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Size:</strong></DetailLabel>
            <DetailValue>{profile.size}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Immune:</strong></DetailLabel>
            <DetailValue>{profile.immune}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Neutered:</strong></DetailLabel>
            <DetailValue>{profile.neutered}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Suitable For:</strong></DetailLabel>
            <DetailValue>{profile.suitableFor && typeof profile.suitableFor == typeof [] ? profile.suitableFor.join(', ') : 'N/A'}</DetailValue>
          </DetailRow>
        </Card>
      </Collapsible>

      <Collapsible trigger={<CollapsibleTrigger>A Little About Me</CollapsibleTrigger>}>
        <Card>
          <Text>{profile.description}</Text>
        </Card>
      </Collapsible>

      <Collapsible trigger={<CollapsibleTrigger>Care Instructions</CollapsibleTrigger>}>
        <Card>
          <Text>{profile.careInstructions}</Text>
        </Card>
      </Collapsible>

      <ContactButton onClick={handleContactClick}>Contact</ContactButton>

      {showModal && (
        <ModalBackground>
          <ModalContent>
            <h3>BBsitting request sent!</h3>
          </ModalContent>
        </ModalBackground>
      )}
    </Container>
  );
};

const DogProfiles = () => {
  const profile = {
    id: 1,
    name: 'Buddy',
    breed: 'Labrador',
    age: '3 years',
    gender: 'Male',
    size: 'Large',
    immune: 'Yes',
    neutered: 'Yes',
    suitableFor: ['children', 'apartment'],
    address: 'Tel Aviv',
    datesForBBsitting: '01/07-25/08/2024',
    ownerName: 'John Doe',
    email: 'shaked.ds@gmail.com',
    careInstructions: 'Feed twice a day with high-quality dog food. Provide clean, fresh water at all times. Ensure the dog has a comfortable place to sleep.',
    description: 'Buddy is a friendly dog that loves to play and enjoys spending time with family. Buddy is very loyal and makes a great companion.',
  };

  // Ensure suitableFor is always an array
  if (!profile.suitableFor) {
    profile.suitableFor = [];
  }

  return (
    <div>
      <DogProfileCard profile={profile} />
    </div>
  );
};

export default DogProfiles;