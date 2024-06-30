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

const VolProfileCard = ({ profile, onSave }) => {
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
      <Title>My Profile</Title>
      <Header>
        <BasicInfo>
          <SubTitle>{formData.name}</SubTitle>
          <Text>{formData.address}</Text>
        </BasicInfo>
        <ProfileImage src={formData.profilePic} alt={`${profile.name}`} />
      </Header>

      <Collapsible trigger={<CollapsibleTrigger>Volunteer I.D</CollapsibleTrigger>}>
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
              <DetailRow>
                <DetailLabel><strong>Age:</strong></DetailLabel>
                <input className="detail-value" name="age" value={formData.age} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Gender:</strong></DetailLabel>
                <input className="detail-value" name="gender" value={formData.gender} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Number of Adoptions:</strong></DetailLabel>
                <input className="detail-value" name="numberOfAdoptions" value={formData.numberOfAdoptions} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Animal Experience (Y/M):</strong></DetailLabel>
                <input className="detail-value" name="animalExperience" value={formData.animalExperience} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Additional Animals At Home:</strong></DetailLabel>
                <input className="detail-value" name="additionalAnimalsAtHome" value={formData.additionalAnimals} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>A House with a Yard: (Y/M):</strong></DetailLabel>
                <input className="detail-value" name="yard" value={formData.yard} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Children at Home (Y/M):</strong></DetailLabel>
                <input className="detail-value" name="childrenAtHome" value={formData.childrenAtHome} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Available Dates:</strong></DetailLabel>
                <input className="detail-value" name="availableDates" value={formData.availableDates} onChange={handleChange} />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Description:</strong></DetailLabel>
                <textarea className="detail-value" name="description" value={formData.description} onChange={handleChange} rows="4" />
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
              <DetailRow>
                <DetailLabel><strong>Age:</strong></DetailLabel>
                <DetailValue>{profile.age}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Gender:</strong></DetailLabel>
                <DetailValue>{profile.gender}</DetailValue>
              </DetailRow>
              <DetailRow>
                                <DetailLabel><strong>Number of Adoptions:</strong></DetailLabel>
                <DetailValue>{profile.numberOfAdoptions}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Animal Experience (Y/M):</strong></DetailLabel>
                <DetailValue>{profile.animalExperience}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Additional Animals At Home:</strong></DetailLabel>
                <DetailValue>{profile.additionalAnimalsAtHome}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>A House with a Yard: (Y/M):</strong></DetailLabel>
                <DetailValue>{profile.yard}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Children at Home (Y/M):</strong></DetailLabel>
                <DetailValue>{profile.childrenAtHome}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Available Dates:</strong></DetailLabel>
                <DetailValue>{profile.availableDates}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Description:</strong></DetailLabel>
                <DetailValue>{profile.description}</DetailValue>
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


      <Collapsible trigger={<CollapsibleTrigger>Reviews</CollapsibleTrigger>}>
        <Card>
          {isEditing ? (
            <>
              <DetailRow>
                <DetailLabel><strong>Review 1:</strong></DetailLabel>
                <textarea className="detail-value" name="review1" value={formData.review1} onChange={handleChange} rows="4" />
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Review 2:</strong></DetailLabel>
                <textarea className="detail-value" name="review2" value={formData.review2} onChange={handleChange} rows="4" />
              </DetailRow>
              {/* Add more reviews as needed */}
            </>
          ) : (
            <>
              <DetailRow>
                <DetailLabel><strong>Review 1:</strong></DetailLabel>
                <DetailValue>{profile.review1}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel><strong>Review 2:</strong></DetailLabel>
                <DetailValue>{profile.review2}</DetailValue>
              </DetailRow>
              {/* Display more reviews as needed */}
            </>
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

const VolProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = GetCurrentUser();
      if (user) {
        const docRef = doc(DB(), 'volunteer', user.uid); // Fetching from 'volunteer' collection
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
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
      <VolProfileCard profile={profileData} onSave={handleSaveProfile} />
    </div>
  );
};

export default VolProfile;