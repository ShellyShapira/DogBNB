import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import Collapsible from 'react-collapsible';

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

const Title = styled.h1`
  font-family: var(--TITLE_FONT);
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--TITLE_COLOR_H1);
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

const breeds = ['labrador', 'poodle', 'bulldog', 'beagle', 'pug', 'husky', 'goldenretriever', 'dachshund', 'rottweiler', 'chihuahua'];
const locations = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Eilat', 'Beer Sheva'];
const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Daniel', 'Emma', 'Michael', 'Olivia', 'David', 'Sophia'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'];
const careInstructions = [
  'Feed twice a day with high-quality dog food. Provide clean, fresh water at all times. Ensure the dog has a comfortable place to sleep.',
  'Take for a walk at least once a day. Make sure the dog gets plenty of exercise and playtime. Regular grooming is necessary.',
  'Brush coat weekly to prevent matting. Check ears regularly for signs of infection. Trim nails monthly to avoid overgrowth.',
  'Regular vet check-ups every 6 months. Keep vaccinations up to date. Monitor for any signs of health issues and address them promptly.',
  'Ensure plenty of fresh water is available at all times. Provide a balanced diet. Avoid giving the dog human food, especially anything toxic.',
];

const suitableForOptions = [
  'apartment',
  'house with a yard',
];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateDescription = (friendlyWithChildren, dogName) => {
  if (friendlyWithChildren === 'Yes') {
    return `${dogName} is a friendly dog that loves to play and enjoys spending time with family. ${dogName} is very loyal and makes a great companion.`;
  } else {
    return `${dogName} prefers a quieter environment and may not be suitable for homes with children. ${dogName} is very loyal and makes a great companion for adults.`;
  }
};

const generateDogProfiles = () => {
  return breeds.map((breed, index) => {
    const location = getRandomElement(locations);
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const dogName = getRandomElement(firstNames);
    const suitableFor = getRandomElement(suitableForOptions);
    const friendlyWithChildren = Math.random() > 0.5 ? 'Yes' : 'No';
    const description = generateDescription(friendlyWithChildren, dogName);
    return {
      id: index + 1,
      name: dogName,
      breed,
      age: `${Math.floor(Math.random() * 10) + 1} years`,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      size: getRandomElement(['small', 'medium', 'large']),
      immune: Math.random() > 0.5 ? 'Yes' : 'No',
      neutered: Math.random() > 0.5 ? 'Yes' : 'No',
      suitableFor,
      friendlyWithChildren,
      location,
      datesForBBsitting: `0${Math.floor(Math.random() * 9) + 1}/07-25/08/2024`,
      ownerName: `${firstName} ${lastName}`,
      mobile: `052-${Math.floor(Math.random() * 9000000) + 1000000}`,
      address: location,
      availability: 'only Whatsapp',
      description,
      careInstructions: getRandomElement(careInstructions),
    };
  });
};

const dogProfiles = generateDogProfiles();

const DogProfileCard = ({ profile }) => {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    const fetchDogPhoto = async () => {
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${profile.breed}/images/random`);
        setPhotoUrl(response.data.message);
      } catch (error) {
        console.error('Error fetching dog photo:', error);
        setPhotoUrl('https://default-photo-url-here.jpg'); 
      }
    };

    fetchDogPhoto();
  }, [profile.breed]);

  return (
    <Container>
      <GlobalStyle />
      <Title>Dog's Profile</Title>
      <Header>
        <BasicInfo>
          <SubTitle>{profile.name}</SubTitle>
          <Text>{profile.breed}, {profile.age}, {profile.size}</Text>
          <Text>{profile.address}</Text>
          <Text>Dates for BBsitting: {profile.datesForBBsitting}</Text>
        </BasicInfo>
        <ProfileImage src={photoUrl} alt={`${profile.name}`} />
      </Header>

      <Collapsible trigger={<CollapsibleTrigger>Dog I.D</CollapsibleTrigger>}>
        <Card>
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
            <DetailValue>{profile.suitableFor ? profile.suitableFor.join(', ') : 'N/A'}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel><strong>Friendly with children:</strong></DetailLabel>
            <DetailValue>{profile.friendlyWithChildren}</DetailValue>
          </DetailRow>
        </Card>
      </Collapsible>

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

      <ContactButton>Contact</ContactButton>
    </Container>
  );
};

const DogProfiles = () => {
  const firstProfile = dogProfiles[0];
  // Ensure suitableFor is always an array
  if (!firstProfile.suitableFor) {
    firstProfile.suitableFor = [];
  }
  return (
    <div>
      <DogProfileCard profile={firstProfile} />
    </div>
  );
};

export default DogProfiles;