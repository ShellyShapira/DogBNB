import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import styled, { createGlobalStyle } from 'styled-components';

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
  width: 30%; /* Set width to 50% for centering content */
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
  width: 60%;
  background-color: transparent;
  border-radius: 0;
  padding: 15px;
  margin: 10px 0;
  box-shadow: none;
  text-align: left;
`;

const DetailRow = styled.div`
  text-align: left;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const DetailLabel = styled.label`
  font-weight: bold;
  color: #333;
`;

const DetailValue = styled.span`
  align: left;
  display: flex;
  color: #666;
`;

const EditButton = styled.button`
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
  width: 100px
  justify-content: space-between;
  align-items: left;

  &::after {
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
      address: location,
      availability: 'only Whatsapp',
      description,
      careInstructions: getRandomElement(careInstructions),
    };
  });
};

const dogProfiles = generateDogProfiles();

const DogProfileCard = ({ profile, onSave }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    const fetchDogPhoto = async () => {
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${profile.breed}/images/random`);
        setPhotoUrl(response.data.message);
      } catch (error) {
        console.error('Error fetching dog photo:', error);
        setPhotoUrl('https://default-photo-url-here.jpg'); // Default image if there's an error
      }
    };

    fetchDogPhoto();
  }, [profile.breed]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(formData); // Save the updated profile data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container>
      <GlobalStyle />
      <Title>My Profile</Title>
      <Header>
        <BasicInfo>
          <SubTitle>{formData.name}</SubTitle>
          <Text>{formData.breed}, {formData.age}, {formData.size}</Text>
          <Text>{formData.address}</Text>
          <Text>Dates for BBsitting: {formData.datesForBBsitting}</Text>
        </BasicInfo>
        <ProfileImage src={photoUrl} alt={`${profile.name}`} />
      </Header>

      <Collapsible trigger={<CollapsibleTrigger>Dog I.D</CollapsibleTrigger>}>
        <Card>
          {isEditing ? (
            <>
              <DetailRow>
                <DetailLabel><strong>Breed:</strong></DetailLabel>
                <input className="detail-value" name="breed" value={formData.breed} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Age:</strong></DetailLabel>
                <input className="detail-value" name="age" value={formData.age} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Gender:</strong></DetailLabel>
                <input className="detail-value" name="gender" value={formData.gender} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Size:</strong></DetailLabel>
                <input className="detail-value" name="size" value={formData.size} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Immune:</strong></DetailLabel>
                <input className="detail-value" name="immune" value={formData.immune} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Neutered:</strong></DetailLabel>
                <input className="detail-value" name="neutered" value={formData.neutered} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Suitable For:</strong></DetailLabel>
                <input className="detail-value" name="suitableFor" value={formData.suitableFor} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Friendly with children:</strong></DetailLabel>
                <input className="detail-value" name="friendlyWithChildren" value={formData.friendlyWithChildren} onChange={handleChange} />
              </DetailRow>
            </>
          ) : (
            <>
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
                <DetailValue>{profile.suitableFor}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Friendly with children:</strong></DetailLabel>
                <DetailValue>{profile.friendlyWithChildren}</DetailValue>
              </DetailRow>
            </>
          )}
        </Card>
      </Collapsible>

      <Collapsible trigger={<CollapsibleTrigger>Owner I.D</CollapsibleTrigger>}>
        <Card>
          {isEditing ? (
            <>
              <DetailRow>
                <DetailLabel><strong>Name:</strong></DetailLabel>
                <input className="detail-value" name="ownerName" value={formData.ownerName} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Address:</strong></DetailLabel>
                <input className="detail-value" name="address" value={formData.address} onChange={handleChange} />
              </DetailRow>
            </>
          ) : (
            <>
              <DetailRow>
                <DetailLabel><strong>Name:</strong></DetailLabel>
                <DetailValue>{profile.ownerName}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Address:</strong></DetailLabel>
                <DetailValue>{profile.address}</DetailValue>
              </DetailRow>
            </>
          )}
        </Card>
      </Collapsible>

      <Collapsible trigger={<CollapsibleTrigger>A Little About Me</CollapsibleTrigger>}>
        <Card>
          {isEditing ? (
            <>
              <textarea
                className="detail-value"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </>
          ) : (
            <Text>{profile.description}</Text>
          )}
        </Card>
      </Collapsible>

      <Collapsible trigger={<CollapsibleTrigger>Care Instructions</CollapsibleTrigger>}>
        <Card>
          {isEditing ? (
            <>
              <textarea
                className="detail-value"
                name="careInstructions"
                value={formData.careInstructions}
                onChange={handleChange}
                rows="4"
              />
            </>
          ) : (
            <Text>{profile.careInstructions}</Text>
          )}
        </Card>
      </Collapsible>

      {isEditing ? (
        <EditButton onClick={handleSaveClick}>Save Profile</EditButton>
      ) : (
        <EditButton onClick={handleEditClick}>Edit Profile</EditButton>
      )}
    </Container>
  );
};

const MyProfile = () => {
  const [profileData, setProfileData] = useState(dogProfiles[0]);

  const handleSaveProfile = (updatedProfile) => {
    setProfileData(updatedProfile);
  };

  return (
    <div>
      <DogProfileCard profile={profileData} onSave={handleSaveProfile} />
    </div>
  );
};

export default MyProfile;
