import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import styled, { createGlobalStyle } from 'styled-components';
import { DB, GetCurrentUser } from './Config';
import { doc, getDoc } from "firebase/firestore";

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
  font-family: var (--TEXT_FONT);
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

const DogProfileCard = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

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
      {/* <Title>My Profile</Title> */}
      <Header>
        <BasicInfo>
          <SubTitle>{formData.name}</SubTitle>
          <Text>{formData.dogName}</Text>
          <Text>{formData.dogType}, {formData.dogAge}, {formData.dogSize}</Text>
          <Text>{formData.address}</Text>
        </BasicInfo>
        <ProfileImage src={formData.profilePic} alt={`${profile.name}`} />
      </Header>

      <Collapsible trigger={<CollapsibleTrigger>Dog I.D</CollapsibleTrigger>}>
        <Card>
          {isEditing ? (
            <>
              <DetailRow>
                <DetailLabel><strong>Name:</strong></DetailLabel>
                <input className="detail-value" name="dogName" value={formData.dogName} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Breed:</strong></DetailLabel>
                <input className="detail-value" name="dogType" value={formData.dogType} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Age:</strong></DetailLabel>
                <input className="detail-value" name="dogAge" value={formData.dogAge} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Gender (Male/Female):</strong></DetailLabel>
                <input className="detail-value" name="dogGender" value={formData.dogGender} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Size:</strong></DetailLabel>
                <input className="detail-value" name="dogSize" value={formData.dogSize} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Immune (Y/N):</strong></DetailLabel>
                <input className="detail-value" name="dogImmune" value={formData.dogImmune} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Neutered (Y/N):</strong></DetailLabel>
                <input className="detail-value" name="dogNeutered" value={formData.dogNeutered} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Suitable For:</strong></DetailLabel>
                <input className="detail-value" name="suitableFor" value={formData.suitableFor} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Friendly with children(Y/N):</strong></DetailLabel>
                <input className="detail-value" name="friendlyWithChildren" value={formData.friendlyWithChildren} onChange={handleChange} />
              </DetailRow>
            </>
          ) : (
            <>
            <DetailRow>
                <DetailLabel><strong>Name:</strong></DetailLabel>
                <DetailValue>{profile.dogName}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Breed:</strong></DetailLabel>
                <DetailValue>{profile.dogType}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Age:</strong></DetailLabel>
                <DetailValue>{profile.dogAge}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Gender (Male/Female)</strong></DetailLabel>
                <DetailValue>{profile.dogGender}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Size:</strong></DetailLabel>
                <DetailValue>{profile.dogSize}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Immune (Y/N):</strong></DetailLabel>
                <DetailValue>{profile.dogImmune}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Neutered (Y/N):</strong></DetailLabel>
                <DetailValue>{profile.dogNeutered}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Suitable For:</strong></DetailLabel>
                <DetailValue>{profile.suitableFor ? profile.suitableFor.join(', ') : 'N/A'}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Friendly with children (Y/N):</strong></DetailLabel>
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
                <input className="detail-value" name="name" value={formData.name} onChange={handleChange} />
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
                <DetailValue>{profile.name}</DetailValue>
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
                name="dogDetails"
                value={formData.dogDetails}
                onChange={handleChange}
                rows="4"
              />
            </>
          ) : (
            <Text>{profile.dogDetails}</Text>
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
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = GetCurrentUser();
      if (user) {
        const docRef = doc(DB(), 'reserved', user.uid); // Fetching from 'reserved' collection
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Ensure suitableFor is always an array
          if (!data.suitableFor) {
            data.suitableFor = [];
          }
          setProfileData(data);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchProfileData();
  }, []);

  const handleSaveProfile = (updatedProfile) => {
    setProfileData(updatedProfile);
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DogProfileCard profile={profileData} onSave={handleSaveProfile} />
    </div>
  );
};

export default MyProfile;